import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getUserToken } from "../utils/authToken"

export default function Posts() {

    // useState variables
    const [posts, setPosts] = useState([])
    const [users, setUsers] = useState([])

    const token = getUserToken()

    async function getAllPosts() {
        let allPosts
        try {
            const response = await fetch(`https://fitness-accountability.herokuapp.com/`)
            allPosts = await response.json()
        } catch (err) {
            console.error(err)
        } finally {
            setPosts(allPosts)
        }
    }

    async function getAllUsers() {
        let allUsers
        try {
            const response = await fetch(`https://fitness-accountability.herokuapp.com/profile/`)
            allUsers = await response.json()
        } catch (err) {
            console.error(err)
        } finally {
            setUsers(allUsers)
        }
    }

    useEffect(() => {
        getAllPosts()
        getAllUsers()

        return (() => {
            setPosts([])
            setUsers([])
        })
    }, [])

    function loaded() {

        function findUsernameByOwner(owner) {
            for (let i = 0; i < users.length; i++) {
                if (owner === users[i]._id) {
                    return users[i].username
                }
            }
        }
        const previewPost = posts[posts.length - 1]
        const previewUsername = findUsernameByOwner(previewPost.owner)

        return (
            <div className="posts-container">
                {token ? posts.map((post) => {
                    return (
                        <Link key={post._id} to={`/post/${post._id}`}>
                            <div className="post">
                                {post.owner ? <p>{findUsernameByOwner(post.owner)}</p> : null}
                                <img alt={post.tags} src={post.image} />
                                {post.description ? <p className="post-description">{post.description}</p> : null}
                                <p className="post-tags">
                                    {post.tags.map((tag) => `#${tag} `)}
                                </p>
                            </div>
                        </Link>
                    )
                }) :
                    <>
                        <p className="welcome-invite">
                            <Link to="/login/">Log in</Link> or <Link to="/register/">create an account</Link> today!
                        </p>
                        <div className="welcome">
                            <p className="welcome-top">{previewUsername.toUpperCase()} is on</p>
                            <h1>FitCheck!</h1>
                            <p className="welcome-bottom">...why not you?</p>
                        </div>
                        <Link key={previewPost._id} to={`/post/${previewPost._id}`}>
                            <div className="post">
                                {previewPost.owner ? <p>{findUsernameByOwner(previewPost.owner)}</p> : null}
                                <img alt={previewPost.tags} src={previewPost.image} />
                                {previewPost.description ? <p className="post-description">{previewPost.description}</p> : null}
                                <p className="post-tags">
                                    {previewPost.tags.map((tag) => `#${tag} `)}
                                </p>
                            </div>
                        </Link>
                    </>
                }
            </div>
        )
    }

    function loading() {
        return (
            <h1>
                Loading...&nbsp;
                <img
                    className="spinner"
                    src="https://freesvg.org/img/1544764567.png"
                    alt="Loading animation"
                />
            </h1>
        )
    }

    return users.length && posts.length ? loaded() : loading()
}