import React from 'react'

const Book = (props) => {
  let bookList = props.books.filter((b) => {
   if (b.shelf === props.bookshelf) { return b
      }
      return false
    })
console.log("in book");

return (
  <ol className="books-grid">

{bookList.map(b =>
<li key={b.id}>
  <div className="book">
    <div className="book-top">
      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${b.imageLinks.smallThumbnail})`}}></div>
      <div className="book-shelf-changer">
        <select onChange={(e) =>props.changeShelf(b,e.target.value)} value={b.shelf}>
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
</ol>)
}
export default Book