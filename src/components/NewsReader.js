import React, { useState, useEffect, useCallback} from 'react';
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
    const [tableResults, setTableResults] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
    const [columns, setColumns] = useState(() => { return ['Date Published:', 'Content Title:', 'Section Name:', 'Web URL:'] });
    const [pageSize, setPageSize] = useState(() => { return 9 });
    const [curPage, setCurPage] = useState(1);
    const [curResult, setCurResult] = useState(0);
    const [filter, setFilter] = useState('');
    const [options, setOptions] = useState(['None','Date','Section','Results per page']);
    var key = apiKey.guardianAPIKey;
    const apiURL=`https://content.guardianapis.com/${endpoint}?${filter}&page-size=${pageSize+1}&page=${curPage}&q=${query}&api-key=${key}`
    
       /*fetching data*/
       const getAxiosData = useCallback((apiURL) => {
        console.log('fetching...' + apiURL);
        if (query !== '') {
        axios.get(apiURL)
        .then(resp => {
        setTableResults(resp.data.response.results);
        setTotalResults(resp.data.response.total);
        console.log(resp.data.response.total);
        if (curPage === 1) {
            setCurResult(1);
        }
        });
        } else {
            setTableResults([]);
            setCurResult(0);
            setTotalResults(0);
            setCurPage(1);
        }
    }, [query, curPage])

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
        console.log(apiURL);     
      }, [apiURL, query, filter, getAxiosData]); 

    /*handler for endpoint buttons*/
    const handleButtons = (button) => {
        if (button === 'content') {
            setEndpoint('search');
            /*changing table columns based off of selected endpoint*/
            setColumns(['Date Published:', 'Content Title:', 'Section Name:', 'Web URL:'])
            setOptions(['None','Date','Section','Results per page']);
        }
        else if (button === 'tags') {
            setEndpoint('tags');
            setColumns(['Tags: ', 'Website Title:', 'Section Name:', 'Web URL:'])
            setOptions(['None', 'Section', 'Results per page:'])
        }
        else if (button === 'editions') {
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
        /*called when enter or search icon is clicked...
         was used in original implementation...redundant now*/
        const searchTable = () => {
            getAxiosData(apiURL);
          }

    const handleFilter = (filter, input) => {
        if (input === '') {
            setFilter('');
        }
        else if (filter==='Date') {
            setFilter(`from-date=${input}`)
        } else if (filter==='Section') {
            input = input.toLowerCase();
            input = input.replace(/\s/g, "-");
            setFilter(`section=${input}`)
        } else if (filter==='Results per page:') {
            setCurPage(1);
            setCurResult(1);
            setPageSize(input-1);
        } else setFilter('');
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
        <Typography variant ='h2' fontWeight='fontWeightBold'>The Guardian News Reader</Typography>
        </Grid>
        <Grid item xs={12} md={6} sm={3}>
        <Buttons handleButtons={handleButtons}></Buttons>
        </Grid>
        <Grid item xs='auto' md='auto' sm='auto'>
        <SearchBar query={query} endpoint={endpoint} handleInput={handleInput} handleFilter={handleFilter} searchTable={searchTable} options={options}/>
        </Grid>
        </Grid>
            <MyTable tableResults={tableResults} curResult={curResult} totalResults={totalResults} columns={columns} changePage={changePage} pageSize={pageSize}></MyTable> 
        </>
        
  )
 }

  export default NewsReader;