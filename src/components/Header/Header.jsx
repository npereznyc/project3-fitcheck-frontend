import { useContext } from 'react'
import { UserContext } from '../../data'
import { getUserToken } from '../../utils/authToken'
import { Link } from 'react-router-dom'

const Header = (props) => {
    const { currentUser } = useContext(UserContext)
    const token = getUserToken()
    // console.log(token)
    console.log(`Header current user`, currentUser)

    return (
        <div className="header">
            <Link to="/"><h1>Fitness Check</h1></Link>
            <Link to="/profile">{token ? <p>Logged in: <span className='logged-in'>{currentUser}</span></p> : <p><span className='not-logged-in'>Not logged in</span></p>}</Link>
        </div>
    )
}

export default Header