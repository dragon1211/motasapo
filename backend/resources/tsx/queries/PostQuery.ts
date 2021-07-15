import * as api from '../api/PostAPI';
import { useQuery } from 'react-query';

const postQuery = (offset:any) => {
    return useQuery('posts', () => api.getPosts(offset))
}

export {
    postQuery
}
