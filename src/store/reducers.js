import * as actionTypes from './actions';

const initialState = {
    boards: [
        {
            id: '1',
            name: 'My sticky note board',
            editing: false,
            lists: [{name: 'This is the first list!',
                    notes: [{title: 'Note 1',
                            description: 'Despription for Note 1.....'},
                            {title: 'Note 2',
                            description: 'Despription for Note 2.....'},
                            {title: 'Note 3',
                            description: 'Despription for Note 3.....'}
                  ]}]
          }
    ],
    lists: [],
    notes: []
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_NOTE:
            return {
                ...state,
                notes: [...state.notes,
                        action.note]
            };
        case actionTypes.UPDATE_NOTE:
            console.log('updated note', action);
            const noteIndex = state.notes.findIndex(n => n.id === action.note.id);
            let updatedNotes = [...state.notes];
            updatedNotes[noteIndex] = action.note;
            return {
                ...state,
                notes: updatedNotes
            };
        case actionTypes.REMOVE_NOTE:
            const notesToUpdate = state.notes.filter(n => n.id !== action.noteId);
            return {
                ...state,
                notes: [...notesToUpdate]
            };
        case actionTypes.EDIT_BOARD:
            let boardIndex = state.boards.findIndex(b => b.id === action.id);
            let board = {...state.boards[boardIndex],
                         editing : action.edit
            }
            const updatedboards = [...state.boards.splice(boardIndex, 1, board)];
            return {
                ...state,
                boards: updatedboards
            };

        default:
            return state;
    }
};

export function insertItem(array, action) {
    return [
      ...array.slice(0, action.index),
      action.item,
      ...array.slice(action.index)
    ]
  }

 export function removeItem(array, action) {
    return [...array.slice(0, action.index), ...array.slice(action.index + 1)]
  }

export default reducer;