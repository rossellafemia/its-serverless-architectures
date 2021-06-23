'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const {create : todosrichCreate} = require('./create');
const {list : todosrichrichList} = require('./list');
const {get : todosrichGet} = require('./get');
const {update: todosrichUpdate} = require('./update');
const {delete : todosrichDelete} = require('./delete');
const dynamoDb = new AWS.DynamoDB.DocumentClient();




module.exports.todosrichhandler = (event, context, callback) => {
    switch (event.httpMethod) {
        case "POST":
            return todosrichCreate(event, context, callback);            
        case "GET":
            if (event.pathParameters && event.pathParameters.id) {
                return todosrichGet(event, context, callback); 
            }            
            return todosrichList(event, context, callback);            
        case "PUT":
            return todosrichUpdate(event, context, callback);        
        case "DELETE":
            return todosrichDelete(event, context, callback);
    }
    
};