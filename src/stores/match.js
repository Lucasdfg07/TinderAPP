import MatchService from '../services/match_service';
 
export default {
  namespaced: true,
 
  state: {
    selectionList: [],
    currentSelection: null,
    loading: false,
    likePerformed: false
  },
 
  mutations: {
    setSelecionList(state, users) {
      state.selectionList = users;
      state.page += 1;
    },
    setLoading(state, status){
      state.loading = status;
    },
    setCurrentSelection(state, position) {
      state.currentSelection = state.selectionList[position];
      state.likePerformed = false;
    },
    setLike(state) {
      state.likePerformed = true;
    }
  },
 
  actions: {
    loadSelectionList(context) {
      context.commit("setLoading", true)
 
      MatchService.loadSelectionList().then(data => {
        context.commit("setSelecionList", data.users);
      }).catch().then(() => {
        context.commit("setLoading", false);
      });
    },
    setCurrentSelection(context, position) {
      context.commit("setCurrentSelection", position);
    },
    like({ commit, state }, liked) {
      MatchService.like(state.currentSelection.id, liked).then(() => {
        commit("setLike");
      });
    }
  }
}