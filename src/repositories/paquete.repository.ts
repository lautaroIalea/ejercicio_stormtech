import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Paquete, PaqueteRelations, Cliente, ItemPlanilla} from '../models';
import {ClienteRepository} from './cliente.repository';
import {ItemPlanillaRepository} from './item-planilla.repository';

export class PaqueteRepository extends DefaultCrudRepository<
  Paquete,
  typeof Paquete.prototype.tracking,
  PaqueteRelations
> {

  public readonly clientepaquete: BelongsToAccessor<Cliente, typeof Paquete.prototype.tracking>;

  public readonly Items: HasManyRepositoryFactory<ItemPlanilla, typeof Paquete.prototype.tracking>;

  constructor(
    @inject('datasources.DB') dataSource: DbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('ItemPlanillaRepository') protected itemPlanillaRepositoryGetter: Getter<ItemPlanillaRepository>,
  ) {
    super(Paquete, dataSource);
    this.Items = this.createHasManyRepositoryFactoryFor('Items', itemPlanillaRepositoryGetter,);
    this.registerInclusionResolver('Items', this.Items.inclusionResolver);
    this.clientepaquete = this.createBelongsToAccessorFor('clientepaquete', clienteRepositoryGetter,);
    this.registerInclusionResolver('clientepaquete', this.clientepaquete.inclusionResolver);
  }
}
