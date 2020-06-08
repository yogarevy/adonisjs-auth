'use strict'

// @ts-ignore
const BaseExceptionHandler = use('BaseExceptionHandler')
// @ts-ignore
const Mapper = use('Mapper')

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle (error, { request, response }) {
    if (error.status === 500) {
      response.status(error.status).send(Mapper.error('Oops... Something went wrong.', request.method(), request.originalUrl(), error.status))
    } else if (error.status === 404) {
      response.status(error.status).send(Mapper.error('Oops... Not Found.', request.method(), request.originalUrl(), error.status))
    } else {
      response.status(error.status).send(Mapper.error(error.message, request.method(), request.originalUrl(), error.status))
    }
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report (error, { request }) {
  }
}

module.exports = ExceptionHandler
