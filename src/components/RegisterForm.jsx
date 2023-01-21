import { useNavigate } from 'react-router-dom'
import { useState } from 'react'


export default function RegisterForm({ signUp }) {
    const [registerForm, setRegisterForm] = useState({
        username: "",
        password: "",
        age: "",
        location: "",
        bio: "",
    })

    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        const createdUserToken = await signUp(registerForm)
        if (createdUserToken) {
            setRegisterForm({
                username: "",
                password: "",
                age: "",
                location: "",
                bio: "",
            })
            navigate("/")
        }
        else {
            navigate("/auth")
        }
    }

    function handleChange(e) {
        const userInput = { ...registerForm }
        userInput[e.target.name] = e.target.value
        setRegisterForm(userInput)
    }

    return (
        <>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username: </label>
                <input
                    id="username"
                    name="username"
                    placeholder="Enter username"
                    value={registerForm.username}
                    onChange={handleChange}
                />

                <br />
                <label htmlFor="password">Password: </label>
                <input
                    id="password"
                    name="password"
                    placeholder="Enter password"
                    type="password"
                    autoComplete='password'
                    value={registerForm.password}
                    onChange={handleChange}
                />

                <br />
                <label htmlFor='age'>Age: </label>
                <input
                    type="text"
                    id="age"
                    name="age"
                    placeholder="Enter your age"
                    value={registerForm.age}
                    onChange={handleChange}
                />

                <br />
                <label htmlFor='location'>Location: </label>
                <input
                    type="text"
                    id="location"
                    name="location"
                    placeholder="Enter your location"
                    value={registerForm.location}
                    onChange={handleChange}
                />

                <br />
                <label htmlFor='bio'>Bio: </label>
                <input
                    type="text"
                    id="bio"
                    name="bio"
                    placeholder="Tell us about you!"
                    value={registerForm.bio}
                    onChange={handleChange}
                />

                <br />
                <br />
                <input type="submit" className="submit-button" value="Sign Up" />
            </form>
        </>
    )
}