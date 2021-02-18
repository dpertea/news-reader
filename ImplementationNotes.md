## Implementation Notes

I had a great time exploring material-ui and playing around with this news reader. In the instructions.md you mentioned we would be doing all of our work in NewsReader.js... but I made a components folder with NewsReader as the 'parent' component and then made separate files for my other components. This may have been unnecessary (hopefully not disallowed though), and I may have over-complicated things with this, but I remembered doing this in class so that's how I choose to implement this project as well.

## Functionality

Most of the functionality was implemented simply by modifying the get request url depending on the options selected by the user.

### Endpoint Buttons:

(Buttons.js)
The default 'endpoint' is the /search endpoint since this seems to be the most useful. The 3 buttons at the top allow the user to choose whether they want to search for content (articles, blogs, etc.), specific tags on the website, or explore the different editions of the gaurdian (of which there are only 4 results total representing the US edition, UK edition, AU edition, and international edition). The columns of the table change depending on the endpoint that is pressed.

### Search Bar:

(SearchBar.js)
At first, I required the user to press the "search" icon button (or press enter) in order for the table to show the results. But upon closer inspection of the instructions I saw that the table should "automatically update" whenever the query changed so I assumed this actually meant I should update the table results "on Change" of input to the search bar. I also noticed that this is how https://open-platform.theguardian.com/explore seemed to operate so I tried to do the same. I thought it was a little strange to perform a get request with every letter typed, but I thought that fetching all possible results at once, storing them, and only then filtering through them, might take too long.

When there is nothing inputted in the search bar, no results show up (as opposed to all), since I thought this was more in-line with how a real search bar would work.

### Filter By:

(SeachBar.js)
On https://open-platform.theguardian.com/documentation/ I saw that there were many filter options for the /search and /tags endpoint. Because this was open ended, I chose to allow the user to filter by date, section, and page-size (results displayed per page in the table). For the results per page filter, I tried to do some minor input validation where the user can only pick a number between 1 and 200, otherwise the table results won't update and the textfield will flash red.

There were a lot of other options for filtering such as : 'production office', 'rights', or 'reference', but I personally thought these were pretty obscure options that wouldn't provide that much additional functionality to the user, but this could be dependant on the target audience. (As a user, I personally wouldn't know how to filter by references or rights for example)

I originally wanted to include a "filter by tags" option for the /search endpoint, but when testing some tags on the https://open-platform.theguardian.com/explore, I never seemed to manage to get any results to show up? It was as if they didn't have any tags on their content so every time I searched and filtered by tag, I got 0 results. For this reason, I chose not to provide this option in my filter functionality because it seemed pretty much guaranteed that the user would always get 0 results (although I may have missed something here).

Tags can only be filtered by section and results per page because they don't have a date associated with them the way content does, and for editions, the filter button is disabled because there are no filter options (and only 4 possible results).

### Order By:

(SearchBar.js)
The order by button is disabled for both the /tags and the /editions endpoint, but the user can order results by relevance and date(oldest or newest). The defult order is by relevance.

### Table pagination

(MyTable.js)
Because I wasn't fetching all the results at once from the server, but rather page by page, it made more sense to me to create my own table pagination, rather than using material UI's built in table pagination options, which seemed to require that you already have all the data. I chose to display the columns I felt were most important for each endpoint, all of which include the Website URL which should open in a new tab when clicked.

## Issues

On the last day of testing my code... I managed to exceed the daily API rate limit... so I may have approached this project the wrong way with all my get requests. I continued to test however with my key variable (in NewsReader.js) set to 'test', and that seemed to work just fine. Therefore, the key variable is currently set to 'test', but I left in the commented out original key variable.

In order for results to come up for some queries, the exact word needs to be typed, for example for "filter by: Section" if you just type "US" in the "section" filter, 0 results are returned, but if you type "US news" then many results are returned. Maybe I could have implemented my own "search" on top of the default search/filter provided by the get request to provide more user-friendly/expected functionality. (In general, I am just not a fan of how their searching seems to work)

Sometimes when you click the filter by/order by menus a warning pops up in the console log about findDOMNode being deprecated in StrictMode. Everything seems functional though, and because this seems to be coming from material-ui, I assume they will eventually resolve this issue with their components(?), otherwise I would choose different components or implementations that do not prompt this warning.

## Reflection

I seem to have accumulated an excessive amount of states, some of which I probably could have used variables for instead, and overall I think I probably could have simplified this code a lot. I also think I could have taken better advantage of asynchronous javaScript and used async/await axios requests. I saw that you can actually cancel axios requests and if I were to optimize this code, I would cancel requests where the user types the next key faster than the completion of the request in order to prevent unnecessary requests from being made and also make the table results display quicker. (there might be a delay now since a request is made with every letter typed).

Overall, I had fun, this was a great experience, and I would appreciate any feedback :)
