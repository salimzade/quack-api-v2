import { GraphQLString, GraphQLList, GraphQLID } from 'graphql'
import PostType from './postSchema'
import PostModel from './postModel'
import { accessGuard } from '../../utils/accessGuard'

const PostResolver = {
    getPosts: {
        type: new GraphQLList(PostType),
        resolve: async () => {
            return PostModel.find()
        }
    },
    createPost: {
        type: PostType,
        args: {
            title: { type: GraphQLString },
            body: { type: GraphQLString }
        },
        async resolve(_, args, req) {
            const { isValid, user, errorMessage } = accessGuard(req)

            if (!isValid) {
                console.error('AccessGuard: ', errorMessage)
                throw new Error('Unauthorized access')
            }

            const post = new PostModel({
                ...args,
                userId: user.id
            })

            return await post.save()
        }
    },
    updatePost: {
        type: PostType,
        args: {
            id: { type: GraphQLID },
            title: { type: GraphQLString },
            body: { type: GraphQLString }
        },
        async resolve(_, { id, title, body }, req) {
            const { isValid, user, errorMessage } = accessGuard(req)

            if (!isValid) {
                console.error('AccessGuard: ', errorMessage)
                throw new Error('Unauthorized access')
            }

            const post = await PostModel.findById(id)

            if (!post) {
                throw new Error('Post not found')
            }

            if (post.userId.toString() !== user.id) {
                throw new Error(
                    'Unauthorized: You can only update your own posts'
                )
            }

            // Update the post
            post.title = title || post.title
            post.body = body || post.body

            return await post.save()
        }
    },
    deletePost: {
        type: PostType,
        args: {
            id: { type: GraphQLID }
        },
        async resolve(_parent, { id }, req) {
            const { isValid, user, errorMessage } = accessGuard(req)

            if (!isValid) {
                console.error('AccessGuard: ', errorMessage)
                throw new Error('Unauthorized access')
            }

            const post = await PostModel.findById(id)

            if (!post) {
                throw new Error('Post not found')
            }

            if (post.userId.toString() !== user.id) {
                throw new Error(
                    'Unauthorized: You can only delete your own posts'
                )
            }

            return PostModel.findByIdAndDelete(id)
        }
    }
}

export default PostResolver
