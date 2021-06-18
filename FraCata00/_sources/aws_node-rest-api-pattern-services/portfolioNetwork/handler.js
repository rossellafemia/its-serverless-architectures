'use strict';

const ID = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const {create : portflioNetworkCreate} = require('./create');
const {list: portflioNetworkList} = require('./list');
const {get : portflioNetworkGet} = require('./get');
const {update: portflioNetworkUpdate} = require('./update');
const { delete: portflioNetworkDelete} = require('./delete');
const dynamoDb = new AWS.DynamoDB.DocumentClient();




module.exports.todoshandler = (event, context, callback) => {
    switch (event.httpMethod) {
        case "POST":
            return portflioNetworkCreate(event, context, callback);
        case "GET":
            if (event.pathParameters && event.pathParameters.id) {
                return portflioNetworkGet(event, context, callback);
            }            
            return portflioNetworkList(event, context, callback);
        case "PUT":
            return portflioNetworkUpdate(event, context, callback);
        case "DELETE":
            return portflioNetworkDelete(event, context, callback);
    }
    
};