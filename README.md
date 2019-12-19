# Description
This application is built using MongoDB, Express and Node.js.

## Set Up
Before running this application, you need to set up and download necessary frameworks to view the 
website.

### First Step
If you do not have node.js installed, download node.js from this [link](https://nodejs.org/en/).
If you do not have mongodb installed, download mongodb from this [link](https://www.mongodb.com/).

### Second Step
#### `git clone https://github.com/Zerro97/Blog.git`
Run this command in the directory that you want to download the application to

### Third Step
#### `npm install`
In the root directory (./) run the above command. This will download all the depenedencies from
package.json file. These are the libraries used to build the applciation.

## Running
Now the set up is done, it's time to run the application.

### First Step
Open up two separate consoles.

### Second Step
#### `mongod`
On one of the console run the above command. This will start the mongodb local database. This is needed for persistant data

### Third Step
#### `npm start`
On the other console run the above command. This will start the server at localhost:3000