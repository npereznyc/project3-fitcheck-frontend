
const Update = (props) => {
    
    //Update route/PUT request

    return (
        <section>
            <h2>Edit this Post</h2>
            <form >
                <input 
                    // type="text"
                    // value={}
                    // name="image"
                    placeholder="update image URL"
                    // onChange={}
                />
                <input 
                    // type="text"
                    // value={}
                    // name="description"
                    placeholder="update description"
                    // onChange={}
                />
                
                <input 
                    // type="text"
                    // value={}
                    // name="tags"
                    placeholder="update tags"
                    // onChange={}
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

export default Update