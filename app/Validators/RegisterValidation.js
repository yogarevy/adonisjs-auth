'use strict'

// @ts-ignore
const Mapper = use('Mapper')

class RegisterValidation {
  get rules () {
    return {
      // validation rules
      name: 'required|max:150|min:2',
      email: 'required|email|unique:users',
      password: 'required|min:8'
    }
  }

  get messages () {
    return {
      'name.required': 'You must provide a name.',
      'email.required': 'You must provide a email address.',
      'email.email': 'You must provide a valid email address.',
      'email.unique': 'This email is already registered.',
      'password.required': 'You must provide a password'
    }
  }

  /**
   * Handle error return during the validation
   *
   * @method handle
   *
   * @param  {Object} request
   *
   */
  async fails (errorMessages, request ) {
    console.log(errorMessages)
    return Mapper.validation(errorMessages, request.method(), request.originalUrl())
  }
}

module.exports = RegisterValidation
