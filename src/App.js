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

changeBookShelf = (book,shelf) => {
    //alert(book.id + " was changed to " + shelf);
    //console.log(book);
//    let index = this.state.books.map(b=> (b.id === book.id)).indexOf(book.id)
//    console.log(index + " is the index")
    let currentState = this.state.books.filter(b => b.id === book.id)
    console.log(currentState)

    currentState[0].shelf= shelf
    console.log(this.state)
    this.setState({
      books: [...this.state.books.filter(b => b.id !== book.id),...currentState]
    })}

  componentDidMount() {
   BooksAPI.getAll().then((books) => this.setState({
     books
   })
   )
   return false

 }

  render() {
    return (
      <div className="app">
        <Route path="/Search" render={() => (
            <Search />
         )}/>
         <Route exact path="/" render={() => (
           <Listbooks books={this.state.books} changeShelf={this.changeBookShelf} />

       )}/>
       </div>
)}
}

export default BooksApp
