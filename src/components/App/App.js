import './App.css';
import Navbar from '../Navbar/Navbar';
import Feed from '../Feed/Feed';

function App() {
    return (
        <div className="App">
            <h1>Fitness app</h1>
            <Navbar />
            <Feed />
        </div>
    )
}

export default App