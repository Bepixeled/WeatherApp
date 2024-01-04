import './App.css';
import React from 'react';
import Weather from './components/Weather';
import * as Unicons from '@iconscout/react-unicons';



function App() {


  return (
    <div className="App flex flex-col items-center w-full h-auto lg:h-screen bg-gradient-to-b from-light-keppel-800 to-light-emerald-700 my-auto pt-6 pb-10 ">
      <div className='flex flex-row items-center'> {/* Header */}
        <input
          id="search"
          className='w-64 rounded-lg h-10 p-2 my-2 bg-transparent focus:outline-none'
          type='text'
          placeholder='Search City'


        />
        <button
          id="button"
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg'

        >
          <Unicons.UilSearch size={20} color='#000' className='right-8' />
        </button>
      </div>
      <hr className='border border-light-verdigris-400 mb-2 w-80'></hr>
      <Weather />



    </div>
  );
}

export default App;
