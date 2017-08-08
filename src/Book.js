import React from 'react'



//const Book = (props) => {
class Book extends React.Component {

render(props){
  let bookList = []
  //if the bookshelf is not none, we are going to filter the books
  //to only show the ones on the bookshelf passed as a prop
  if (this.props.bookshelf !== 'none') {
    bookList = this.props.books.filter((b) => {
      if ((b.shelf === this.props.bookshelf) && (b !== 'undefined') && (b !== 'none')) {
        return b;
      }
      return false
    })
  }
  //if bookshelf prop was passed as none, we show all books sent
  //since we are in search or were asked to show all books
  else {
    bookList = this.props.books
  }

return (
      <ol className="books-grid">
        {bookList === 'undefined' || bookList.map((b = []) =>
        <li key={b.id}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${b.imageLinks !== undefined? b.imageLinks.thumbnail:''})`}}></div>
              <div className="book-shelf-changer">
                <select onChange={(e) =>this.props.changeShelf(b,e.target.value)} value={b.shelf}>
                  <option value="none" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{b.title}</div>
            <div className="book-authors">{b.authors}</div>
          </div>
        </li>
        )}
      </ol>
    )}
  }

export default Book
