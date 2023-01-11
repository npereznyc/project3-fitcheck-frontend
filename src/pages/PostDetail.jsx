import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../data'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import EditPost from '../components/EditPost'

const PostDetail = (props) => {
    const { currentUserID } = useContext(UserContext)
    const [post, setPost] = useState(null)
    const [users, setUsers] = useState([])
    const { id } = useParams()
    const BASE_URL = `https://fitness-accountability.herokuapp.com/`

    const getPost = async () => {
        try {
            const response = await fetch(BASE_URL + `post/${id}`)
            const result = await response.json()
            setPost(result)

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

    useEffect(() => {
        getPost()
        getUsers()
    }, [])

    const isOwner = currentUserID === post?.owner

    const loaded = () => {
        const findUsernameByOwner = (owner) => {
            for (let i = 0; i < users.length; i++) {
                if (owner === users[i]._id) {
                    return users[i].username
                }
            }
        }

        return (
            <div className="post-container">
                {post.owner ? <h4>Posted by: <Link to={"/profile/" + post.owner}>{findUsernameByOwner(post.owner)} (see profile)</Link></h4> : null}
                <img src={post.image} alt={post.description} />
                <div className="details">
                    <h4>{post.description}</h4>
                    {post.tags && post.tags.length && post.tags[0] !== '' ? <p>Tagged: {post.tags.map((tag) => `#${tag} `)}</p> : null}
                    {post.rating ? <p>Workout Rating: {post.rating} / 5</p> : null}
                    {post.difficulty ? <p>Workout Difficulty: {post.difficulty} / 5</p> : null}
                </div>
                {isOwner ? <EditPost data={post} /> : null}
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
                    alt='loading'
                />
            </span>
        </h1>
    }
    return (
        <section className="PostDetail">
            {post ? loaded() : loading()}
        </section>
    )

}

export default PostDetail