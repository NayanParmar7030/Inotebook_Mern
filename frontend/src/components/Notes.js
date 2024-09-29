
import NoteItems from './NoteItems'
import Notescontext from '../context/NotesContext'
import React, { useContext, useEffect, useState } from 'react'

function Notes() {
  const notesdata = useContext(Notescontext);
  const { notes, getNotes } = notesdata;
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    getNotes();
  }, [])

  const alertData = (data) => {
    if (data.message) {
      setAlert(true);
      setAlertMessage(data.message);
      setTimeout(() => {
        setAlert(false);
    }, 2000);
    }
  }

  return (
    <div className='row my-3'>
      {
        alert && typeof alertMessage != "undefined" ? (
          <div class="alert alert-primary" role="alert">
            {alertMessage}
          </div>
        ) : ''
      }
      {
        notes.length > 0 ?
          notes.map((value) => {
            return <NoteItems note={value} alertData={alertData} />
          }) : 'Sorry no records are found.'
      }

    </div>
  )
}

export default Notes