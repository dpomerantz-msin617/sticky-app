import * as actionTypes from '../actions/actions';
import { deactivateBoards } from '../../helpers/objectHelper';

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
            console.log('Data: ', action);
            const boards = {...action.data.boards};
            // const boards = Object.assign({}, [...action.data.boards]);
            const lists = (action.data.lists) ? {...action.data.lists} : {};
            const notes = (action.data.notes) ? {...action.data.notes} : {};
            return {
                boards : {...boards},
                lists: {...lists},
                notes: {...notes},
                loaded: true
            }
        case actionTypes.ACTIVATE_BOARD:
            let boardsToUpdate = deactivateBoards({...state.boards});
            boardsToUpdate[action.id].active = true;
            return {
                ...state,
                boards: {...boardsToUpdate}
            }
        case actionTypes.ADD_BOARD:
            let boardsToDeactivate = deactivateBoards({...state.boards});
            console.log('Add Board boardsToDeactivate', boardsToDeactivate);
            console.log('Add Board action', action);
            return {
                ...state,
                boards: {...boardsToDeactivate,
                        [action.id] : {...action.board,
                                       id: action.id
                                    }
                        }
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
            const stateWithEditingBoards = updateState(state, action.id, 'boards', 'editing', true);
            console.log('Edit', action);
            console.log('Edit', stateWithEditingBoards);
            return { ...stateWithEditingBoards };
        case actionTypes.UPDATE_TITLE:
                let newStateWithTitle = updateState(state, action.id, action.itemGroup, 'name', action.name);
                newStateWithTitle = updateState(newStateWithTitle, action.id, action.itemGroup, 'editing', false);
                console.log('New State With Title', newStateWithTitle);
                return { ...newStateWithTitle};
        case actionTypes.UPDATE_BOARD_TITLE:
            let newState = updateBoards(state, action.id, 'name', action.name);
            newState = updateBoards(newState, action.id, 'editing', false);
            return { ...newState};
        case actionTypes.ADD_LIST:
            const updatedLists = {...state.lists,
                                 [action.listId]: {id: action.listId,
                                                   name: action.name}};
            let boardsToUpdateList = {...state.boards};
            boardsToUpdateList[action.boardId].lists = [...boardsToUpdateList[action.boardId].lists,
                                                    action.listId];
            return {
                ...state,
                boards: {...boardsToUpdateList},
                lists: {...updatedLists}
            };
        case actionTypes.ADD_NOTE:
            console.log('YOU GOT HERE', action);
            const noteList = {...state.notes, [action.id] : {id : action.id, name: action.name}}    
            let listsToUpdate = {...state.lists};
            listsToUpdate[action.listId].notes = 
                            (listsToUpdate[action.listId].notes) ? [...listsToUpdate[action.listId].notes,
                                                                    action.id] 
                                                                    : [action.id];
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
    return {...state,
            boards: {
                ...state.boards,
                [id]: board    
            }
    }
}

export function updateState(state, id, itemGroup, propertyName, propertyValue){
    console.log('ItemGroup', itemGroup);
    let items = {...state[itemGroup]};
    let item = {...items[id],
            [propertyName] : propertyValue
    }
    console.log('Lists', items);
    console.log('List', item);
    return {...state,
            [itemGroup]: {
                ...state[itemGroup],
                [id]: item    
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