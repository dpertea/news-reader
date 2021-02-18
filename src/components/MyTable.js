import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import {Typography} from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import bluegrey from '@material-ui/core/colors/blueGrey';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';

export default function MyTable(props) {
  const classes = useStyles();
  const rows = props.tableResults;
  const [column1, column2, column3, column4] = props.columns;
  
  const handleNextPage = (e) => {
    props.changePage('next');
  };

  const handlePrevPage = (e) => {
    props.changePage('prev');
  };

  return (
    <>
    <div align = "right">
     <Typography>Results {props.curResult} - {props.totalResults < (props.curResult+props.pageSize) ? props.totalResults : props.totalResults === 0 ? 0 : props.curResult+props.pageSize} (out of {props.totalResults}) </Typography>
   </div>
    <TableContainer className={classes.container} align='center' justify='center' component={Paper}>
      <Table className={classes.table} stickyHeader aria-label="customized table" align='center'>
        <TableHead color={bluegrey}>
          <TableRow>
            <StyledTableCell>{column1}</StyledTableCell>
            <StyledTableCell align="right">{column2}</StyledTableCell>
            <StyledTableCell align="right">{column3}</StyledTableCell>
            <StyledTableCell align="right">{column4}</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map( row => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.webPublicationDate ? row.webPublicationDate.slice(5,10) + '-' + row.webPublicationDate.slice(0,4) : row.id.replace(/\//g, ", ")}
              </StyledTableCell>
              <StyledTableCell align="right">{row.webTitle}</StyledTableCell>
              <StyledTableCell align="right">{row.sectionName ? row.sectionName : row.Path}</StyledTableCell>
              <StyledTableCell align="right"><Link href={row.webUrl} color='rgb(0,100,120)' target='_blank' rel='noreferrer'>{row.webUrl}</Link></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
     <div align = "right">
     <IconButton disabled={props.curResult===0 || props.curResult ===1} onClick={handlePrevPage}><NavigateBeforeIcon/></IconButton ><IconButton disabled={props.curResult===0 || props.curResult === props.totalResults-props.pageSize} onClick={handleNextPage}><NavigateNextIcon/></IconButton>
   </div>
   </>
  );
}

/*styling*/
const StyledTableCell = withStyles((theme) => ({
  head: {
    color: 'rgb(0,100,120)',
    background: theme.palette.action.hover,
    fontSize: 18,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#f2faff',
      width: '200%',
    },
  },
}))(TableRow);

/*1020 will make it the exact same width as the search bar*/
const useStyles = makeStyles({
  table: {
    minWidth: 500,
    width: '100%',
  },
  container: {
    width: '100%',
  }
});