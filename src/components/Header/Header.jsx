import { useContext } from 'react'
import { UserContext } from '../../data'
// import { getUserToken } from '../../utils/authToken'
import { Link } from 'react-router-dom'
import '../../index.css'

const Header = (props) => {
    const { currentUserName, currentUserID } = useContext(UserContext)
    // const token = getUserToken()
    console.log(`Header current user`, currentUserName, currentUserID)

    return (
        <div className="header">
            <div className="Fitcheck">
            <Link to="/about"><h1>FitCheck</h1></Link>
            {/* <Link to="/profile">{token ? <p>Logged in: <span className='logged-in'>{currentUserName}</span></p> : <p><span className='not-logged-in'>Not logged in</span></p>}</Link> */}
            </div>
        </div>
    )
}

export default Header