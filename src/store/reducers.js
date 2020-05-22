import * as actionTypes from './actions';

const initialState = {
    boards: [
        {
            name: 'My sticky note board',
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
            }
        default:
            return state;
    }
};

export default reducer;