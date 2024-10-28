import Cart from '#models/cart'
import type { HttpContext } from '@adonisjs/core/http'
import { cuid } from '@adonisjs/core/helpers'

export default class CartsController {
  async index({ response }: HttpContext) {
    try {
      const carts = await Cart.all()
      return response.status(200).json({ data: carts })
    } catch (error) {
      return response.status(400).json({ error: 'internal error' })
    }
  }
  async store({ response }: HttpContext) {
    try {
      const cart = await Cart.create({ session_id: cuid() })
      return response.status(200).json({ message: 'cart created successfully', data: cart })
    } catch (error) {
      console.error(error)
      return response.status(400).json({ error: 'error while creating the cart' })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const cart = await Cart.query()
        .where('id', params.id)
        .preload('items') // Precargar los artículos del carrito
        .firstOrFail() // Lanza un error si no se encuentra el carrito

      return response.status(200).json({ data: cart })
    } catch (error) {
      return response.status(400).json({ error: 'cart not found' })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const cart = await Cart.findOrFail(params.id)
      await cart.delete()
      return response.status(200).json({ message: 'cart deleted successfully' })
    } catch (error) {
      console.error(error)
      return response.status(400).json({ error: 'cart not found' })
    }
  }
}
