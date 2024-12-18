import type { HttpContext } from '@adonisjs/core/http'
import Product from '#models/product'
import app from '@adonisjs/core/services/app'
import { cuid } from '@adonisjs/core/helpers'

export default class ProductsController {
  async index({ response }: HttpContext) {
    try {
      const products = await Product.all()
      return response.status(200).json({ data: products })
    } catch (error) {
      return response.status(500).json({ error: 'internal error' })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const images = request.files('images', {
        extnames: ['jpg', 'png', 'jpeg'],
        size: '2mb',
      })

      let imagePaths: string[] = []

      if (images) {
        for (let i = 0; i < Math.min(images.length, 3); i++) {
          const image = images[i]
          await image.move(app.makePath('./public/images'), {
            name: `${cuid()}.${image.extname}`,
          })

          imagePaths.push(`./public/images/${image.fileName}`)
        }
      }

      const product = new Product()
      product.name = request.input('name')
      product.description = request.input('description')
      product.price = request.input('price')
      product.stock = request.input('stock')
      product.volume = request.input('volume')
      product.type = request.input('type')
      product.manufacturer_id = request.input('manufacturer_id')
      product.bulk_units = request.input('bulk_units')
      //use images as key on body form to actually do http request.
      product.image_url_1 = imagePaths[0] || null
      product.image_url_2 = imagePaths[1] || null
      product.image_url_3 = imagePaths[2] || null

      await product.save()

      return response.status(200).json({ message: 'product created successfully', data: product })
    } catch (error) {
      console.error(error)
      return response.status(400).json({ error: 'error while creating the product' })
    }
  }

  async show({ response, params }: HttpContext) {
    try {
      const product = await Product.findByOrFail('id', params.id)
      return response.status(200).json({ data: product })
    } catch (error) {
      return response.status(404).json({ error: 'product not found' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const product = await Product.findByOrFail('id', params.id)

      const images = request.files('images', {
        extnames: ['jpg', 'png', 'jpeg'],
        size: '2mb',
      })

      let imagePaths: string[] = []

      if (images) {
        for (let i = 0; i < Math.min(images.length, 3); i++) {
          const image = images[i]
          await image.move(app.makePath('./public/images'), {
            name: `${cuid()}.${image.extname}`,
          })

          imagePaths.push(`./public/images/${image.fileName}`)
        }
      }

      product.name = request.input('name') || product.name
      product.description = request.input('description') || product.description
      product.price = request.input('price') || product.price
      product.stock = request.input('stock') || product.stock
      product.volume = request.input('volume') || product.volume
      product.type = request.input('type') || product.type
      product.manufacturer_id = request.input('manufacturer_id') || product.manufacturer_id
      product.bulk_units = request.input('bulk_units') || product.bulk_units
      // keeps the old image, dont set the value as null
      product.image_url_1 = imagePaths[0] || product.image_url_1
      product.image_url_2 = imagePaths[1] || product.image_url_2
      product.image_url_3 = imagePaths[2] || product.image_url_3
      await product.save()

      return response.status(200).json({ message: 'product updated', data: product })
    } catch (error) {
      return response.status(400).json({ error: 'product not found' })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const product = await Product.findByOrFail('id', params.id)
      await product.delete()
      return response.status(200).json({ message: 'product deleted successfully' })
    } catch (error) {
      return response.status(400).json({ error: 'product not found' })
    }
  }

  // purely for dev reasons, todo: implement image erasing as well

  async erase({ response }: HttpContext) {
    try {
      await Product.query().delete()
      return response.status(200).json({ message: 'all products deleted successfully' })
    } catch {
      return response.status(400).json({ error: 'products cannot be deleted' })
    }
  }
}
