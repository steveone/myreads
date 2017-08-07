import React from 'react'
import Book from './Book'

//class BookShelf extends React.Component {


  let BookShelf = (props,id) => {

    let uniqueShelf = [];
    return (
<div>
<div className="bookshelf">
{
  props.books.map((b) => {
    let showName = ''

   if (uniqueShelf.indexOf(b.shelf) === -1) {
     uniqueShelf.push(b.shelf)

     if (b.shelf === 'currentlyReading') showName = 'Currently Reading'
     else if (b.shelf === 'wantToRead') showName = 'Want to Read'
     else if (b.shelf === 'read') showName = 'Read'
 return (
  <div key={b.shelf}>
  <h2 className="bookshelf-title">{showName}</h2>
  <div className="bookshelf-books">
    <Book bookshelf={b.shelf} books={props.books} changeShelf={props.changeShelf}/>
  </div>
</div>

)

} //end if (uniqueShelf)
return false

})}

</div>
</div>
)

}

//}
export default BookShelf
