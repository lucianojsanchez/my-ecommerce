import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  public name: string = ''

  @column()
  public description: string = ''

  @column()
  public price: number = 0

  @column()
  public stock: number = 0

  @column()
  public volume: number = 0

  @column()
  public type: string = ''

  @column()
  public isActive: boolean = false

  @column()
  public image_url: string = ''
}
