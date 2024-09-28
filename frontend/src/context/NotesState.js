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
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZkZGJjYjI0M2MzNjcxMWU2OThmYTNhIn0sImlhdCI6MTcyNTgwNzgxNH0.f6_r9L__mSO-GsqzjNQSkJxv9uzPn-Y1L82keFfZTm8',
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

  // Add note

  const addNote = (props) => {


    const newnote = {
      "_id": "asdasdasdasd12312",
      "user": "66ddbcb243c36711e698fa3a",
      "title": props.title,
      "description": props.description,
      "tag": props.tag,
      "date": "2024-09-21T10:55:25.344Z",
      "__v": 0
    };

    setNotes(notes.concat(newnote));
  }

  // Delete note

  const deleteNote = async (id) => {

    try {
      const response = await fetch(`${host}/api/notes/deletenote/` + id, {
        method: "DELETE",
        headers: {
          'content-type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZkZGJjYjI0M2MzNjcxMWU2OThmYTNhIn0sImlhdCI6MTcyNTgwNzgxNH0.f6_r9L__mSO-GsqzjNQSkJxv9uzPn-Y1L82keFfZTm8',
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
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZkZGJjYjI0M2MzNjcxMWU2OThmYTNhIn0sImlhdCI6MTcyNTgwNzgxNH0.f6_r9L__mSO-GsqzjNQSkJxv9uzPn-Y1L82keFfZTm8',
        },
        body: JSON.stringify(notedata),

      });
      const updatedjson = await updateData.json();

      console.log("updatedjson",updatedjson);
      
    } catch (error) {

    }

  }
  return (
    <Notescontext.Provider value={{ notes, addNote, deleteNote, getNotes,updateNote }}>
      {props.children}
    </Notescontext.Provider>
  )

}

export default NoteState;