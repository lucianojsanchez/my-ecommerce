import type { HttpContext } from '@adonisjs/core/http'
import Manufacturer from '#models/manufacturer'

export default class ManufacturersController {
  async index({ response }: HttpContext) {
    try {
      const manufacturers = await Manufacturer.all()
      return response.status(200).json({ data: manufacturers })
    } catch (error) {
      return response.status(500).json({ error: 'internal error' })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const manufacturer = new Manufacturer()
      manufacturer.name = request.input('name')
      await manufacturer.save()
      return response.status(201).json({ message: 'manufacturer created', data: manufacturer })
    } catch (error) {}
  }

  async show({ params, response }: HttpContext) {
    try {
      const manufacturer = await Manufacturer.findByOrFail('id', params.id)
      return response.status(200).json({ data: manufacturer })
    } catch (error) {
      return response.status(404).json({ error: 'manufacturer not found' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const manufacturer = await Manufacturer.findOrFail(params.id)
      manufacturer.name = request.input('name')
      await manufacturer.save()
      return response.status(200).json({ message: 'manufacturer updated', data: manufacturer })
    } catch (error) {
      return response.status(500).json({ error: 'failed to update manufacturer' })
    }
  }

  public async destroy({ params, response }: HttpContext) {
    try {
      const manufacturer = await Manufacturer.findOrFail(params.id)
      await manufacturer.delete()
      return response.status(200).json({ message: 'Manufacturer deleted' })
    } catch (error) {
      return response.status(500).json({ error: 'Failed to delete manufacturer' })
    }
  }
}
