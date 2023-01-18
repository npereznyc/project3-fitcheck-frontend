import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import { UserContext } from '../../data'
import { getUserToken } from '../../utils/authToken'

export default function Navbar() {
    const { currentUserID } = useContext(UserContext)
    const token = getUserToken()

    return (
        <nav className="nav">
            <Link to='/'>
                <FontAwesomeIcon icon="fa-solid fa-house" />
                <p>Home</p>
            </Link>

            <Link to={token ? '/post/' : '/login/'}>
                <FontAwesomeIcon icon="fa-solid fa-circle-plus" />
                <p>Create Post</p>
            </Link>

            <Link to={token ? '/profile/' + currentUserID : '/login/'}>
                <FontAwesomeIcon icon="fa-solid fa-user" />
                <p>Profile</p>
            </Link>
        </nav>
    )
}