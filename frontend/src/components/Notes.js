
import NoteItems from './NoteItems'
import Notescontext from '../context/NotesContext'
import React,{ useContext, useEffect } from 'react'

function Notes() {
    const notesdata = useContext(Notescontext);
    const {notes,getNotes} = notesdata;

    useEffect(()=>{
      getNotes();
    },[])
  return (
    <div className='row my-3'>
        {
          notes.length > 0 ?
            notes.map((value)=>{
                return <NoteItems note={value}/>
            }):'Sorry no records are found.'
        }
        
    </div>
  )
}

export default Notes