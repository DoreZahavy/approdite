const gNoteList = [
    {
        id: 'n101',
        createdAt: 1112222,
        type: 'NoteTxt',
        isTrashed: false,
        isPinned: false,
        labels: ['fun', 'work'],
        info: {
            title: 'A note..',
            txt: 'Fullstack Me Baby!'
        },
        style: {
            backgroundColor: '#fff475'
        },
    },
    {
        id: 'n1sdf4',
        type: 'NoteImg',
        isTrashed: false,
        isPinned: false,
        labels: ['fun'],
        info: {
            url: '../../../assets/img/flower-cat.jpg',
            title: 'Life'
        },
        style: {
            backgroundColor: '#d7aefb'
        }
    },
    {
        id: 'n102',
        type: 'NoteTxt',
        isTrashed: false,
        isPinned: false,
        labels: ['important'],
        info: {
            title: 'Me and Bobi?',
            txt: 'Bobi and me'
        },
        style: {
            backgroundColor: '#fdcfe8'
        }
    },
    {
        id: 'n103',
        type: 'NoteTxt',
        isTrashed: false,
        labels: [],
        isPinned: false,
        info: {
            title: 'My note',
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
        labels: ['work'],
        info: {
            url: '../../../assets/img/sample-meme.jpg',
            title: 'Remember'
        },
        style: {
            backgroundColor: '#f28b82'
        }
    },
    {
        id: 'n200',
        isTrashed: true,
        labels: ['work'],
        createdAt: 1112222,
        type: 'NoteTodos',
        isPinned: false,

        info: {
            title: 'done!',
            todos: [
                { txt: 'Vanilla js', doneAt: null, isDone: true },
                { txt: 'Canvas', doneAt: 187111111, isDone: true }
            ]
        },
        style: {
            backgroundColor: '#d7aefb'
        }
    },
    {
        id: 'n300',
        type: 'NoteTxt',
        labels: [],
        isTrashed: true,
        isPinned: false,
        info: {
            title: 'my trash',
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
        labels: ['important'],
        isPinned: false,
        info: {
            title: 'Get my stuff together',
            todos: [
                { txt: 'Driving license', doneAt: null, isDone: true },
                { txt: 'Coding power', doneAt: 187111111, isDone: false }
            ]
        },
        style: {
            backgroundColor: '#e6c9a8'
        }
    }
]

const gLabels = ['important', 'fun', 'work']

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTE_KEY = 'noteDB'
const LABEL_KEY = 'labelDB'

_createNotes()
_loadLabels()

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    getLabels
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
    let emptyNote = {
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
    if (type === 'NoteEditTxt') emptyNote.info.txt = 'Take a note...'
    if (type === 'NoteEditImg') emptyNote.info.url = 'Enter image url'
    if (type === 'NoteEditTodos') emptyNote.info.todos = [{ txt: 'List item 1', doneAt: null, isDone: false }]
    return emptyNote
}

function getLabels() {
    return storageService.query(LABEL_KEY)
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = gNoteList
        console.log('notes:', notes)
        utilService.saveToStorage(NOTE_KEY, notes)
    }
}

function _loadLabels() {
    let labels = utilService.loadFromStorage(LABEL_KEY)
    if (!labels || !labels.length) {
        labels = gLabels
        console.log('labels:', labels)
        utilService.saveToStorage(LABEL_KEY, labels)
    }
}
