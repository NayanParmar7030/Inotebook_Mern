import React,{ useContext } from 'react';
import Notescontext from '../context/NotesContext';
const About = () => {

  const test = useContext(Notescontext);

  console.log(test);

  return (
    <div>About {test.name}</div>
  )
}

export default About