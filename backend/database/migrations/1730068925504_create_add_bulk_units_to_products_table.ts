import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('bulk_units').defaultTo(1).notNullable()
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('bulk_units')
    })
  }
}
