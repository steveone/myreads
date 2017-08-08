import React from 'react'
import Book from './Book'

class BookShelf extends React.Component {


  render(props){
    let uniqueShelf = [];
    return (
    <div>
      <div className="bookshelf">
        {

          this.props.books.map((b) => {
            let showName = ''
            if (uniqueShelf.indexOf(b.shelf) === -1) {
                uniqueShelf.push(b.shelf);
                  //TODO: reaname shelf names to nicer formatter names
                  if (b.shelf === 'currentlyReading') showName = 'Currently Reading';
                  else if (b.shelf === 'wantToRead') showName = 'Want to Read';
                  else if (b.shelf === 'read') showName = 'Read';
                  return (
                    <div key={b.shelf}>
                      <h2 className="bookshelf-title">{showName}</h2>
                      <div className="bookshelf-books">
                      <Book bookshelf={b.shelf} books={this.props.books} changeShelf={this.props.changeShelf}/>
                      </div>
                    </div>
                  )} //end if (uniqueShelf)
              return false
          }
      )}
    </div>
  </div>
  )}
}

export default BookShelf
