import type { HttpContext } from '@adonisjs/core/http'
import Product from '#models/product'

export default class ProductsController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    try {
      const products = await Product.all()
      return response.status(200).json({ data: products })
    } catch (error) {
      return response.status(500).json({ error: 'internal error' })
    }
  }

  async create({}: HttpContext) {}

  /**
   * Handle form submiss ion for the create action
   */
  async store({ request, response }: HttpContext) {
    try {
      const product = new Product()
      product.name = request.input('name')
      product.description = request.input('description')
      product.price = request.input('price')
      product.stock = request.input('stock')
      product.volume = request.input('volume')
      product.type = request.input('type')
      product.image_url = request.input('image_url')
      await product.save()

      return response.status(200).json({ message: 'product created', data: product })
    } catch (error) {}
  }

  /**
   * Show individual record
   */
  async show({ response, params }: HttpContext) {
    try {
      const product = await Product.findByOrFail('id', params.id)
      return response.status(200).json({ data: product })
    } catch (error) {
      return response.status(404).json({ error: 'product not found' })
    }
  }

  /**
   * Edit individual record
   */
  async edit({ response, params, request }: HttpContext) {
    try {
      const product = await Product.findByOrFail('id', params.id)

      product.name = request.input('name')
      product.description = request.input('description')
      product.price = request.input('price')
      product.stock = request.input('stock')
      product.volume = request.input('volume')
      product.type = request.input('type')
      product.image_url = request.input('image_url')
      await product.save()

      return response.status(200).json({ message: 'product updated', data: product })
    } catch (error) {
      return response.status(404).json({ error: 'product not found' })
    }
  }

  /**
   * Handle form submission for the edit action
   */
  /*  async update({ params, request }: HttpContext) {} */

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const product = await Product.findByOrFail('id', params.id)
      await product.delete()
    } catch (error) {
      return response.status(404).json({ error: 'product not found' })
    }
  }
}
