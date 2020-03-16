import axios from 'axios';
import store from '../store';
 
export default {
  async load() {
    let response = await axios.get('chat', { headers: store.getters['accountHeaders'] })
    return response.data.matches;
  },
}