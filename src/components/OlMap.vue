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
    target: { type: String, required: false },
    projection: { type: String, required: false },
    latitude: { type: Number, required: false },
    longitude: { type: Number, required: false },
    zoom: { type: Number, required: false },
    rotation: { type: Number, required: false },
    layers: {
      type: Array,
      validator: function(value) {
        return true;
      }
    },
    basemaps: {
      type: Array,
      validator: function(value) {
        for (let i = 0; i < value.length; i++) {
          if (!value[i].metadata) {
            console.warn("basemap.metadata is required");
            return false;
          }
          if (!value[i].metadata.name) {
            console.warn("basemap.metadata.name is required");
            return false;
          }
          if (!value[i].metadata.provider) {
            console.warn("basemap.metadata.provider is required");
            return false;
          }
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
    this.initMap();
  },
  methods: {
    async initMap() {
      try {
        let config;

        if (this.configUrl) {
          const response = await this.$axios.get(this.configUrl);
          config = response.data.mapp;
          if (this.target) {
            config.map.target = this.target;
          }
          if (this.projection) {
            config.map.projection = this.projection;
          }
          if (this.latitude) {
            config.map.latitude = this.latitude;
          }
          if (this.longitude) {
            config.map.longitude = this.longitude;
          }
          if (this.zoom) {
            config.map.zoom = this.zoom;
          }
          if (this.rotation) {
            config.map.rotation = this.rotation;
          }
          if (this.layers) {
            config.map.layers = this.layers;
          }
          if (this.basemaps) {
            config.map.basemaps = this.basemaps;
          }
        } else {
          config = {
            map: {
              target: this.target,
              projection: this.projection,
              latitude: this.latitude,
              longitude: this.longitude,
              zoom: this.zoom,
              rotation: this.rotation,
              layers: [this.layers],
              basemaps: [this.basemap]
            }
          };
        }

        this.$emit("config-ready", config);

        const map = await this.$ol.createMap(config.map);
        map.once("rendercomplete", () => {
          this.$emit("map-rendered", this.$ol.getMap());
        });
        this.$emit("map-ready", this.$ol.getMap());
      } catch (ex) {
        console.log(ex);
      }
    }
  }
};
</script>
<style scoped>
@import "../../../ol/src/ol/ol.css";
</style>
