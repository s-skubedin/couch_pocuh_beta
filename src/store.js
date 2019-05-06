import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {remoteToDb} from "./db/PouchDb";

export const GET_NEWS = 'GET_NEWS';
export const ADD_NEWS = 'ADD_NEWS';
export const DELETE_NEWS = 'DELETE_NEWS';

const MUT_NEWS = 'MUT_NEWS';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    news: [],
  },
  mutations: {
    [MUT_NEWS]: (state, payload) => {
      console.log(payload);
      state.news = payload;
    }
  },
  actions: {
    [GET_NEWS]: (context) => {
      console.log(GET_NEWS)
      axios.get("http://192.168.2.99:3000/").then(news => { console.log(news.data); context.commit(MUT_NEWS, news.data)})
    },
    [ADD_NEWS]: (context, payload) => {
      axios.post("http://192.168.2.99:3000/", {addNews: payload}).then(() => { context.dispatch(GET_NEWS)})
    },
    [DELETE_NEWS]: (context, payload) => {
      axios.post(`http://192.168.2.99:3000/delete/${payload.id}`, {rev: payload.rev}).then(() => { context.dispatch(GET_NEWS) })
    },
  }
})
