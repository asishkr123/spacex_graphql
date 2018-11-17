const {GraphQLObjectType,GraphQLString , GraphQLInt , GraphQLList,GraphQLBoolean , GraphQLSchema , GraphQLID} =  require('graphql')
const axios = require('axios');



const LaunchType = new GraphQLObjectType({
    name : 'Launch',
    fields : () => ({
        flight_number : {type : GraphQLInt},
        mission_name :  {type : GraphQLString},
        launch_year :   {type : GraphQLString},
        launchdate_local :   {type : GraphQLString},
        launch_success :   {type : GraphQLBoolean},
        rocket :   {type : RocketType},
        details : {type : GraphQLString},



    })
})



const RocketType = new GraphQLObjectType({
    name : 'Rocket',
    fields : () => ({
        rocket_id : {type : GraphQLID},
        rocket_name :  {type : GraphQLString},
        rocket_type :   {type : GraphQLString},
    })
})

const RootQuery = new GraphQLObjectType({
    name : "RootQueryType",
    fields : {
        launches : {
            type  : new GraphQLList(LaunchType),
            resolve(parent,args){
            return axios.get('https://api.spacexdata.com/v3/launches')
                   .then(res => res.data)
            }
        },
        launch : {
            type : LaunchType,
            args : {
                flight_number : {type : GraphQLInt}
            },
            resolve(parent,args){
                return axios.get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
                       .then(res => res.data);
            }
        },
        rockets : {
            type  : new GraphQLList(RocketType),
            resolve(parent,args){
            return axios.get('https://api.spacexdata.com/v3/rockets')
                   .then(res => res.data)
            }
        },
        rocket : {
            type  : new GraphQLList(LaunchType),
            args  : {
                id : {type : GraphQLID}
            },
            resolve(parent,args){
            return axios.get(`https://api.spacexdata.com/v3/${args.id}`)
                   .then(res => res.data)
            }
        },
        
    }
})


module.exports = new GraphQLSchema({
    query : RootQuery,
})