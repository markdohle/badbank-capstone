# Back End Video 27.16

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

## Deployment - Video 20-5 thru

```npm build``` if we have a create-react-app, then it will work

I don't have a create-react-app

### AWS S3 Bucket

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

You have to be logged in with an IAM account with privilages. It does not seem like the root user can edit s3 buckets.

Alias: astros2017
Password: secret
MFA

## create-react-app

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



