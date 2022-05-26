import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Planilla, PlanillaRelations, Paquete, ItemPlanilla} from '../models';
import {ItemPlanillaRepository} from './item-planilla.repository';
import {PaqueteRepository} from './paquete.repository';

export class PlanillaRepository extends DefaultCrudRepository<
  Planilla,
  typeof Planilla.prototype.numero_planilla,
  PlanillaRelations
> {

  public readonly paquetes: HasManyThroughRepositoryFactory<Paquete, typeof Paquete.prototype.tracking,
          ItemPlanilla,
          typeof Planilla.prototype.numero_planilla
        >;

  constructor(
    @inject('datasources.DB') dataSource: DbDataSource, @repository.getter('ItemPlanillaRepository') protected itemPlanillaRepositoryGetter: Getter<ItemPlanillaRepository>, @repository.getter('PaqueteRepository') protected paqueteRepositoryGetter: Getter<PaqueteRepository>,
  ) {
    super(Planilla, dataSource);
    this.paquetes = this.createHasManyThroughRepositoryFactoryFor('paquetes', paqueteRepositoryGetter, itemPlanillaRepositoryGetter,);
    this.registerInclusionResolver('paquetes', this.paquetes.inclusionResolver);
  }
}
