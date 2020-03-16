import axios from 'axios';
import store from '../store';
 
export default {
  async load(id) {
    let response = await axios.get(`users/${id}`, { headers: store.getters['accountHeaders'] })
    return response.data;
  }
}