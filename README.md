# Vuejs plugin for OpenLayers

This plugin can be used for creating maps using [OpenLayers](https://github.com/bojko108/openlayers) library.

⚠️ This plugin uses [vue-axios-plugin](https://github.com/bojko108/vue-axios-plugin) to fetch mapp config. If axios plugin is not installed it will be added when this plugin is installed.

## Installation

```
yarn add bojko108/vue-ol-plugin
```

Add it to Vue:

```js
import Vue from 'vue';
import OLPlugin from 'vue-ol-plugin';

Vue.use(OLPlugin);
```

Or if using [Quasar Framework](https://quasar.dev):

Add a new boot file:

```
quasar new boot openlayers
```

```js
import OLPlugin from 'vue-ol-plugin';

export default async ({ Vue }) => {
  Vue.use(OLPlugin);
};
```

In your `quasar.conf.js`:

```
boot: [..., 'openlayers'],
```

## Plugin methods

### How to use

```js
export default {
  name: "MyComponent"
  created() {
    // access to the plugin
    this.$ol...
  }
}
```

- `this.$ol.lib` - access to OpenLayers library
- `this.$ol.app` - access to created application
- `this.$ol.map` - access to created map (same as `this.$ol.app.map`)
- `this.$ol.config` - access to the initial config

## Mapp component

### How to use

```html
<template>
  <ol-mapp :configUrl="url_to_your_config" />
</template>
```

### Props

List of props, used for creating the mapp:

Name | Description | Required | Type | Default value |
:--- | :--- | :---: | :---: | :---:
`cssClasses` | Name of CSS classes to add to the mapp `HTMLElement`. Default CSS class `mapp` is not removed. | `false` | `String` | `mapp`
`configUrl` | Url to the mapp config | `false` | `String` | `undefined`
`latitude` | Lattitude of mapp's center. If set, it will override `config.mapp.map.view.latitude` | `false` | `Number` | `undefined`
`longitude` | Longitude of mapp's center. If set, it will override `config.mapp.map.view.longitude` | `false` | `Number` | `undefined`
`zoom` | Zoom level for the mapp. If set, it will override `config.mapp.map.view.zoomLevel` | `false` | `Number` | `undefined`
`basemap` | Sets the basemap for this mapp. This prop has two required properties: `name` and `provider`. If set it will override `config.mapp.layers.basemaps` | `false` | `Object` | `undefined`

### Events

List of events used to communicate with the parent element:

| Name | Description | Arguments |
| :--- | :--- | :---: |
| `@config-ready` | Emitted when the config is parsed, but before creating the mapp | `config` |
| `@app-ready` | Emitted when OpenLayers application is created. You can access the mapp from `app.map`, but this event is emitted before the mapp rendered for first time. | `app` |
| `@map-rendered` | Emitted when the mapp is renderend for first time | `map` |

## License

vue-ol-plugin is [MIT](https://github.com/bojko108/vue-ol-plugin/src/master/LICENSE) License @ bojko108
