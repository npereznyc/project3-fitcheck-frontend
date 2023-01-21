import { useState, useContext } from 'react'
import { UserContext } from "../data"
import { useNavigate } from "react-router-dom"
import { getUserToken, clearUserToken } from "../utils/authToken"

export default function CreateProfile() {
    const { setAuth, setUser, currentUserID } = useContext(UserContext)

    const [profile, setProfile] = useState([])
    const [profileForm, setProfileForm] = useState({
        name: "",
        age: "",
        location: "",
        bio: "",
    })

    const navigate = useNavigate()
    const BASE_URL = "https://fitness-accountability.herokuapp.com/profile/"

    function handleChange(e) {
        const userInput = { ...profileForm }
        userInput[e.target.name] = e.target.value
        setProfileForm(userInput)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const currentState = { ...profileForm }
        try {
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(currentState)
            }
            const response = await fetch(BASE_URL, requestOptions)
            const newProfile = await response.json()
            setProfile([...profile, newProfile])
            setProfileForm({
                name: "",
                age: "",
                location: "",
                bio: "",
            })
            navigate('/')
        }
        catch (err) {
            console.error(err)
        }
    }

    const token = getUserToken()

    function logoutUser() {
        clearUserToken()
        setUser(null)
        setAuth(null)
        navigate(`/`)
    }

    return (
        <div>
            <p>Your User ID is: {currentUserID ? currentUserID : `unavailable`}</p>
            {token ? <button onClick={logoutUser} className="logout-button">Log Out</button> : null}
            <section>
                <h1>Create New Profile</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>
                            Name
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="name"
                                value={profileForm.name}
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    <div>
                        <label>
                            Age
                            <input
                                type="text"
                                id="age"
                                name="age"
                                placeholder="age"
                                value={profileForm.age}
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
                                value={profileForm.location}
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
                                value={profileForm.bio}
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    <div>
                        <br />
                        <input type="submit" value="Create Profile" />

                    </div>
                </form>
            </section>
        </div>
    )
}