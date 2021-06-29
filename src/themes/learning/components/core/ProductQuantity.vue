<template>
  <div class="product-quantity relative">
    <button class="decrease" @click="decrement" />
    <base-input-number
      :name="name"
      :value="value"
      :min="1"
      :max="max"
      :disabled="disabled"
      @input="onInput"
      @blur="$v.$touch()"
      only-positive
      :validations="[
        {
          condition: !$v.value.numeric || !$v.value.minValue || !$v.value.required,
          text: $t(`Quantity must be positive integer`)
        },
        {
          condition: maxQuantity && value && !$v.value.maxValue,
          text: $t('Quantity must be below {quantity}', { quantity: maxQuantity })
        }
      ]"
    />
    <button class="increase" @click="increment" />
    <spinner v-if="loading" />
  </div>
</template>

<script>
import { minValue, maxValue, numeric, required } from 'vuelidate/lib/validators'
import { onlineHelper } from '@vue-storefront/core/helpers'
import BaseInputNumber from 'theme/components/core/blocks/Form/BaseInputNumber'
import Spinner from 'theme/components/core/Spinner'

export default {
  components: {
    Spinner,
    BaseInputNumber
  },
  props: {
    value: {
      type: [Number, String],
      required: true
    },
    showQuantity: {
      type: Boolean,
      default: false
    },
    maxQuantity: {
      type: Number,
      default: undefined
    },
    checkMaxQuantity: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    isSimpleOrConfigurable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isOnline (value) {
      return onlineHelper.isOnline
    },
    max () {
      if (!this.isOnline || !this.isSimpleOrConfigurable) {
        return null
      }

      return this.maxQuantity
    },
    disabled () {
      if (!this.isOnline) {
        return false
      }
      return !this.maxQuantity && this.checkMaxQuantity && this.isSimpleOrConfigurable
    },
    name () {
      if (this.isSimpleOrConfigurable && !this.loading && this.showQuantity) {
        return this.$i18n.t(this.isOnline ? 'Quantity available' : 'Quantity available offline', { qty: this.maxQuantity })
      }
      return this.$i18n.t('Quantity')
    }
  },
  validations () {
    return {
      value: {
        minValue: minValue(1),
        maxValue: maxValue(this.max) && !this.isSimpleOrConfigurable,
        numeric,
        required
      }
    }
  },
  watch: {
    '$v.$invalid' (error) {
      this.$emit('error', error)
    }
  },
  methods: {
    increment () {
      if (this.value < this.maxQuantity) {
        this.$emit('input', this.value + 1)
      }
    },
    decrement () {
      if (this.value > 1) {
        this.$emit('input', this.value - 1)
      }
    },
    onInput (e) {
      console.log(this.value)
      this.$emit('input', e)
    }
  }
}
</script>
<style lang="scss" scoped>
@mixin button-icon {
  content: "";
  width: 12px;
  height: 2px;
  background: #333;
  position: absolute;
}

.product-quantity {
  /deep/ .spinner {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
  }
  .increase, .decrease {
    background: #FFFFFF;
    border: 1px solid #E0E0E0;
    height: 62px;
    width: 62px;
    position: relative;
  }
  .decrease{
    border-right: none;
    &::before {
    @include button-icon;
    left: 26px;
  }
  }
  .increase {
    border-left: none;
    &::before {
      @include button-icon;
      right: 25px;
    }
    &::after {
      @include button-icon;
      transform: rotate(90deg);
      right: 25px;
    }
  }
  /deep/.base-input-number {
    label {
      display: none;
    }
    &>input {
      background: #FFFFFF;
      border: 1px solid #E0E0E0;
      height: 58px;
      width: 56px;
      text-align: center;
    }

    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      appearance: none;
      margin: 0;
    }

    /* Firefox */
    input[type=number] {
      appearance: textfield;
    }
  }
}
</style>
