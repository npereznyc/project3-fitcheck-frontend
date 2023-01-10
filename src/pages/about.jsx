import { useEffect } from "react";
import {useState } from "react";



const About = (props) => {
    const [abouts, setAbouts] = useState(null);
    const BASE_URL = "https://fitness-accountability.herokuapp.com/about"
    const getAbout = async () => {
        try {
            const response = await fetch(BASE_URL)
            const allAbout = await response.json()
            setAbouts(allAbout)
        } catch (err) {
            console.error(err)
        }
     
    }
    useEffect(() => {
        getAbout();
      }, []);
    return (
        <div>
            <h1>Lorem Ipsum</h1>
        </div>
    )
}
export default About