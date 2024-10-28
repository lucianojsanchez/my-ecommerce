import Cart from '#models/cart'
import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'
import CartItem from '#models/cart_item'

export default class CartItemsController {
  async store({ request, response }: HttpContext) {
    try {
      const cartId = request.input('cart_id')
      const productId = request.input('product_id')
      const quantity = request.input('quantity')
      const product = await Product.find(productId)

      if (!product) {
        return response.status(400).json({ error: 'product not found' })
      }
      const cart = await Cart.find(cartId)

      if (!cart) {
        return response.status(400).json({ error: 'cart not found' })
      }

      const cartItem = await CartItem.create({ cartId, productId, quantity })
      return response.status(200).json({ message: 'product added to cart', data: cartItem })
    } catch (error) {
      console.error(error)
      return response.status(400).json({ error: 'error adding product to cart' })
    }
  }
  async update({ params, request, response }: HttpContext) {
    try {
      const cartItem = await CartItem.findByOrFail('id', params.id)
      cartItem.quantity = request.input('quantity')
      await cartItem.save()
      return response.status(200).json({ message: 'cart item updated', data: cartItem })
    } catch (error) {
      return response.status(400).json({ error: 'failed to update cart item' })
    }
  }
  async destroy({ params, response }: HttpContext) {
    try {
      const cartItem = await CartItem.findByOrFail('id', params.id)
      await cartItem.delete()
      return response.status(200).json({ message: 'cart item deleted' })
    } catch (error) {
      return response.status(400).json({ error: 'failed to delete cart item' })
    }
  }
}
