import { Module, GetterTree } from 'vuex';
import { UserState, RootState } from '../../services/types';


const getters: GetterTree<UserState, RootState> = {
  name(state): string {
    return state.user.name;
  },
  apiToken(state): string {
    return state.user.apiToken;
  },
};


const state: UserState = {
  user: {
    name: 'Bob Razowski',
    apiToken: '273b9080',
  },
};

const user: Module<UserState, RootState> = {
  namespaced: true,
  state,
  getters,
};

export default user;
