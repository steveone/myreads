import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'


class Search extends Component {

   state = {
    searchString: '',
    searchBooks: [],
    inBookShelf: this.props.books
  }

  changeShelf = (id,shelf) => {
    this.props.addBookToShelf(id,shelf)
    return true
  }

  handleChange = (event) => {
    let newValue = event.target.value
    this.setState(() => ({
      searchString: newValue
      ,searchBooks: this.state.searchBooks
    }))

   if (this.state.searchString.length > 0) {
      BooksAPI.search(this.state.searchString.trim())
        .then((books) => {
        if (books.length > 0) {
          books = books.map((b) => {
            let index = this.state.inBookShelf.findIndex((current) =>
             (current.id === b.id))
             if (index !== -1) {
             b.shelf = this.state.inBookShelf[index].shelf
           }
           return b
       })
        books = books.filter((b,index) => (books.findIndex(current => current.id === b.id) === index))
        this.setState(() => ({
        searchBooks : books,
        inBookShelf: this.props.books
        //searchString: this.state.searchString
        })
      )}
      else {
          this.setState(() => ({
          searchBooks : [],
          //searchString: this.state.searchString
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
        <input type="text" onChange={this.handleChange} placeholder="Search by title or author" value={this.state.searchString}/>

      </div>
    </div>
    <div className="search-books-results">
       <Book books={this.state.searchBooks} bookshelf={this.state.searchBooks.shelf !== undefined ? this.state.searchBooks.shelf:'none'} changeShelf={this.changeShelf}/>
    </div>
  </div>
  )}
}
export default Search
