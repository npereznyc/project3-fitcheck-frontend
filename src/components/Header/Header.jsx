import { useContext } from 'react'
import { UserContext } from '../../data'
import { getUserToken } from '../../utils/authToken'
import { Link } from 'react-router-dom'

const Header = (props) => {
    const { currentUser } = useContext(UserContext)
    const token = getUserToken()
    // console.log(token)
    // console.log(currentUser)

    return (
        <div className="header">
            <Link to="/"><h1>Fitness Check</h1></Link>
            <Link to="/profile">{token ? <p>Logged in: {currentUser ? <span className='logged-in'>{currentUser.username}</span> : <span className='logged-in'>(UserContext, hello...?)</span>}</p> : <p><span className='not-logged-in'>Not logged in</span></p>}</Link>
        </div>
    )
}

export default Header