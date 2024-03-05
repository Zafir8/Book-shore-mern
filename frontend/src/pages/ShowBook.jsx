import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-4'>
  <BackButton />
  <h1 className='text-3xl my-4'>Show Book</h1>
  {loading ? (
    <Spinner />
  ) : (
    <table className='min-w-full bg-white border border-gray-300 shadow-md rounded-md'>
      <tbody>
        {/* Row 1 */}
        <tr className="bg-gray-100">
          <td className="py-2 px-4 border-b font-semibold">Id</td>
          <td className="py-2 px-4 border-b">{book._id}</td>
        </tr>
        {/* Row 2 */}
        <tr className="bg-white">
          <td className="py-2 px-4 border-b font-semibold">Title</td>
          <td className="py-2 px-4 border-b">{book.title}</td>
        </tr>
        {/* Row 3 */}
        <tr className="bg-gray-100">
          <td className="py-2 px-4 border-b font-semibold">Author</td>
          <td className="py-2 px-4 border-b">{book.author}</td>
        </tr>
        {/* Row 4 */}
        <tr className="bg-white">
          <td className="py-2 px-4 border-b font-semibold">Publish Year</td>
          <td className="py-2 px-4 border-b">{book.publishYear}</td>
        </tr>
        {/* Row 5 */}
        <tr className="bg-gray-100">
          <td className="py-2 px-4 border-b font-semibold">Create Time</td>
          <td className="py-2 px-4 border-b">{new Date(book.createdAt).toString()}</td>
        </tr>
        {/* Row 6 */}
        <tr className="bg-white">
          <td className="py-2 px-4 border-b font-semibold">Last Update Time</td>
          <td className="py-2 px-4 border-b">{new Date(book.updatedAt).toString()}</td>
        </tr>
      </tbody>
    </table>
  )}
</div>
  )
}

export default ShowBook;
