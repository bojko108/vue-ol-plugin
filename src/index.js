import * as ol from 'ol';
import Map from './components/OlMap.vue';
import AxiosPlugin from 'vue-axios-plugin';

export default {
  install(Vue) {
    if (!Vue.prototype.$axios) {
      Vue.use(AxiosPlugin);
    }

    /**
     * Register a global component for a OpenLayers Map element
     */
    Vue.component('ol-map', Map);

    /**
     * Register ol lib
     */
    Vue.prototype.$ol = ol;
  }
};
