import * as api from '../api/ShopAPI';
import { useQuery } from 'react-query';

const shopQuery = () => {
    return useQuery('shops', () => api.getShops())
}

export {
    shopQuery
}
