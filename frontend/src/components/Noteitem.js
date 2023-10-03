import React,{ useContext} from "react";
import noteContext from "../context/Note/noteContext";

function Noteitem(props) {

    const context = useContext(noteContext);
    const {deleteNote} = context;
    const dele=()=>{
           deleteNote(props.note._id);
           props.showAlert("Note Deleted","warning");
    }

    return (
        <div className='col-md-3 my-3'>
            <div className="card">
                <div className="card-body">
                    <div className='container d-flex align-items-center'>
                        <h5 className="card-title">{props.note.title}</h5>
                        <i className="fa-solid fa-trash mx-2" onClick={dele}></i>
                        <i className="fa-solid fa-file-pen mx-2" onClick={()=>{props.updateNote(props.note)}}></i>
                    </div>
                    <p className="card-text">{props.note.description}</p>
                </div>
            </div>
        </div>

    )
}

export default Noteitem