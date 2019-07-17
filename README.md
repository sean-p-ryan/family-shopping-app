This shopping app is designed to let a family of shoppers keep track of what they are purchasing when they go to the store. The application lets users create new items that need to be purchased, set a max budget for each item, indicate who is responsible for purchasing each item, and mark each item as purchased or not purchased. 

**FRONT-END**

The front-end is built with React, bootstrapped with the `create-react-app` command. I chose this framework because I felt that a component-based architecture would accommodate ease of routing and rendering the views for the item list and editing individual items. I also wanted to take advantage of component state to easily pass data between components and display data updates in real time. 

**SERVER**

The server is built with Node and Express. I selected Node because I am familiar with building API endpoints with the Node runtime and Express framework for handling HTTP requests and generate responses, which would be necessary for performing CRUD operations on the database. 

**HTTP REQUESTS**

I installed Axios and used it in my client-side methods to send HTTP requests to the server. 

**DATABASE**

For the database, I chose MongoDB and the Mongoose framework to handle querying. I selected a JSON-based database because I prefer working with data in JSON objects rather than relational tables. I also feel that Mongoose offers more intuitive methods for data querying than SQL-based ORMs. 

I did have difficulty implementing update and delete functions with Mongoose methods, however, and some functionality is not working as intended at present. For instance, the update function creates a new item with the updated item instead of replacing the item intended for update. 

**DEPLOYMENT**

I deployed the application on Heroku, using mLab for hosting a production database. 

**LOCAL SETUP**

Clone the repo and run `npm install` in both the root and `client` directories. 

Run `heroku local` or `npm start` in the root directory to start the server on localhost:4000, and `npm start` in the `client` directory to run the React app on localhost:3000.