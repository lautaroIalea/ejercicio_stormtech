import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Paquete, PaqueteRelations, Cliente, Planilla, ItemPlanilla} from '../models';
import {ClienteRepository} from './cliente.repository';
import {ItemPlanillaRepository} from './item-planilla.repository';
import {PlanillaRepository} from './planilla.repository';

export class PaqueteRepository extends DefaultCrudRepository<
  Paquete,
  typeof Paquete.prototype.tracking,
  PaqueteRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Paquete.prototype.tracking>;

  public readonly planillas: HasManyThroughRepositoryFactory<Planilla, typeof Planilla.prototype.numero_planilla,
          ItemPlanilla,
          typeof Paquete.prototype.tracking
        >;

  constructor(
    @inject('datasources.DB') dataSource: DbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('ItemPlanillaRepository') protected itemPlanillaRepositoryGetter: Getter<ItemPlanillaRepository>, @repository.getter('PlanillaRepository') protected planillaRepositoryGetter: Getter<PlanillaRepository>,
  ) {
    super(Paquete, dataSource);
    this.planillas = this.createHasManyThroughRepositoryFactoryFor('planillas', planillaRepositoryGetter, itemPlanillaRepositoryGetter,);
    this.registerInclusionResolver('planillas', this.planillas.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
