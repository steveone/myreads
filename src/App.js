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

addBookToShelf = (book,shelf) =>
{
console.log("addBookToShelf in apps.js was called with book id " + book.id + "to shelf " + shelf)
//check if book is already on shelf, if it is, just change shelf
if (this.state.books.findIndex((c => c.id === book.id)) > -1) {
  console.log("the book is already on shelf, calling changeBookShelf")
  this.changeBookShelf(book,shelf)
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

changeBookShelf = (book,shelf) => {
    //alert(book.id + " was changed to " + shelf);
    //console.log(book);
//    let index = this.state.books.map(b=> (b.id === book.id)).indexOf(book.id)
//    console.log(index + " is the index")
    let currentState = this.state.books.filter(b => b.id === book.id)
    currentState[0].shelf= shelf
    this.setState({
      books: [...this.state.books.filter(b => b.id !== book.id),...currentState]
    })
  //update server
   BooksAPI.update(book.id,shelf)
  }

  componentDidMount() {
   BooksAPI.getAll().then((books) =>
   this.setState({
     books
   })
   )
   return false
 }

  render() {
    return (
      <div className="app">
        <Route path="/Search" render={() => (
            <Search books={this.state.books} addBookToShelf = {this.addBookToShelf}/>
         )}/>
         <Route exact path="/" render={() => (
           <Listbooks books={this.state.books} changeShelf={this.changeBookShelf} />

       )}/>
       </div>
)}
}

export default BooksApp
