import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import ApiContext from '../ApiContext'
import config from '../config'
import { getNotesForFolder } from '../notes-helpers'
import './NoteListMain.css'

export default class NoteListMain extends React.Component {

  static defaultProps = {
    match: {
      params: {}
    }
  }

  static contextType = ApiContext

  handleFolderDelete = e => {
    e.preventDefault()
    const folderId = this.props.match.params.folderId
    fetch(`${config.API_ENDPOINT}/folders/${folderId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(() => {
        this.context.deleteFolder(folderId)
        this.props.history.push(`/`)
      })
  }

  showDeleteFolder = () => {
    const folderId = this.props.match.params.folderId
    const anynote = this.context.notes.some(n => n.folderid === folderId)
    console.log(folderId, anynote)
    if (!anynote && folderId) {
      return (
        <CircleButton
          tag={Link}
          to='/'
          type='button'
          className='NoteListMain__add-note-button'
          onClick={this.handleFolderDelete}
        >
          {/* <FontAwesomeIcon icon='minus' /> */}
          Delete
          <br />
          Folder
        </CircleButton>
      )
    }
    return ('')
  }

  render() {
    const { folderId } = this.props.match.params
    console.log(folderId, this.props.match.params)
    console.log(this.context)
    const { notes=[] } = this.context
    const notesForFolder = getNotesForFolder(notes, folderId)
    console.log(notes, notesForFolder)
    return (
      <section className='NoteListMain'>
        <ul>
          {notesForFolder.map(note =>
            <li key={note.id}>
              <Note
                id={note.id}
                name={note.name}
                modified={note.modified}
                content={note.content}
                folderid={note.folderid}
              />
            </li>
          )}
        </ul>
        <div className='NoteListMain__button-container'>
          {this.showDeleteFolder()}
          <CircleButton
            tag={Link}
            to='/add-note'
            type='button'
            className='NoteListMain__add-note-button'
          >
            <FontAwesomeIcon icon='plus' />
            <br />
            Note
          </CircleButton>
        </div>
      </section>
    )
  }
}
