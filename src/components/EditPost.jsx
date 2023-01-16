import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getUserToken } from "../utils/authToken"
import StarRating from "./StarRating"
import UploadImage from "./UploadImage"

const EditPost = (props) => {
    const { data } = props

    const [editForm, setEditForm] = useState({
        image: data.image,
        description: data.description,
        tags: data.tags.toString(),
        rating: data.rating,
        difficulty: data.difficulty
    })

    const navigate = useNavigate()
    const { id } = useParams()
    const token = getUserToken()
    const URL = `https://fitness-accountability.herokuapp.com/post/${id}`

    const handleChange = (event) => {
        const userInput = { ...editForm }
        userInput[event.target.name] = event.target.value
        setEditForm(userInput)
    }

    const updatePost = async (e) => {
        const createTags = (str) => {
            let arr = str.split(',')
            for (let i = 0; i < arr.length; i++) {
                if (arr[i][0] === ' ') {
                    arr[i] = arr[i].substring(1, arr[i].length)
                }
            }
            return arr
        }
        e.preventDefault()
        editForm.tags = createTags(editForm.tags)
        const updatedPost = { ...editForm }
        try {
            const requestOptions = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedPost),
            }
            await fetch(URL, requestOptions)
            navigate(`/`)
        }
        catch (err) {
            console.error(err)
        }
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
        }
    }

    const setImage = (newImage) => {
        setEditForm((oldPostForm) => {
            const formCopy = { ...oldPostForm }
            formCopy.image = newImage
            return formCopy
        })
    }

    const setWorkoutRating = (newRating) => {
        setEditForm((oldEditFormValues) => {
            const copyOfEditForm = { ...oldEditFormValues }
            copyOfEditForm.rating = newRating
            return copyOfEditForm
        })
    }

    const setDifficultyRating = (newRating) => {
        setEditForm((oldEditFormValues) => {
            const copyOfEditForm = { ...oldEditFormValues }
            copyOfEditForm.difficulty = newRating
            return copyOfEditForm
        })
    }

    return (
        <>
            <br />
            <section className="edit-post">
                <h2>Edit post</h2>
                <form onSubmit={updatePost}>
                    <div>
                        <label>
                            Edit Description:
                            <input
                                type="text"
                                value={editForm.description}
                                name="description"
                                placeholder="edit description"
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    <br />
                    <div>
                        <label>
                            Edit Tags:
                            <input
                                type="text"
                                value={editForm.tags}
                                name="tags"
                                placeholder="edit tags"
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    <br />
                    <div>
                        <label>
                            Edit Workout Rating
                            <StarRating setRating={setWorkoutRating} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Edit Workout Difficulty
                            <StarRating setRating={setDifficultyRating} />
                        </label>
                    </div>

                    <input type="submit" className="submit-button" value="Edit Post" />
                </form>
            </section>
            <section className="delete-post">
                <h2>Delete post</h2>
                <button className="logout-button" onClick={deletePost}>Delete</button>
            </section>
        </>
    )
}

export default EditPost