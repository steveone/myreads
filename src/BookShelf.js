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
   if (uniqueShelf.indexOf(b.shelf) === -1) {
     uniqueShelf.push(b.shelf)
 return (
  <div key={b.shelf}>
  <h2 className="bookshelf-title">{b.shelf}</h2>
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
