const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const mongoMod = require('./mongomod');

const port  = 3000;


app.use(bodyParser.json());

app.get('/nosql', (req,res)=>{
    let promise = new Promise((resolve,reject)=>{
        mongoMod.getAllDatabases(data => resolve(data));
    });
    promise.then((data)=>{
        console.log('resolved');
        console.log(data);
        if (data && data.databases.length) {
            let dbs = [];
            for (let db of data.databases) dbs.push(db.name);
            res.json({'databases': dbs});
        }
        else res.send("No available databases");
    });
});

app.get('/nosql/:database/collections',(req,res)=>{
    let promise = new Promise((resolve,reject)=>{
        mongoMod.getAllCollections(req.params['database'],data => resolve(data));
    });
    promise.then((data)=>{
        console.log('resolved');
        console.log(data);
        if (data && data.length) {
            let collections = [];
            for (let collection of data) collections.push(collection.name);
            res.json({'collections': collections});
        }
        else res.send("No available collections");
    });
});

app.get('/nosql/:database/collections/:collection',(req,res)=>{
    let promise = new Promise((resolve,reject)=>{
        mongoMod.getCollectionData(req.params['database'],req.params['collection'],data => resolve(data));
    });
    promise.then((data)=>{
        console.log('resolved');
        console.log(data);
        if (data && data.length) {
            res.send(data);
        }
        else res.send("No data available");
    });
});

app.get('/nosql/:database/collections/:collection/sort/:columnName/:sortType',(req,res)=>{
    let promise = new Promise((resolve,reject)=>{
        mongoMod.transformSort(req.params['database'], req.params['collection'], req.params['columnName'],
                               req.params['sortType'], data => resolve(data));
    });
    promise.then(data=>{
        console.log('resolved');
        console.log(data);
        if(data && data.length) res.send(data);
        else res.send('error while processing your request');
    });
});

app.get('/nosql/:database/collections/join/:collection1/:collection2/:columnName/:field',(req,res)=>{
    let promise = new Promise((resolve,reject)=>{
        mongoMod.transformJoin(req.params['database'], req.params['collection1'],
                               req.params['collection2'], req.params['columnName']
                               , req.params['field'], data=> resolve(data));
    });
    promise.then(data=>{
        console.log('resolved');
        console.log(data);
        if(data && data.length) res.send(data);
        else res.send('error while processing your request');
    });
});



app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})