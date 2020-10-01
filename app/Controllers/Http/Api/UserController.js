'use strict'

// @ts-ignore
const User = use('App/Models/User')
// @ts-ignore
const Mapper = use('Mapper')
// @ts-ignore
const UserMapper = use('App/Mappers/UserMapper')
// @ts-ignore
const ExceptionHandler = use('App/Exceptions/Handler')
// @ts-ignore
const Logger = use('Logger')
const { validate } = use('Validator');
const UpdateUserValidation = use("App/Validators/UpdateUserValidation");
const Helpers = use('Helpers')

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
   */
  // @ts-ignore
  async index ({ request, response }) {
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

      let paged = await User.query().whereRaw(conditions).orderBy(sort, order).paginate(page, limit)
      let countAll = await User.getCount()

      return Mapper.list(new UserMapper(), paged, countAll, request.method(), request.originalUrl())
    } catch (e) {
      Logger.debug({
        url: request.originalUrl(),
        method: request.method(),
        error: e.message
      }, 'request details')
      throw new ExceptionHandler()
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
  // @ts-ignore
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
  // @ts-ignore
  async store ({ request, response }) {
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  // @ts-ignore
  async show ({ params, request, response }) {
    try {
      let item = await User.findOrFail(params.id)

      return Mapper.single(new UserMapper(), item, request.method(), request.originalUrl())
    } catch (e) {
      Logger.debug({
        url: request.originalUrl(),
        method: request.method(),
        error: e.message
      }, 'request details')
      throw new ExceptionHandler()
    }
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
  // @ts-ignore
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update user details.
   * PUT or PATCH users/update/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  // @ts-ignore
  async update ({ params, auth, request, response }) {
    try {
      //getting data passed within the request
      const data = request.only(["name", "email", "password", "phone", "status"]);
      let item = await User.findOrFail(params.id)

      const validation = validate(data, UpdateUserValidation.rules, UpdateUserValidation.message);

      let imageId = null
      if (request.file('images')) {
        imageId = request.file('images', {
          types: ['image'],
          size: '2mb'
        })
        await imageId.move(Helpers.tmpPath('uploads'), {
          name: params.id + '.jpg',
            overwrite: true,
        })

        if (!imageId.moved()) {
          return imageId.errors()
        }
      }

      const user = await auth.getUser();
      item.name = data.name
      item.email = data.email
      data.password ? item.password = data.password : ''
      item.status = data.status ? data.status : item.status
      item.last_modified_by = user.id;
      await item.save();

      return Mapper.single(new UserMapper(), item, request.method(), request.originalUrl())
    } catch (e) {
      Logger.debug({
        url: request.originalUrl(),
        method: request.method(),
        error: e.message
      }, 'request details')
      throw new ExceptionHandler()
    }
  }

  /**
   * Delete a user with id.
   * DELETE users/delete/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  // @ts-ignore
  async destroy ({ params, auth, request, response }) {
    try {
      let item = await User.findOrFail(params.id)

      //This update is using when delete type is soft delete
      const user = await auth.getUser();

      item.last_modified_by = user.id
      item.deleted_by = user.id
      item.save()
      //end soft delete

      await item.delete()

      return Mapper.success(request.method(), request.originalUrl())
    } catch (e) {
      Logger.debug({
        url: request.originalUrl(),
        method: request.method(),
        error: e.message
      }, 'request details')
      throw new ExceptionHandler()
    }
  }
}

module.exports = UserController
