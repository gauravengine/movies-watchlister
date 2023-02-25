import React, { Component } from 'react'
import { movies } from './getMovies';

import axios from 'axios';

export default class Movies extends Component {
	constructor() {
		super();
		this.state = {
			currPage: 1,
			pageArr: [1],
			movieData: [],
			currPointer: '',
			watchList:[],
		}
	}
	async componentDidMount() {
		this.handleWatchlistState();
		console.log("Running ComponentDidMount from movies.js")
		
		const moviePromise = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${this.state.currPage}`)
		this.setState({
			movieData: [...(moviePromise.data.results)]
		})
	}
	changeMovies=async()=>{
		console.log("Change movies called");
		console.log(this.state.currPage);
		const moviePromise = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${this.state.currPage}`)
		this.setState({
			movieData: [...(moviePromise.data.results)]
		})
	}
	mouseEnterHandler(id) {
		// console.log("Mouse Entered :  ", id);
		this.setState({
			currPointer: id
		})
	}
	mouseExitHandler(id) {
		// console.log("Mouse Exited ", id);
		this.setState({
			currPointer: ''
		})
	}
	previousHandler=()=>{
		console.log("Previous Handler Clicked Bruv");
		
		if(this.state.pageArr.length ==1) return;
		let tempi=this.state.pageArr;
		tempi.pop();
		let tempCurr=tempi.at(tempi.length-1);
		this.setState({
			pageArr:[...tempi],
			currPage:tempCurr
		},this.changeMovies)
		
	}
	nextHandler=()=>{
		console.log("Previous Handler Clicked Bruv");
		let tempi=this.state.pageArr;
		let nextPage=tempi.at(tempi.length-1)+1;
		tempi.push(nextPage);
		this.setState({
			pageArr:[...tempi],
			currPage:nextPage
		},this.changeMovies)

	}
	handleWatchlist=(movieObj)=>{
		let storedWatchlist=JSON.parse(localStorage.getItem("movieWatchlist")||'[]');
		if(this.state.watchList.includes(movieObj.id)){
			storedWatchlist=storedWatchlist.filter((movie)=>{
				return movie.id!=movieObj.id;
			})
		}else{
			storedWatchlist.push(movieObj);
		}
		localStorage.setItem("movieWatchlist",JSON.stringify(storedWatchlist));
		console.log(storedWatchlist);
		this.handleWatchlistState();
	}
	handleWatchlistState=()=>{
		let storedWatchlist=JSON.parse(localStorage.getItem("movieWatchlist")||'[]');
		let movieIds=storedWatchlist.map((obj)=>{
			return obj.id;
		})
		this.setState({
			watchList:[...movieIds]
		})
	}
	goToPage=(index)=>{
		console.log(`Going to Page ${index} wohooo`);
		this.setState({
			currPage:index
		},this.changeMovies)
	}
	render() {
		console.log("Rendering Movies Bruv")
		let movie = this.state.movieData;
		// <div className="card" style="width: 18rem;">
		// 	<img src="..." className="card-img-top" alt="...">
		// 		<div className="card-body">
		// 			<h5 className="card-title">Card title</h5>
		// 			<p className="card-text">Some quick example text to build on the card title and make up the bulk of
		// 				the card's content.</p>
		// 			<a href="#" className="btn btn-primary">Go somewhere</a>
		// 		</div>
		// </div>
		return (
			<div className={'container-fluid'}>
				<hr/>
				<h3 className='text-center'>Trending</h3>
				<hr/>
				<div className="movies-space row row-cols-auto row-cols-md-2 row-cols-lg-3  row-cols-sm-1 row-cols-xs-1 row-cols-xl-4 g-4">

						{

							movie.map((movieObj) => (
								<div className={'col'}>
								<div key={movieObj.id} className="card movie-card testing-card position-relative" onMouseEnter={() => this.mouseEnterHandler(movieObj.id)} onMouseLeave={() => this.mouseExitHandler(movieObj.id)}   >
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
										this.state.currPointer==movieObj.id && (
											<a  className="btn btn-primary position-absolute  bottom-0 start-50  translate-middle" onClick={()=>this.handleWatchlist(movieObj)}>{this.state.watchList.includes(movieObj.id)?'Remove From Watchlist':'Add to Watchlist'}</a>)
									}
								</div>
								</div>
							))

						}



				</div>
				<div className='position-relative m-3'>
				<nav aria-label="Page navigation example" className='position-absolute top-0 start-50 translate-middle-x'>
					<ul className="pagination">
						<li role="button" className="page-item" ><a className="page-link" onClick={this.previousHandler}>Previous</a></li>
						{
							this.state.pageArr.map((page)=>{
								return (
									<li key={page} role="button" className="page-item pe-auto"><a className="page-link" onClick={()=>this.goToPage(page)}>{page}</a></li>
								)
							})
						}
						<li role="button" className="page-item"><a className="page-link" onClick={this.nextHandler}>Next</a></li>
					</ul>
				</nav>
				</div>
			</div>
		)
	}
}
