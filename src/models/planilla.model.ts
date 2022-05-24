import {Entity, model, property, hasMany} from '@loopback/repository';
import {ItemPlanilla} from './item-planilla.model';

@model()
export class Planilla extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  numero_planilla?: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
  })
  descripcion?: string;

  @hasMany(() => ItemPlanilla)
  Items: ItemPlanilla[];

  constructor(data?: Partial<Planilla>) {
    super(data);
  }
}

export interface PlanillaRelations {
  // describe navigational properties here
}

export type PlanillaWithRelations = Planilla & PlanillaRelations;
