const gNoteList = [
    {
        id: 'n101',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,

        info: {
            title: 'Title11',
            txt: 'Fullstack Me Baby!'
        },
        style: {
            backgroundColor: '#23523f'
        }
    },
    {
        id: 'n102',
        type: 'NoteTxt',
        isPinned: false,
        info: {
            title: 'Title1',
            txt: 'Bobi and Me'
        },
        style: {
            backgroundColor: '#00d'
        }
    },
    {
        id: 'n103',
        type: 'NoteTxt',
        isPinned: false,
        info: {
            title: 'Title123',
            txt: 'Get my stuff together'
        },
        style: {
            backgroundColor: '#eb346a'
        }
    },
    {
        id: 'n1076',
        type: 'NoteImg',
        isPinned: false,
        info: {
            url: 'https://images.freeimages.com/images/large-previews/55f/note-1196890.jpg',
            title: 'Bobi and Me'
        },
        style: {
            backgroundColor: '#00d'
        }
    }
    // {
    //     id: 'n103',
    //     type: 'NoteTodos',
    //     isPinned: false,
    //     info: {
    //         title: 'Get my stuff together',
    //         todos: [
    //             { txt: 'Driving license', doneAt: null },
    //             { txt: 'Coding power', doneAt: 187111111 }
    //         ]
    //     }
    // }
]

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'


const NOTE_KEY = 'noteDB'

_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote
}

function query() {
    return storageService.query(NOTE_KEY)
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

function getEmptyNote(type) {
    let emptyNote =  {
        id: '',
        createdAt: 0,
        type,
        isPinned: false,
        style: {
            backgroundColor: '#ffffff'
        },
        info: {
            title: 'Title',
        }
    }
    if(type === 'NoteEditTxt') emptyNote.info.txt = 'Take a note...'
    if(type === 'NoteEditImg') emptyNote.info.url = 'Enter image url'
    if(type === 'NoteEditTodos') emptyNote.info.todos = [{ txt: 'task1', doneAt: null }]
    return emptyNote
}



function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = gNoteList
        console.log('notes:', notes)
        utilService.saveToStorage(NOTE_KEY, notes)
    }
}
