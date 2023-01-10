import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const Posts = (props) => {
    // console.log(`Posts page`, currentUserID, currentUserName)
    const [posts, setPosts] = useState([])
    const [users, setUsers] = useState([])

    const BASE_URL = "https://fitness-accountability.herokuapp.com/"

    const getPosts = async () => {
        try {
            const response = await fetch(BASE_URL)
            const allPosts = await response.json()
            setPosts(allPosts)
        } catch (err) {
            console.error(err)
        }
    }
    const getUsers = async () => {
        try {
            const response = await fetch(BASE_URL + `profile/`)
            const allUsers = await response.json()
            setUsers(allUsers)
        } catch (err) {
            console.error(err)
        }
    }

    const loaded = () => {
        const findUsernameByOwner = (owner) => {
            for (let i = 0; i < users.length; i++) {
                if (owner === users[i]._id) {
                    return users[i].username
                }
            }
        }
        
        return (
            <div className="posts-container">
                {posts?.map((post) => {
                    return (
                        <Link key={post._id} to={`/${post._id}`}>
                            <div className="post">
                                <p>{post.owner ? findUsernameByOwner(post.owner) : `dummy post`}</p>
                                <img alt={post.tags} src={post.image} />
                                <p className="post-description">{post.description}</p>
                                <p className="post-tags">
                                    {post.tags?.map((tag) => `#${tag} `)}
                                </p>
                            </div>
                        </Link>
                    )
                })}
            </div>
        )
    }

    const loading = () => (
        <section className="loading">
            <h1>
                Loading...
                <span>
                    {" "}
                    <img
                        alt="spinner"
                        className="spinner"
                        src="https://freesvg.org/img/1544764567.png"
                    />
                </span>
            </h1>
        </section>
    )
    useEffect(() => {
        getPosts()
        getUsers()
    }, [])

    return posts && posts.length ? loaded() : loading()
}

export default Posts
