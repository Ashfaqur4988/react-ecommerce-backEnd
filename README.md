# react-ecommerce-backEnd

initialize a node project npm init
installed nodemon for realtime update in server
made index.js

in packg json inside script, start: 'node index.js' this will start the app when we are in the prod server, this is the entry point
dev: 'nodemon index.js' in dev server this is the entry point

UPDATE THE NODE AND NPM:
installed nodemon
reinstalled node to latest version
installed latest npm version (npm install -g npm)
installed mongodb compass GUI

Making a server:
use express to make a listener, specify the port and log to see

Connecting to mongo with mongoose:
inside a try and catch block put the connection code from mongoose doc, a console log and in catch put the error part
also from the GUI connect to the local database
a data folder for development purpose
start mongo db -> mongod dbpath folderName

installed express
installed mongoose

Follow the MVC convention
created Model folder where there will be the structure of the data
created Controller folder where the CRUD operations of the models will be

inside Model: product js file contains the schema, structure of the collections (tables)
inside Controller: the actions to create read update and delete operations

VIRTUAL: this is calculated at the run time to get some virtual fields which we need to send in the frontend

Routes folder: to attach a particular controller to any path / endpoint
we exported it to the index js where it will be used as middleware

-> Replicate all the api in the productApi into this backend
-> Every CONTROLLER needs to be attached with a Route

Cross-origin resource sharing (CORS) is a browser mechanism which enables controlled access to resources located outside of a given domain. (pagination problem solved by exposing headers in cors func)

-> Product M & C

1. fetchAllProductsByFIlter is written as fetchAllProducts in controller, where all the query strings are provided and we run the exec function to execute it
   then we chained the path in the route folder, products file .get("/", fetchAllProduct)
   made another query for total count, replicating it in every other query then at the end shall count the total from it
   sending the header X-Total-Count
2. fetchProductById (to get the id we used req.params, it is a feature in express that will give us the parameter from the url)
3. updateProduct, findByIdAndUpdate(id, req.body, {new: true}) for patch method, new:true is to get the latest document
4. addProduct, req.body to get the data & use .save() function

-> Category M & C
inside the Controller, write the api for categories and added in the index js

1. fetchAllCategories
2. createCategories (post method) use .save() function

-> Brand M & C
inside the Controller, write the api for brands and added in the index js

1. fetchAllBrands
2. createBrands (post method) use .save() function

Using Mongo db compass GUI we imported all the product, brand & category data (generally this process will bypass the mongoose schema so we should not use it)
