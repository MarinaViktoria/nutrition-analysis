import './App.css';
import { useState } from "react";
import { useEffect } from "react";
import LoaderPage from './LoaderPage';

function App() {
  const [stateLoader, setStateLoader] = useState(true);
  const [mySearch, setMySearch] = useState("");
  const [myNutrition, setMyNutrition] = useState([]);
  //https://api.edamam.com/api/nutrition-details?app_id=ba1f1240&app_key=c81c9d20999e76a9ecb3440c5e910ec3
  const MY_ID = "ba1f1240";
  const MY_KEY= "c81c9d20999e76a9ecb3440c5e910ec3";
  const MY_URL= "https://api.edamam.com/api/nutrition-details";

  useEffect(() => {
    const timer = setTimeout(() => setStateLoader(false), 3000);
    return() => clearTimeout(timer)
  }, [])
  
  useEffect (() => {
    getData()
  }, [])
    const getData = async () => {
      const response = await fetch(`${MY_URL}?app_id=${MY_ID}&app_key=${MY_KEY}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify()
      });
      const data = await response.json();
      console.log(data);
      setMyNutrition(data);
    }
  return (
    <div>
      {stateLoader && <LoaderPage/>}
      <div className="container">
        <h1>Nutrition Analysis</h1>
      </div>
      <div className="container">
        <form>
          <input
            placeholder="Search..."/>
            <button type="submit">Search</button>
        </form>
      </div>
    </div>
  );
}

export default App;
