import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Navbar = (props) => {
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
            <Link to='/profile'>
                <FontAwesomeIcon icon="fa-solid fa-user" />
                <p>Profile</p>
            </Link>
            <Link to='/auth'>
                <FontAwesomeIcon icon="fa-solid fa-user" />
                <p>Auth</p>
            </Link>
        </nav>
    )
}

export default Navbar