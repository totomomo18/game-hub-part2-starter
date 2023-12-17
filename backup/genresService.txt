import { API_END_POINT_GENRES} from '../constants';
import APIClient from '../services/apiClient';

export interface Genre {
  id: number;
  name: string;
  image_background: string;
}

export default new APIClient<Genre>(API_END_POINT_GENRES);


