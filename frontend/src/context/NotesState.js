import { useState } from "react";
import Notescontext from "./NotesContext";

const NoteState = (props) => {

    const initialNotes = [
        {
          "_id": "66eea61d7aea40425d9cb70b",
          "user": "66ddbcb243c36711e698fa3a",
          "title": "Krish notebookdsa",
          "description": "Hello How are you",
          "tag": "Youtube",
          "date": "2024-09-21T10:55:25.344Z",
          "__v": 0
        },
        {
            "_id": "66eea61d7aea40425d9cb70b",
            "user": "66ddbcb243c36711e698fa3a",
            "title": "Krish notebookdsa",
            "description": "Hello How are you",
            "tag": "Youtube",
            "date": "2024-09-21T10:55:25.344Z",
            "__v": 0
          },
          {
            "_id": "66eea61d7aea40425d9cb70b",
            "user": "66ddbcb243c36711e698fa3a",
            "title": "Krish notebookdsa",
            "description": "Hello How are you",
            "tag": "Youtube",
            "date": "2024-09-21T10:55:25.344Z",
            "__v": 0
          },
          {
            "_id": "66eea61d7aea40425d9cb70b",
            "user": "66ddbcb243c36711e698fa3a",
            "title": "Krish notebookdsa",
            "description": "Hello How are you",
            "tag": "Youtube",
            "date": "2024-09-21T10:55:25.344Z",
            "__v": 0
          },
          {
            "_id": "66eea61d7aea40425d9cb70b",
            "user": "66ddbcb243c36711e698fa3a",
            "title": "Krish notebookdsa",
            "description": "Hello How are you",
            "tag": "Youtube",
            "date": "2024-09-21T10:55:25.344Z",
            "__v": 0
          },
          {
            "_id": "66eea61d7aea40425d9cb70b",
            "user": "66ddbcb243c36711e698fa3a",
            "title": "Krish notebookdsa",
            "description": "Hello How are you",
            "tag": "Youtube",
            "date": "2024-09-21T10:55:25.344Z",
            "__v": 0
          }
      ];

      const [note,setNote] = useState(initialNotes);
    return (
        <Notescontext.Provider value={{note,setNote}}>
            {props.children}
        </Notescontext.Provider>
    )

}

export default NoteState;