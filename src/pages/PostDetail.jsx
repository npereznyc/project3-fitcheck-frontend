import {useState, useEffect} from 'react';
import {useParams} from 'react-router'

const PostDetail = (props) => {

    //Show route/GET request
    //Destroy route/DELETE request

    return (
        <div className="post-container">
            <h3>Name</h3>
            <img>Post Image</img>
            <div className="details">
                <p>Post Text</p>
                <p>Tags</p>
                <p>Workout Rating</p>
                <p>Workout Difficulty</p>
            </div>
            <button>Edit Post</button>
            <button>Delete Post</button>
        </div>
    )
}