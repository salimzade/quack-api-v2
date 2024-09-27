import { GraphQLObjectType, GraphQLString } from 'graphql'
import UserType from './userSchema'

export const RegistrationType = new GraphQLObjectType({
    name: 'RegistrationType',
    fields: {
        user: { type: UserType },
        tokens: {
            type: new GraphQLObjectType({
                name: 'Tokens',
                fields: {
                    accessToken: { type: GraphQLString },
                    refreshToken: { type: GraphQLString }
                }
            })
        }
    }
})
