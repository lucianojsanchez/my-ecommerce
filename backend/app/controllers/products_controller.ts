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
      product.image_url_1 = imagePaths[0] || null
      product.image_url_2 = imagePaths[1] || null
      product.image_url_3 = imagePaths[2] || null

      await product.save()

      return response.status(201).json({ message: 'product created', data: product })
    } catch (error) {
      console.error(error)
      return response.status(500).json({ error: 'program failed to create the product' })
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
      product.type = request.input('manofacturer') || product.manufacturer
      // keeps the old image, dont set the value as null
      product.image_url_1 = imagePaths[0] || product.image_url_1
      product.image_url_2 = imagePaths[1] || product.image_url_2
      product.image_url_3 = imagePaths[2] || product.image_url_3
      await product.save()

      return response.status(200).json({ message: 'product updated', data: product })
    } catch (error) {
      return response.status(404).json({ error: 'product not found' })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const product = await Product.findByOrFail('id', params.id)
      await product.delete()
    } catch (error) {
      return response.status(404).json({ error: 'product not found' })
    }
  }
}
