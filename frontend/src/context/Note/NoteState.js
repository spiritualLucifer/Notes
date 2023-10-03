import React, { useState } from "react";
import noteContext from "./noteContext";
import BASE_URL from "../../api";

const NoteState = (props) => {
  // const host = `${BASE_URL}`;
  const [notes, setNotes] = useState([]);
    


  // Get All Notes
const getAllNotes = async () => {
  const authToken = localStorage.getItem('token');

  if (!authToken) {
    console.error('No authentication token found.');
    return;
  }

  // API CALLS
  try {
    const response = await fetch(`${BASE_URL}/api/notes/fetchNotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': authToken,
      },
    });

    if (response.status === 401) {
      console.error('Unauthorized: Invalid or expired token.');
      // You can handle token expiration or invalidation here, e.g., redirect to login.
      // For now, we'll just return.
      return;
    }

    const data = await response.json();
    console.log(data);
    setNotes(data);
  } catch (error) {
    console.error(error.message);
  }
};



  // Add Notes 
  const AddNote = async (title, description, tag) => {
    //API CALLS
    const response = await fetch(`${BASE_URL}/api/notes/AddNotes`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({title, description, tag}),
    });
    let note = await response.json();
    console.log(note);
    setNotes(notes.concat(note))
  }




  //Delete Notes
  const deleteNote = async(id) => {

    //API Calls 
    const response = await fetch(`${BASE_URL}/api/notes/DeleteNotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify(),
    });
    const data = response.json();
    console.log(data);
 

    //Client Side Delete
    const newNote = notes.filter((note) => { return note._id !== id; })
    setNotes(newNote);
  }




  //edite Notes
  const editeNote = async (id, title, description, tag) => {

    //API CALLS 
    const response = await fetch(`${BASE_URL}/api/notes/UpdateNotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({title,description,tag}),
    });
    const data = response.json();
    console.log(data);
    getAllNotes();
  }


  return (
    <noteContext.Provider value={{ notes, AddNote, deleteNote, editeNote, getAllNotes}}>
      {props.children}
    </noteContext.Provider>
  );
}
export default NoteState;