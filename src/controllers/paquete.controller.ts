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
import {Paquete} from '../models';
import {PaqueteRepository} from '../repositories';

export class PaqueteController {
  constructor(
    @repository(PaqueteRepository)
    public paqueteRepository : PaqueteRepository,
  ) {}

  @post('/paquete')
  @response(200, {
    description: 'Paquete model instance',
    content: {'application/json': {schema: getModelSchemaRef(Paquete)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Paquete, {
            title: 'NewPaquete',
            
          }),
        },
      },
    })
    paquete: Paquete,
  ): Promise<Paquete> {
    return this.paqueteRepository.create(paquete);
  }

  @get('/paquete/count')
  @response(200, {
    description: 'Paquete model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Paquete) where?: Where<Paquete>,
  ): Promise<Count> {
    return this.paqueteRepository.count(where);
  }

  @get('/paquete')
  @response(200, {
    description: 'Array of Paquete model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Paquete, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Paquete) filter?: Filter<Paquete>,
  ): Promise<Paquete[]> {
    return this.paqueteRepository.find(filter);
  }

  @patch('/paquete')
  @response(200, {
    description: 'Paquete PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Paquete, {partial: true}),
        },
      },
    })
    paquete: Paquete,
    @param.where(Paquete) where?: Where<Paquete>,
  ): Promise<Count> {
    return this.paqueteRepository.updateAll(paquete, where);
  }

  @get('/paquete/{id}')
  @response(200, {
    description: 'Paquete model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Paquete, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Paquete, {exclude: 'where'}) filter?: FilterExcludingWhere<Paquete>
  ): Promise<Paquete> {
    return this.paqueteRepository.findById(id, filter);
  }

  @patch('/paquete/{id}')
  @response(204, {
    description: 'Paquete PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Paquete, {partial: true}),
        },
      },
    })
    paquete: Paquete,
  ): Promise<void> {
    await this.paqueteRepository.updateById(id, paquete);
  }

  @del('/paquete/{id}')
  @response(204, {
    description: 'Paquete DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.paqueteRepository.deleteById(id);
  }
}
