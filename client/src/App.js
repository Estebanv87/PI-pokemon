import {Route, Switch} from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import CreatePokemon from './components/CreatePokemon';
import Details from './components/Details';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path = '/' component = {LandingPage}/>
        <Route path = '/home' component = {Home}/>
        <Route path = '/pokemon' component = {CreatePokemon}/>
        <Route path = '/pokemons/:id' component = {Details}/>
      </Switch>
    </div>
  );
}

export default App;
