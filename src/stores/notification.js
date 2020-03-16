export default {
  namespaced: true,
  
  state: {
    alert: {
      type: "",
      message: "",
      isActive: false
    }
  },
 
  mutations: {
    alert(state, { type, message }) {
      state.alert.type = type;
      state.alert.message = message;
      state.alert.isActive = true;
    }
  },
 
  actions: {
    alert(context, { type, message }) {
      context.commit("alert", { type, message })
    }
  }
}