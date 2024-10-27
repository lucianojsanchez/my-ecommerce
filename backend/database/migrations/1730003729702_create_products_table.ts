import { BaseSchema } from '@adonisjs/lucid/schema'

export default class AddImageUrlsToProducts extends BaseSchema {
  protected tableName = 'products'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('image_url_1').nullable()
      table.string('image_url_2').nullable()
      table.string('image_url_3').nullable()
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('image_url_1')
      table.dropColumn('image_url_2')
      table.dropColumn('image_url_3')
    })
  }
}
