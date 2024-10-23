import React,{useContext} from 'react'
import Notes from './Notes';
import AddNote from './AddNote';
import Notescontext from '../context/NotesContext';
const Home = () => {
  const { tokenData } = useContext(Notescontext);
  console.log("authToken1111",tokenData);
  return (
    <div className='container my-3'>
      {
        tokenData ? (
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