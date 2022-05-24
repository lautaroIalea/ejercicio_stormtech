import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<Planilla>) {
    super(data);
  }
}

export interface PlanillaRelations {
  // describe navigational properties here
}

export type PlanillaWithRelations = Planilla & PlanillaRelations;
