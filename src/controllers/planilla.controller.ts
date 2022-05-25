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
import {Planilla} from '../models';
import {PlanillaRepository} from '../repositories';

export class PlanillaController {
  constructor(
    @repository(PlanillaRepository)
    public planillaRepository : PlanillaRepository,
  ) {}

  @post('/planilla')
  @response(200, {
    description: 'Planilla model instance',
    content: {'application/json': {schema: getModelSchemaRef(Planilla)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Planilla, {
            title: 'NewPlanilla',
            exclude: ['numero_planilla'],
          }),
        },
      },
    })
    planilla: Omit<Planilla, 'numero_planilla'>,
  ): Promise<Planilla> {
    return this.planillaRepository.create(planilla);
  }

  @get('/planilla/count')
  @response(200, {
    description: 'Planilla model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Planilla) where?: Where<Planilla>,
  ): Promise<Count> {
    return this.planillaRepository.count(where);
  }

  @get('/planilla')
  @response(200, {
    description: 'Array of Planilla model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Planilla, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Planilla) filter?: Filter<Planilla>,
  ): Promise<Planilla[]> {
    return this.planillaRepository.find(filter);
  }

  @patch('/planilla')
  @response(200, {
    description: 'Planilla PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Planilla, {partial: true}),
        },
      },
    })
    planilla: Planilla,
    @param.where(Planilla) where?: Where<Planilla>,
  ): Promise<Count> {
    return this.planillaRepository.updateAll(planilla, where);
  }

  @get('/planilla/{id}')
  @response(200, {
    description: 'Planilla model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Planilla, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Planilla, {exclude: 'where'}) filter?: FilterExcludingWhere<Planilla>
  ): Promise<Planilla> {
    return this.planillaRepository.findById(id, filter);
  }

  @patch('/planilla/{id}')
  @response(204, {
    description: 'Planilla PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Planilla, {partial: true}),
        },
      },
    })
    planilla: Planilla,
  ): Promise<void> {
    await this.planillaRepository.updateById(id, planilla);
  }

  @put('/planilla/{id}')
  @response(204, {
    description: 'Planilla PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() planilla: Planilla,
  ): Promise<void> {
    await this.planillaRepository.replaceById(id, planilla);
  }

  @del('/planilla/{id}')
  @response(204, {
    description: 'Planilla DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.planillaRepository.deleteById(id);
  }
}
