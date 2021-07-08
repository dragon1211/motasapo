import axios from 'axios';
import { Shop } from '../types/entity/Shop';

const getShops = async () => {
    const { data } = await axios.get<Shop[]>('/api/shops');
    return data;
}

export {
    getShops
}
