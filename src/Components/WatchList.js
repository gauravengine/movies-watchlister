import React, { Component } from 'react'
import {genreKeys} from './genres'
import FuzzySearch from 'fuzzy-search';
export default class WatchList extends Component {
	sortOnRating=()=>{
		let temp=this.state.moviesSelected;
		temp.sort((a,b)=>{
			return b.rating-a.rating;
		})
		this.setState({
			moviesSelected:[...temp]
		})
	};
	constructor() {
		super();
		this.state={
			current:'all',
			movies:[],
			genresAvailable:['All Genres'],
			genresSelected:[],
			moviesSelected:[],
			searchString:"",
		}
	}
	componentDidMount(){
		// get all movies from local storage and fill them in movies
		let storedWatchlist=JSON.parse(localStorage.getItem("movieWatchlist")||'[]');
		let tempMovies=[];
		let tempGenres=['All Genres'];
		for(let i=0;i<storedWatchlist.length;i++){
			let tempObj={};
			let tempmovieObj=storedWatchlist[i];
			tempObj.id=tempmovieObj.id;
			tempObj.genreIds=tempmovieObj.genre_ids;
			tempObj.popularity=tempmovieObj.popularity;
			tempObj.rating=tempmovieObj.vote_average;
			tempObj.title=tempmovieObj.title;
			tempObj.img=tempmovieObj.backdrop_path;
			tempObj.genreString=(tempObj.genreIds.map((genre)=>{return genreKeys[genre]})).toString();
			tempMovies.push(tempObj);
			for(let j=0;j<tempObj.genreIds.length;j++){
				if(!tempGenres.includes(genreKeys[tempObj.genreIds[j]])) tempGenres.push(genreKeys[tempObj.genreIds[j]]);
			}
		}
		console.log(tempGenres);
		console.log(tempMovies);
		this.setState({
			movies:[...tempMovies],
			moviesSelected:[...tempMovies],
			genresAvailable:[...tempGenres],
		})
		
	}
	handleSelectedMoviesChange=()=>{
		
		let genresSelected=this.state.genresSelected
		if(genresSelected.length==0){
			this.handleAllSelectedMovies();
			return;
		}
		let movies=this.state.movies
		let tselectedMovies=[]
		for(let i=0;i<movies.length;i++){
			let movieObj=movies[i];
			let flag=false;
			for(let j=0;j<movieObj.genreIds.length;j++){
				if(genresSelected.includes(genreKeys[movieObj.genreIds[j]])) flag=true;
			}
			if(flag){
				tselectedMovies.push(movieObj);
			}
		}
		this.setState({
			moviesSelected:[...tselectedMovies],
		})
	}
	handleAllSelectedMovies=()=>{
		this.setState({
			moviesSelected:[...this.state.movies],
		})
	}
	sortOnPopularity=()=>{
		let temp=this.state.moviesSelected;
		temp.sort((a,b)=>{
			return b.popularity-a.popularity;
		})
		this.setState({
			moviesSelected:[...temp]
		})
	}
	handleAllGenres=()=>{
		let temp=[]
		this.setState({
			current:'all',
			genresSelected:temp,
		},this.handleAllSelectedMovies);
	}
	handleRest=(genre)=>{
		let temp=this.state.genresSelected;
		if(!temp.includes(genre)) temp.push(genre);
		else{
			temp=this.state.genresSelected.filter((g)=>{
				return g!=genre;
			})
		}
		if(temp.length===0){
			this.setState({
				current:'all',
				genresSelected:[...temp],
			},this.handleAllSelectedMovies)
		}
		else{
			this.setState({
				current:'not',
				genresSelected:[...temp],
			},this.handleSelectedMoviesChange)
		}

	}
	handleDelete=(id)=>{
		console.log(id);
		let tempSelected=this.state.moviesSelected.filter((movie)=>{
			return movie.id!==id;
		});
		let tempAllMovies=this.state.movies.filter((movie)=>{
			return movie.id!==id;
		})
		let storedWatchlist=JSON.parse(localStorage.getItem("movieWatchlist")||'[]');
		storedWatchlist=storedWatchlist.filter((movieObj)=>{
			return movieObj.id!==id;

		})
		localStorage.setItem("movieWatchlist",JSON.stringify(storedWatchlist));
		this.setState({
			movies:[...tempAllMovies],
			moviesSelected:[...tempSelected],
		})
	}
	render() {


		return (

			<div className='row justify-content-center'>
				<div className='col-xl-3 mt-2 px-5 col-md-8 g-4'>
					<ul className="list-group">
						
						{
							this.state.genresAvailable.map((genre)=>{
								return (
									genre==='All Genres'?
									(<li role="button" className={"list-group-item " + (this.state.current==="all"  ? "list-group-item-info":"")} onClick={this.handleAllGenres}>{genre}</li>):
									(<li role="button" className={"list-group-item " + (this.state.genresSelected.includes(genre)  ? "list-group-item-info":"")} onClick={()=>this.handleRest(genre)}>{genre}</li>)
								);
							})
						}
					</ul>
				</div>
				<div className='col-lg-9 col-sm-12 mt-5 px-3'>
					<div className={'row mt-2 mb-4 justify-content-center'}>
						<input  type="text" className=" input-group-text col-4" placeholder="Search" onChange={(e)=>this.searchHandler(e)}/>
						{/*<input type="number" className="input-group-text col" placeholder="Rows Count" />*/}

					</div>
					<div className={'row'}>
						<table className="table table-striped-columns">
							<thead>
							<tr>
								
								<th scope="col"><button type="button" className="btn btn-info">Movie Name</button></th>
								<th scope="col"><button type="button" className="btn btn-info">Genres</button></th>
								<th scope="col"><button type="button" className="btn btn-info" onClick={this.sortOnPopularity}><i
									className="bi bi-sort-up"></i>Popularity</button></th>
								<th scope="col"><button type="button" className="btn btn-info" onClick={this.sortOnRating}>
									<i className="bi bi-sort-up"></i>Rating</button></th>
								<th scope="col"><button type="button" className="btn btn-warning"></button></th>
							</tr>
							</thead>
							<tbody>
							
							{
								this.state.moviesSelected.map((movieObj)=>{
									return (
										<tr>
											<td>{movieObj.title}</td>
											<td>{movieObj.genreString}</td>
											<td>{movieObj.popularity}</td>
											<td>{movieObj.rating}</td>
											<td><button type="button" className="btn btn-danger" onClick={()=>this.handleDelete(movieObj.id)} >Delete?</button></td>
										</tr>
									)
								})
							}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		)
	}
	sortInSearch=()=>{
		if(this.state.searchString===''){
			console.log("----------empty =======")
			this.handleSelectedMoviesChange();
			return;
		}
		const searchStr=this.state.searchString
		const searcher = new FuzzySearch(this.state.moviesSelected, ['title']);
		const result = searcher.search(searchStr);
		console.log(result);
		this.setState({
			moviesSelected:[...result]
		})
	}
	searchHandler=(e) =>{
		this.setState({
			searchString:e.target.value
		},this.sortInSearch)
	}
}
