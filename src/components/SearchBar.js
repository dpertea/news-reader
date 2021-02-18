/*contains the search bar, as well as the filter option menu and the textfield input for filtering*/ 
import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { List, ListItem, ListItemText, MenuItem, Menu, TextField, Grid } from '@material-ui/core';

const options = [
  'None',
  'Date',
  'Tags',
  'Results per page',
];

export default function SearchBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filtInput, setFiltInput] = useState('');
  const [filter, setFilter] = useState('None');
  const [error, setError] = useState('');
  const [errBool, setErrBool] = useState(false);

  const handleFiltChange = (e) => {
    const {target: {value}} = e;
    setFiltInput(value);
    if (filter === 'Results per page:') {
      let val = Number(value);
      if (!(val >= 1 && val <= 200) && value != '') {
        setErrBool(true);
      } else setErrBool(false);
    }
  }

  const handleChange = (e) => {
    let i = e.target.value.toLowerCase();
    let input = encodeURI(i);
    props.handleInput(input);
  } 
const handleSearchButton = () => {
  props.searchTable();
  } 

  const handleClickListItem = (e) => {
    setAnchorEl(e.currentTarget);
  }
  
  const handleMenuItemClick = (e, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    setErrBool(false);
  }
  
  const handleClose = () => {
    setAnchorEl(null);
  }
      /*acts like componentDidUpdate for selected index of menu*/
      useEffect(() => {
        if (selectedIndex === 0) {
          setFilter('None')
        } else if (selectedIndex === 1) {
          setFilter('Date')
        } else if (selectedIndex === 2) {
          setFilter('Tags')
        } else setFilter('Results per page:');
        setFiltInput('');
    }, [selectedIndex]);

    /*acts like componentDidUpdate for inputvalidation/error*/
    useEffect(() => {
      if (errBool) {
        setError('Please select a # between 1-200');
      }
  }, [errBool]);

  return (
   <>
    <Paper component="form" className={classes.root} onKeyPress={(e) => { if (e.key === 'Enter') { e.preventDefault(); props.searchTable();}}}>
      <InputBase
        className={classes.input}
        placeholder={props.searchOption}
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
        >
          <ListItemText primary="Filter By: " secondary={options[selectedIndex]} />
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
      disabled={filter ==='None'? true: false}
      value={filtInput}
      label={filter!=='Date'? filter : ''}
      type={filter ==='Date' ? 'date' : 'text'}
      placeholder={filter === 'Results per page: ' ? '# between 1-200': ''}
      inputProps={filter==='Date'? {maxLength:23}: {maxLength:100}}
      onChange={handleFiltChange}
      error={errBool && filter==='Results per page:' ? true : false}
      helperText={errBool && filter ==='Results per page:' ? error : filter=== 'Date'?'Results will filter starting from selected date' : ''} />
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
    width: 1010
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  filt: {
    width:'10%'
  },
  textField: {
    width: '150%'
  }
}));