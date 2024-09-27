import { customAlphabet } from 'nanoid'

function IdGen(size) {
    const alphabet =
        '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    const nanoid = customAlphabet(alphabet, size)
    return nanoid()
}

export default IdGen
