# Front End

- React components and libraries with boostrap for styling

# Back End

- Express Server

- Data Abstraction Layer

- MongoDB Atlas for deployed database that can be accessed from the Digital Ocean server.
    - Use Studio3T as a graphical interface for the database.
    - Docker to create an image for mongdb 

# Deployment with Virtual Machine

- Digital Ocean droplet as a Virtual Machine(VM) to store the apllication files and serve the application.

    - ubuntu as the language of the terminal for the VM
    - ngnix to take whats running on 3000 and proxy it to port 80.
    - PW2 is used for something.
    - Application is cloned from Github into the virtual machine.


## Bugs


```{ returnOriginal: false }``` returns the original document.

```{ returnDocument: "after" }``` returns the updated document

```
function depositOrWithdraw(email, amount){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection(collectionName)            
            .findOneAndUpdate(
                {email: email},
                { $inc: { balance: amount}},
                { returnDocument: "after" },
                function (err, document) {
                    console.log('$' + amount + 'to balance for ' + email + document.value.balance + ' Open the Studio 3T app and look for database named ' + dbName +' then collection named ' + collectionName)
                    //err ? reject(err) : affected(document);
                    err ? reject(err) : resolve(document)
                }
            )       
    });    
}
```

## Node.js Express Server

```npm init```

```npm install express```

```npm install cors```

## Video 27.18 - Database Introduction

## Video 27.19 - MongoDB Standalone

### Docker

```
# docker image for mongodb
# This image includes EXPOSE 27017 (the mongodb port),
# so standard container linking will make it
# automatically available to the linked containers
$ docker run -p 27017:27017 --name badbank -d mongo
```

```
docker ps
```

Refer to week-23-baseline README.md file for docker commands.

container = /badbank is already used.

try ```badbank-capstone``` for container name.

### MongoDB

```npm install mongodb```

```
// mong_test.js to test the database before connecting it to the node.js Express Server.
const MongoClient = require('mongodb').MongoClient;

// default port that is defined in the Docker Container
const urlMongoDB = 'mongodb://localhost:27017';

// connect to mongoDB with options defined by the npm package
MongoClient.connect(urlMongoDB, {useUnifiedTopology: true}, function(err, client){
    console.log('testing the connection - we are connected')

    //insert a document(unstructured data)

    // database name - if the database does not exist, then it is created

    const dbName = "mongo-test";
    const db = client.db(dbName);

    // create a new user

    const name = 'user' + Math.floor(Math.random()*10000);
    const email = name + '@mit.edu';

    // insert into "customers" collection

    const collectionName = 'customers'
    const collection = db.collection(collectionName);
    const doc = {name, email};
    collection.insertOne(doc, {w:1}, function(err, result) {
        console.log('Document inserted for ' + doc.name + '. ' + 'Open the Studio 3T app and look for database named ' + dbName +' then collection named ' + collectionName)
    });

    const data = db
        .collection(collectionName)
        .find()
        .toArray(function(err, documents) {
            console.log('array of documents = ',documents )

            // clean up by automatically closeing the database connection
            client.close();

    });
});
```

```node mongo_test.js``` to run the database server.

### Video 27.20 - Connect Express and MongoDB

Write a data abstraction layer (DAL) package so you can separate your database-specific code from your node application. If you decide to change databases in the future, the DAL will make it easy to update your code without major changes to the rest of the application. 

Here, you’ll use promises to wrap calls between the database, DAL, and front end. Write the Create Account route in the DAL along with the video, then develop the remaining routes on your own.

```
Calling the database on a separate server and we don't know when the server will respond. Wrap the call in a 'Promise' to reject or resolve the call.

```
//dal.js
function create(name, email, password) {
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');
        const doc = {name, email, password, balance: 0};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        })
    })
}
```
```
/*
The node.js express app calls the "create()" function that is located in dal.js and provides the parameters requied by that function. Then it takes the data logs to the console and also sends the data to the front end(res.send).
*/

// create user account
app.get('/account/create/:name/:email/:password', function (req, res) {
    dal.create(
        req.parmams.name,
        req.parmams.email,
        req.parmams.password
    ).then((user) => {
        res.send(user);
    });
});
```
After the dal.js mongoDB Promises and the index.js Express Routes are defined. Then run the express application from index.js.

```npm install nodemon```

update package.json so that you don't have to restart the server everytime you make a change. 

```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon index.js"
  },
