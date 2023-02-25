
import './App.css';
import Navbar from './Components/Navbar';
import Navbar_f from './Components/Navbar_f';
import WatchList from './Components/WatchList'
import Home from './Components/Home';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import SearchResults from "./Components/SearchResults";
import SearchFunction from "./Components/SearchFunction";
import SearchNew from "./Components/search_new"
function App() {
  
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navbar_f/>}>
            <Route index element={<Home/>}/>
            <Route path='watchlist' element={ <WatchList/> } />
            {/* <Route path='search' element={<SearchFunction/>} /> */}
            <Route path='searchnew' element={<SearchNew/>} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
