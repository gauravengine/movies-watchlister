
import './App.css';
import Navbar from './Components/Navbar';
import WatchList from './Components/WatchList'
import Home from './Components/Home';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import SearchResults from "./Components/SearchResults";
import SearchFunction from "./Components/SearchFunction";
function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navbar/>}>
            <Route index element={<Home/>}/>
            <Route path='watchlist' element={ <WatchList/> } />
            <Route path='search' element={<SearchFunction/>} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
