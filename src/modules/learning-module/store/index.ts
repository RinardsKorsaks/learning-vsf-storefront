import { processLocalizedURLAddress } from '@vue-storefront/core/helpers'
import getApiEndpointUrl from '@vue-storefront/core/helpers/getApiEndpointUrl'
import config from 'config'
import * as types from './mutation-types'
import { Module } from 'vuex'

export interface WeatherState {
  weatherData: any,
  forecastMode: any,
  loading: boolean
}

export const WeatherModule: Module<WeatherState, any> = {
  namespaced: true,
  state: {
    weatherData: null,
    forecastMode: null,
    loading: false
  },
  actions: {
    async loadCurrentWeather ({ commit, dispatch }) {
      commit(types.SET_LOADING_STATUS, true)
      const url = processLocalizedURLAddress(getApiEndpointUrl(config.weather, 'current_endpoint'))
        .replace('{{query}}', encodeURIComponent(config.weather.location))

      const response = await fetch(url)
      const json = await response.json()
      commit(types.SET_LOADING_STATUS, false)

      if (json.code === 200) {
        commit(types.SET_WEATHER_DATA, json.result)
      } else {
        dispatch('notification/spawnNotification', {
          type: 'error',
          message: `Failed to load weather data: ${json.result}`,
          action1: { label: 'OK' }
        })
      }
    },
    async loadForecastWeather ({ commit, dispatch }, date = undefined) {
      commit(types.SET_LOADING_STATUS, true)
      let url = processLocalizedURLAddress(getApiEndpointUrl(config.weather, 'forecast_endpoint'))
        .replace('{{query}}', encodeURIComponent(config.weather.location))

      if (date) {
        url = url.replace('days', 'dt').replace('{{days}}', encodeURIComponent(date))
      } else {
        url = url.replace('{{days}}', '3')
      }

      const response = await fetch(url)
      const json = await response.json()
      commit(types.SET_LOADING_STATUS, false)

      if (json.code === 200) {
        commit(types.SET_WEATHER_DATA, json.result)
      } else {
        dispatch('notification/spawnNotification', {
          type: 'error',
          message: `Failed to load weather data: ${json.result}`,
          action1: { label: 'OK' }
        })
      }
    }
  },
  mutations: {
    [types.SET_WEATHER_DATA] (state, json) {
      state.weatherData = json
    },
    [types.SET_FORECAST_MODE] (state, selectedMode) {
      state.forecastMode = selectedMode
    },
    [types.SET_LOADING_STATUS] (state, newStatus) {
      state.loading = newStatus
    }
  },
  getters: {
    getWeatherData: state => {
      return state.weatherData
    },
    getForecastMode: state => {
      return state.forecastMode
    },
    getLoadingStatus: state => {
      return state.loading
    }
  }
}
