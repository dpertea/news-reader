## Introduction  
The purpose of this exercise is to get you familair with the type of work you will be asked to perform regularly as part of the Dawn development team. Primarily the objective of this exercise is to demonstrate your understanding of how React applications work and interacting with a 3rd party data source (api). Unlike the projects you are used to completing for your course work, we will instead be giving you specfications and requirements to implement your solution. There are no automated tests provided or required. Rather try and do your best to implement the list of requirements below with the required libraries. 

### Requirements  
You will be doing all of your work in the `NewsReader.js` file which will serve as the component your application will need to render. The interace you will be implementing will consist of 2 primary fields - a search box and a table displaying the results of the search box. The search box you will be creating will be interacting with the Guardian News API. You have been provided the api key you will need to pass to your `GET` requests in the `apiKey.js` module inside of the source directory. Upon successful completion of a search, you will be displaying the results in a datatable. If you change the search query then the daatable should automatically update with the latest results. __HINT: If you are using a class component you will want to be thinking about state, and if you use functional components you will want to be thinking of hooks.__  If you are familiar with function components and hooks you should try and use those but if you are not go ahead and use class components.  
An example of a successful `GET` request using the api key you have been provided is as follows:  
```js  
axios.get('https://content.guardianapis.com/search?q=debates&api-key=0afba65e-8aae-4a46-bc72-9e351e236de1')
  .then(resp => {
    console.log(resp.data.response.results[0].webTitle)
  })
```
The searchbox only needs to respond to the following endpoints:  
`/search`  
`/tags`  
`/editions`  

For reference on how these endpoints work and what their options are here is a link to the official documentation:  
<https://open-platform.theguardian.com/documentation/>  

Additionally, we require you use material-ui for developing your style as well as any input and output components your UI requires. We have already included the dependencies for you in the application code so you can freely start using them. For additional documentation on material-ui go to here:  
<https://material-ui.com/>  

Lastly, when you are able to succesfully make a `GET` request, look at the data and decide the best way to represent it in a table form. You do not need to display all the fields from each object - only the ones you feel are necessary.

### Hints/Advice on how to get going
1.  Add the `NewsReader` component to your application stack and using the `componentDidMount` lifecyle event use the example axios call provided above and `console.log` its results. From there, add the search box and make sure if you enter the required string in there you get the same results from the hard coded example provided.  
2. Start with the `/search` endpoint first. If you can implement all 3, great, but if not do the best you can. We are not expecting you to work 40 hours on this. It is intended to get an idea of what your abilites are as well as what the work you will be asked to perform regularly will be like.  
3.  Be creative. Use the material-ui documentation to use whatever you feel you need to implememnt the required features.  
4. You are only making `GET` requests. Do not worry about any others.


### Submission and Deadlines
The due date for submitting is Thursday, February 18, 8PM EST. You will submit my pushing your code to gitlab. Additionally, please complete the `ImplementationNotes.md` file with what you were able to implememt and anything that gave problems.   
If you have any questions feel free to email me at <arasevic@cs.umd.edu>  
Good luck!