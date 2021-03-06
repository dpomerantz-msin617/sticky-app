import * as actions from './actions';
import axios from '../../axios-data';
import {deactivateBoards} from '../../helpers/objectHelper';

const url = 'https://sticky-note-organizer.firebaseio.com/data';

export const activateBoard = (boards, boardId) => {
    let deactivatedBoards = deactivateBoards({...boards});
    deactivatedBoards[boardId].active = true;
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
        axios.post(url + '/boards.json', newBoard).then( res => {
            return dispatch({type: actions.ADD_BOARD, id: deactiveBoards.length, board: newBoard})
        }
        ).catch(
        dispatch(fetchDataFailed())
        )
    ).catch(
        dispatch(fetchDataFailed())
    );
};

export const addList = (boardId, board) => {
    const sampleListName = 'New List';
    return dispatch => axios.post(url + '/lists.json', {name: sampleListName} )
        .then( res => {
            const updatedBoard = {
                ...board,
                lists: (board.lists) ? [...board.lists, res.data.name]: [res.data.name]
            };
            axios.put(url + '/boards/'+ boardId + '.json', updatedBoard).then(
                axios.put(url + '/lists/' + res.data.name + '.json', {id: res.data.name, name: sampleListName}).then(
                    dispatch({type: actions.ADD_LIST, boardId: boardId, listId: res.data.name, name: sampleListName})
                ).catch(
                    dispatch(fetchDataFailed())
                )
            ).catch(
                dispatch(fetchDataFailed())
        )})
        .catch( error => {
            dispatch(fetchDataFailed());
        } );
};

export const initBoards = () => {
    return dispatch => {
        axios.get(url + '.json')
        .then( res => {
            dispatch({type: actions.SET_DATA, data: res.data});
        })
        .catch(error => {
            dispatch(fetchDataFailed());
        });
    }
}

export const loadUpdateTitle = (id, itemGroup, item, name) => {
    const updatedItem = {...item,
                          editing: false,
                          name: name};
    const newUrl = url + '/' + itemGroup + '/' + id + '.json';
    return dispatch => {
        axios.put(newUrl, updatedItem)
        .then( res => {
            dispatch({type: actions.UPDATE_TITLE, id: id, name: name, itemGroup: itemGroup});
        })
        .catch(error => {
            dispatch(fetchDataFailed);
        });
    }
};


export const updateNote = (note) => {
    return dispatch => {
        const updateUrl = url + '/notes/' + note.id + '.json';
        axios.put(updateUrl, note).then( res => {
            dispatch({type: actions.UPDATE_NOTE, note: note});       
        })
        .catch( err => 
           dispatch(fetchDataFailed(err)))
    } 
};

export const addNote = (listId, list) => {
    const sampleName = 'New Note'
    return dispatch => {
        axios.post(url+'/notes.json', {name: sampleName}).then( res => {
            const updatedList = {
                ...list,
                id: listId,
                notes: (list.notes) ? [...list.notes, res.data.name] : [res.data.name]
            };
            axios.put(url+'/lists/'+ listId +'.json', updatedList).then( 
                res2 => {
                    const noteWithID = {id: res.data.name, name: sampleName};                    
                    axios.put(url+'/notes/'+ res.data.name + '.json', noteWithID).then(
                        dispatch({ type: actions.ADD_NOTE, 
                            listId: listId, 
                            id: res.data.name, 
                            name: sampleName})    
                    ).catch(
                        dispatch(fetchDataFailed)
                    )
                }
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