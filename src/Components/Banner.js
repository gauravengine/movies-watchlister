import React, { Component } from 'react'
// import { movies } from './getMovies'
import {api_key} from "./apicreds";
import axios from "axios";
export default class Banner extends Component {
    constructor(){
        super();
        this.state={
            images:[],
            titles:[],
            overview:[]
        }
    }
    async componentDidMount() {
        const nowPlaying = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=en-US&page=1`)
        let images_temp=[]
        let titles_temp=[]
        let overview_temp=[]
        for(let i=0;i<3;i++){
            images_temp.push(`https://image.tmdb.org/t/p/original${nowPlaying.data.results[i].backdrop_path}`)
            titles_temp.push(`${nowPlaying.data.results[i].original_title}`)
            overview_temp.push(`${nowPlaying.data.results[i].overview}`)
        }
        console.log(images_temp);
        console.log(titles_temp)
        console.log(overview_temp)
        this.setState({
            images:[...images_temp],
            titles:[...titles_temp],
            overview:[...overview_temp]
        })
    }

    render() {
    // let currMovie=movies.results[2]
    // console.log(currMovie)
    return (
        
        // <div className="card banner-card" >
        // <img src={`https://image.tmdb.org/t/p/original/tmU7GeKVybMWFButWEGl2M4GeiP.jpg`} className="card-img-top banner-img" />
        // <div className="card-body mycard">
        //     <h2 className="card-title banner-title">The Godfather</h2>
        //     <p className="card-text banner-text ">Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.</p>
        //
        // </div>
        // </div>
        <div id="carouselExampleCaptions" className="carousel slide mt-2 ">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active"
                        aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
                        aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
                        aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src={this.state.images[0]} className="d-block w-100" alt="..."/>
                        <div className="carousel-caption d-none d-md-block">
                            <h5>{this.state.titles[0]}</h5>
                            <p>{this.state.overview[0]}</p>
                        </div>
                </div>
                <div className="carousel-item">
                    <img src={this.state.images[1]} className="d-block w-100" alt="..."/>
                        <div className="carousel-caption d-none d-md-block">
                            <h5>{this.state.titles[1]}</h5>
                            <p>{this.state.overview[1]}</p>
                        </div>
                </div>
                <div className="carousel-item">
                    <img src={this.state.images[2]} className="d-block w-100" alt="..."/>
                        <div className="carousel-caption d-none d-md-block">
                            <h5 >{this.state.titles[2]}</h5>
                            <p>{this.state.overview[2]}</p>
                        </div>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
  }
}
