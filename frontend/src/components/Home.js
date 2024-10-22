import React from 'react'
import Notes from './Notes';
import AddNote from './AddNote';

const Home = () => {
  return (
    <div className='container my-3'>
      {
        localStorage.getItem('token') ? (
          <>
            <h1>Add Your Note</h1>
            <AddNote />
            <h1>Your Notes</h1>
            <Notes />
          </>
        ):<h1>Please login to Continue InoteBook</h1>
      }

    </div>
  )
}

export default Home;