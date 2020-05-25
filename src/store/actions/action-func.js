import * as actions from './actions';
import axios from '../../axios-data';

export const addList = (boardId, board) => {
    const url = 'https://sticky-note-organizer.firebaseio.com/data/';
    const sampleListName = 'New List';
    return dispatch => axios.post(url + 'lists.json', {name: sampleListName} )
        .then( res => {
            const updatedBoard = {
                ...board,
                lists: [...board.lists, res.data.name]
            };
            axios.put(url + 'boards/'+boardId + '.json', updatedBoard).then(
                dispatch({type: actions.ADD_LIST, boardId: boardId, listId: res.data.name, name: sampleListName})
            ).catch(
                dispatch(fetchDataFailed())
        )})
        .catch( error => {
            dispatch(fetchDataFailed());
        } );
};

export const initBoards = () => {
    return dispatch => {
        axios.get('https://sticky-note-organizer.firebaseio.com/data.json')
        .then( res => {
            dispatch({type: actions.SET_DATA, data: res.data});
        })
        .catch(error => {
            dispatch(fetchDataFailed());
        });
    }
}

export const loadUpdateBoardTitle = (id, board, title) => {
    const updatedBoard = {...board,
                          editing: false,
                          name: title};
    const newUrl = 'https://sticky-note-organizer.firebaseio.com/data/boards/' + id+ '.json';
    return dispatch => {
        axios.put(newUrl, updatedBoard)
        .then( res => {
            dispatch({type: actions.UPDATE_BOARD_TITLE, id: id, title: title});
        })
        .catch(error => {
            dispatch(fetchDataFailed);
        });
    }
};

export const addNote = (listId, list) => {
    const url = 'https://sticky-note-organizer.firebaseio.com/data/';
    const sampleName = 'New Note'
    return dispatch => {
        axios.post(url+'notes.json', {name: sampleName}).then( res => {
            const updatedList = {
                ...list,
                notes: (list.notes) ? [...list.notes, res.data.name] : [res.data.name]
            };
            console.log('Add Note: ', list);
            console.log('Add Note: ', listId);
            console.log('Add Note: ', updatedList);

            console.log('SUCCESS', updatedList);
            axios.put(url+'lists/'+ listId +'.json', updatedList).then( 
                res2 => dispatch({ type: actions.ADD_NOTE, 
                                           listId: listId, 
                                           id: res.data.name, 
                                           name: sampleName})
            )
            .catch( error2 => dispatch(fetchDataFailed))
        })
        .catch(error => {
            dispatch(fetchDataFailed);
        });
    }
};

export const fetchDataFailed = (error) => {
    return {
        type: actions.FETCH_DATA_FAILED
    };
};