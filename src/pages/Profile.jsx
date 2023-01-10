import { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router'
import { useNavigate } from "react-router-dom";
import { UserContext } from "../data";
import { getUserToken, clearUserToken } from "../utils/authToken"


const Profile = (props) => {
    const { setAuth, setUser, currentUserID } = useContext(UserContext)
    const [profile, setProfile] = useState(null)
    console.log(currentUserID)
    const navigate = useNavigate()

    const { id } = useParams()

    const URL = `https://fitness-accountability.herokuapp.com/profile/${id}`

    const getProfile = async () => {
        try {
            const response = await fetch(URL)
            const result = await response.json()
            // console.log(result)
            setProfile(result)

        }
        catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getProfile()
    }, [])

    const logoutUser = () => {
        clearUserToken()
        setUser(null)
        setAuth(null)
        navigate(`/`)
    }
    const token = getUserToken()

    const loaded = () => {
        return (
            <div className="profile-container">
                <h4>{profile.name}</h4>
                <p>Age: {profile.age}</p>
                <p>Location: {profile.location}</p>
                <p>Bio: {profile.bio}</p>
            {token ? <button onClick={logoutUser} className="logout-button">Log Out</button> : null}
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