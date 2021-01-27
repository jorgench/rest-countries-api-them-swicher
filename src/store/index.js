import Vue from 'vue';
import Vuex from 'vuex';

const endPoint = 'https://restcountries.eu/rest/v2/';
const fields = [
  'name',
  'borders',
  'alpha3Code',
  'population',
  'region',
  'capital',
  'flag',
  'nativeName',
  'subregion',
  'topLevelDomain',
  'currencies',
  'languages',
].join(';');

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    loadingState: false,
    darkMode: localStorage.getItem('darkMode') ? true : false,
    countries: [],
  },
  getters: {
    loading(state) {
      return state.loadingState;
    },
    getCountries: state => query => {
      if (state.countries.length == 0) {
        return [];
      }

      return state.countries.filter(country => {
        let search = true;
        let region = true;

        if (query.query) {
          search = country.name.indexOf(query.query) === 0;
        }

        if (query.region) {
          region = country.region === query.region;
        }

        return search && region;
      });
    },
    getDetail: state => alpha3Code => {
      let ct = state.countries.slice().find(country => {
        return country.alpha3Code === alpha3Code.toUpperCase();
      });

      if (ct) {
        ct = JSON.parse(JSON.stringify(ct));
        const regEx = new RegExp('^(' + ct.borders.join('|') + ')$');
        ct.borders = state.countries.filter(a => {
          return Boolean(a.alpha3Code.match(regEx));
        });

        return ct;
      } else {
        return {};
      }
    },
  },
  mutations: {
    changeLoading(state, payload) {
      state.loadingState = payload;
    },
    changeMode(state) {
      localStorage.setItem('darkMode', true);
      state.darkMode = !state.darkMode;
    },
    changeCountries(state, payload) {
      state.countries = payload;
    },
  },
  actions: {
    getCountries({ state, commit }) {
      if (state.countries.length == 0 && !state.loadingState) {
        commit('changeLoading', true);

        fetch(endPoint + 'all?fields=' + fields)
          .then(d => {
            d.json()
              .then(data => {
                commit('changeCountries', data);
                commit('changeLoading', false);
              })
              .catch(() => {
                commit('changeLoading', false);
              });
          })
          .catch(e => {
            commit('changeLoading', false);
            console.error(e);
          });
      }
    },
  },
});

export default store;
