import { useEffect, useState } from 'react'
import Styles from '../modular_css/App.module.css'
import { Fooditems } from './Fooditems';


export const App = () => {
    const [search, setSearch] = useState('');

    const [query, setQuery] = useState('');

    const [fooditems, setFooditems] = useState([]);

    // const appId = '22b3cc3';
    // const appKey = '7e2d8c24e0bbc311f17cdce4b7c88dad';

    // environment variable storage(while using cra-template.)

    // const appId = process.env.REACT_APP_EDAMAM_APP_ID;
    // const appKey = process.env.REACT_APP_EDAMAM_APP_KEY; // while using cra-template.


    // for vite-application
    const appId = import.meta.env.VITE_EDAMAM_APP_ID;
    const appKey = import.meta.env.VITE_EDAMAM_APP_KEY;

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(`https://api.edamam.com/api/food-database/v2/parser?ingr=${query}&app_id=${appId}&app_key=${appKey}`);
                // console.log(response);

                if (!response.ok) throw new Error(`API request failed with status ${response.status}`);

                const parsedData = await response.json();
                console.log(parsedData);
                console.log(parsedData.hints);
                setFooditems(parsedData.hints || []);
                console.log('data fetched');


            } catch (error) {
                console.error(`Fetching error: ${error}`);
                setFooditems([]);
            }
        }
        getData()
    }, [query])

    const handleSubmit = (event) => {
        event.preventDefault();
        setQuery(search);
        // console.log('submitted');
        setSearch('');
    }

    return (
        <div>
            <h1 style={{ textAlign: "center", fontSize: "40px", color: "#010155" }}>Welcome! Foodies 🤤</h1>
            <form onSubmit={handleSubmit} className={Styles.formContainer}>
                <input type="text" value={search} onChange={event => setSearch(event.target.value)} className={Styles.inputField} placeholder='Search Food items...' />
                <input type="submit" value="Submit" className={Styles.submitButton} />
            </form>
            <div className={Styles.main}>
                {
                    fooditems.map((item, index) => (
                        <Fooditems item={item} key={index} />
                    ))
                }
            </div>
        </div>
    )
}
