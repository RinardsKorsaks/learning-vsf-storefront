<template>
  <block identifier="shipping-options" class="cms" />
</template>

<script>
import Block from 'theme/components/core/blocks/Cms/Block'
export default {
  components: {
    Block
  }
}
</script>

<style lang="scss" scoped>
.cms {
  /deep/.shipping {
    padding-bottom: 27px;
    &>button {
      border: none;
      border-right: 1px solid color(gainsboro);
      border-bottom: 1px solid color(gainsboro);
      height: 80px;
      min-width: 220px;

      &::before {
        content: "";
        display: inline-block;
        padding-right: 25px;
        position: relative;
        top: 8px;
        height: 30px;
        width: 40px;
        background-image: url(~/assets/icons/ic_delivery.svg);
        background-repeat: no-repeat;
      }
    }
    &-length {
      font-size: 14px;
      line-height: 24px;
    }
    &-price {
      font-size: 14px;
      line-height: 24px;
      font-weight: bold;
    }
  }
}
</style>
