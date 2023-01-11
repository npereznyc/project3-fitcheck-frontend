import { useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import { UserContext } from "../data"
import { getUserToken, setUserToken, clearUserToken } from "../utils/authToken"
import LoginForm from "../components/LoginForm"

function Login() {
    const { setAuth, setUser, setUserID } = useContext(UserContext)
    const navigate = useNavigate()
    const token = getUserToken()

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

            if (currentUser.token) {
                setUserToken(currentUser.token)
                setUser(currentUser.username)
                setUserID(currentUser._id)
                setAuth(currentUser.isLoggedIn)
                return currentUser
            }
            else {
                console.error(`Server Error: ${currentUser.error}`)
            }
        }
        catch (err) {
            console.error(err)
            clearUserToken()
            setAuth(false)
        }
    }

    const logoutUser = () => {
        clearUserToken()
        setUser(null)
        setUserID(null)
        setAuth(null)
        navigate(`/`)
    }

    return (
        <section>
            <LoginForm signIn={loginUser} />
            {token ? <><br /><button onClick={logoutUser} className="logout-button">Log Out</button></> : null}
            <h4>Don't have an account? Click below to create one:</h4>
            <Link to='/register'><button>Create Account</button></Link>
        </section>
    )
}

export default Login