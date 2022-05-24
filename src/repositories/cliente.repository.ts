import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Cliente, ClienteRelations, Paquete} from '../models';
import {PaqueteRepository} from './paquete.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.username,
  ClienteRelations
> {

  public readonly paquetes: HasManyRepositoryFactory<Paquete, typeof Cliente.prototype.username>;

  constructor(
    @inject('datasources.DB') dataSource: DbDataSource, @repository.getter('PaqueteRepository') protected paqueteRepositoryGetter: Getter<PaqueteRepository>,
  ) {
    super(Cliente, dataSource);
    this.paquetes = this.createHasManyRepositoryFactoryFor('paquetes', paqueteRepositoryGetter,);
    this.registerInclusionResolver('paquetes', this.paquetes.inclusionResolver);
  }
}
