import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {ItemPlanilla, ItemPlanillaRelations} from '../models';

export class ItemPlanillaRepository extends DefaultCrudRepository<
  ItemPlanilla,
  typeof ItemPlanilla.prototype.id,
  ItemPlanillaRelations
> {
  constructor(
    @inject('datasources.DB') dataSource: DbDataSource,
  ) {
    super(ItemPlanilla, dataSource);
  }
}
