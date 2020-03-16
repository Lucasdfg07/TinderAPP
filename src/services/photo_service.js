import axios from 'axios';
import store from '../store';
 
export default {
  async load() {
    let response = await axios.get(`photos`, { headers: store.getters['accountHeaders'] })
    return response.data.photos;
  },
 
  async add(file) {
    let formData = new FormData();
    formData.append('photo[file]', file);
    let headers = store.getters['accountHeaders'];
    headers['Content-Type'] = 'multipart/form-data';
    let response = await axios.post(`photos`, formData, { headers: headers })
    return response.data.photo;
  },
 
  async setAsDefault(photo) {
    let headers = store.getters['accountHeaders'];
    headers['Content-Type'] = 'application/json';
    let response = await axios.patch(`photos/${photo.id}`,  { photo: { default: true } }, 
                                                            { headers: headers })
    return response.data.photo;
  },
 
  async remove(photo) {
    let response = await axios.delete(`photos/${photo.id}`, { headers: store.getters['accountHeaders'] })
    return response;
  }
}