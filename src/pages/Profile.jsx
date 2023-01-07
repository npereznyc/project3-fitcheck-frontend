import { useState, useEffect } from "react";
import { useParams } from 'react-router'



const Profile = (props) => {
    const [profile, setProfile] = useState(null)

    const { id } = useParams()

    const URL = `https://fitness-accountability.herokuapp.com/profile/${id}`

    const getProfile = async () => {
        try {
            const response = await fetch(URL)
            const result = await response.json()
            console.log(result)
            setProfile(result)

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getProfile()
    }, [])

    const loaded = () => {
        return (
            <div className="profile-container">
                <h4>{profile.name}</h4>
                <p>Age: {profile.age}</p>
                <p>Location: {profile.location}</p>
                <p>Bio: {profile.bio}</p>
            </div>
        )
    }

    const loading = () => {
        return <h1>
            Loading...
            <span>
                {" "}
                <img
                    className="spinner"
                    src="https://freesvg.org/img/1544764567.png"
                    alt="Loading animation"
                />
            </span>
        </h1>
    }
    return (
        <section className="Profile">
            {profile ? loaded() : loading()}
        </section>
    )
}

export default Profile