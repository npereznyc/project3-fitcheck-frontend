import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const LoginForm = ({ signIn }) => {
    const initialState = {
        username: "",
        password: ""
    }
    const [input, setInput] = useState(initialState)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const createdUserToken = await signIn(input)
        if (createdUserToken) {
            navigate("/")
        }
        else {
            navigate("/profile")
        }
        setInput(initialState)
    }

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    return (
        <>
            <h1>Log In</h1>
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
                    type="password"
                    autoComplete='password'
                    value={input.password}
                    onChange={handleChange}
                />

                <br />
                <input type="submit" value="Sign In" />
            </form>
        </>
    )
}

export default LoginForm