import {Entity, model, property, hasMany} from '@loopback/repository';
import {Paquete} from './paquete.model';
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

  @hasMany(() => Paquete, {through: {model: () => ItemPlanilla}})
  paquetes: Paquete[];

  constructor(data?: Partial<Planilla>) {
    super(data);
  }
}

export interface PlanillaRelations {
  // describe navigational properties here
}

export type PlanillaWithRelations = Planilla & PlanillaRelations;
