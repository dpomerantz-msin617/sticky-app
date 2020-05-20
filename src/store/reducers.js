import * as actionTypes from './actions';

const initialState = {
    boards: [],
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
            }
        default:
            return state;
    }
};

export default reducer;