import './App.css';
import Navbar from '../Navbar/Navbar';
import Feed from '../Feed/Feed';
import CreatePost from '../../pages/CreatePost';

function App() {
    return (
        <div className="App">
            <h1>Fitness app</h1>
            <Navbar />
            <Feed />
            <CreatePost />
        </div>
    )
}

export default App