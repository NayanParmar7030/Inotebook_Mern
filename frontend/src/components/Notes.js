
import NoteItems from './NoteItems'
import Notescontext from '../context/NotesContext'
import React,{ useContext } from 'react'

function Notes() {
    const notes = useContext(Notescontext);
    const {note} = notes;
  return (
    <div className='row my-3'>
        {
            note.map((value)=>{
                return <NoteItems note={value}/>
            })
        }
        
    </div>
  )
}

export default Notes