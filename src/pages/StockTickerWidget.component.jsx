import React,{useState, useEffect} from 'react';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import StockNews from '../components/StockNews/StockNews.component';
import StockGraph from '../components/StockGraph/StockGraph.component';
import StockData from '../components/StockData/StockData.component';
import SearchStock from '../components/SearchStock/SearchStock.component';
import './StockTickerWidget.styles.css'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function StockTickerWidget() {
  
  const BASE_URL = 'https://finnhub.io/api/v1/'
  const API_KEY = 'c0emi2f48v6p527ucsqg'

  const classes = useStyles();
  const [toDate, setToDate] = useState('1612742400000')
  const [fromDate, setFromDate] = useState('16127111424')
  const [stockData, setStockData] = useState([])
  const [stockNews, setStockNews] = useState([])
  const [stockCandle, setStockCandle] = useState([])
  const [stockCode, setStockCode] = useState('No Stock Code')

  let stockQuoteAPI = `${BASE_URL}quote?symbol=${stockCode}&token=${API_KEY}`
  let stockNewsAPI =  `${BASE_URL}company-news?symbol=${stockCode}&from=2020-04-30&to=2020-05-01&token=${API_KEY}`
  let stockCandleAPI =  `${BASE_URL}stock/candle?symbol=${stockCode}&resolution=D&from=${fromDate}&to=${toDate}&token=${API_KEY}`

  const requestQuote = axios.get(stockQuoteAPI);
  const requestNews = axios.get(stockNewsAPI);
  const requestCandle = axios.get(stockCandleAPI);

  useEffect(() => {
    axios.all([requestQuote,requestNews, requestCandle])
    .then(axios.spread((...responses) => {
      const responseQuote = responses[0];
      const responseNews = responses[1];
      const responseCandle = responses[2];

      // use/access the results
      setStockData(responseQuote.data)
      setStockNews(responseNews.data);
      setStockCandle(responseCandle.data);
    }))
    .catch(err => {
      console.log(err)
    })
  },[stockCode,fromDate,toDate])

 

  
  const handleStockCode = (event) => {
    event.preventDefault()
    setStockCode(event.target.stock.value)
    const newfromDate = new Date(`${event.target.from.value}`)
    setFromDate(newfromDate.getTime()/1000)
    const newtoDate = new Date(`${event.target.to.value}`)
    setToDate(newtoDate.getTime()/1000)
  }


  const filterNews = stockNews ? stockNews.filter((stock,idx) => idx <4): null
  return (
    <>
    <SearchStock 
      handleStockCode={handleStockCode} 
    />
    
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item md={8}>
          <StockGraph stockCandle={stockCandle}/>
        </Grid>
        <Grid item md={4}>
          <StockNews news={filterNews} stockCode={stockCode} />
        </Grid>
        <Grid item xs={12}>
          <StockData stockData={stockData} stockCode={stockCode}/>
        </Grid>
      </Grid>
    </div>
  </>
  );
}
