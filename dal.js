const MongoClient = require('mongodb').MongoClient;

// default port that is defined in the Docker Container
const urlMongoDB = 'mongodb://localhost:27017';

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

// create a new user
function create(name, email, password) {
    return new Promise((resolve, reject) => {
        ;
        const document = {name, email, password, balance: 0};
        const collection = db
            .collection(collectionName)
            .insertOne(
                document,
                {w:1},
                function(err, document) {
                console.log('Document inserted for ' + document + '. ' + 'Open the Studio 3T app and look for database named ' + dbName +' then collection named ' + collectionName)
                err ? reject(err) : resolve(document);
                }
            )
    })
}

function all() {
    return new Promise((resolve, reject) => {
        const allAccounts = db
            .collection(collectionName)
            .find({})
            .toArray(function(err, documents) {
                console.log('array of all documents = ',documents )
                err ? reject(err) : resolve(documents)
            });
    });

}

function login(email, password) {
    return new Promise((resolve, reject) => {
        const authorizedUser = db
            .collection(collectionName)
            .find({ email: email, password: password})
            .toArray(function(err, document) {
                console.log('array of logged in account document = ',document )
                err ? reject(err) : resolve(document)
            });
    });
}

// update balance
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
/*
collection.findOneAndUpdate(
    { "code": req.body.code },
    { $set: req.body.updatedFields },
    { returnOriginal: false },
    function (err, documents) {
        res.send({ error: err, affected: documents });
        db.close();
    }
);
*/


//export functions so that they can be used node.js express application.
module.exports = {create, all, login, depositOrWithdraw}