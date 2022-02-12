import React, { useEffect, useState, Route } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import NotebookEditModal from "./NotebookEditModal";
import * as sessionActions from "../../store/session";

import NotesPage from "../Notes";
import NoteDetail from "../Notes/NoteDetail";

import { listNotebooks, noteDetails, editNote, deleteNotebook } from "../../store/notebooks";

import './Notebooks.css'

const NotebookDetail = () => {
  const { notebookId } = useParams();

  const notebooks = useSelector(state => state.notebooks)
  const allNotes = useSelector(state => state.notes)
  const session = useSelector(state => state.session);

  const dispatch = useDispatch();
  const history = useHistory()

  const [hideNotebookDetails, setHideNotebookDetails] = useState(false)

  let notebook = notebooks[notebookId]
  let notesList = Object.values(allNotes)
  let notes = notesList.filter(note => {
    return note.notebookId === notebook.id
  })

  console.log("ALL THESE NOTES", notes)

  useEffect(() => {
    dispatch(listNotebooks(notebooks))
  }, [dispatch])

  async function deleteNotebookFunc() {
    await dispatch(deleteNotebook(notebookId))
    history.push("/notebooks")
  }

  const userId = session.user.id;

  if (!notebook) {
    return (
      <div
        className="notebookDetailBackground"
        hidden={hideNotebookDetails}
      >
        <div className="title" style={{ color: "red" }}>Notebook not found!</div>
        <div className="content" style={{ color: "red" }}>
          <b>
            This notebook has been deleted. Please select another note...
          </b>
        </div>
      </div >
    )
  } else return (
    <>
      <div
        className="notebookDetails"
        hidden={hideNotebookDetails}>
        <div className="buttonDetails">
          <NotebookEditModal
            notebook={notebook}
          />
          <button
            className="deleteButton"
            onClick={deleteNotebookFunc}
          >
            Delete Notebook
          </button>
        </div>
      </div>
      <div
        className="notebookNotesPageDiv"
        hidden={hideNotebookDetails}
      >
        {notes}
      </div>
    </>
  )
}

export default NotebookDetail;