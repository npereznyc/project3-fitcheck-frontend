import {Routes, Route} from 'react-router-dom'
import CreatePost from '../../pages/CreatePost'
import Home from '../../pages/Posts'


const Feed = (props) => {
    return(
        <div>
            <Routes>
                <Route path="/" element={<Home/>}/> 
                <Route path="/post" element={<CreatePost/>}/>
                {/* <Route path="/post/:id" element={} */}
                {/*Path to view single post & need show page */}
            </Routes>
        </div>
    )
}

export default Feed
