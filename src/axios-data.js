import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://sticky-note-organizer.firebaseio.com/'
});

export default instance;