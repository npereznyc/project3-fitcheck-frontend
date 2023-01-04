import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Posts = (props) => {
     
    const [posts, setPosts] = useState([])
    const [newForm, setNewForm] = useState({
        name: "",
        image: "",
        text: "",
    })


const BASE_URL = "http://localhost:4000/"
//Base Url suggestion

const getPosts = async () => {
    try {
        const response = await fetch(BASE_URL)
        const allPosts = await response.json()
        setPosts(allPosts)
    } catch (err) {
        console.log(err)
    }
}

const handleChange = (e) => {
    
}
}