import * as ol from 'ol';
import DaemonMap from './components/DaemonMap.vue';
import AxiosPlugin from 'vue-axios-plugin';

export default {
  install(Vue) {
    if (!Vue.prototype.$axios) {
      Vue.use(AxiosPlugin);
    }

    /**
     * Register a global component for a OpenLayers Map element
     */
    Vue.component('daemon-map', DaemonMap);

    /**
     * Register ol lib
     */
    Vue.prototype.$ol = ol;
  }
};
