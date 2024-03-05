import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/books/${id}`)
    .then((response) => {
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear)
        setTitle(response.data.title)
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        alert('An error happened. Please Chack console');
        console.log(error);
      });
  }, [])
  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        alert('An error happened. Please Chack console');
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
  <BackButton />
  <h1 className='text-3xl my-4 text-indigo-700'>Edit Book</h1>
  {loading ? <Spinner /> : ''}
  <div className='flex flex-col border-2 border-blue-400 rounded-xl max-w-md p-4 mx-auto bg-gray-100'>
    <div className='my-4'>
      <label className='text-lg text-gray-600'>Title</label>
      <input
        type='text'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className='border-2 border-blue-400 px-3 py-2 w-full focus:outline-none focus:border-indigo-500'
      />
    </div>
    <div className='my-4'>
      <label className='text-lg text-gray-600'>Author</label>
      <input
        type='text'
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className='border-2 border-blue-400 px-3 py-2 w-full focus:outline-none focus:border-indigo-500'
      />
    </div>
    <div className='my-4'>
      <label className='text-lg text-gray-600'>Publish Year</label>
      <input
        type='number'
        value={publishYear}
        onChange={(e) => setPublishYear(e.target.value)}
        className='border-2 border-blue-400 px-3 py-2 w-full focus:outline-none focus:border-indigo-500'
      />
    </div>
    <button className='p-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none' onClick={handleEditBook}>
      Save
    </button>
  </div>
</div>
  );
}
export default EditBook;
