import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../data"
import { getUserToken, setUserToken, clearUserToken } from "../utils/authToken"
import RegisterForm from "../components/RegisterForm"
import LoginForm from "../components/LoginForm"

function Auth() {
    const { setAuth, setUser } = useContext(UserContext)
    const navigate = useNavigate()
    const token = getUserToken()

    const registerUser = async (data) => {
        try {
            const configs = {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            }
            const newUser = await fetch("https://fitness-accountability.herokuapp.com/auth/register", configs)

            const parsedUser = await newUser.json()
            // console.log(parsedUser)

            // sets local storage
            setUserToken(parsedUser.token)

            // put the returned user object in state
            setUser(parsedUser.user)

            // adds a boolean cast of the responses isAuthenticated prop
            setAuth(parsedUser.isLoggedIn)

            // alternative (safer) implementation would be to use jwt decode library - <https://www.npmjs.com/package/jwt-decode>
            // this would also require reconfiguring our backend so we only send tokens with a signup

            return parsedUser
        }
        catch (err) {
            console.log(err)
            clearUserToken()
            setAuth(false)
        }
    }

    const loginUser = async (data) => {
        try {
            const configs = {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            }

            const response = await fetch("https://fitness-accountability.herokuapp.com/auth/login", configs)

            const currentUser = await response.json()
            // console.log(currentUser)

            if (currentUser.token) {
                // sets local storage
                setUserToken(currentUser.token)
                // put the returned user object in state
                setUser(currentUser.username)
                setAuth(currentUser.isLoggedIn)

                return currentUser
            } else {
                console.error(`Server Error: ${currentUser.error}`)
            }
        }
        catch (err) {
            console.log(err)
            clearUserToken()
            setAuth(false)
        }
    }

    const logoutUser = () => {
        clearUserToken()
        setUser(null)
        setAuth(null)
        navigate(`/`)
    }

    return (
        <section>
            <h1>Auth Container</h1>
            <RegisterForm signUp={registerUser} />
            <LoginForm signIn={loginUser} />
            {token ? <><br /><button onClick={logoutUser} className="logout-button">Log Out</button></> : null }
        </section>
    )
}

export default Auth