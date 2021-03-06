import React, { Component } from "react";
import { movies } from "./getMovies";
export default class Favourite extends Component {
  constuctor() {
    super();
    this.state = {
      genres: [],
      currgen: "All Genres",
      movies: [],
      currText: "",
    }
  }
  render() {
    let genreids = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Sci-Fi",
      10770: "TV",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };

    let filterarr = [];

    if (this.state.currText === "") {
      filterarr = this.state.movies;
    } else {
      filterarr = this.state.movies.filter((movieObj) => {
        let title = movieObj.original_title.toLowerCase();
        return title.includes(this.state.currText.toLowerCase());
      });
    }

    // if(this.state.currgen=="All Genres"){
    //     filterarr = this.state.movies
    // }
    if (this.state.currgen != "All Genres") {
      filterarr = this.state.movies.filter(
        (movieObj) => genreids[movieObj.genre_ids[0]] == this.state.currgen
      );
    }
    let pages = Math.ceil(filterarr.length / this.state.limit);
    let pagesarr = [];
    for (let i = 1; i <= pages; i++) {
      pagesarr.push(i);
    }
    let si = (this.state.currPage - 1) * this.state.limit;
    let ei = si + this.state.limit;
    filterarr = filterarr.slice(si, ei);
    return (
      <div>
        <>
          <div className="main">
            <div className="row">
              <div className="col-lg-3 col-sm-12">
                <ul class="list-group favourites-genres">
                  {this.state.genres.map((genre) =>
                    this.state.currgen == genre ? (
                      <li
                        class="list-group-item"
                        style={{
                          background: "#3f51b5",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        {genre}
                      </li>
                    ) : (
                      <li
                        class="list-group-item"
                        style={{ background: "white", color: "#3f51b5" }}
                        onClick={() => this.handleGenreChange(genre)}
                      >
                        {genre}
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="col-lg-9 favourites-table col-sm-12">
                <div className="row">
                  <input
                    type="text"
                    className="input-group-text col"
                    placeholder="Search"
                    value={this.state.currText}
                    onChange={(e) =>
                      this.setState({ currText: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    className="input-group-text col"
                    placeholder="Rows Count"
                    value={this.state.limit}
                    onChange={(e) => this.setState({ limit: e.target.value })}
                  />
                </div>
                <div className="row">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Genre</th>
                        <th scope="col">
                          <i
                            class="fas fa-sort-up"
                            onClick={this.sortPopularityDesc}
                          />
                          Popularity
                          <i
                            class="fas fa-sort-down"
                            onClick={this.sortPopularityAsc}
                          ></i>
                        </th>
                        <th scope="col">
                          <i
                            class="fas fa-sort-up"
                            onClick={this.sortRatingDesc}
                          ></i>
                          Rating
                          <i
                            class="fas fa-sort-down"
                            onClick={this.sortRatingAsc}
                          ></i>
                        </th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filterarr.map((movieObj) => (
                        <tr>
                          <td>
                            <img
                              src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                              alt={movieObj.title}
                              style={{ width: "5rem" }}
                            />{" "}
                            {movieObj.original_title}
                          </td>
                          <td>{genreids[movieObj.genre_ids[0]]}</td>
                          <td>{movieObj.popularity}</td>
                          <td>{movieObj.vote_average}</td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-danger"
                              onClick={() => this.handleDelete(movieObj.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <nav aria-label="Page navigation example">
                  <ul class="pagination">
                    {pagesarr.map((page) => (
                      <li class="page-item">
                        <a
                          class="page-link"
                          onClick={() => this.handlePageChange(page)}
                        >
                          {page}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </>
      </div>
    );
  }
}
