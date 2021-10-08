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
        _id: { type: GraphQLNonNull(GraphQLString) },
        title: { type: GraphQLNonNull(GraphQLString) },
        text: { type: GraphQLNonNull(GraphQLString) },
        users: {
            type: GraphQLList(UserType),
            resolve: (document) => {
                let test = get.docUsers(document._id);
                console.log("hej")
                return document.users
            }}
    })
})

module.exports = DocumentType;
