'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const {create : todosRichCreate} = require('./create');
const {list : todosRichList} = require('./list');
const {get : todosRichGet} = require('./get');
const {update: todosRichUpdate} = require('./update');
const {delete : todosRichDelete} = require('./delete');
const dynamoDb = new AWS.DynamoDB.DocumentClient();




module.exports.todosrichhandler = (event, context, callback) => {
    switch (event.httpMethod) {
        case "POST":
            return todosRichCreate(event, context, callback);            
        case "GET":
            if (event.pathParameters && event.pathParameters.id) {
                return todosRichGet(event, context, callback); 
            }            
            return todosRichList(event, context, callback);            
        case "PUT":
            return todosRichUpdate(event, context, callback);        
        case "DELETE":
            return todosRichDelete(event, context, callback);
    }
    
};