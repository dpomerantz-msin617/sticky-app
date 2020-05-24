import * as actionTypes from '../actions/actions';

// const initialState = {
//     boards: {
//         1 :{    name: 'My sticky note board',
//                 editing: false,
//                 lists: [{name: 'This is the first list!',
//                         notes: [{title: 'Note 1',
//                                 description: 'Despription for Note 1.....'},
//                                 {title: 'Note 2',
//                                 description: 'Despription for Note 2.....'},
//                                 {title: 'Note 3',
//                                 description: 'Despription for Note 3.....'}
//                         ]}]
//             }
//         },
//     lists: [],
//     notes: []
// };

const initialState = {
    boards: {},
    lists: {},
    notes: {},
    error: false
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_DATA:
            console.log('Date: ', action.data);
            return {
                ...action.data
            }
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
            console.log('ID ', action);
            const editingBoards = updateBoards(state, action.id, 'editing', true);
            return {
                ...state,
                boards: editingBoards
            };
        case actionTypes.UPDATE_BOARD_TITLE:
            let updatedBoards = updateBoards(state, action.id, 'title', action.title);
            updatedBoards = updateBoards(state, action.id, 'editing', false);
            return {
                ...state,
                boards: updatedBoards
            };
        case actionTypes.ADD_LIST:
            let boardsWithList = {...state.boards.byIds,
                        [action.id]: {
                            ...state.boards.byIds[action.id],
                            lists: [...state.boards.byIds[action.id].lists,
                                    {name: 'List 2',
                                     notes: []
                                    }]}};       
            return {
                ...state,
                boards: {
                    allIds: [...state.boards.allIds],
                    byIds: {...boardsWithList}
                }
            };
        default:
            return state;
    }
};

export function updateBoards(state, id, propertyName, propertyValue){
    let board = {...state.boards.byIds[id],
            [propertyName] : propertyValue
    }
    console.log(board);
    return {
        allIds: [...state.boards.allIds],
        byIds: {
                ...state.boards.byIds,
                [id]: board
        }
    }
}

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