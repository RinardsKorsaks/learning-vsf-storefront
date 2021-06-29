<template>
  <button
    :class="['relative inline-flex pointer color p0 brdr-none', isActive ? 'active' : '']"
    @click="$emit('change', variant)"
    :aria-label="$t('Select color {variant}', { variant: variant.label })"
  >
    <span
      class="block w-100 h-100 color-inside"
      :style="colorFrom(variant.label)"
    />
  </button>
</template>

<script>
import config from 'config'
import filterMixin from 'theme/mixins/filterMixin.ts'

export default {
  mixins: [filterMixin],
  methods: {
    colorFrom (label) {
      if (!label) return ''
      if (config.products.colorMappings) {
        if (typeof config.products.colorMappings[label] !== 'undefined') {
          label = config.products.colorMappings[label]
        }
      }
      if (label.indexOf('/') >= 0) label = label.replace('/', ',') // to be honest - this is a hack for colors like "ink/white"
      if (label && label.toString().indexOf(',') >= 0) {
        return 'background: linear-gradient(' + label + ')'
      } else {
        return 'background-color: ' + label
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';

  .color {
    width: 62px;
    height: 62px;

    &.active {
      border-color: color(primary);
    }
  }

</style>
