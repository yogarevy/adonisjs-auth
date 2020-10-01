'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ImagesSchema extends Schema {
  up () {
    this.create('images', (table) => {
      table.uuid('id').primary().unique()
      table.text('path').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('images')
  }
}

module.exports = ImagesSchema
