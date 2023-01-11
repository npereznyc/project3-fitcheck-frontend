import { useContext } from 'react'
import { UserContext } from '../../data'
// import { getUserToken, decodeToken } from '../../utils/authToken'
import { Link } from 'react-router-dom'
import '../../index.css'

const Header = (props) => {
    const { currentUserName, currentUserID } = useContext(UserContext)
    // const token = getUserToken()
    console.log(`useContext username:`, currentUserName)
    console.log(`useContext user ID:`, currentUserID)

    return (
        <div className="header">
            <Link to="/about"><h1>FitCheck</h1></Link>
            {currentUserName ? <Link to={"/profile/" + currentUserID}><p>Logged in: <span className='logged-in'>{currentUserName}</span></p></Link> : <Link to="/login/"><p><span className='not-logged-in'>Not logged in</span></p></Link>}
        </div>
    )
}

export default Header