```
```npm start```

### MongoDB login()

Querry the database 

```
//find item with staus = "A" AND quantity < 30
db.inventory.find( { status: "A", qty: { $lt: 30 } } )
```
```
//find user with matching email AND password
db.collection.find( { email: email, password: password } )
```

mongoDB updateOne to update the balance

```db.collection.updateOne(filter, update, options)```


```{ $set: { status: DLFL }``` Sets the value of a field in a document.

[Increase or decrease a quantity by a specific amount](https://www.mongodb.com/docs/manual/reference/operator/update/inc/)

```
db.products.updateOne(
   { sku: "abc123" },
   { $inc: { quantity: -2, "metrics.orders": 1 } }
)
```

```
db.collection.updateOne(
   { _id: id },
   { $inc: { balance: amount } }
)
```

# Deployment Failure - React App Fron End + AWS

```npm build``` if we have a create-react-app, then it will work

I don't have a create-react-app.

This was a dead end for me.

### AWS S3 Bucket

AWS was a dead end because I could not refactor my front end into the React App.

1. Build the static website with command shown in Video 20.4. These files will be uploaded to the S3 bucket.

2. Create an S3 bucket on AWS. Create account and creat S3 bucket instructions are provided in the links above. 

3. S3 Bucket Policy publicly accessible by following these steps: 
- Go to your S3 bucket and locate the “Permissions” tab
- Once on that tab, scroll down to the “Bucket Policy” section and click “edit”. Unselect ```Block Public Access```
- Paste the following JSON into the box, making sure you change to your actual bucket name

Bucket name = ```mark-dohle-xpro-capstone```

```
{
    "Version": "2008-10-17",
    "Statement": [
        {
            "Sid": "AllowPublicRead",
            "Effect": "Allow",
            "Principal": {
                "AWS": "*"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::mark-dohle-xpro-capstone/*"
        }
    ]
}
```

## IAM

AWS was a dead end because I could not refactor my front end into the React App.

You have to be logged in with an IAM account with privilages. It does not seem like the root user can edit s3 buckets.

Alias: astros2017
Password: secret
MFA

## create-react-app

AWS was a dead end because I could not refactor my front end into the React App.

Create a React App to help deploy static files to AWS S3 Bucket.

```npx create-react-app mark-dohle-s3-deploy```

Inside that directory, you can run several commands:

  ```npm start```
    Starts the development server. The server automatically refreshes the page when an edit is made to App.js.

  ```npm run build```
    Bundles the app into static files for production.

  ```npm test```
    Starts the test runner.

  ```npm run eject```
    Removes this tool and copies build dependencies, configuration files
    and scripts into the app directory. If you do this, you can’t go back!

# Deployment Success - Mongodb, Express, React(not react app), Node JS.

- The public folder has all the front end components plus the html file with the babel, react and bootstrap libraries. The index.js has the single page application Spa(). The Spa() component performs 3 important tasks.

1. Routing to each component. These routes are used by clicking on the NavBar or typing them directly.

2. Context provider keeps track of who is is logged in. This information is used by the other components to ensure that user sees his and manipulates own account. The information also enables the appropriate Navbar links based on login status. This ensures that only authenticated users have authorization to access the information.

3. Render the components to the DOM so that the user can see the forms.

- The Express Server communicates between the front end application in the 'public' directory and the './dal.js'.

The

```
const express = require('express');
const app=express();
const cors=require('cors');

// require access to the functions exported in dal.js
const dal =require('./dal.js');

// used to serve static files from the public directory
app.use(express.static('public'));
app.use(cors());
```

Fill in between with app.get functions. These are discussed above in the section titled "Video 27.20 - Connect Express and MongoDB"

```
const port = 3000;
app.listen(port);
console.log('Running on port: ' + port);
```

- Create Data Abstraction Layer and deploy MongoDB with Atlas Graphical User Interface(GUI)

The data abstraction layer communicates between MongoDB and the Express Server. This communication is all good, but unless MongoDB is deployed to server that can be acessed by users from around the world, it is just a toy. 

After you get the app to work locally with ```const urlMongoDB = 'mongodb://localhost:27017';```. Create a Mongo DB Atlas account and follow the [quick start guidelines](https://www.mongodb.com/docs/atlas/getting-started/) to create an Organization, Project, Cluster, Database and Collection. The Atlas instructions are ouutdated like everything else. That is why I list the goal below. Just target the goal. You delete projects and organizations easily. You can restart many times if you mess up.

The GOAL of this process to get the following inputs for your dal.js.

1. Database Name

let collectionName ='users'
```const dbName = "badbank-capstone";```

2. Collection Name

```let collectionName ='users'```

3. Cluster username and password. At Database Deployments, you need to copy the URL to connect to you database. Hide the local URL and copy in the deployed URL. 

Hide the local: ```//const urlMongoDB = 'mongodb://localhost:27017';```

Copy in the deployed(note that you need to remember your cluster username and password. It can be reset at "Database Access" link): ```const urlMongoDB = "mongodb+srv://<username>:<password>@gettingstarted.nyxky3k.mongodb.net/?retryWrites=true&w=majority";```

***Important Note***

You have to provide the IP address for the server that will be requesting access the database. You might not know this if you are just learning. There is a cheat code for this that allows acess from all servers. IP = ```0.0.0.0/0```. A list of IP addresses is stored for your cluster at the "Network Access" link.

***End of important note**

```
const MongoClient = require('mongodb').MongoClient;
// default port that is defined in the Docker Container
const urlMongoDB = "mongodb+srv://<username>:<password>@gettingstarted.nyxky3k.mongodb.net/?retryWrites=true&w=majority";
//const urlMongoDB = 'mongodb://localhost:27017';
// db has to be accessible to all calls
let db = null;
let collectionName ='users'
const dbName = "badbank-capstone";

// connect to mongoDB with options
MongoClient.connect(urlMongoDB, {useUnifiedTopology: true}, function(err, client){
    console.log('testing the connection - we are connected')

    // database name - if the database does not exist, then it is created
    db = client.db(dbName);
    
});
```
- After your application works locally with MongoDB deployed through Atlas, then deploy to Digital Ocean.

1. Create a github repository for your project. Exclude the node_modules. They take up to much space and can be reacreated easily from your package.json file with ```npm install```.

2. Create a Digital Ocean Account and create a droplet in Digital Ocean. Pricing is confusing, but it seems like is based on use with a monthly cap.

- Choose "ubuntu" so that commands are familar to mac users.

- Set up SSH key so that you can log into the Digital Ocean virtual machine.

- Inside your droplet, the there is a ```Consule``` like. This takes you to the Terminal for your virtual machine. You are the "root" user.

- Install Node.js to the root of your virtual machine.

[Set Up a Node.js Application for Production on Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-20-04)

```cd ~```

```curl -sL https://deb.nodesource.com/setup_14.x -o nodesource_setup.sh```

```sudo bash nodesource_setup.sh```

```sudo apt install nodejs```

- Set up your directory by cloning your GitHub repository. 

[LearnWithJason](https://www.learnwithjason.dev/blog/deploy-nodejs-ssl-digitalocean)

Use this link and skip down to the "Install Git" intructions.

```sudo apt-get install git```

Scroll down again to the "Clone the app" instructions.

```mkdir apps```

```cd apps/```

copy the "HTTP" address option from you repository on Github.

```git clone <your github http link>```

cd into your app

```npm install``` to get the node_modules directory.

```npm install nodemon``` to get nodemon working...if you included it for ```npm start```.

The app now runs on localhost 3000 of your virtual machine.

- Install Nginx to force your VM server to show the app to anyone with the web address. Port 80 runs on http. Take whats running on 3000 and proxy it to port 80. What does that mean?

[How To Install Nginx on Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04)

```sudo apt update```

```sudo apt install nginx```

```sudo ufw allow 'Nginx HTTP'```

- Install PM2. Go back to this resource and follow step 3. Use "root" instead of "sammy". Your are doing this inside your 

[Set Up a Node.js Application for Production on Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-20-04)

```sudo npm install pm2@latest -g```

```pm2 start <your server file>```

```pm2 startup systemd```

```sudo systemctl start pm2-root```

```sudo nano /etc/nginx/sites-available/default```

```sudo systemctl restart nginx```

Within the server block, you should have an existing location / block. Replace the contents of that block with the following configuration. If your application is set to listen on a different port, update http://localhost:3000 to the correct port number: 3000, 3001, etc

```
server {
...
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
...
}
```











