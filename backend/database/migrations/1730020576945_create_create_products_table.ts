import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.text('description')
      table.decimal('price', 12, 2).notNullable()
      table.integer('stock').defaultTo(0)
      table.integer('volume').notNullable()
      table.string('type').notNullable()
      table.boolean('is_active').defaultTo(true)
      table.string('image_url_1').nullable()
      table.string('image_url_2').nullable()
      table.string('image_url_3').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
