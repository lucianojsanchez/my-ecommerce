/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import ProductsController from '#controllers/products_controller'
import ManufacturersController from '#controllers/manufacturers_controller'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.resource('products', ProductsController).apiOnly()
router.resource('manufacturer', ManufacturersController).apiOnly()

/* router.delete('clean', [ProductsController, 'erase']) */
