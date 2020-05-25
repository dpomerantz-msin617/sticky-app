import * as actionTypes from '../actions/actions';

const initialState = {
    boards: {},
    lists: {},
    notes: {},
    loaded: false, 
    error: false
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_DATA:
            const boards = Object.assign({}, [...action.data.boards]);
            const lists = (action.data.lists) ? {...action.data.lists} : {};
            const notes = (action.data.notes) ? {...action.data.notes} : {};
            return {
                boards : {...boards},
                lists: {...lists},
                notes: {...notes},
                loaded: true
            }
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
            const updatedLists = {...state.lists,
                                 [action.listId]: {id: action.listId,
                                                   name: action.name}};
            let boardsToUpdate = {...state.boards};
            boardsToUpdate[action.boardId].lists = [...boardsToUpdate[action.boardId].lists,
                                                    action.listId];
            return {
                ...state,
                boards: {...boardsToUpdate},
                lists: {...updatedLists}
            };
//@TODO MOVE TO LIST REDUCER
        case actionTypes.ADD_NOTE:
            const noteList = {...state.notes, [action.id] : {name: action.name}}    
            let listsToUpdate = {...state.lists};
            listsToUpdate[action.listId].notes = [listsToUpdate[action.listId].notes,
                                                  action.id]
            return {...state,
                    lists: {...listsToUpdate},
                    notes: {...noteList}
                }
            default:
            return state;
    }
};

export function updateBoards(state, id, propertyName, propertyValue){
    let board = {...state.boards[id],
            [propertyName] : propertyValue
    }
    return {
        ...state.boards,
        [id]: board
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