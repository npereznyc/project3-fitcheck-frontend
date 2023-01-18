import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getUserToken } from "../utils/authToken"

export default function Posts(props) {
    console.log(`*** Posts() invoked...`)

    // useState variables
    const [posts, setPosts] = useState([])
    const [users, setUsers] = useState([])

    const token = getUserToken()

    async function getAllPosts() {
        console.log(`> getAllPosts()...`)
        let allPosts
        try {
            const response = await fetch(`https://fitness-accountability.herokuapp.com/`)
            allPosts = await response.json()
        } catch (err) {
            console.error(err)
        } finally {
            console.log(`> getAllPosts() found`, allPosts.length, `posts!`)
            setPosts(allPosts)
        }
    }

    async function getAllUsers() {
        console.log(`> getAllUsers()...`)
        let allUsers
        try {
            const response = await fetch(`https://fitness-accountability.herokuapp.com/profile/`)
            allUsers = await response.json()
        } catch (err) {
            console.error(err)
        } finally {
            console.log(`> getAllUsers() found`, allUsers.length, `users!`)
            setUsers(allUsers)
        }
    }

    useEffect(() => {
        console.log(`* useEffect() invoked...`)
        getAllPosts()
        getAllUsers()

        return (() => {
            console.log(`* Users and Posts wiped out!`)
            setPosts([])
            setUsers([])
        })
    }, [])

    function loaded() {
        console.log(`Loaded`, users.length, `users and`, posts.length, `posts!`)

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
                            <p className="welcome-top">{previewUsername} is on</p>
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
                    </>}
            </div>
        )
    }

    function loading() {
        console.log(`Loading... Users:`, users?.length, `Posts:`, posts?.length)
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