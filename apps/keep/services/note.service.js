const gNoteList = [
    {
        id: 'n101',
        createdAt: 1112222,
        type: 'NoteTxt',
        isTrashed: false,
        isPinned: false,

        info: {
            title: 'Title11',
            txt: 'Fullstack Me Baby!'
        },
        style: {
            backgroundColor: '#fff475'
        }
    },
    {
        id: 'n102',
        type: 'NoteTxt',
        isTrashed: false,
        isPinned: false,
        info: {
            title: 'Title1',
            txt: 'Bobi and Me'
        },
        style: {
            backgroundColor: '#fdcfe8'
        }
    },
    {
        id: 'n103',
        type: 'NoteTxt',
        isTrashed: false,
        isPinned: false,
        info: {
            title: 'Title123',
            txt: 'Get my stuff together'
        },
        style: {
            backgroundColor: '#a7ffeb'
        }
    },
    {
        id: 'n1076',
        type: 'NoteImg',
        isTrashed: false,
        isPinned: false,
        info: {
            url: '../../../assets/img/sample-meme.jpg',
            title: 'Bobi and Me'
        },
        style: {
            backgroundColor: '#f28b82'
        }
    },
    {
        id: 'n200',
        isTrashed: true,
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: false,

        info: {
            title: 'Title1 trash',
            txt: 'Fullstack Me Baby! in the trash'
        },
        style: {
            backgroundColor: '#d7aefb'
        }
    },
    {
        id: 'n300',
        type: 'NoteTxt',
        isTrashed: true,
        isPinned: false,
        info: {
            title: 'Title2 trash',
            txt: 'Bobi and Me in the trash'
        },
        style: {
            backgroundColor: '#e6c9a8'
        }
    },
    {
        id: 'n10sd3',
        type: 'NoteTodos',
        isTrashed: false,
        isPinned: false,
        info: {
            title: 'Get my stuff together',
            todos: [
                { txt: 'Driving license', doneAt: null,isDone:false },
                { txt: 'Coding power', doneAt: 187111111,isDone:true }
            ]
        },
    style: {
        backgroundColor: '#e6c9a8'
    }
    }
]

const gNoteTrash = [
    {
        id: 'n200',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: false,

        info: {
            title: 'Title1 trash',
            txt: 'Fullstack Me Baby! in the trash'
        },
        style: {
            backgroundColor: '#23523f'
        }
    },
    {
        id: 'n300',
        type: 'NoteTxt',
        isPinned: false,
        info: {
            title: 'Title2 trash',
            txt: 'Bobi and Me in the trash'
        },
        style: {
            backgroundColor: '#00d'
        }
    },
]

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'


const NOTE_KEY = 'noteDB'
// const TRASH_KEY = 'trashDB'

_createNotes()
// _createTrash()

export const noteService = {
    query,
    get,
    remove,
    save,
    // queryTrash,
    // removeToTrash,
    // removeFromTrash,
    // saveToTrash,
    // restoreFromTrash,
    getEmptyNote
}

function query() {
    return storageService.query(NOTE_KEY)
}

// function queryTrash() {
//     return storageService.query(TRASH_KEY)
// }

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

// function removeToTrash(note){
//     return storageService.post(TRASH_KEY,note)
//         .then(storageService.remove(NOTE_KEY,note.id))
// }

// function saveToTrash(note){
//     return storageService.post(TRASH_KEY,note)
// }

// function removeFromTrash(noteId){
//     return storageService.remove(TRASH_KEY,note.id)
// }

// function restoreFromTrash(note){
//     return storageService.post(NOTE_KEY,note)
//         .then(storageService.remove(TRASH_KEY,note.id))
// }

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

// function _createTrash() {
//     let notes = utilService.loadFromStorage(TRASH_KEY)
//     if (!notes || !notes.length) {
//         notes = gNoteTrash
//         console.log('notes:', notes)
//         utilService.saveToStorage(TRASH_KEY, notes)
//     }
// }
