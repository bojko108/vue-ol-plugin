import * as ol from 'ol';
import Map from './components/Map.vue';
import axiosPlugin from 'vue-axios-plugin';

export default {
  install(Vue) {
    if (!Vue.prototype.$axios) {
      Vue.use(axiosPlugin);
    }

    /**
     * Register a global component for a OpenLayers Map element
     */
    Vue.component('ol-mapp', Map);

    /**
     * Register ol lib
     */
    Vue.prototype.$ol = {
      lib: ol,
      config: null,
      app: null,
      get map() {
        return this.app.map;
      }
    };
  }
};
