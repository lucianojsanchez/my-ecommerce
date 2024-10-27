import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer('manufacturer_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('manufacturers')
        .onDelete('SET NULL')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('manufacturer_id')
    })
  }
}
