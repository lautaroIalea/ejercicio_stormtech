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
  Planilla,
  ItemPlanilla,
} from '../models';
import {PlanillaRepository} from '../repositories';

export class PlanillaItemPlanillaController {
  constructor(
    @repository(PlanillaRepository) protected planillaRepository: PlanillaRepository,
  ) { }

  @get('/planillas/{id}/item-planillas', {
    responses: {
      '200': {
        description: 'Array of Planilla has many ItemPlanilla',
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
    return this.planillaRepository.Items(id).find(filter);
  }

  @post('/planillas/{id}/item-planillas', {
    responses: {
      '200': {
        description: 'Planilla model instance',
        content: {'application/json': {schema: getModelSchemaRef(ItemPlanilla)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Planilla.prototype.numero_planilla,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ItemPlanilla, {
            title: 'NewItemPlanillaInPlanilla',
            exclude: ['id'],
            optional: ['planillaId']
          }),
        },
      },
    }) itemPlanilla: Omit<ItemPlanilla, 'id'>,
  ): Promise<ItemPlanilla> {
    return this.planillaRepository.Items(id).create(itemPlanilla);
  }

  @patch('/planillas/{id}/item-planillas', {
    responses: {
      '200': {
        description: 'Planilla.ItemPlanilla PATCH success count',
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
    return this.planillaRepository.Items(id).patch(itemPlanilla, where);
  }

  @del('/planillas/{id}/item-planillas', {
    responses: {
      '200': {
        description: 'Planilla.ItemPlanilla DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ItemPlanilla)) where?: Where<ItemPlanilla>,
  ): Promise<Count> {
    return this.planillaRepository.Items(id).delete(where);
  }
}
