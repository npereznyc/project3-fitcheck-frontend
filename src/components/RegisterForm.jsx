import { useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import { UserContext } from "../data"
import { getUserToken, clearUserToken } from "../utils/authToken"

const RegisterForm = ({ signUp }) => {

    const initialState = {
        username: "",
        password: "",
        age: "",
        location: "",
        bio: "",
    }

    const [input, setInput] = useState(initialState)
    const navigate = useNavigate()
    const { setAuth, setUser, currentUserID } = useContext(UserContext)
    const [profile, setProfile] = useState([])

    const BASE_URL = "https://fitness-accountability.herokuapp.com/profile/"

    const handleSubmit = async (e) => {
        e.preventDefault()
        const createdUserToken = await signUp(input)

        if (createdUserToken) {
            navigate("/")
        }
        else {
            navigate("/auth")
        }
        setInput(initialState)
        try {
            // console.log('try block')
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(input)
            }
            const response = await fetch(BASE_URL, requestOptions)
            // console.log(response)

            const newProfile = await response.json()
            // console.log(newProfile)

            // setInput([...input, newInput])
            setProfile([...profile, newProfile])
            setInput(initialState)
            // navigate(`/${id}`)
        } catch (err) {
            console.error(err)
        }
    }

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
        console.log(input)
    }

    return (
        <>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Name: </label>
                <input
                    id="username"
                    name="username"
                    value={input.username}
                    onChange={handleChange}
                />
                <br />
                <label htmlFor="password">Password: </label>
                <input
                    id="password"
                    name="password"
                    value={input.password}
                    onChange={handleChange}
                />
                <br />

                    <div>
                        <label>
                            Age
                            <input
                                type="number"
                                id="age"
                                name="age"
                                placeholder="age"
                                value={input.age}
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    <div>
                        <label>
                            Location
                            <input
                                type="text"
                                id="location"
                                name="location"
                                placeholder="location"
                                value={input.location}
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    <div>
                        <label>
                            Bio
                            <input
                                type="text"
                                id="bio"
                                name="bio"
                                placeholder="workout bio"
                                value={input.bio}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                <input type="submit" value="Sign Up" />
            </form>
        </>
    )
}

export default RegisterForm