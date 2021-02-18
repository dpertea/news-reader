import React, { useState, useEffect} from 'react';
import apiKey from './apiKey';
import {Grid, Typography} from '@material-ui/core';
import SearchBar from './SearchBar';
import MyTable from './MyTable';
import Buttons from './Buttons';
const axios = require('axios');
/* my "parent" component that renders all the other components */

function NewsReader() {
    const [endpoint, setEndpoint] = useState('search');
    const [query, setQuery] = useState('');
    const [searchOption, setSearchOption] = useState('Search for Content...');
    const [tableResults, setTableResults] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
    const [columns, setColumns] = useState(() => { return ['Date Published:', 'Content Title:', 'Section Name:', 'Web URL:'] });
    const [pageSize, setPageSize] = useState(() => { return 9 });
    const [curPage, setCurPage] = useState(1);
    const [curResult, setCurResult] = useState(0);
    const [filter, setFilter] = useState('');
    var key = apiKey.guardianAPIKey;
    const apiURL=`https://content.guardianapis.com/${endpoint}?page-size=${pageSize+1}&page=${curPage}&q=${query}&api-key=${key}`
    
    /*acts like componentDidUpdate*/
    useEffect(() => {
        if (query === '') {
                setTableResults([]);
                setCurResult(0);
                setTotalResults(0);
                setCurPage(1);
        } else {
            getAxiosData(apiURL);   
        }     
      }, [apiURL]);

    /*handler for endpoint buttons*/
    const handleButtons = (button) => {
        if (button === 'articles') {
            setSearchOption('Search for Content...');
            setEndpoint('search');
            /*changing table columns based off of selected endpoint*/
            setColumns(['Date Published:', 'Content Title:', 'Section Name:', 'Web URL:'])
        }
        else if (button === 'tags') {
            setEndpoint('tags');
            setSearchOption('Search for specific tags...');
            setColumns(['Tags: ', 'Website Title:', 'Section Name:', 'Web URL:'])
        }
        else if (button === 'editions') {
            setSearchOption('Search for editions (US, UK, etc.)...');
            setEndpoint('editions');
            setColumns(['Edition:', 'Website Title:', 'Path:', 'Web URL:'])
        }
    }
    /*handler for searchbar*/
    const handleInput = (input) => {
        setQuery(input);
    }

    const changePage = (nav) => {
        if (nav === 'next' && curResult + pageSize < totalResults) {
            setCurPage(curPage + 1)
            setCurResult(curResult + pageSize + 1);
        } else if (nav === 'prev' && curResult !== 0) {
            setCurResult(curResult - pageSize)
            setCurPage(curPage - 1)
        } 
    }
        /*called when enter or search icon is clicked, was used in original implementation..kind of redundant now*/
        const searchTable = () => {
            getAxiosData(apiURL);
          }
    /*fetching data*/
    const getAxiosData = apiURL => {
        axios.get(apiURL)
        .then(resp => {
        setTableResults(resp.data.response.results);
        setTotalResults(resp.data.response.total);
        console.log(resp.data.response.total);
        if (resp.data.response.results.total === 0) {
            setCurResult(0);
        } 
        if (curPage === 1) {
            setCurResult(1);
        }
        });
    }

  return (
      <>
      <Grid 
            container
            justify='center'
            alignItems='center'
            direction='column'
            width = '200vh'
            spacing={2}
        >
        <Grid item xs='auto' md='auto'>
        <Typography variant ='h2' justify='center' text-align='center' fontWeight='fontWeightBold'>The Guardian News Reader</Typography>
        </Grid>
        <Grid item xs={12} md={6} sm={3}>
        <Buttons handleButtons={handleButtons} searchTable={searchTable}></Buttons>
        </Grid>
        <Grid item xs='auto' md='auto' sm='auto'>
        <SearchBar query={query} endpoint={endpoint} searchOption={searchOption} handleInput={handleInput} searchTable={searchTable}/>
        </Grid>
        </Grid>
            <MyTable tableResults={tableResults} curResult={curResult} totalResults={totalResults} columns={columns} changePage={changePage} pageSize={pageSize}></MyTable> 
        </>
        
  )
 }

  export default NewsReader;