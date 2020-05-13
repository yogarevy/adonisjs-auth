'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
}).middleware(['auth'])

//Authentication
Route.group(() => {
  Route.post('auth/register', 'AuthController.register').as('register')
  Route.post('auth/login', 'AuthController.login').as('login')
}).prefix('api/v1').namespace('Auth')

//Users
Route.group(() => {
  Route.get('users', 'UserController.index').as('user-index')
}).prefix('api/v1').middleware(['auth'])