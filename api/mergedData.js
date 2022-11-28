import { getSingleAuthor, deleteSingleAuthor } from './authorData';
import { getSingleBook, getBooksByAuthor, deleteBook } from './bookData';

// for merged promises
const getBookDetails = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleBook(firebaseKey).then((bookObj) => {
    getSingleAuthor(bookObj.author_id)
      .then((authorObject) => resolve({ ...bookObj, authorObject }));
  }).catch(reject);
});

const getAuthorBooks = async (firebaseKey) => {
  const author = await getSingleAuthor(firebaseKey);
  const booksArray = await getBooksByAuthor(author.firebaseKey);

  return { ...author, booksArray };
};

const deleteAuthorBooksRelationship = (firebaseKey) => new Promise((resolve, reject) => {
  getBooksByAuthor(firebaseKey).then((booksArray) => {
    const deleteBookPromises = booksArray.map((book) => deleteBook(book.firebaseKey));

    Promise.all(deleteBookPromises).then(() => {
      deleteSingleAuthor(firebaseKey).then(resolve);
    });
  }).catch(reject);
});

export { getBookDetails, getAuthorBooks, deleteAuthorBooksRelationship };
