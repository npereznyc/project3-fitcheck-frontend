import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"

const EditPost = (props) => {

    //Update route/PUT request
    const [post, setPost] = useState(null)
    const [editForm, setEditForm] = useState("")

    const { id } = useParams()
    const navigate = useNavigate()
    const URL = `https://fitness-accountability.herokuapp.com/post/${id}`

    const getPost = async () => {
        try {
            const response = await fetch(URL)
            const result = await response.json()
            console.log(result)
            setPost(result)

        } catch (err) {
            console.log(err)
        }
    }
    console.log(`Current post (edit): ${JSON.stringify(post)}`)

    //make a fetch:
    useEffect(() => {
        getPost()
    }, [])

    const updatePost = async (e) => {
        e.preventDefault()
        try {
            await fetch(URL, {
                method: "PUT",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify(editForm)
            })
            getPost()
        } catch (err) {
            console.log(err)
        }
    }

    const deletePost = async (e) => {
        try {
            //configure our delete request
            const options = {
                method: "DELETE"
            }
            const response = await fetch(URL, options)
            const deletedPost = await response.json()
            console.log(deletedPost)
            //make a fetch for a delete endpoint
            //await response / parse response
            //navigate() is going to change the current page the browser is at; we're doing client side redirect
            navigate("/")
        } catch (err) {
            console.log(err)
            //stretch goal: populate error message on page when delete fails
            //populate some state for 3 seconds, then redirect to a 404 page
        }
    }

    const handleChange = event => {
        setEditForm({ ...editForm, [event.target.name]: event.target.value })
    }

    return (<>
        <section className="edit-post">
            <h2>Edit this Post</h2>
            <form onSubmit={updatePost}>
                <input
                    type="text"
                    value={editForm.image}
                    name="image"
                    placeholder="update image URL"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    value={editForm.description}
                    name="description"
                    placeholder="edit description"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    value={editForm.tags}
                    name="tags"
                    placeholder="edit tags"
                    onChange={handleChange}
                />
                <input
                    type="number"
                    value={editForm.rating}
                    name="rating"
                    placeholder="edit rating"
                    onChange={handleChange}
                />
                <input
                    type="number"
                    value={editForm.difficulty}
                    name="difficulty"
                    placeholder="edit difficulty"
                    onChange={handleChange}
                />
                <input type="submit" value="Edit Post" />
            </form>
        </section>
        <section className="delete-post">
            {/* <h1>{person.name}</h1> */}
            <div>
                <br></br>
                Delete this Post: 
                <button onClick={deletePost}> Delete </button>
            </div>
        </section>
        <br></br>
        <Link to="/">Back to Home</Link>
    </>
    )

}

export default EditPost