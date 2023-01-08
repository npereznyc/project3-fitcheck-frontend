// check the local storage api for a token key and return the token
const getUserToken = () => {
    return localStorage.getItem('token')
}

// write a token value (argument) to the token field of localStorage
const setUserToken = (token) => {
    return localStorage.setItem('token', token)
}

const clearUserToken = () => {
    return localStorage.setItem('token', "")
}

export { getUserToken, setUserToken, clearUserToken }