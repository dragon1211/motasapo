import * as api from '../api/PostAPI';
import { useQuery } from 'react-query';

const postQuery = () => {
    return useQuery('posts', () => api.getPosts())
}

export {
    postQuery
}
