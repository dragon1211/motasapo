import axios from 'axios';
import { Post } from '../types/entity/Post';

const getPosts = async (offset:any) => {
    const { data } = await axios.get<Post[]>('/api/posts/?offset=' + offset);
    return data;
}

export {
    getPosts
}
