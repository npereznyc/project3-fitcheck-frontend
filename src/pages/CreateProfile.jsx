import { useState, useEffect } from 'react'
// import { useNavigate } from "react-router-dom"
// import { useParams } from 'react-router'



const CreateProfile = (props) => {

    const [profile, setProfile] = useState([])

    //form state
    const [profileForm, setProfileForm] = useState({
        name: "",
        age: "",
        location: "",
        bio: "",
    })

    const BASE_URL = "https://fitness-accountability.herokuapp.com/profile/"
    
    // const navigate = useNavigate()    
    // const { id } = useParams()
    // const URL = `https://fitness-accountability.herokuapp.com/profile/${id}`

    // const getProfile = async () => {
    //     try {
    //         const response = await fetch(URL)
    //         const result = await response.json()
    //         console.log(result)
    //         setProfile(result)

    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    // useEffect(() => {
    //     getProfile()
    // }, [])


    const handleChange = (e) => {
        const userInput = { ...profileForm }
        userInput[e.target.name] = e.target.value
        console.log(userInput)
        setProfileForm(userInput)
    }

    const handleSubmit = async (e) => {
        // 0. prevent default (event object method)
        console.log('handling submit')
        e.preventDefault()
        // 1. capturing our local state
        const currentState = { ...profileForm }
        // check any fields for property data types / truthy value
        try {
            console.log('try block')
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(currentState)
            }
            const response = await fetch(BASE_URL, requestOptions)
            console.log(response)

            const newProfile = await response.json()
            console.log(newProfile)

            setProfile([...profile, newProfile])
            setProfileForm({
                name: "",
                age: "",
                location: "",
                bio: "",
            })
            // navigate(`/${id}`)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <section>
                <h2>Create New Profile</h2>
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

export default CreateProfile