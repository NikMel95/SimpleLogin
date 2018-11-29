
import AuthService from '@/common/localStorage.service'
import { LOGIN, CHECK_AUTH, LOGOUT, CHECK_REM } from './actions.type'
import { SET_AUTH, PURGE_AUTH, SET_STATE_REM } from './mutations.type'

const state = {
  email: '',
  password: '',
  er_: '',
  pr_: '',
  isAuthenticated: !!AuthService.getStorageUser()
}

const getters = {
  currentRem () {
    return {
      email: state.er_,
      password: state.pr_,
    }  
  },
  currentUser (state) {
    return {
      email: state.email,
      password: state.password,
    }
  },
  isAuthenticated (state) {
    return state.isAuthenticated
  }
}

const actions = {
  [LOGIN](context, user) {
    context.commit(SET_AUTH, user)
  },
  [LOGOUT](context, user) {
    context.commit(PURGE_AUTH)
  },
  [CHECK_AUTH] (context) {
    var current_user = AuthService.getStorageUser();
    if(current_user) {
      context.commit(SET_AUTH, current_user)
    } else {
      context.commit(PURGE_AUTH)
    }
  },
  [CHECK_REM] (context) {
    context.commit(SET_STATE_REM)
  } 
}

const mutations = {
  [SET_AUTH] (state, user) {
    state.isAuthenticated = true
    state.email = user.email
    state.password = user.password
    AuthService.saveUser(user.email, user.password, user.remember)
    if(user.remember) {
      AuthService.setRemember(user.email, user.password)
    } else {
      AuthService.removeRemember()
    }
  },
  [PURGE_AUTH] (state) {
    state.isAuthenticated = false
    state.email = ''
    state.password = ''
    AuthService.destroyUser()
  },
  [SET_STATE_REM] (state) {
    var user_r = AuthService.getRemember()
    state.er_ = user_r.email
    state.pr_ = user_r.password
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}