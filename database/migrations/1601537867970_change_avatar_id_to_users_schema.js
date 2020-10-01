'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChangeAvatarIdToUsersSchema extends Schema {
  up () {
    this.alter('users', (table) => {
      // alter table
      table.uuid('avatar_id').nullable().alter()
      table.foreign('avatar_id').references('id').inTable('images')
    })
  }

  down () {
    this.table('users', (table) => {
      // reverse alternations
      table.uuid('avatar_id').nullable()
    })
  }
}

module.exports = ChangeAvatarIdToUsersSchema
