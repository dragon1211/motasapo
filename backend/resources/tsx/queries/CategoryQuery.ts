import * as api from '../api/CategoryAPI';
import { useQuery } from 'react-query';

const categoryQuery = () => {
    return useQuery('categories', () => api.getCategories())
}

export {
    categoryQuery
}
