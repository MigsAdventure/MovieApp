const App = React.createClass({
  getInitialState() {
    return {
      movies: [],
      likes: 0,
      id: ''
    }
  },

  addNewMovie(movie) {
    let {movies} = this.state;
    this.setState({
      movies: [...movies, movie]
    });
  },

  incrementLikes(movieId) {
    console.log("works");
    
  },

  decrementLikes() {
    console.log("works");
  },

  render() {
    const {movies, likes} = this.state;
      return (
        <div>
          <h1>Movies</h1>
          <InputForm addNewMovie = {this.addNewMovie}/>
          <TableEdit allMovies = {movies}/>
        </div>
      ) //end of return
    } //end of render


}); //end of App component



const TableEdit = React.createClass({
  getInitialState() {
    return {
    newMovie: '',
    movieId: ''
    }
  },

  newName(e) {
    let {newMovie} = this.state;

    this.setState({
      newMovie: e.target.value
    });
  },

  getId() {
      let {id} = this.state;
       let currId = id;
      this.setState({
        id: currId
      });      
    },

  render() {
    const {allMovies} = this.props;
    return (
       <div>
        <div id="editModal" className="modal fade" role="dialog" >
          <div className="modal-dialog">
          <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal">&times;</button>
            <h4 className="modal-title">Edit Movie</h4>
          </div>
          <div className="modal-body">
            <div className="form-group row" id="inputsGroup">
                <label htmlFor="transactionIn">Movie Name</label>
                <input type="text" name="" ref="nameInEdit" id="nameInEdit" onChange={this.getName} />
              </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" data-dismiss="modal">Save</button>
          </div>
        </div>

      </div>
    </div>
        <table className="table">
          <thead>
            <tr className="col-xs-8 row">
              <th className="col-xs-2 text-center">Image</th>
              <th className="col-xs-4 text-center">Name</th>
              <th className="col-xs-2 text-center">Likes</th>
              <th className="col-xs-2 text-center">Edit</th>
            </tr>
          </thead>
          <tbody>
          {allMovies.map((movie) => // maps through transactions
            (
            <tr className="col-xs-12 row" key={movie.id} id= {movie.id}>
              <td className="col-xs-2 text-center"><img src={movie.img}/></td> 
              <td className="col-xs-4 text-center">{movie.name}</td>
              <td className="col-xs-2 text-center" id={movie.id}>{movie.likes}<span className="glyphicon glyphicon-thumbs-up" onClick={this.incrementLikes}></span><span className="glyphicon glyphicon-thumbs-down" onClick={() => this.getId(movie.id)}></span></td>
              <td className="col-xs-2 text-center"><button id="editBtn" className="btn btn-success btn-md" data-toggle="modal" data-target="#editModal" value={movie.id} onClick={() => this.getId(movie.id)} ref="editBtn">Edit</button></td> 
            </tr>
            ) //end of return
          ) //end of map
        } 
          </tbody>

        </table>
      </div>
    ) //end of return 
  }
});

const InputForm = React.createClass({
  getInitialState () {
    return {
    likes: 0  
    }
  },

  submitForm(e) {
    e.preventDefault();
    let {likes} = this.state;
    let {nameInput, imgInput} = this.refs;
    let movie = {
      img: imgInput.value,
      name: nameInput.value,
      id: Date.now(), 
      likes: likes
    }
     this.props.addNewMovie(movie); //passing the movie object created
     console.log("id given to element clicked: ",movie.id);
     console.log("name of movie: " , movie.name);
     },

     incrementLikes() { //wont work here 
      let {likes} = this.state;
      this.state({
        likes: likes + 1
      }); 


     },

     decrementLikes() { //wont work here

     },

  render() {
    return (
        <form onSubmit={this.submitForm}>
          <div className="form-group">
            <label htmlFor="newName" className="">Movie Name: </label>
            <input ref="nameInput" type="text" className="form-control" id="newName" />
            <label htmlFor="newName" className="">Img</label>
            <input ref="imgInput" type="text" className="form-control" id="setImage"/>
          </div>
          <button className="btn btn-primary">Add Movie</button>
        </form>
      )//end of return
  }
}); //END of newProductForm component


ReactDOM.render(
  <App/>, 
  document.getElementById("root")
  );



