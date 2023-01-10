import { useNavigate } from 'react-router-dom'
import { useState } from 'react'


const RegisterForm = ({ signUp }) => {

    // const [profile, setProfile] = useState([])
    const [registerForm, setRegisterForm] = useState({
        username: "",
        password: "",
        age: "",
        location: "",
        bio: "",
    })


    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const createdUserToken = await signUp(registerForm)

        if (createdUserToken) {

            navigate("/")
            console.log('new user', registerForm.username)
        }
        else {
            navigate("/auth")
        }

        setRegisterForm({
            username: "",
            password: "",
            age: "",
            location: "",
            bio: "",
        })
    }

    const handleChange = (e) => {
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
                    value={registerForm.username}
                    onChange={handleChange}
                />
                <br /><br />
                <label htmlFor="password">Password: </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete='current-password'
                    value={registerForm.password}
                    onChange={handleChange}
                />
                <br /><br />
             
                    <label>
                        Age
                        <input
                            type="text"
                            id="age"
                            name="age"
                            placeholder="age"
                            value={registerForm.age}
                            onChange={handleChange}
                        />
                    </label>
             
                <br /><br />
           
                    <label>
                        Location
                        <input
                            type="text"
                            id="location"
                            name="location"
                            placeholder="location"
                            value={registerForm.location}
                            onChange={handleChange}
                        />
                    </label>
             
                <br /><br />
          
                    <label>
                        Bio
                        <input
                            type="text"
                            id="bio"
                            name="bio"
                            placeholder="workout bio"
                            value={registerForm.bio}
                            onChange={handleChange}
                        />
                    </label>
                    <br /><br />
             
                <input type="submit" value="Sign Up" />
            </form>
        </>
    )
}

export default RegisterForm