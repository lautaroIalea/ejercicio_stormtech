import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Paquete,
  ItemPlanilla,
} from '../models';
import {PaqueteRepository} from '../repositories';

export class PaqueteItemPlanillaController {
  constructor(
    @repository(PaqueteRepository) protected paqueteRepository: PaqueteRepository,
  ) { }

  @get('/paquetes/{id}/item-planillas', {
    responses: {
      '200': {
        description: 'Array of Paquete has many ItemPlanilla',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ItemPlanilla)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<ItemPlanilla>,
  ): Promise<ItemPlanilla[]> {
    return this.paqueteRepository.Items(id).find(filter);
  }

  @post('/paquetes/{id}/item-planillas', {
    responses: {
      '200': {
        description: 'Paquete model instance',
        content: {'application/json': {schema: getModelSchemaRef(ItemPlanilla)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Paquete.prototype.tracking,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ItemPlanilla, {
            title: 'NewItemPlanillaInPaquete',
            exclude: ['id'],
            optional: ['paqueteId']
          }),
        },
      },
    }) itemPlanilla: Omit<ItemPlanilla, 'id'>,
  ): Promise<ItemPlanilla> {
    return this.paqueteRepository.Items(id).create(itemPlanilla);
  }

  @patch('/paquetes/{id}/item-planillas', {
    responses: {
      '200': {
        description: 'Paquete.ItemPlanilla PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ItemPlanilla, {partial: true}),
        },
      },
    })
    itemPlanilla: Partial<ItemPlanilla>,
    @param.query.object('where', getWhereSchemaFor(ItemPlanilla)) where?: Where<ItemPlanilla>,
  ): Promise<Count> {
    return this.paqueteRepository.Items(id).patch(itemPlanilla, where);
  }

  @del('/paquetes/{id}/item-planillas', {
    responses: {
      '200': {
        description: 'Paquete.ItemPlanilla DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ItemPlanilla)) where?: Where<ItemPlanilla>,
  ): Promise<Count> {
    return this.paqueteRepository.Items(id).delete(where);
  }
}
