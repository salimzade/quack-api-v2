import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql'

const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        body: { type: GraphQLString },
        userId: { type: GraphQLString }
    }
})

export default PostType
