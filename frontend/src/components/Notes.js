import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from "../context/Note/noteContext";
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import './Notes.css';
import { useNavigate } from "react-router-dom";

function Notes(props) {
    const context = useContext(noteContext);

    const { notes, getAllNotes, editeNote } = context;

    let history = useNavigate();
    if (!localStorage.getItem('token')) {
        history('/login');
    }
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getAllNotes();
        }
        else {
            history('/login');
        }
    }, []);

    const ref = useRef(null);
    const refClose = useRef(null);

    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }

    const onClick = (e) => {
        editeNote(note.id, note.etitle, note.edescription, note.etag);
        props.showAlert("Note Updated", 'success');
        refClose.current.click();
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <> <AddNote />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Node</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Titile</label>
                                    <input type="text" className="form-control" id="etile" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edecription" name="edescription" value={note.edescription} onChange={onChange} />
                                </div>
                                <div className="mb-3 ">
                                    <label className="form-check-label" htmlFor="exampleCheck1">tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={onClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3'>
                <h2> Your Notes</h2>
                {/* <div className='container'>
                      {notes.length === 0 && <p>NO NOTES TO DISPLAY</p>}
                      

                </div>
                {notes !=null && notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
                })} */}

                <div className='container'>
                    {Array.isArray(notes) && notes.length === 0 && <p>NO NOTES TO DISPLAY</p>}
                </div>
                {Array.isArray(notes) &&
                    notes.map((note) => {
                        return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />;
                    })
                }

            </div>
        </>
    )
}

export default Notes;