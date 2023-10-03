import React,{ useContext,useState } from "react";
import noteContext from "../context/Note/noteContext";

function AddNote() {
    const context = useContext(noteContext);
    const {AddNote} = context;
    const [note,setNote] = useState({title:"",description:"",tag:""})
    const onClick =(e)=>{
        e.preventDefault();
        AddNote(note.title,note.description,note.tag);
    }

    const onChange=(e)=>{
        setNote({...note,[e.target.name] : e.target.value})
    }

    return (
        <> 
            <div className='my-3'><h2>Add Notes</h2></div>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Titile</label>
                    <input type="text" className="form-control" id="tile" name="title"aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                    <input type="text" className="form-control" id="decription" name="description" onChange={onChange} />
                </div>
                <div className="mb-3 ">
                    <label className="form-check-label" htmlFor="exampleCheck1">tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} />
                </div>
                <button  type="submit" className="btn btn-primary" onClick={onClick}>Add Notes</button>
            </form>
            </>
    )
}

export default AddNote