import React, { useEffect, useState, Route } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams, useHistory, Redirect } from "react-router-dom";

import * as sessionActions from "../../store/session";
import { addNote, listNotes, noteDetails, updateNote } from "../../store/notes";

import './Notes.css'

const NoteForm = ({ hideForm }) => {
  const notes = useSelector(state => state.notes)
  const session = useSelector(state => state.session)
  const dispatch = useDispatch()
  const history = useHistory();

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [notebookId, setNotebookId] = useState(1)

  const userId = session.user.id;

  useEffect(() => {
    dispatch(listNotes())
  }, [])


  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      userId,
      title,
      notebookId,
      content
    };

    const newNote = await dispatch(addNote(payload));
    await dispatch(listNotes(newNote))

    if (newNote) {
      let note = await dispatch(noteDetails(newNote.id))
      console.log("NEW NOTE NOTE", note)
      hideForm()
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    hideForm()
  };

  return (
    <>
      <div>Take Note...</div>
      <form>
        <label>
          Title
          <input
            type="text"
            placeholder="Title..."
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Content
          <input
            type="text"
            placeholder="Content..."
            required
            value={content}
            onChange={(e) => setContent(e.target.value)} />
        </label>
        <label>
          Select Notebook
          <input
            type="number"
            placeholder="NotebookId..."
            required
            value={notebookId}
            onChange={(e) => setNotebookId(e.target.value)} />
        </label>
        <button type="submit" onClick={handleSubmit}>Create Note</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </>
  )
}

export default NoteForm;
