import * as actions from './actions';
import axios from '../../axios-data';

export const addList = boardId => {
    const state = {boards: {
        allIds: [1],
        byIds: {
            1: {
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
            }
        }};
    axios.post( '/list.json', state )
    .then( response => {
        this.setState( { loading: false } );
        this.props.history.push( '/' );
    } )
    .catch( error => {
        this.setState( { loading: false } );
    } );
};

export const initBoards = () => {
    console.log('About to get orders: ');
    return dispatch => {
        axios.get('https://sticky-note-organizer.firebaseio.com/boards.json')
        .then( res => {
            dispatch({type: actions.SET_DATA, data: res.data});
        })
        .catch(error => {
            dispatch(fetchDataFailed());
        });
    }
}

export const fetchDataFailed = () => {
    return {
        type: actions.FETCH_DATA_FAILED
    };
};