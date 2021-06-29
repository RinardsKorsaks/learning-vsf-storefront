<template>
  <div class="product-listing row m0 center-xs start-md" v-if="type == 'related'" :class="type">
    <div
      v-for="product in products"
      :key="product.id"
      class="col-xs-12 col-md-6 mb10"
    >
      <product-tile :product="product" :type="type" />
    </div>
  </div>

  <div class="product-listing row m0 center-xs start-md relative" :class="type" v-else-if="type == 'upsell'">
    <!-- <div class="upsell-btn absolute">
      <button class="previous bg-cl-primary" />
      <button class="next bg-cl-primary" />
    </div> -->
    <carousel

      :per-page-custom="[[320,2],[768,4]]"
      :mouse-drag="false"
      :touch-drag="true"
      :navigation-enabled="true"
      :pagination-enabled="false"
      navigation-next-label=""
      navigation-prev-label=""
      ref="carousel"
      :speed="carouselTransitionSpeed"
      @pageChange="pageChange"
      :navigate-to="currentPage"
    >
      <slide
        v-for="(product, key) in products"
        :key="product.id"
        class="col-sm-12"
        :class="['col-md-' + (12/columns)%10, wide(product.sale, product.new, key)]"
      >
        <product-tile :product="product" :type="type" />
      </slide>
    </carousel>
  </div>

  <div class="product-listing row m0 center-xs start-md" :class="type" v-else>
    <div
      v-for="(product, key) in products"
      :key="product.id"
      class="col-sm-12"
      :class="['col-md-' + (12/columns)%10, wide(product.sale, product.new, key)]"
    >
      <product-tile :product="product" :type="type" />
    </div>
  </div>
</template>

<script>
import ProductTile from 'theme/components/core/ProductTile'
let lastHero = 0
export default {
  name: 'ProductListing',
  components: {
    ProductTile,
    'Carousel': () => import(/* webpackChunkName: "vue-carousel" */ 'vue-carousel').then(Slider => Slider.Carousel),
    'Slide': () => import(/* webpackChunkName: "vue-carousel" */ 'vue-carousel').then(Slider => Slider.Slide)
  },
  props: {
    type: {
      type: String,
      required: true
    },
    products: {
      type: null,
      required: true
    },
    columns: {
      type: [Number, String],
      required: true
    }
  },
  methods: {
    wide (isOnSale, isNew, index) {
      let deltaCondition = index > 0 && ((index - 1) - lastHero) % 2 === 0
      // last image always shouldn't be big, we also need to count from last promoted to check if it will look ok
      let isHero = ((isOnSale === '1' || isNew === '1') && deltaCondition) || (index === this.products.length - 1 && (index - lastHero) % 2 !== 0)
      if (isHero) {
        lastHero = index
      }
      return isHero ? 'col-xs-12' : 'col-xs-6'
    }
  }
}
</script>

<style lang="scss" scoped>
  .product-listing.related {
    /deep/.product {
      height: fit-content;
      border: 1px solid #E0E0E0;
      padding: 0;
      position: relative;
      &__icons {
        display: none;
      }
      &-link {
        display: flex;
        flex-wrap: wrap;
        margin: 30px 0 30px 27px;
      }
      div.product-cover{
        display: flex;
        border: 1px solid #E0E0E0;
        width: 140px;
        min-width: 140px;
        &::before, &::after {
          content: "";
          width: 11px;
          height: 100%;
          background-color: #fff;
        }
      }
      &-info {
        margin-left: 25px;
        display: flex;
        flex-direction: column;

        &>p {
          color: #333;
          text-align: left;
          margin-top: 7px;
          font-family: 'Playfair Display';
          font-style: normal;
          font-weight: bold;
          font-size: 20px;
          line-height: 28px;
        }
        &>span {
          text-align: left;
          color: #4ED67D;
          font-family: 'Playfair Display';
          font-style: normal;
          font-weight: bold;
          font-size: 18px;
        }
        &>button {
          width: 170px;
          min-width: 170px;
          height: 52px;
          margin-top: 12px;
          padding-top: 10px;
          padding-bottom: 10px;
          &::before {
            display: none;
          }
        }
      }
      &-cover {
        height: 138px;
        width: 116px;
      }
    }
  }
  .product-listing.upsell {
      .upsell-btn {
        top: -62px;
        right: 8px;
      }
  }
  /deep/.VueCarousel {
    .VueCarousel-navigation {
      &-button {
          width: 70px;
          height: 32px;
          border: 1px solid #E0E0E0;
          border-radius: 16px;
          background-color: #fff;
          position: absolute;
      }
      &-prev {
        left: unset;
        top: -67px;
        right: 20px;
        &::before {
          position: absolute;
          left: 25px;
          top: 13px;
          content: "";
          border-left: 2px solid #4ED67D;
          border-bottom: 2px solid #4ED67D;
          transform: rotate(45deg);
          width: 6px;
          height: 6px;
        }
        &::after {
          position: absolute;
          left: 25px;
          content: "";
          width: 20px;
          height: 2px;
          background-color: #4ED67D;
        }
      }
      &-next {
          top: -67px;
          right: 78px;
        &::before {
          position: absolute;
          right: 25px;
          top: 13px;
          content: "";
          border-top: 2px solid #4ED67D;
          border-right: 2px solid #4ED67D;
          transform: rotate(45deg);
          width: 6px;
          height: 6px;
        }
        &::after {
          position: absolute;
          right: 25px;
          content: "";
          width: 20px;
          height: 2px;
          background-color: #4ED67D;
        }
      }
      @media only screen and (max-width: 768px) {
        &-button {
          display: none;
        }
      }
    }
  }
</style>
