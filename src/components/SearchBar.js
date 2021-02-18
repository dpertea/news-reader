/*contains the search bar, as well as the filter option menu and the textfield input for filtering*/ 
import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { List, ListItem, ListItemText, MenuItem, Menu, TextField, Grid } from '@material-ui/core';

export default function SearchBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [orderAnchorEl, setOrderAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedOrderInd, setSelectedOrderInd] = useState(0);
  const [filtInput, setFiltInput] = useState('');
  const [order, setOrder] = useState('relevance');
  const [filter, setFilter] = useState('None');
  const [error, setError] = useState('');
  const [errBool, setErrBool] = useState(false);
  const ordering = ['Relevance', 'Most Recent', 'Oldest'];
  let {endpoint, handleInput, handleFilter, searchTable, options, handleOrder} = props;
 
  const handleFiltChange = (e) => {
    const {target: {value}} = e;
    setFiltInput(value);
    if (filter === 'Results per page:') {
      let val = Number(value);
      if (!(val >= 1 && val <= 200)) {
        setErrBool(true);
      } else {
        setErrBool(false);
        handleFilter(filter, value);
      }
    } else handleFilter(filter, value);
  }

  const handleChange = (e) => {
    let i = e.target.value.toLowerCase();
    let input = encodeURI(i);
    handleInput(input);
  } 
const handleSearchButton = () => {
  searchTable();
  } 

  const handleClickListItem = (e) => {
    setAnchorEl(e.currentTarget);
  }

  const handleClickOrderListItem = (e) => {
    setOrderAnchorEl(e.currentTarget);
  }
  
  const handleMenuItemClick = (e, index) => {
    if (endpoint === 'editions') {
      setSelectedIndex(0);
    } else {
    setSelectedIndex(index);
    setAnchorEl(null);
    setErrBool(false);
    handleFilter('None', '');
    }
  }

  const handleOrderClick = (e, index) => {
    setSelectedOrderInd(index);
    setOrderAnchorEl(null);
    if (index === 0) {
      setOrder('relevance')
    } else if (index === 1) {
      setOrder('newest')
    } else if (index ===2) {
      setOrder('oldest');
    }
  }

  const handleCloseOrder = () => {
    setOrderAnchorEl(null);
  }
  
  const handleClose = () => {
    setAnchorEl(null);
  }
      /*acts like componentDidUpdate for selected index of menu*/
      useEffect(() => {
        if (selectedIndex === 0) {
          setFilter('None')
        } else if (selectedIndex === 1 && endpoint === 'search') {
          setFilter('Date')
        } else if (selectedIndex === 1) {
          setFilter('Section')
        } else if (selectedIndex === 2 && endpoint === 'search') {
          setFilter('Section')
        } else if (selectedIndex === 2) {
          setFilter('Results per page:')
        } else setFilter('Results per page:');
        setFiltInput('');
    }, [selectedIndex, endpoint]);

    useEffect(() => {
      handleOrder(order);
    }, [order, handleOrder]);

    /*acts like componentDidUpdate for inputvalidation/error*/
    useEffect(() => {
      if (errBool) {
        setError('Please choose a page size by selecting a number between 1-200');
      }
  }, [errBool]);

  return (
   <>
    <Paper component="form" className={classes.root} onKeyPress={(e) => { if (e.key === 'Enter') { e.preventDefault(); props.searchTable();}}}>
      <InputBase
        className={classes.input}
        placeholder={endpoint==='search'? 'Search for Content...' : endpoint==='tags' ? 'Search for Tags...': 'Search forEditions (US, UK, etc.)...'}
        inputProps={{ 'aria-label': 'search' }}
        fullWidth
        onChange={handleChange}
      />
      <IconButton className={classes.iconButton} aria-label="search" onClick={handleSearchButton}>
        <SearchIcon />
      </IconButton>
    </Paper>
    <Grid
           container
           alignItems='center'
           direction='row'
           width = '200vh'
           spacing={2}
       >
    <List component="nav" className={classes.filt} aria-label="Device settings">
        <ListItem
          button
          onClick={handleClickListItem}
          disabled={endpoint==='editions'}
        >
          <ListItemText primary="Filter By: " secondary={endpoint !== 'editions'? options[selectedIndex] : 'None'} disabled={endpoint==='editions'} />
        </ListItem>
      </List>
         <Grid item>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
      </Grid>
      <Grid item >
      <TextField
      className = {classes.textField}
      autoComplete='off'
      disabled={endpoint === 'editions' || filter ==='None'? true: false}
      value={filtInput}
      label={endpoint !== 'editions' && filter!=='Date'? filter : ''}
      type={filter ==='Date' ? 'date' : 'text'}
      placeholder={filter === 'Results per page: ' ? '# between 1-200': ''}
      inputProps={filter==='Date'? {maxLength:23}: {maxLength:100}}
      onChange={handleFiltChange}
      error={errBool && filter==='Results per page:' ? true : false}
      helperText={endpoint === 'editions' ? '' : errBool && filter ==='Results per page:' ? error : filter=== 'Date'?'Results will filter starting from selected date' : filter ==='Section' ? 'i.e. us news, environment, football, etc.': ''} />
      </Grid>
      <List component="nav" className={classes.opt} aria-label="Device settings">
        <ListItem
          button
          onClick={handleClickOrderListItem}
          disabled={endpoint==='editions'}
        >
          <ListItemText primary="Order By: " secondary={ordering[selectedOrderInd]} disabled={endpoint!=='search'} />
        </ListItem>
      </List>
         <Grid item>
      <Menu
        anchorEl={orderAnchorEl}
        keepMounted
        open={Boolean(orderAnchorEl)}
        onClose={handleCloseOrder}
      >
        {ordering.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedOrderInd}
            onClick={(event) => handleOrderClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
      </Grid>
      </Grid>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  filt: {
    width:'8%',
    marginRight: 0,
    padding: 0
  },
  opt: {
    width:'10%',
    marginLeft: 150,
    marginRight: 0,
  },
  textField: {
    width: '150%',
    marginLeft: 0,
  }
}));