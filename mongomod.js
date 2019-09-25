const MongoClient = require('mongodb').MongoClient;
var port = 27017;
var url = "mongodb://localhost:"+port;

const csv = require('csvtojson');
let customerCsv = 'customers.csv';
let ordersCsv = 'orders.csv'


 module.exports.getAllDatabases = function (callback){
    MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology:true},(err,db)=>{
    if (err) throw err;
    let adminDb = db.db('admin');
    adminDb.admin().listDatabases((err,result)=>{
        if (err) throw err;
        // console.log('mongomod',result);
        db.close();
        callback(result);
    });
  });
}

module.exports.getAllCollections = function (dbName,callback) {
 MongoClient.connect(url,{useNewUrlParser: true},(err,db)=>{
    if(err) throw err;
    let dbObj = db.db(dbName);
    dbObj.listCollections().toArray((err,result)=>{
        if (err) throw err;
        // console.log(result);
        db.close();
        callback(result);
    })
 });
}

module.exports.createCustomerCollection = function (){
    csv().fromFile(customerCsv).then(customerJson=>{
        MongoClient.connect(url,{useNewUrlParser: true},(err,db)=>{
            if (err) throw err;
            let dbObj = db.db('busigence');
            dbObj.collection('customers').insertMany(customerJson,(err,res)=>{
                if(err) throw err;
                console.log('data inserted in customer collection');
                db.close();
            });
        });
    });
}

// createCustomerCollection();

module.exports.createOrderCollection = function (){
    csv().fromFile(ordersCsv).then(orderJson=>{
        MongoClient.connect(url,{useNewUrlParser: true}, {useUnifiedTopology: true},(err,db)=>{
            if(err) throw err;
            let dbObj = db.db('busigence');
            dbObj.collection('orders').insertMany(orderJson,(err,res)=>{
                if(err) throw err;
                console.log('data inserted in orders collection');
                db.close();
            });
        });
    });
}

// createOrderCollection();

module.exports.getCollectionData = function (dbName,collectionName,callback){
    MongoClient.connect(url,{useNewUrlParser:true},(err,db)=>{
        if(err) throw err;
        let dbObj = db.db(dbName);
        dbObj.collection(collectionName).find({}).toArray((err,res)=>{
            if(err) throw err;
            db.close();
            callback(res);
        });
    });
}


module.exports.transformSort = function (dbName,collectionName,columnName,sortingType,callback){
    MongoClient.connect(url,{useNewUrlParser:true, useUnifiedTopology: true},(err,db)=>{
        if(err) throw err;
        let dbObj = db.db(dbName);
        dbObj.collection(collectionName).find().sort({[columnName]:parseInt(sortingType)}).toArray((err,res)=>{
            if (err) throw err;
            console.log(`${collectionName} sorted based on column ${columnName}`);
            db.close();
            callback(res);
        });
    });
}

module.exports.transformJoin = function (dbName,collectionOne,collectionTwo,columnName,aggregateFieldName,callback){
    MongoClient.connect(url,{useNewUrlParser:true},(err,db)=>{
        if (err) throw err;
        let dbObj = db.db(dbName);
        dbObj.collection(collectionOne).aggregate([{
            $lookup:{
                from: collectionTwo,
                localField: columnName,
                foreignField: columnName,
                as: aggregateFieldName
            }
        }
    ]).toArray((err,res)=>{
        if(err) throw err;
        console.log(`${collectionOne} joined with ${collectionTwo} on ${columnName}`);
        db.close();
        callback(res);
       });
    });
}



