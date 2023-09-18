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
