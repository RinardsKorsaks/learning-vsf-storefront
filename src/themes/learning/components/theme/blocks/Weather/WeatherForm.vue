<template>
  <div @submit.prevent="submit" class="weather-options">
    <div class="current-weather">
      <input type="radio" id="current-weather" value="current" v-model="forecastMode">
      <label for="current-weather">{{ $t('Current weather') }}</label>
    </div>
    <div class="forecast-weather">
      <input type="radio" id="forecast-weather" value="forecast" v-model="forecastMode">
      <label for="forecast-weather">{{ $t('3 day forecast') }}</label>
    </div>
    <div class="custom-forecast-weather">
      <input type="radio" id="custom-forecast-weather" value="custom" v-model="forecastMode">
      <label for="custom-forecast-weather">{{ $t('Custom forecast day') }}</label>
    </div>
    <form @submit.prevent="submit" v-if="forecastMode === 'custom'">
      <h5>{{ $t('Enter date:') }}</h5>
      <input type="text" placeholder="dd/mm/YYYY" v-model="dateInput" @blur="$v.dateInput.$touch()">
      <validation-messages :validations="[
        {
          condition: $v.dateInput.$dirty && !$v.dateInput.minLength || !$v.dateInput.maxLength,
          text: $t('Invalid input lenght.')
        },
        {
          condition: $v.dateInput.$dirty && !$v.dateInput.validFormat && $v.dateInput.minLength && $v.dateInput.maxLength,
          text: $t('Invalid date format. Valid format: dd/mm/YYYY')
        },
        {
          condition: $v.dateInput.$dirty && !$v.dateInput.validDate && $v.dateInput.validFormat && $v.dateInput.minLength && $v.dateInput.maxLength,
          text: $t('Invalid date. Enter date that is between today and 10 days in advance.')
        },
      ]"
      />
      <button type="submit">
        {{ $t('Submit') }}
      </button>
    </form>
  </div>
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import dayjs from 'dayjs'
import ValidationMessages from 'theme/components/core/blocks/Form/ValidationMessages'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { mapActions } from 'vuex'
dayjs.extend(customParseFormat)

const validFormat = (dateInput) => dayjs(dateInput, 'DD/MM/YYYY', true).isValid()
const validDate = (dateInput) => {
  const input = dayjs(dateInput, 'DD/MM/YYYY', true)
  const today = dayjs();
  const lastDay = dayjs().add(10, 'day')

  return input.diff(today, 'day') >= 0 && lastDay.diff(input, 'day') > 0
}

export default {
  components: {
    ValidationMessages
  },
  data () {
    return {
      forecastMode: null,
      dateInput: null
    }
  },
  validations () {
    return {
      dateInput: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(10),
        validFormat,
        validDate
      }
    }
  },
  methods: {
    ...mapActions({
      loadCurrentWeather: 'weather/loadCurrentWeather',
      loadForecastWeather: 'weather/loadForecastWeather'
    }),
    submit () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        const date = dayjs(this.dateInput, 'DD/MM/YYYY').format('YYYY-MM-DD')
        this.$store.commit('weather/SET_FORECAST_MODE', this.forecastMode)
        this.loadForecastWeather(date)
      }
    }
  },
  watch: {
    forecastMode (selectedMode) {
      this.$store.commit('weather/SET_FORECAST_MODE', selectedMode)
      if (selectedMode === 'current') this.loadCurrentWeather()
      else if (selectedMode === 'forecast') this.loadForecastWeather()
    }
  }
}
</script>

<style lang="scss" scoped>
  .weather-options{
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    padding-bottom: 20px;
  }
  .current-weather, .forecast-weather, .custom-forecast-weather{
    display: flex;
    align-items: center;
  }
  input[type="radio"]{
    margin: 0;
    margin-right: 10px;
  }
  input[type=text]{
    font-size: 14px;
    width: 170px;
  }
  h5{
    margin-bottom: 5px;
  }
  button{
    width: 170px;
    background-color: #52D77B;
    margin-top: 20px;
    padding: 10px;
    border: none;
    border-radius: 5px;
    color: white;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 1px;
  }
  .error{
    font-size: 10px;
    color: lightcoral;
  }

</style>
