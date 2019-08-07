<template>
  <div
    id="map"
    :class="classes"
  />
</template>
<script>
export default {
  name: "DaemonMap",
  props: {
    configUrl: { type: String, required: false },
    cssClasses: { type: String, required: false, default: "map" },

    backendUrl: { type: String, required: false },

    // view properties
    projection: { type: String, required: false },
    latitude: { type: Number, required: false },
    longitude: { type: Number, required: false },
    zoom: { type: Number, required: false },
    rotation: { type: Number, required: false },

    // default map controls
    controls: { type: Object, required: false },

    // default map interactions
    interactions: { type: Object, required: false },

    // default map widgets
    widgets: {
      type: Array,
      required: false,
      default: () => [],
      validator: function(value) {
        for (let i = 0; i < value.length; i++) {
          if (!value[i].name) {
            console.warn("widget.name is required");
            return false;
          }
        }

        return true;
      }
    },

    // map operational layers
    layers: {
      type: Array,
      default: () => [],
      validator: function(value) {
        for (let i = 0; i < value.length; i++) {
          if (!value[i].metadata) {
            console.warn("layer.metadata is required");
            return false;
          }
          if (!value[i].metadata.name) {
            console.warn("layer.metadata.name is required");
            return false;
          }
        }

        return true;
      }
    },

    // map basemap layers
    basemaps: {
      type: Array,
      default: () => [],
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
            console.warn(
              "basemap.metadata.provider is required. Valid values are: 'none', 'local', 'osm', 'ocm', 'bingmaps', 'stamen', 'wms', 'bgmountains', 'xyz', 'topographic', 'mapbox'."
            );
            return false;
          }
        }

        return true;
      }
    }
  },
  data() {
    return {
      target: "map",
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
        const {
          backendUrl,
          configUrl,
          target,
          projection,
          latitude,
          longitude,
          zoom,
          rotation,
          controls,
          interactions,
          widgets,
          layers,
          basemaps
        } = this;

        let config;

        if (configUrl) {
          const response = await this.$axios.get(configUrl);
          config = response.data.mapp;
        } else {
          config = { map: {}, widgets: [] };
        }

        config.backendUrl = backendUrl || config.backendUrl;
        if (target) {
          config.map.target = target;
        }
        if (projection) {
          config.map.projection = projection;
        }
        if (latitude) {
          config.map.latitude = latitude;
        }
        if (longitude) {
          config.map.longitude = longitude;
        }
        if (zoom) {
          config.map.zoom = zoom;
        }
        if (rotation) {
          config.map.rotation = rotation;
        }
        if (controls) {
          config.map.controls = controls;
        }
        if (interactions) {
          config.map.interactions = interactions;
        }
        if (widgets.length > 0) {
          config.widgets = widgets;
        }
        if (layers.length > 0) {
          config.map.layers = layers;
        }
        if (basemaps.length > 0) {
          config.map.basemaps = basemaps;
        }

        this.$emit("config-created", config);

        const app = this.$ol.daemon.createApp(config);
        this.$emit("map-created", this.$ol.daemon.getMap());
        app.map.once("rendercomplete", () => {
          this.$emit("map-rendered", this.$ol.daemon.getMap());
        });
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
<style scoped>
@import "../../../ol/src/ol/ol.css";
</style>
