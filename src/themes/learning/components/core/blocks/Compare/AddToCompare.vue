<template>
  <button
    @click="isOnCompare ? removeProduct(product) : addProduct(product)"
    class="inline-flex middle-xs bg-cl-primary brdr-1 brdr-cl-gainsboro action h5 pointer cl-secondary"
    type="button"
    data-testid="addToCompare"
  >
    <slot>
      <i class="material-icons">compare</i>
    </slot>
  </button>
</template>

<script>
import { IsOnCompare } from '@vue-storefront/core/modules/compare/components/IsOnCompare'
import { AddToCompare } from '@vue-storefront/core/modules/compare/components/AddToCompare'
import { RemoveFromCompare } from '@vue-storefront/core/modules/compare/components/RemoveFromCompare'
import i18n from '@vue-storefront/i18n'
import { htmlDecode } from '@vue-storefront/core/lib/store/filters'

export default {
  mixins: [IsOnCompare, AddToCompare, RemoveFromCompare],
  props: {
    product: {
      required: true,
      type: Object
    }
  },
  methods: {
    addProduct (product) {
      this.addToCompare(product)
      this.$store.dispatch('notification/spawnNotification', {
        type: 'success',
        message: i18n.t('Product {productName} has been added to the compare!', { productName: htmlDecode(product.name) }),
        action1: { label: i18n.t('OK') }
      }, { root: true })
    },
    removeProduct (product) {
      this.removeFromCompare(product)
      this.$store.dispatch('notification/spawnNotification', {
        type: 'success',
        message: i18n.t('Product {productName} has been removed from compare!', { productName: htmlDecode(product.name) }),
        action1: { label: i18n.t('OK') }
      }, { root: true })
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  padding: 18px;
}
</style>
