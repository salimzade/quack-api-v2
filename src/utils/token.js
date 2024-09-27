import jwt from 'jsonwebtoken'
import TokenModel from '../modules/tokens/tokenModel'

class TokenUtil {
    generateToken(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
            expiresIn: '60m'
        })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
            expiresIn: '7d'
        })
        return {
            accessToken,
            refreshToken
        }
    }

    validateToken(token, secret) {
        try {
            return jwt.verify(token, secret)
        } catch (error) {
            console.error(error)
        }
    }

    async saveToken(userId, refreshToken) {
        // Find the token record for the given userId
        const tokenData = await TokenModel.findOne({ userId: userId })

        if (tokenData) {
            // If token data exists, update the refresh token
            tokenData.refreshToken = refreshToken
            await tokenData.save() // Save the updated token data
        } else {
            // If no token data exists, create a new token record
            await TokenModel.create({ userId, refreshToken })
        }
    }

    async removeToken(refreshToken) {
        return TokenModel.deleteOne({ refreshToken })
    }

    async findToken(refreshToken) {
        return TokenModel.findOne({ refreshToken })
    }
}

export default new TokenUtil()
