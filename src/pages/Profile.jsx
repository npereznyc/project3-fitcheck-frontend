import { useState, useEffect, useContext } from "react"
import { useParams } from 'react-router'
import { useNavigate, Link } from "react-router-dom"
import { UserContext } from "../data"
import { clearUserToken } from "../utils/authToken"

export default function Profile(props) {
    // useContext data
    const { currentUserID } = useContext(UserContext)
    const { setAuth, setUser, setUserID } = useContext(UserContext)

    // useState variables
    const [profile, setProfile] = useState(null)
    const [posts, setPosts] = useState([])

    const { id } = useParams()
    const navigate = useNavigate()

    async function getProfile() {
        console.log(`getProfile() invoked`)
        try {
            const response = await fetch(`https://fitness-accountability.herokuapp.com/profile/${id}`)
            const result = await response.json()
            console.log(`getProfile() result:`, result)
            return setProfile(result)
        }
        catch (err) {
            console.error(err)
        }
        // return console.log(`> return from getProfile(), setProfile(result)`, profile)
    }

    async function getAllPosts() {
        console.log(`getAllPosts() invoked`)
        try {
            const response = await fetch(`https://fitness-accountability.herokuapp.com/`)
            const allPosts = await response.json()
            console.log(`getAllPosts() result:`, allPosts)
            return setPosts(allPosts)
        }
        catch (err) {
            console.error(err)
        }
        // return console.log(`> return from getAllPosts(), setPosts(allPosts)`, posts)
    }

    useEffect(() => {
        console.log(`*** useEffect() was invoked, profile:`, profile, `posts:`, posts)
        getProfile()
        getAllPosts()
        // const userProfile = getProfile()
        // const userPosts = getAllPosts()
        // setProfile(userProfile)
        return (
            console.log(`* > return 1 from useEffect(), profile:`, profile, `posts:`, posts),
            setPosts([]),
            setProfile(null),
            console.log(`* > return 2 from useEffect(), profile:`, profile, `posts:`, posts)
        )
    }, [])

    function logoutUser() {
        console.log(`logoutUser() invoked`)
        clearUserToken()
        setUser(null)
        setUserID(null)
        setAuth(null)
        navigate(`/`)
    }

    function loaded() {
        console.log(`Loaded!`)
        function findPostsByOwner(owner) {
            let userPosts = []
            for (let i = 0; i < posts.length; i++) {
                if (owner === posts[i].owner) {
                    userPosts.push(posts[i])
                }
            }
            console.log(userPosts)
            return userPosts
        }
        const userPosts = findPostsByOwner(profile._id)
        const isOwner = currentUserID === profile._id

        return (
            <div className="profile-container">
                <div className="details">
                    <h1>User profile: {profile.username}</h1>
                    <p>Age: {profile.age}</p>
                    <p>Location: {profile.location}</p>
                    <p>Bio: {profile.bio}</p>
                    {isOwner ? <>
                        <br />
                        <button onClick={logoutUser} className="logout-button">Log Out</button>
                        {/* <EditProfile data={profile} /> */}
                    </> : null}
                </div>
                <br />
                {userPosts && userPosts.length ? <>
                    <p>Posts from {profile.username}:</p>
                    <br />
                    <div className="posts-container">{userPosts.map((post) => (
                        <Link to={`/${post._id}`} key={post._id}>
                            <div className="post">
                                {post.owner ? <p>{profile.username}</p> : null}
                                <img alt={post.tags} src={post.image} />
                                {post.description ? <p className="post-description">{post.description}</p> : null}
                                <p className="post-tags">
                                    {post.tags?.map((tag) => `#${tag} `)}
                                </p>
                            </div>
                        </Link>
                    ))}</div>
                </> : <p className="details">No posts to show from user</p>}
            </div>
        )
    }

    function loading() {
        console.log(`Loading...`)
        return (
            <h1>
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
        )
    }

    profile || posts ? console.log(`Profile() invoked:`, profile, posts) : console.log(`Profile() invoked, no data yet`)

    return (
        <section className="Profile">
            {profile ? loaded() : loading()}
        </section>
    )
}