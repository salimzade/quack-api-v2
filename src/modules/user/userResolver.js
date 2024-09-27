import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql'
import bcrypt from 'bcrypt'
import UserType from './userSchema'
import UserModel from './userModel'
import TokenType from '../tokens/tokenSchema'

import TokenUtils from '../../utils/token'
import TokenModel from '../tokens/tokenModel'

const LoginReturnType = new GraphQLObjectType({
    name: 'LoginReturn',
    fields: {
        user: { type: UserType },
        token: { type: TokenType }
    }
})

const UserResolver = {
    getUsers: {
        type: new GraphQLList(UserType),
        async resolve(_parent, args, req) {
            return UserModel.find()
        }
    },
    login: {
        type: LoginReturnType,
        args: {
            email: { type: GraphQLString },
            password: { type: GraphQLString }
        },
        async resolve(_, { email, password }) {
            const user = await UserModel.findOne({ email })
            if (!user) {
                throw new Error('User does not exist')
            }
            const isPasswordValid = await bcrypt.compare(
                password,
                user.password
            )

            if (!isPasswordValid) {
                throw new Error('Invalid credentials')
            }

            const tokens = TokenUtils.generateToken({ id: user._id })
            await TokenUtils.saveToken(user._id, tokens.refreshToken)

            return {
                user,
                token: { ...tokens }
            }
        }
    },
    register: {
        type: UserType,
        args: {
            firstName: { type: GraphQLString },
            lastName: { type: GraphQLString },
            email: { type: GraphQLString },
            password: { type: GraphQLString }
        },
        async resolve(_, { firstName, lastName, email, password }) {
            const hashedPassword = await bcrypt.hash(password, 3)

            return await UserModel.create({
                firstName,
                lastName,
                email,
                password: hashedPassword
            })
        }
    },
    logout: {
        type: TokenType,
        args: {
            refreshToken: { type: GraphQLString }
        },
        async resolve(_, { refreshToken }) {
            return TokenModel.deleteOne({ refreshToken })
        }
    }
}

export default UserResolver
