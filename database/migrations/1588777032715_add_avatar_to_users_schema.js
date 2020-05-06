'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddAvatarToUsersSchema extends Schema {
  up () {
    this.alter('users', (table) => {
      // alter table
      // add new columns or remove existing
      table.uuid('avatar_id').nullable()
    })
  }

  down () {
    this.table('users', (table) => {
      // reverse alternations
      table.dropColumn('avatar_id')
    })
  }
}

module.exports = AddAvatarToUsersSchema
