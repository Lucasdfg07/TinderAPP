import AccountService from '../services/account_service';
 
export default {
  state: {
    account: "",
    coordinates: {
      lat: 0,
      lon: 0
    },
    geolocationEnabled: false
  },
 
  mutations: {
    performLogin(state, { email, password }) {
      AccountService.login(email, password).then(user => {
        state.account = user;
        localStorage.setItem('account', JSON.stringify(user));
      })
    },
 
    loadLocalStorageAccount(state) {
      let account = localStorage.getItem('account');
      if(account) {
        state.account = JSON.parse(account);
      } else {
        state.account = "";
      }
    },
 
    update(state, { name, college, company, description }) {
      AccountService.update(state.account.id, name, college, company, description).then(user => {
        user.authentication_token = state.account.authentication_token;
        user.email = state.account.email;
        state.account = user;
        localStorage.setItem('account', JSON.stringify(user));
      })
    },
 
    loadGeolocation(state) {
      navigator.geolocation.getCurrentPosition(data => {
        state.coordinates.lat = data.coords.latitude;
        state.coordinates.lon = data.coords.longitude;
        state.geolocationEnabled = true;
        AccountService.setGeolocation(state.account.id, data.coords.latitude, data.coords.longitude);
      });
    }
  },
 
  actions: {
    login(context, { email, password }) {
      context.commit("performLogin", { email, password })
    },
 
    loadLocalAccount(context) {
      context.commit("loadLocalStorageAccount");
    },
 
    updateAccount(context, { name, college, company, description }) {
      context.commit("update", { name, college, company, description })
    },
 
    loadGeolocation(context) {
      context.commit("loadGeolocation")
    }
  },
 
  getters: {
    isLoggedIn(state) {
      return state.account != ""
    },
 
 
    accountHeaders(state) {
      return { 'X-User-Email': state.account.email, 'X-User-Token': state.account.authentication_token }
    },
 
 
    accountToken(state) {
      return state.account.authentication_token;
    },
 
 
    isGeolocationEnabled(state) {
      return state.geolocationEnabled;
    }
  }
}