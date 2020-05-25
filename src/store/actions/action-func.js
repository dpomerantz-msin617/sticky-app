import * as actions from './actions';
import axios from '../../axios-data';
import {deactivateBoards} from '../../helpers/objectHelper';

const url = 'https://sticky-note-organizer.firebaseio.com/data/';
export const activateBoard = (boards, boardId) => {
    let deactivatedBoards = deactivateBoards({...boards});
    deactivatedBoards[boardId].active = true
    return dispatch => axios.put(url + '/boards.json', deactivatedBoards).then(
            dispatch({type: actions.ACTIVATE_BOARD, id: boardId})
    ).catch(
        dispatch(fetchDataFailed())
    )
};

export const addBoard = (boards) => {
    const deactiveBoards = deactivateBoards({...boards});
    const newBoard = {
        active: true,
        editing: true,
        lists: [],
        name: 'New Board'
    };
    return dispatch => axios.put(url + '/boards.json', deactiveBoards).then(
        axios.post(url + '/boards.json', newBoard).then( res =>
            dispatch({type: actions.ADD_BOARD, id: res.data.name, board: newBoard})
        ).catch(
        dispatch(fetchDataFailed())
        )
    ).catch(
        dispatch(fetchDataFailed())
    );
};

export const addList = (boardId, board) => {
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