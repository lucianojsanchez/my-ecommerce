import { BaseSchema } from '@adonisjs/lucid/schema'

export default class AddManufacturerToProducts extends BaseSchema {
  protected tableName = 'products'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.string('manufacturer').nullable()
    })
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('manufacturer')
    })
  }
}
