import axios from 'axios';
import { Category } from '../types/Category';

const getCategories = async () => {
    const { data } = await axios.get<Category[]>('api/categories');
    return data;
}

export {
    getCategories
}
