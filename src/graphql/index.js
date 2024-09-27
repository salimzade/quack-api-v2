import { GraphQLObjectType, GraphQLSchema } from 'graphql'
import PostResolver from '../modules/posts/PostResolver'
import UserResolver from '../modules/user/userResolver'
import TokenResolver from '../modules/tokens/tokenResolver'

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        getUsers: UserResolver.getUsers,
        getPosts: PostResolver.getPosts
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        login: UserResolver.login,
        register: UserResolver.register,
        logout: UserResolver.logout,
        tokenRefresh: TokenResolver.tokenRefresh,

        createPost: PostResolver.createPost,
        updatePost: PostResolver.updatePost,
        deletePost: PostResolver.deletePost
    }
})

export const RootSchema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})
