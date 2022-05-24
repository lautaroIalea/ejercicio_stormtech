import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Planilla, PlanillaRelations, ItemPlanilla} from '../models';
import {ItemPlanillaRepository} from './item-planilla.repository';

export class PlanillaRepository extends DefaultCrudRepository<
  Planilla,
  typeof Planilla.prototype.numero_planilla,
  PlanillaRelations
> {

  public readonly Items: HasManyRepositoryFactory<ItemPlanilla, typeof Planilla.prototype.numero_planilla>;

  constructor(
    @inject('datasources.DB') dataSource: DbDataSource, @repository.getter('ItemPlanillaRepository') protected itemPlanillaRepositoryGetter: Getter<ItemPlanillaRepository>,
  ) {
    super(Planilla, dataSource);
    this.Items = this.createHasManyRepositoryFactoryFor('Items', itemPlanillaRepositoryGetter,);
    this.registerInclusionResolver('Items', this.Items.inclusionResolver);
  }
}
