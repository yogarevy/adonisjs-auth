'use strict'

const User = use('App/Models/User')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    try {
      let search_term = request.input('search')
      let page = (request.input('page') != null) ? request.input('page') : 1
      let limit = (request.input('limit') != null) ? request.input('limit') : 10
      let sort = (request.input('sort') != null) ? request.input('sort') : 'users.updated_at'
      let order = (request.input('order') != null) ? request.input('order') : 'DESC'
      let conditions = '1 = 1'
 
      if (search_term != null) {
        conditions += " AND users.name ILIKE '%" + search_term + "%'"
        conditions += " OR users.phone ILIKE '%" + search_term + "%'"
        conditions += " OR users.email ILIKE '%" + search_term + "%'"
      }

      const result = await User.query().whereRaw(conditions).orderBy(sort, order).paginate(page, limit)
      return response.status(200).json({
        status: 200,
        message: 'Successfully executed',
        ...result.toJSON()
      })
    } catch (error) {
      return response
        .status(error.status)
        .send(error)
    }
  }

  /**
   * Render a form to be used for creating a new user.
   * GET users/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing user.
   * GET users/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = UserController
