import jwt from 'jsonwebtoken'

export const accessGuard = (req) => {
    const token = req.headers.authorization?.split(' ')[1]

    const isTokenValid = (token) => {
        if (!token) return { isValid: false, errorMessage: 'Token not found' }

        try {
            const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            if (!decoded)
                return { isValid: false, errorMessage: 'Token Expired' }
            return {
                isValid: true,
                user: (req.user = decoded),
                errorMessage: null
            }
        } catch (error) {
            return { isValid: false, errorMessage: error.message }
        }
    }

    const { isValid, user, errorMessage } = isTokenValid(token)

    return {
        token: isValid ? token : null,
        isValid,
        user,
        errorMessage
    }
}

/*
* usage:
* const { token, isValid, user, errorMessage } = accessGuard(req)
* if (!isValid) trow new Error('Unauthorized access');
* rest logic here
* */