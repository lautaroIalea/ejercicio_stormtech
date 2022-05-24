import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Paquete,
  Cliente,
} from '../models';
import {PaqueteRepository} from '../repositories';

export class PaqueteClienteController {
  constructor(
    @repository(PaqueteRepository)
    public paqueteRepository: PaqueteRepository,
  ) { }

  @get('/paquetes/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to Paquete',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.string('id') id: typeof Paquete.prototype.tracking,
  ): Promise<Cliente> {
    return this.paqueteRepository.clientepaquete(id);
  }
}
