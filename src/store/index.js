import { createStore } from 'vuex';

export default createStore({
  state: {
    mod: 'day',
    bgColor: '',
    textColor: '',
  },
  mutations: {
    changeReadindMod(state) {
      state.mod = state.mod === 'day' ? 'night' : 'day';
      state.bgColor = state.mod === 'day' ? '' : 'black';
      state.textColor = state.mod === 'day' ? '' : 'white';
      document.body.style.backgroundColor = state.mod === 'day' ? 'white' : 'black';
      document.body.style.color = state.mod === 'day' ? 'black' : 'white';
    },
  },
});
