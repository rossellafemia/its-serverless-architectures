'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const {create : todorichCreate} = require('./create');
const {list : todorichList} = require('./list');
const {get : todorichGet} = require('./get');
const {update: todorichUpdate} = require('./update');
const {delete : todorichDelete} = require('./delete');
const dynamoDb = new AWS.DynamoDB.DocumentClient();




module.exports.todorichhandler = (event, context, callback) => {
    switch (event.httpMethod) {
        case "POST":
            return todorichCreate(event, context, callback);            
        case "GET":
            if (event.pathParameters && event.pathParameters.id) {
                return todorichGet(event, context, callback); 
            }            
            return todorichList(event, context, callback);            
        case "PUT":
            return todorichUpdate(event, context, callback);        
        case "DELETE":
            return todorichDelete(event, context, callback);
    }
    
};