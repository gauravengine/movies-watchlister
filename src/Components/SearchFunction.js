import React, { useEffect, useState } from "react";
import {useSearchParams} from "react-router-dom";
import axios from "axios";

export default function SearchFunction() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [movieData,setMovieData]=useState([]);
	const [currPointer,setCurrPointer]=useState('');
	const [watchList,setWatchList]=useState([]);
	useEffect(()=>{
		handleWatchlistState();
		let moviePromise;
		async function getResults(){
			moviePromise = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchParams.get("query")}&page=1&include_adult=false`)
		}
		getResults().then(()=>{
			setMovieData([...(moviePromise.data.results)]);
			console.log([...moviePromise.data.results]);
		})
		
	},[])
	function mouseEnterHandler(id) {
		
		setCurrPointer(id)
	}
	function mouseExitHandler(id) {
		
		setCurrPointer('')
	}
	function handleWatchlist(movieObj){
		let storedWatchlist=JSON.parse(localStorage.getItem("movieWatchlist")||'[]');
		if(watchList.includes(movieObj.id)){
			storedWatchlist=storedWatchlist.filter((movie)=>{
				return movie.id!=movieObj.id;
			})
		}else{
			storedWatchlist.push(movieObj);
		}
		localStorage.setItem("movieWatchlist",JSON.stringify(storedWatchlist));
		console.log(storedWatchlist);
		handleWatchlistState();
	}
	function handleWatchlistState(){
		let storedWatchlist=JSON.parse(localStorage.getItem("movieWatchlist")||'[]');
		let movieIds=storedWatchlist.map((obj)=>{
			return obj.id;
		})
		setWatchList([...movieIds])
	}
	console.log("from search params",searchParams.get("query"));
	let pp=searchParams.get("query");
	
		return (
			<div className={'container-fluid'}>
				<h3 className='text-center'>Results for {searchParams.get("query")}</h3>
				<div className="movies-space row row-cols-auto row-cols-md-2 row-cols-lg-3  row-cols-sm-1 row-cols-xs-1 row-cols-xl-4 g-4">

						{

							movieData.map((movieObj) => (
								<div className={'col'}>
								<div key={movieObj.id} className="card movie-card testing-card position-relative" onMouseEnter={() => mouseEnterHandler(movieObj.id)} onMouseLeave={() => mouseExitHandler(movieObj.id)}   >
									<img src={`https://image.tmdb.org/t/p/original/${movieObj.backdrop_path}`} className='card-img movie-img' />
									{/*<h2 className="card-title movie-title">{movieObj.title}</h2>*/}
									{/*{this.state.currPointer == movieObj.id && (<div className="movie-button-wrapper">*/}
									{/*	<a href="#" className="btn btn-primary movie-button">Add to Favorites</a>*/}
									{/*</div>)*/}
									{/*}*/}
									<div className={'card-img-overlay'}>
										<h5 className="card-title text-white">{movieObj.title}</h5>
									</div>
									{
										currPointer==movieObj.id && (
											<a  className="btn btn-primary position-absolute  bottom-0 start-50  translate-middle" onClick={()=>handleWatchlist(movieObj)}>{watchList.includes(movieObj.id)?'Remove From Watchlist':'Add to Watchlist'}</a>)
									}
								</div>
								</div>
							))

						}



				</div>
				
			</div>
		);
	
}
