'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const {create : todo_richCreate} = require('./create');
const {list : todo_richList} = require('./list');
const {get : todo_richGet} = require('./get');
const {update: todo_richUpdate} = require('./update');
const {delete : todo_richDelete} = require('./delete');
const dynamoDb = new AWS.DynamoDB.DocumentClient();




module.exports.todo_richhandler = (event, context, callback) => {
    switch (event.httpMethod) {
        case "POST":
            return todo_richCreate(event, context, callback);            
        case "GET":
            if (event.pathParameters && event.pathParameters.id) {
                return todo_richGet(event, context, callback); 
            }            
            return todo_richList(event, context, callback);            
        case "PUT":
            return todo_richUpdate(event, context, callback);        
        case "DELETE":
            return todo_richDelete(event, context, callback);
    }
    
};