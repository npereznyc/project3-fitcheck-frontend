import {Routes, Route} from 'react-router-dom'
import CreatePost from '../../pages/CreatePost'
import PostDetail from '../../pages/PostDetail'
import Posts from '../../pages/Posts'
import Profile from '../../pages/Profile'
import CreateProfile from '../../pages/CreateProfile'


const Feed = (props) => {
    return(
        <div>
            <Routes>
                <Route path="/" element={<Posts />}/>
                <Route path= "/post" element={<CreatePost/>}/>
                <Route path="/:id" element={ <PostDetail />} />
                <Route path= "/profile/:id" element={<Profile/>}/>
                <Route path= "/profile" element={<CreateProfile/>}/>
            </Routes>
        </div>
    )
}

export default Feed
