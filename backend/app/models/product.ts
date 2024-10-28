import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Manufacturer from './manufacturer.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { belongsTo } from '@adonisjs/lucid/orm'
import CartItem from './cart_item.js'

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
  public image_url_1?: string | null

  @column()
  public image_url_2?: string | null

  @column()
  public image_url_3?: string | null

  @column()
  public manufacturer_id: number = 0

  @column()
  public bulk_units: number = 1

  @belongsTo(() => Manufacturer)
  public manufacturer!: BelongsTo<typeof Manufacturer>

  @hasMany(() => CartItem)
  public cartItems!: HasMany<typeof CartItem>
}
