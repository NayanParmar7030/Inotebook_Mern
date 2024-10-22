import { useState } from "react";
import Notescontext from "./NotesContext";

const NoteState = (props) => {

  const host = "http://localhost:5000";

  // Fetch API

  const getNotes = async () => {

    try {
      const response = await fetch(`${host}/api/notes/fetchnotes`, {
        method: "GET",
        headers: {
          'content-type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        }

      });
      const json = await response.json();
      if (json) {
        setNotes(json);
      }
    } catch (error) {

    }
  }

  const initialNotes = [];

  const [notes, setNotes] = useState(initialNotes);

  const authValue = localStorage.getItem('token');
  

  // Add note

  const addNote = async (props) => {

    try {
      const newNoteData = await fetch(`${host}/api/notes/addnote/`, {
        method: "POST",
        headers: {
          'content-type': 'application/json',
          'auth-token': authValue,
        },
        body: JSON.stringify(props),

      });
      const InsertedData = await newNoteData.json();

      if(InsertedData.success && typeof InsertedData.saveNote !='undefined'){
        console.log("in");
        setNotes(notes.concat(InsertedData.saveNote));
      }
      // setNotes(SaveData)
       return InsertedData;
      
    } catch (error) {
        console.log("error",error);
    }

  }

  // Delete note

  const deleteNote = async (id) => {

    try {
      const response = await fetch(`${host}/api/notes/deletenote/` + id, {
        method: "DELETE",
        headers: {
          'content-type': 'application/json',
          'auth-token': authValue,
        }

      });
      const json = await response.json();
      if (json) {
        setNotes(json);
      }
    } catch (error) {

    }
  }

  // update note


  const updateNote = async (notedata) => {

    try {
      const updateData = await fetch(`${host}/api/notes/updatenote/`+notedata._id, {
        method: "PUT",
        headers: {
          'content-type': 'application/json',
          'auth-token': authValue,
        },
        body: JSON.stringify(notedata),

      });
      const updatedjson = await updateData.json();
      return updatedjson;
      
    } catch (error) {
        console.log("error",error);
    }

  }

  // Auth Token

  

  return (
    <Notescontext.Provider value={{ notes, addNote, deleteNote, getNotes,updateNote }}>
      {props.children}
    </Notescontext.Provider>
  )

}

export default NoteState;