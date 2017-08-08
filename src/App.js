import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Search from './Search'
import Listbooks from './List-books'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

//TODO: function used to add items from search to bookshelf if a user selects a shelf
//      to put it on
addBookToShelf = (book,shelf) =>
  {
    //console.log("addBookToShelf in apps.js was called with book id " + book.id + "to shelf " + shelf)

    //TODO: check if book is already on shelf, if it is, just change shelf
    if (this.state.books.findIndex((c => c.id === book.id)) > -1) {
      //console.log("the book is already on shelf, calling changeBookShelf")
      this.changeBookShelf(book,shelf);
      }
      else {
        console.log("we need to add it to a shelf")
        book.shelf = shelf
        let currentBookShelf = this.state.books.concat([book])
        this.setState({
          books: currentBookShelf
          })
      }
    }

//TODO: handle a user moving a bookshelf from one shelf to another
changeBookShelf = (book,shelf) => {
    //get current book and it's state
    let currentState = this.state.books.filter(b => b.id === book.id);
    //change the shelf of the book we are moving
    currentState[0].shelf= shelf
    //update state with the current book minus the book changing state
    //and then concatinate the book that changed shelfs back to the array
    this.setState({
      books: [...this.state.books.filter(b => b.id !== book.id),...currentState]
      })
  //TODO: update book on server to new shelf
   BooksAPI.update(book.id,shelf)
  }

  //TODO: when the book display mounts, get all books currently on shelfs for display
  //      or to compare to books returned in search to set their shelfs if they are already
  //      on a shelf
  componentDidMount() {
   BooksAPI.getAll().then((books) =>
    this.setState({
      books
      })
    );
   return false;
  }

  render() {
    return (
      <div className="app">
        {
          //TODO: handle search Route
        }
        <Route path="/Search" render={() => (
            <Search books={this.state.books} addBookToShelf = {this.addBookToShelf}/>
         )}/>
        {
          //TODO: handle default route but only on exact match
        }
        <Route exact path="/" render={() => (
           <Listbooks books={this.state.books} changeShelf={this.changeBookShelf} />
          )}/>
      </div>
    )}
}

export default BooksApp
