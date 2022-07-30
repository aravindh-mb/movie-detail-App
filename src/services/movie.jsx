import React , {Component} from 'react'
import {getMovies} from '../services/movieData'
import '../services/movie.scss';
import swal from 'sweetalert';

class Movie extends Component{
constructor(){
    super();

    this.state = {
        movies : getMovies()
    }
}
handle = (movie)=>{
    // console.log(movie)
    // const movies = this.state.movies.filter(m =>m.imdbID !== movie.imdbID)
    // console.log(movies)
    // this.setState({ movies : movies })
    swal("Good job!", "You clicked the button!", "success");
    swal({
        text: 'Search for a movie. e.g. "La La Land".',
        content: "input",
        button: {
          text: "Search!",
          closeModal: false,
        },
      })
      .then(name => {
        if (!name) throw null;
       
        return fetch(`https://itunes.apple.com/search?term=${name}&entity=movie`);
      })
      .then(results => {
        return results.json();
      })
      .then(json => {
        const movie = json.results[0];
       
        if (!movie) {
          return swal("No movie was found!");
        }
       
        const name = movie.trackName;
        const imageURL = movie.artworkUrl100;
       
        swal({
          title: "Top result:",
          text: name,
          icon: imageURL,
        });
      })
      .catch(err => {
        if (err) {
          swal("Oh noes!", "The AJAX request failed!", "error");
        } else {
          swal.stopLoading();
          swal.close();
        }
      });
}
render(){
    return(
          <>
  <div className="container">
  <div>
    <br></br>
    <table className="table table-responsive table-hover ">
        <thead className="bg-primary">
            <tr>
            <th>Title</th>
            <th>IMDB ID</th>
            <th>Year</th>
            <th>Poster</th>
            <th>Search</th>
            </tr>
        </thead>
    <tbody>
        {
        this.state.movies.map((movie,index)=>(
            <tr>
            <td key={movie.imdbID}>{movie.Title}</td>
            <td key={movie.imdbID}>{movie.imdbID}</td>
            <td key={movie.imdbID}>{movie.Year}</td>
            <td key={movie.imdbID}><img src={movie.Poster} alt="image"></img></td>
            <td><button onClick={()=>this.handle()} type="button" className="btn btn-danger">Search Related Movie</button></td>
            </tr>
        ))
        }
    </tbody>
       </table>
    </div>
  </div>
          </>
        )
    }
}
export default Movie;
