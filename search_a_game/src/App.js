import './App.css';
import {useState, useEffect} from 'react';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((response) => response.json());

function App() {
  const [gameTitle, setGameTitle] = useState('');
  const [searchedGames, setSearchedGames] = useState([]);
  const [dealsGames, setDealsGames] = useState([]);

  const {data, error} = useSWR(
    'https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=20&pageSize=5',
    fetcher 
    );
  
  const searchGame = () => {
    fetch(`https://www.cheapshark.com/api/1.0/games?title=${gameTitle}&limit=5`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setSearchedGames(data);
    })
  }

  useEffect(() => {
    
  }, [])

  return (
    <div className="App">
      <div className="searchSection">
        <h1>Search for a game🔍</h1>
        <input type="text" placeholder='Eg. Minecraft' onChange={(event) => {setGameTitle(event.target.value)}}/>
        <button onClick={searchGame}>Find My Game</button>

        <div className="games">
          {searchedGames.map((game, key) =>{
            return (
              <div className="game" key={key}>
                <b>{game.external}</b>
                <img src={game.thumb} alt="" />
                <p> Price: {game.cheapest}$ </p>
              </div>
            )
          })}
        </div>
      </div>
      <div className="dealsSection">
        <h1>Latest Deals🔥</h1>

        <div className="games">
          {data && 
            data.map((game, key) =>{
            return (
              <div className="game" key={key}>
                <b>{game.title}</b>
                <img src={game.thumb} alt="" />
                <p> Sale Price: {game.salePrice}$ </p>
              </div>
            )
          })}
        </div>

      </div>
    </div>
  );
}

export default App;
