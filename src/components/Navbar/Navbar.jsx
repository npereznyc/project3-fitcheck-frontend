import {Link} from 'react-router-dom'

const Navbar = (props) => {
    return (
        <nav className="nav">
            <Link to='/'>
                <h1>Home</h1>
            </Link>
            <Link to='/createpost'>
            <h1>Create Post</h1>
            </Link>  
           <Link to='/profile'>
           <h1>Profile</h1>
           </Link>
        </nav>
    )
}

export default Navbar