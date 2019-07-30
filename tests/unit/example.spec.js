import { assert } from 'chai';
import { createLocalVue, shallowMount, mount } from '@vue/test-utils';
import Map from '../../src/components/Map.vue';
import OLPlugin from '../../src';
import AxiosPlugin from 'vue-axios-plugin';

const localVue = createLocalVue();
localVue.use(AxiosPlugin);
localVue.use(OLPlugin);

describe('Mapp component', () => {
  it('Is a Vue instance', () => {
    const wrapper = shallowMount(Map, { localVue, propsData: { configUrl } });
    assert.isTrue(wrapper.isVueInstance());
  });

  it('Expects configUrl prop to be passed', () => {
    const wrapper = mount(Map);
    // wrapper.props().configUrl;
  });
});
