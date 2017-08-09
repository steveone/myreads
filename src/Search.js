import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import {debounce} from 'throttle-debounce'

class Search extends Component {
   state = {
    searchString: '',
    searchBooks: [],
    inBookShelf: this.props.books
   }

  //handle adding book from search to shelf
  //      or changing to new shelf if it was already on a shelf
  changeShelf = (book,shelf) => {
    this.props.addBookToShelf(book,shelf);
    const searchBooks = this.state.searchBooks.map((b) => {
      const index = this.state.inBookShelf.findIndex((b) => (b.id === book.id));
      b.shelf = (index !== -1) ? b.shelf = shelf : b.shelf;
      return b
    });
    this.setState({
      searchBooks
    })
    return true;
  }

  //handle changing of search string, storing value in state
  //      and searching if the value is at least one character long

  handleSearch = (event) => {
    const searchString = event.target.value;
    //use debounce to limit speed of search if someone is slowly
    //typing into search
    debounce(300,this.handleSearchDebounce(searchString));
  }

  handleSearchDebounce = (searchString) => {
    this.setState(() => ({
      searchString
      ,searchBooks: this.state.searchBooks
      }))
   //verify the search string is over one character long before searching
   if (this.state.searchString.length > 0) {
      //call book search API
      BooksAPI.search(this.state.searchString.trim())
      .then((books) => {
        //If more then one book was returned, update state so they will display
        if (books.length > 0) {
          const searchBooks = books.map((b) => {
            const index = this.state.inBookShelf.findIndex((current) => (current.id === b.id));
            b.shelf = (index !== -1) ? this.state.inBookShelf[index].shelf : 'none';
            return b
          })
        this.setState(() => ({
          searchBooks,
          inBookShelf: this.props.books
        })
      )}
      else {
        this.setState(() => ({
        searchBooks : [],
          }))
        }
      })
    }
  }

  render(){
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
          {/*
          NOTES: The search from BooksAPI is limited to a particular set of search terms.
          You can find these search terms here:
          https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
          However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
          you don't find a specific author or title. Every search is limited by search terms.
          */}
          <input type="text" onChange={this.handleSearch} placeholder="Search by title or author" value={this.state.searchString}/>
          </div>
        </div>
      <div className="search-books-results">
        <Book books={this.state.searchBooks} bookshelf={this.state.searchBooks.shelf !== undefined ? this.state.searchBooks.shelf:'none'} changeShelf={this.changeShelf}/>
      </div>
    </div>
  )}
}
export default Search
