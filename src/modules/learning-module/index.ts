import { StorefrontModule } from '@vue-storefront/core/lib/modules';
import { WeatherModule } from './store'

export const LearningModule: StorefrontModule = function ({ app, store, router, moduleConfig, appConfig }) {
  store.registerModule('weather', WeatherModule)
}
