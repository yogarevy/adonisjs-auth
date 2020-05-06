'use strict'

const User = use('App/Models/User')
const uuid = require('uuid/v4')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with auths
 */
class AuthController {
  
  /**
   * Create/save a new auth.
   * POST auths
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async register ({ request, auth, response }) {
    try {
      //getting data passed within the request
      const data = request.only(['name', 'email', 'password', 'phone'])

      let dataUser = {
        id: uuid(),
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        status: 1,
        is_main: 1
      }
  
      //looking for user in database
      const userExists = await User.findBy('email', data.email)
  
      //if user exists then dont save
      if (userExists) {
        return response
          .status(400)
          .send(
            {
              status: 400,
              message: "User already registered."
            }
          )
      } else {
        // if user doesn't exist, proceeds with saving him in DB
        const user = await User.create(dataUser)
        
        let accessToken = await auth.generate(user)
        return response.status(200).send({status: 200, message: 'Successed register new user'})
      }
      
    } catch (err) {
      return response
        .status(err.status)
        .send(err)
    }
  }

  /**
   * Login auth.
   * POST auths
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async login ({ request, auth, response }) {
    try {
      //getting data passed within the request
      const data = request.only(['email', 'password'])

      if (await auth.withRefreshToken().attempt(data.email, data.password)) {
        let user = await User.findBy('email', data.email)
        let accessToken = await auth.withRefreshToken().attempt(data.email, data.password)

        return response.status(200).send(
          {
            status: 200,
            message: 'Succesfully Login',
            data: user,
            access_token: accessToken
          }
        )
      }
      
    } catch (err) {
      return response
        .status(err.status)
        .send(err)
    }
  }
  
}

module.exports = AuthController
