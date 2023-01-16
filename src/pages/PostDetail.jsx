import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../data'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import EditPost from '../components/EditPost'

export default function PostDetail() {
    // useContext data
    const { currentUserID } = useContext(UserContext)

    // useState variables
    const [post, setPost] = useState(undefined)
    const [users, setUsers] = useState([])

    // useParams - useEffect dependency
    const { id } = useParams()

    async function getPost(userPost) {
        console.log(`> getPost() ending ...` + userPost.substring(12, userPost.length))
        let result
        try {
            const response = await fetch(`https://fitness-accountability.herokuapp.com/post/${userPost}`)
            result = await response.json()

        } catch (err) {
            console.error(err.message)
        } finally {
            console.log(`> getPost() found:`, result.description.substring(0, 17) + `...`)
            setPost(result)
        }
    }

    async function getAllUsers() {
        console.log(`> getAllUsers() invoked...`)
        let allUsers
        try {
            const response = await fetch(`https://fitness-accountability.herokuapp.com/profile/`)
            allUsers = await response.json()
        } catch (err) {
            console.error(err.message)
        } finally {
            console.log(`> getAllUsers() found`, allUsers.length, `users`)
            setUsers(allUsers)
        }
    }

    useEffect(() => {
        console.log(`* useEffect() invoked...`)
        getPost(id)
        getAllUsers()

        return (() => {
            console.log(`* Post and Users wiped out!`)
            setUsers([])
            setPost(undefined)
        })
    }, [id])

    function loaded() {
        console.log(`Loaded!`, post.description.substring(0, 17) + `... Users:`, users.length)
        function findUsernameByOwner(owner) {
            for (let i = 0; i < users.length; i++) {
                if (owner === users[i]._id) {
                    console.log(`> Found`, users[i].username, `by _id`)
                    return users[i].username
                }
            }
        }

        const foundUsername = findUsernameByOwner(post.owner)
        const isOwner = currentUserID === post.owner

        return (
            <div className="post-container">
                {post.owner ? <h4>Posted by: <Link to={"/profile/" + post.owner}>{foundUsername} (see profile)</Link></h4> : null}
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

    function loading() {
        console.log(`Loading... Post?`, Boolean(post?.description), `Users:`, users?.length)
        return (
            <h1>
                Loading...&nbsp;
                <img
                    className="spinner"
                    src="https://freesvg.org/img/1544764567.png"
                    alt='loading'
                />
            </h1>
        )
    }

    console.log(`*** PostDetail() invoked...`)

    return (
        <section className="PostDetail">
            {post && users.length ? loaded() : loading()}
        </section>
    )

}