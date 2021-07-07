import axios from 'axios';
import { Post } from '../types/entity/Post';

const getPosts = async () => {
    const { data } = await axios.get<Post[]>('/api/posts');
    return data;
}

export {
    getPosts
}
