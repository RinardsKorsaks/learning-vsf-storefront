<template>
  <div id="weather">
    <weather-form />
    <weather-data />
  </div>
</template>

<script>
import WeatherData from '../components/theme/blocks/Weather/WeatherData'
import WeatherForm from '../components/theme/blocks/Weather/WeatherForm'

export default {
  name: 'Weather',
  components: {
    WeatherForm,
    WeatherData
  }
}

</script>

<style lang="scss" scoped>
  #weather{
    margin: 10% 15%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
  }

</style>
