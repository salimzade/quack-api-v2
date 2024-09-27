import { GraphQLObjectType, GraphQLString } from 'graphql'

const TokenSchema = new GraphQLObjectType({
    name: 'Token',
    fields: {
        accessToken: { type: GraphQLString },
        refreshToken: { type: GraphQLString }
    }
})

export default TokenSchema
