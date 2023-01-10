import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { useState } from 'react'
import { UserContext } from "../data"
import { getUserToken, setUserToken, clearUserToken } from "../utils/authToken"
import RegisterForm from "../components/RegisterForm"
import CreateProfile from "./CreateProfile"


// const CreateAccount = ({signUp}) => {
//     const initialState = { username: "", password: "" }
//     const [input, setInput] = useState(initialState)
//     const navigate = useNavigate()

//     const handleSubmit = async (e) => {
//         e.preventDefault()

//         const createdUserToken = await signUp(input)

//         if (createdUserToken) {
//             navigate("/")
//             console.log('input', input)
//             console.log('account created', input.username)
//         } else {
//             navigate("/auth")
//         }
//         setInput(initialState);
//     };

//     const handleChange = (e) => {
//         setInput({ ...input, [e.target.name]: e.target.value });
//     };
    
//     return (
//         <>
//             <h1>Create Account</h1>
//             <form onSubmit={handleSubmit}>
//                 <label htmlFor="username">Name: </label>
//                 <input
//                     id="username"
//                     name="username"
//                     value={input.username}
//                     onChange={handleChange}
//                 />
//                 <br />
//                 <br />
//                 <label htmlFor="password">Password: </label>
//                 <input
//                     id="password"
//                     name="password"
//                     value={input.password}
//                     onChange={handleChange}
//                 />
//                 <br />
//                 <br />
//                 <input type="submit" value="Sign Up" />
//             </form>
//         </>
//     );
// };

// export default CreateAccount

function CreateAccount() {
    const { setAuth, setUser, setUserID } = useContext(UserContext)
    const navigate = useNavigate()
    // const token = getUserToken()

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
            console.error(err)
            clearUserToken()
            setAuth(false)
        }
    }
    return (
        <section>
            <RegisterForm signUp={registerUser} />
            {/* <CreateProfile /> */}
        </section>
    )
}

export default CreateAccount