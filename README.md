# busigence-assignment
- The back-end is in node.js, with MongoDB used as DBMS
- The front-end is in Angular 7. 
---
### File structure
- Data layer: mongomod.js
- Business Logic layer: app.js
---
To start angular dev server hit [localhost:4200]
---
### run npm install to download all the required dependencies.
### Enter npm start to start the server. Server endpoints accessible at [localhost:3000]
---
API information:
- To retrieve all the databases, hit /nosql endpoint.
- To retrieve all the collections in a database for eg: busigence, hit /nosql/busigence/collections.
- To retrieve all the documents in a collection eg: customers in busigence db, hit /nosql/busigence/collections/customers.
- To retreive all the sorted documents based on a column name eg: CustomerID in customers collection, hit /nosql/busigence/collections/customers/sort/CustomerID/1, here 1 is to sort in ascending order. To sort in descending order replace 1 with -1.
- To retrieve the documents joined using collection a and collection b, on column name and store it in a field, eg: joining Customers and Orders collection on CustomerID, and store the join in orders field hit  /nosql/busigence/collections/join/Customers/Orders/CustomerID/orders.
---
