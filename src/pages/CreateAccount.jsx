import { useContext } from "react"
// import { useNavigate } from "react-router-dom"
import { UserContext } from "../data"
import { setUserToken, clearUserToken } from "../utils/authToken"
import RegisterForm from "../components/RegisterForm"

function CreateAccount() {
    const { setAuth, setUser, setUserID } = useContext(UserContext)

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

            setUserToken(parsedUser.token)

            setUser(parsedUser.username)

            setAuth(parsedUser.isLoggedIn)

            setUserID(parsedUser._id)

            return parsedUser
        }
        catch (err) {
            console.error(err)
            clearUserToken()
            setAuth(false)
        }
    }
    return (
        <section>
            <RegisterForm signUp={registerUser} />
        </section>
    )
}

export default CreateAccount