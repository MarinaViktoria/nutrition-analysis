import './App.css';
import { useState } from "react";
import { useEffect } from "react";
import LoaderPage from './LoaderPage';
import Nutrition from './Nutrition';
import image from './food.jpg';

function App() {
  
  const [mySearch, setMySearch] = useState();
  const [wordSubmitted, setWordSubmitted] = useState('');
  const [myNutrition, setMyNutrition] = useState();
  const [stateLoader, setStateLoader] = useState(false);

  //https://api.edamam.com/api/nutrition-details?app_id=ba1f1240&app_key=c81c9d20999e76a9ecb3440c5e910ec3
  const MY_ID = "ba1f1240";
  const MY_KEY= "c81c9d20999e76a9ecb3440c5e910ec3";
  const MY_URL= "https://api.edamam.com/api/nutrition-details";

  /*useEffect(() => {
    const timer = setTimeout(() => setStateLoader(false), 3000);
    return() => clearTimeout(timer)
  }, [])*/
  
    const getData = async (ingr) => {
      setStateLoader(true);
      const response = await fetch(`${MY_URL}?app_id=${MY_ID}&app_key=${MY_KEY}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ingr: ingr})
      });
      if (response.ok) {
        setStateLoader(false);
        const data = await response.json();
        setMyNutrition(data);
        console.log(data);
        console.log(data.totalNutrients)
        console.log(Object.values(data.totalNutrients))
    }
      else {
        setStateLoader(false); // Сбрасываем состояние загрузки в false
        alert('ingredients entered incorrectly');
    }
  }
  const myRecipeSearch = (e) => {
    setMySearch(e.target.value);
  }
  const finalSearch = (e) => {
    e.preventDefault();
    setWordSubmitted(mySearch);
  }
    useEffect(() => {
      if (wordSubmitted !== '') {
        let ingr = wordSubmitted.split(/[,,;,\n,\r]/);
        getData(ingr);
      }
    }, [wordSubmitted]);
  return (
    <div>
      <div>
      <img src={image} alt="food"/>
      </div>
      {stateLoader && <LoaderPage/>}
      <div className="container">
        <h1>Nutrition Analysis</h1>
      </div>
      <div className="container">
        <form onSubmit={finalSearch}>
          <input className="search"
            placeholder="Search..."
            spellcheck="false"
            onChange={myRecipeSearch}/>
            <button type="submit">Search</button>
        </form>
      </div>
      <div className="container_2">
        {/*{myNutrition && <p>{myNutrition.calories} kcal</p>}*/}
        {myNutrition && Object.values(myNutrition.totalNutrients)
            .map(({ label, quantity, unit}, index ) =>
              <Nutrition key={index}
                label={label}
                quantity={quantity}
                unit={unit}
              />
            )
        }
      </div>
    </div>
  );
}
export default App;
