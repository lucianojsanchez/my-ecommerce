import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import CartItem from './cart_item.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { hasMany } from '@adonisjs/lucid/orm'

export default class Cart extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
public session_id: string = ""

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => CartItem)
  public items!: HasMany<typeof CartItem>
}
