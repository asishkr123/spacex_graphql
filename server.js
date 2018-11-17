const express = require('express');
const graphqlHTTP = require('express-graphql');
const app = express();
const schema = require('./schema')

app.use('/graphql' , graphqlHTTP({
    graphiql : true,
    schema,
}))


const PORT = process.env.PORT || 5000;

app.listen( PORT,() => {console.log('started')})



