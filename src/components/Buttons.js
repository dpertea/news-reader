import React, {useState} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {ToggleButtonGroup, ToggleButton} from '@material-ui/lab'

  export default function Buttons(props) {
    const [press, setPress]= useState('content');
    const handlePress = (e, newPress) => {
        setPress(newPress);
        props.handleButtons(newPress);
    }
    return (
     <>
    <ToggleButtonGroup exclusive value={press} color='rgb(0,50,120)' thumbstyle='rgb(0,50,120)' trackstyle='rgb(0,50,120)' aria-label='choose your search' onChange={handlePress}>
    <StickyButton thumbstyle='rgb(0,50,120)' trackstyle='rgb(0,50,120)' value='content'>Search for Content</StickyButton>
    <StickyButton value='tags'>Search for Tags</StickyButton>
    <StickyButton value='editions'>Search for Editions</StickyButton>
     </ToggleButtonGroup>
     </>
    );
  }

  /*styling*/
  const StickyButton = withStyles({
    root: {
      boxShadow: 'none',
      textTransform: 'none',
      fontSize: 16,
      padding: '6px 36px',
      lineHeight: 1.5,
      color: 'rgb(0,100,120)',
      '&:hover': {
        backgroundColor: 'rgba(0,50,120,.2)',
        boxShadow: 'none',
      },
      '&:active': {
        boxShadow: 'none',
        backgroundColor: 'rgba(0,50,120,.5)',
        borderColor: 'primary',
      },
      '&:focus': {
        backgroundColor: 'rgba(0,50,120,.2)',
      },
      '&:blur': {
        backgroundColor: 'rgba(0,50,120,.2)',
      },
    },
  })(ToggleButton);