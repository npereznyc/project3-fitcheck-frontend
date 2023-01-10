import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { getUserToken } from "../utils/authToken"
import StarRating from "../components/StarRating"


const EditPost = (props) => {
    const token = getUserToken()

    // Update route/PUT request
    // const [post, setPost] = useState(null)
    // console.log(post)
    const [editForm, setEditForm] = useState("")

    const { id } = useParams()
    const navigate = useNavigate()
    const URL = `https://fitness-accountability.herokuapp.com/post/${id}`

    // const getPost = async () => {
    //     try {
    //         const response = await fetch(URL)
    //         const result = await response.json()
    //         // console.log(result)
    //         setPost(result)
    //     }
    //     catch (err) {
    //         console.error(err)
    //     }
    // }

    // useEffect(() => {
    //     getPost()
    // }, [])

    // Uncomment this function after making architectural changes, and figure out how to implement it!
    // const createTags = (str) => {
    //     let arr = str.split(',')
    //     for (let i = 0; i < arr.length; i++) {
    //         if (arr[i][0] === ' ') {
    //             arr[i] = arr[i].substring(1, arr[i].length)
    //         }
    //     }
    //     return arr
    // }

    // Why is useState yelling at us?
    const handleChange = (event) => {
        // editForm.tags = createTags(editForm.tags)
        setEditForm({ ...editForm, [event.target.name]: event.target.value })
        // console.log(editForm.tags)
    }
    console.log(editForm)

    const updatePost = async (e) => {
        e.preventDefault()
        const updatedPost = { ...editForm }
        console.log(updatedPost)
        // try {
        //     const requestOptions = {
        //         method: "PUT",
        //         headers: {
        //             "Content-Type": "application/json",
        //             Authorization: `Bearer ${token}`,
        //         },
        //         body: JSON.stringify(updatedPost),
        //     }
        //     await fetch(URL, requestOptions)
        //     navigate(`/`)
        // } catch (err) {
        //     console.error(err)
        // }
    }

    const deletePost = async (e) => {
        try {
            const options = {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            await fetch(URL, options)
            navigate(`/`)
        } catch (err) {
            console.error(err)
            //stretch goal: populate error message on page when delete fails
            //populate some state for 3 seconds, then redirect to a 404 page
        }
    }

    const setWorkoutRating = (newRating) => {
        setEditForm((oldEditFormValues) => {
            const copyOfEditForm = { ...oldEditFormValues }
            copyOfEditForm.rating = newRating
            // console.log("Post form is now:", copyOfEditForm)
            return copyOfEditForm
        })
    }

    const setDifficultyRating = (newRating) => {
        setEditForm((oldEditFormValues) => {
            const copyOfEditForm = { ...oldEditFormValues }
            copyOfEditForm.difficulty = newRating
            // console.log("Edit form is now:", copyOfEditForm)
            return copyOfEditForm
        })
    }

    return (
        <>
            <section className="edit-post">
                <h2>Edit post</h2>
                <form onSubmit={updatePost}>
                    <input
                        type="text"
                        value={editForm.image}
                        name="image"
                        placeholder="update image URL"
                        onChange={handleChange}
                    />

                    <br />

                    <input
                        type="text"
                        value={editForm.description}
                        name="description"
                        placeholder="edit description"
                        onChange={handleChange}
                    />

                    <br />

                    <input
                        type="text"
                        value={editForm.tags}
                        name="tags"
                        placeholder="edit tags"
                        onChange={handleChange}
                    />

                    <br />

                    <label>
                        Workout Rating
                        <StarRating setRating={setWorkoutRating} />
                    </label>

                    <br />

                    <label>
                        Workout Difficulty
                        <StarRating setRating={setDifficultyRating} />
                    </label>
                    
                    <input type="submit" value="Edit Post" />
                </form>
            </section>
            <section className="delete-post">
                <h2>Delete post</h2>
                <button className="logout-button" onClick={deletePost}>Delete</button>
            </section>
            <br />
            <Link to="/">Back to Home</Link>
        </>
    )
}

export default EditPost
