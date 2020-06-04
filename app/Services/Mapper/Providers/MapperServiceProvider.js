'use strict'

const { ServiceProvider } = require('@adonisjs/fold')
// @ts-ignore
const MapperService = use('App/Services/Mapper/MapperService')

class MapperServiceProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register () {
    //
    this.app.singleton('Mapper', () => {
      return new MapperService()
    })
  }

  /**
   * Attach context getter when all providers have
   * been registered
   *
   * @method boot
   *
   * @return {void}
   */
  boot () {
    //
  }
}

module.exports = MapperServiceProvider
