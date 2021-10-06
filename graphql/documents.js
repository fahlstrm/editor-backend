const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList
} = require('graphql');

const UserType = require("./users.js");

const DocumentType = new GraphQLObjectType({
    name: 'Document',
    description: 'A document created in editor',
    fields: () => ({
        title: { type: GraphQLNonNull(GraphQLString) },
        text: { type: GraphQLNonNull(GraphQLString) },
        users: {
            type: GraphQLList(UserType),
            resolve: (document) => {
                return document.users
            }}
    })
})

module.exports = DocumentType;
