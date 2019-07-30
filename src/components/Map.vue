<template>
  <div
    id="map"
    :class="classes"
  />
</template>
<script>
export default {
  name: "Map",
  props: {
    configUrl: { type: String, required: false },
    cssClasses: { type: String, required: false, default: "" },
    latitude: { type: Number, required: false },
    longitude: { type: Number, required: false },
    zoom: { type: Number, required: false },
    basemap: {
      type: Object,
      validator: function(value) {
        if (!value.name) {
          console.warn("basemap.name is required");
          return false;
        }
        if (!value.provider) {
          console.warn("basemap.provider is required");
          return false;
        }
        return true;
      }
    }
  },
  data() {
    return {
      classes: "map"
    };
  },
  async created() {
    this.classes += ` ${this.cssClasses}`;
  },
  mounted() {
    this.initMapp();
  },
  methods: {
    async initMapp() {
      try {
        let config;

        if (this.configUrl) {
          const response = await this.$axios.get(this.configUrl);
          config = response.data;

          if (this.latitude) {
            config.map.map.view.latitude = this.latitude;
          }
          if (this.longitude) {
            config.map.map.view.longitude = this.longitude;
          }
          if (this.zoom) {
            config.map.map.view.zoomLevel = this.zoom;
          }
          if (this.basemap) {
            config.map.layers.basemaps = [this.basemap];
          }
        } else {
          config = {
            mapp: {
              map: {
                view: {
                  zoomLevel: this.zoom,
                  latitude: this.latitude,
                  longitude: this.longitude
                }
              },
              layers: {
                basemaps: [this.basemap]
              }
            }
          };
        }

        this.$ol.config = config;
        this.$emit("config-ready", this.$ol.config);

        this.$ol.app = await this.$ol.lib.createApp(this.$ol.config.mapp);
        this.$emit("app-ready", this.$ol.app);

        this.$ol.mapp.once("rendercomplete", () => {
          this.$emit("mapp-rendered", this.$ol.mapp);
        });
      } catch (ex) {
        console.log(ex);
      }
    }
  }
};
</script>
<style scoped>
@import "../../node_modules/ol/src/ol/ol.css";
</style>
