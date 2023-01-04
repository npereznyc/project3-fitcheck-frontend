import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"

const EditPost = (props) => {
    
    //Update route/PUT request
    const [post, setPost] = useState(null)
    const [editForm, setEditForm] = useState("")

    const { id } = useParams()

    const URL = `http://localhost:4000/post/${id}`

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
    console.log(`Current persposton: ${JSON.stringify(post)}`)

    //make a fetch:
    useEffect(() => {
        getPost()
    }, [])

    const updatePost = async (e) => {
        e.preventDefault()
        try {
            await fetch(URL, {
                method: "PUT",
                headers: {"Content-Type": "application/json",},
                body: JSON.stringify(editForm)
            })
            getPost()
        }catch(err){
            console.log(err)
        }
    }
    const handleChange = event => {
        setEditForm({...editForm, [event.target.name]: event.target.value})
    }

    return (
        <section>
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
                    placeholder="update description"
                    onChange={handleChange}
                />
                
                <input 
                    type="text"
                    value={editForm.tags}
                    name="tags"
                    placeholder="update tags"
                    onChange={handleChange}
                />
                <input 
                    // type="???"
                    // value={}
                    // name="rating"
                    placeholder="update rating"
                    // onChange={}
                />
                <input 
                    // type="???"
                    // value={}
                    // name="difficulty"
                    placeholder="update difficulty"
                    // onChange={}
                />
                <input type="submit" value="Edit Post" />
            </form>
        </section>
    )

}

export default EditPost