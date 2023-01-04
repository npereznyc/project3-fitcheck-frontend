import {Routes, Route} from 'react-router-dom'

const Feed = (props) => {
    return(
        <div>
            <Routes>
                <Route path="/details/:id"/> 
                {/*Path to view single post & need show page */}
            </Routes>
        </div>
    )
}

export default Feed