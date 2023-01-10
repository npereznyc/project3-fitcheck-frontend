import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import { UserContext } from '../../data'
// import { getUserToken } from '../../utils/authToken'

const Navbar = (props) => {
    const { currentUserID } = useContext(UserContext)
    // const token = getUserToken()
    console.log(currentUserID)

    return (
        <nav className="nav">
            <Link to='/'>
                <FontAwesomeIcon icon="fa-solid fa-house" />
                <p>Home</p>
            </Link>
            <Link to='/post'>
                <FontAwesomeIcon icon="fa-solid fa-circle-plus" />
                <p>Create Post</p>
            </Link>
            <Link to={currentUserID ? '/profile/' + currentUserID : '/profile/'}>
                <FontAwesomeIcon icon="fa-solid fa-user" />
                <p>Profile</p>
            </Link>
        </nav>
    )
}

export default Navbar