import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);





const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function StockData({stockData, stockCode}) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Stock Name</StyledTableCell>
            <StyledTableCell align="center">Current Price</StyledTableCell>
            <StyledTableCell align="center">Open Price</StyledTableCell>
            <StyledTableCell align="center">Low Price</StyledTableCell>
            <StyledTableCell align="center">High Price</StyledTableCell>
            <StyledTableCell align="center">Previous Close Price</StyledTableCell>
            <StyledTableCell align="center">Last Updated Date</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <StyledTableRow key={stockCode}>
              <StyledTableCell component="th" scope="row">
                {stockCode}
              </StyledTableCell>
              <StyledTableCell align="center">{stockData.c}</StyledTableCell>
              <StyledTableCell align="center">{stockData.o}</StyledTableCell>
              <StyledTableCell align="center">{stockData.l}</StyledTableCell>
              <StyledTableCell align="center">{stockData.h}</StyledTableCell>
              <StyledTableCell align="center">{stockData.pc}</StyledTableCell>
              <StyledTableCell align="center">{ JSON.stringify(new Date(stockData.t * 1000)).split('T')[0].replace('"', '') }</StyledTableCell>
            </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
