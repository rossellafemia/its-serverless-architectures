'use strict';

const {create} = require('./create');
const {list} = require('./list');
const {get} = require('./get');
const {update} = require('./update');
const {delete: deleteTodoRich} = require('./delete');




module.exports.handler = (event, context, callback) => {
    switch (event.httpMethod) {
        case "POST":
            return create(event, context, callback);            
        case "GET":
            if (event.pathParameters && event.pathParameters.id) {
                return get(event, context, callback); 
            }            
            return list(event, context, callback);            
        case "PUT":
            return update(event, context, callback);        
        case "DELETE":
            return deleteTodoRich(event, context, callback);
    }
    
};