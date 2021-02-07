import './SearchStock.styles.css'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    fontColor:'white'
  },
  button: {
    margin: theme.spacing(1),
  },
}));


const SearchStock = ({handleStockCode, handleFrom, handleTo}) => {
    const classes = useStyles();
    return (
            <>
                    <form onSubmit={handleStockCode}>
                        <TextField
                            id="date"
                            label="From"
                            type="date"
                            name='from'
                            defaultValue="2017-05-24"
                            className={classes.textField}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                        <TextField
                            id="date"
                            label="To"
                            type="date"
                            name='to'
                            defaultValue="2017-05-24"
                            className={classes.textField}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                        <input 
                            type="text"
                            name='stock' 
                            className="search-box" 
                            placeholder="Stock Code (e.g. AAPL)" 
                        />
                        <Button
                            type='submit'
                            variant="contained"
                            color="default"
                            size="large"
                            className={classes.button}
                            endIcon={<SearchIcon />}
                        >
                            Search
                        </Button>
                    </form>
            </>
    )
}

export default SearchStock