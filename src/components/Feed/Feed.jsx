import {Routes, Route} from 'react-router-dom'
import Home from '../../pages/Posts'


const Feed = (props) => {
    return(
        <div>
            <Routes>
                <Route path="/" element={<Home/>}/> 
                {/* <Route path="/post/:id" element={} */}
                {/*Path to view single post & need show page */}
            </Routes>
        </div>
    )
}

export default Feed