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
  Cliente,
  Paquete,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClientePaqueteController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/paquetes', {
    responses: {
      '200': {
        description: 'Array of Cliente has many Paquete',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Paquete)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Paquete>,
  ): Promise<Paquete[]> {
    return this.clienteRepository.paquetes(id).find(filter);
  }

  @post('/clientes/{id}/paquetes', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Paquete)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Cliente.prototype.username,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Paquete, {
            title: 'NewPaqueteInCliente',
            exclude: ['tracking'],
            optional: ['clienteusername']
          }),
        },
      },
    }) paquete: Omit<Paquete, 'tracking'>,
  ): Promise<Paquete> {
    return this.clienteRepository.paquetes(id).create(paquete);
  }

  @patch('/clientes/{id}/paquetes', {
    responses: {
      '200': {
        description: 'Cliente.Paquete PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Paquete, {partial: true}),
        },
      },
    })
    paquete: Partial<Paquete>,
    @param.query.object('where', getWhereSchemaFor(Paquete)) where?: Where<Paquete>,
  ): Promise<Count> {
    return this.clienteRepository.paquetes(id).patch(paquete, where);
  }

  @del('/clientes/{id}/paquetes', {
    responses: {
      '200': {
        description: 'Cliente.Paquete DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Paquete)) where?: Where<Paquete>,
  ): Promise<Count> {
    return this.clienteRepository.paquetes(id).delete(where);
  }
}
