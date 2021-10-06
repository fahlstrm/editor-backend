const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    // GraphQLInt,
    // GraphQLNonNull
} = require('graphql');

const documents = require("../src/get.js");
const users = require("../src/users.js");

const DocumentType = require('./documents');
const UserType = require('./users');

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        document: {
            type: DocumentType,
            description: 'Get one document',
            args: {
                id: { type: GraphQLString }
            },
            resolve: async function(parent, args) {
                let documentArray = await documents.all()

                return documentArray.find(doc => doc.id === args.id);
            }
        },
        documents: {
            type: GraphQLList(DocumentType),
            description: 'List of available documents',
            resolve: async function() {
                return await documents.all();
            }
        },
        users: {
            type: GraphQLList(UserType),
            description: 'List of available users',
            resolve: async function() {
                return await users.getAllUsers();
            }
        },
        user: {
            type: UserType,
            description: 'Get one user',
            args: {
                username: { type: GraphQLString }
            },
            resolve: async function (parent, args) {
                let usersArray = await users.getUser(username);

                return usersArray.find(user => user.username === args.username)
            }
        },
    })
});

module.exports = RootQueryType;
