const gNoteList = [
    {
        id: 'n101',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: {
            backgroundColor: '#00d'
        },
        info: {
            title: 'Title11',
            txt: 'Fullstack Me Baby!'
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
        }
    }
    // {
    //     id: 'n102',
    //     type: 'NoteImg',
    //     isPinned: false,
    //     info: {
    //         url: 'http://some-img/me',
    //         title: 'Bobi and Me'
    //     },
    //     style: {
    //         backgroundColor: '#00d'
    //     }
    // },
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
    // getEmptyBook,
    // addGoogleBook
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



function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = gNoteList
        console.log('notes:', notes)
        utilService.saveToStorage(NOTE_KEY, notes)
    }
}
