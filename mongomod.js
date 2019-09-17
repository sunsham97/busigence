const MongoClient = require('mongodb').MongoClient;
var port = 27017;
var url = "mongodb://localhost:"+port;

const csv = require('csvtojson');
let customerCsv = 'customers.csv';
let ordersCsv = 'orders.csv'


function getAllCollections() {
 MongoClient.connect(url,(err,db)=>{
    if(err) throw err;
    let dbObj = db.db('busigence');
    dbObj.listCollections().toArray((err,result)=>{
        if (err) throw err;
        console.log(result);
        db.close();
        return result;
    })
 });
}

function createCustomerCollection(){
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

function createOrderCollection(){
    csv().fromFile(ordersCsv).then(orderJson=>{
        MongoClient.connect(url,{useNewUrlParser: true},(err,db)=>{
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

function getCollectionData(collectionName){
    MongoClient.connect(url,{useNewUrlParser:true},(err,db)=>{
        if(err) throw err;
        let dbObj = db.db('busigence');
        dbObj.collection(collectionName).find({}).toArray((err,res)=>{
            if(err) throw err;
            db.close();
            return res;
        });
    });
}


function transformSort(collectionName,columnName,sortingType){
    MongoClient.connect(url,{useNewUrlParser:true},(err,db)=>{
        if(err) throw err;
        let dbObj = db.db('busigence');
        dbObj.collection(collectionName).find().sort({[columnName]:sortingType}).toArray((err,res)=>{
            if (err) throw err;
            console.log(`${collectionName} sorted based on column ${columnName}`);
            db.close();
            return res;
        });
    });
}

function transformJoin(collectionOne,collectionTwo,columnName,aggregateFieldName){
    MongoClient.connect(url,{useNewUrlParser:true},(err,db)=>{
        if (err) throw err;
        let dbObj = db.db('busigence');
        dbObj.collection(collectionOne).aggregate([{
            $lookup:{
                from: collectionTwo,
                localField: columnName,
                foreignField: columnName,
                as: aggregateNameField
            }
        }
    ]).toArray((err,res)=>{
        if(err) throw err;
        console.log(`${collectionOne} joined with ${collectionTwo} on ${columnName}`);
        db.close();
        return res;
       });
    });
}



