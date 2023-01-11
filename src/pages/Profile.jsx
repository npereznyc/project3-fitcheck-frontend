import { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router'
import { useNavigate, Link } from "react-router-dom";
import EditProfile from "../components/EditProfile";
import { UserContext } from "../data";
import { getUserToken, clearUserToken } from "../utils/authToken"


const Profile = (props) => {
    const { currentUserID } = useContext(UserContext)
    const [profile, setProfile] = useState(null)
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()
    const { setAuth, setUser, setUserID } = useContext(UserContext)
    const { id } = useParams()

    const URL = `https://fitness-accountability.herokuapp.com/profile/${id}`

    const getProfile = async () => {
        try {
            const response = await fetch(URL)
            const result = await response.json()
            setProfile(result)
        }
        catch (err) {
            console.error(err)
        }
    }

    const getAllPosts = async () => {
        try {
            const response = await fetch("https://fitness-accountability.herokuapp.com/")
            const allPosts = await response.json()
            setPosts(allPosts)
        }
        catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getProfile()
        getAllPosts()
    }, [])

    const logoutUser = () => {
        clearUserToken()
        setUser(null)
        setUserID(null)
        setAuth(null)
        navigate(`/`)
    }
    const token = getUserToken()

    const isOwner = currentUserID === profile?._id

    const loaded = () => {
        const findPostsByOwner = (owner) => {
            let userPosts = []
            for (let i = 0; i < posts.length; i++) {
                if (owner === posts[i].owner) {
                    userPosts.push(posts[i])
                }
            }
            return userPosts
        }

        return (
            <div className="profile-container">
                <h1>User profile: {profile.username}</h1>
                <p>Age: {profile.age}</p>
                <p>Location: {profile.location}</p>
                <p>Bio: {profile.bio}</p>
                {isOwner ? <EditProfile data={profile} /> : null}
                {token ? <button onClick={logoutUser} className="logout-button">Log Out</button> : null}
                {posts && posts.length ? findPostsByOwner(profile._id).map((post) => (
                    <div className="posts-container" key={post._id}>
                        <Link to={`/${post._id}`}>
                            <div className="post">
                                {post.owner ? <p>{profile.username}</p> : null}
                                <img alt={post.tags} src={post.image} />
                                {post.description ? <p className="post-description">{post.description}</p> : null}
                                <p className="post-tags">
                                    {post.tags?.map((tag) => `#${tag} `)}
                                </p>
                            </div>
                        </Link>
                    </div>
                )) : <p>No posts to show</p>} {/* Why am I not seeing this if the user has no posts? */}
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