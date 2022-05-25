import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {ItemPlanilla} from '../models';
import {ItemPlanillaRepository} from '../repositories';

export class ItemPlanillaController {
  constructor(
    @repository(ItemPlanillaRepository)
    public itemPlanillaRepository : ItemPlanillaRepository,
  ) {}


  @get('/item-planillas')
  @response(200, {
    description: 'Array of ItemPlanilla model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ItemPlanilla, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ItemPlanilla) filter?: Filter<ItemPlanilla>,
  ): Promise<ItemPlanilla[]> {
    return this.itemPlanillaRepository.find(filter);
  }

  @patch('/item-planillas')
  @response(200, {
    description: 'ItemPlanilla PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ItemPlanilla, {partial: true}),
        },
      },
    })
    itemPlanilla: ItemPlanilla,
    @param.where(ItemPlanilla) where?: Where<ItemPlanilla>,
  ): Promise<Count> {
    return this.itemPlanillaRepository.updateAll(itemPlanilla, where);
  }

  @get('/item-planillas/{id}')
  @response(200, {
    description: 'ItemPlanilla model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ItemPlanilla, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ItemPlanilla, {exclude: 'where'}) filter?: FilterExcludingWhere<ItemPlanilla>
  ): Promise<ItemPlanilla> {
    return this.itemPlanillaRepository.findById(id, filter);
  }

  @patch('/item-planillas/{id}')
  @response(204, {
    description: 'ItemPlanilla PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ItemPlanilla, {partial: true}),
        },
      },
    })
    itemPlanilla: ItemPlanilla,
  ): Promise<void> {
    await this.itemPlanillaRepository.updateById(id, itemPlanilla);
  }

  @del('/item-planillas/{id}')
  @response(204, {
    description: 'ItemPlanilla DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.itemPlanillaRepository.deleteById(id);
  }
}
