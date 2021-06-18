<template>
  <div class="weather-data">
    <div v-if="weatherData && !loading">
      <h3>{{ weatherData.location.name }}, {{ weatherData.location.country }}</h3>
      <table v-if="forecastMode === 'current'">
        <tr>
          <td>{{ $t('Temperature:') }}</td>
          <td>{{ weatherData.current.temp_c }}°C</td>
        </tr>
        <tr>
          <td>{{ $t('Condition:') }}</td>
          <td>{{ weatherData.current.condition.text }}</td>
        </tr>
        <tr>
          <td>{{ $t('Wind Speed:') }}</td>
          <td>{{ weatherData.current.wind_kph }} km/h</td>
        </tr>
        <tr>
          <td>{{ $t('Wind Direction:') }}</td>
          <td>{{ weatherData.current.wind_dir }}</td>
        </tr>
      </table>
      <div v-else-if="forecastMode" v-for="(weather, key) in weatherData.forecast.forecastday" :key="key">
        <h5>{{ formatDate(weather.date) }}</h5>
        <table>
          <tr>
            <td>{{ $t('Min Temp.:') }}</td>
            <td>{{ weather.day.mintemp_c }}°C</td>
          </tr>
          <tr>
            <td>{{ $t('Max Temp:') }}</td>
            <td>{{ weather.day.maxtemp_c }}°C</td>
          </tr>
          <tr>
            <td>{{ $t('Max Wind Speed:') }}</td>
            <td>{{ weather.day.maxwind_kph }} km/h</td>
          </tr>
          <tr v-if="weather.day.daily_chance_of_rain !== '0'">
            <td>{{ $t('Chance of rain:') }}</td>
            <td>{{ weather.day.daily_chance_of_rain }}%</td>
          </tr>
          <tr v-if="weather.day.daily_chance_of_snow !== '0'">
            <td>{{ $t('Chance of snow:') }}</td>
            <td>{{ weather.day.daily_chance_of_snow }}%</td>
          </tr>
        </table>
      </div>
    </div>
    <spinner v-if="loading" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import Spinner from 'theme/components/core/Spinner'
dayjs.extend(customParseFormat)

export default {
  components: {
    Spinner
  },
  computed: {
    ...mapGetters({
      weatherData: 'weather/getWeatherData',
      forecastMode: 'weather/getForecastMode',
      loading: 'weather/getLoadingStatus'
    })
  },
  methods: {
    formatDate (date) {
      return dayjs(date, 'YYYY-MM-DD').format('DD/MM/YYYY')
    }
  }
}
</script>
<style lang="scss" scoped>

.weather-data{
  width: 40%;
  min-width: 180px;
  h3{
    margin-top: 0px;
    margin-bottom: 10px;
  }
  h5{
    margin-bottom: 5px;
    text-decoration: underline;
  }
  table{
    td{
      padding: 5px 0;
    }
    tr>td:nth-child(2){
      padding-left: 10px;
    }
  }
}
</style>
