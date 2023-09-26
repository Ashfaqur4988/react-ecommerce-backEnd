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

-> User M & C
Schema.Types.Mixed is a data type which is used to denote different data types in mongoose

1. fetchLoggedInUser, use findById and use projection to send only required data (not send password or sensitive data) for now sending all data
2. fetchLoggedInUserOrders
3. updateUser

->Auth only Controller & Routes
this will work on user model but only for Authentication

1. createUser, change the endpoint to auth in base path and /signup in router file from users
2. checkUser, User.findOne({search property}), //TODO: temporary for now

->Cart M, C routes
model: reference to the Product schema & reference to the User schema in product & user field respectively, quantity field will be a value

1. addToCart, post request, create new cart and fill the req.body with id of selected product, using populate here (populate = product), when we add an item to the cart we want the product field to be populated along the addition
2. fetchItemsById, populated the product field by the provided id and fetch the value (get), using populate here (populate = product)
   \*\*need to change in frontend for the reference because we stored everything in a flat manner in the frontEnd
3. updateCart, patch request, working fine, need to populate the result and after that send it

->Order M, C & routes
model:

1. addOrder,
2. fetchAllOrders,
3. fetchLoggedInUserOrders,
4. updateOrders

\*\*fixing some small errors:
in fetch product showing only products where deleted is not equals to true
order model change, items is object not array of mixed types
