import {Entity, model, property} from '@loopback/repository';

export enum Motivo_fallo
{
  proc = "No se puede procesar",
  paqu = "No se encontro el paquete"
}

@model()
export class ItemPlanilla extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  posicion?: number;

  @property({
    type: 'boolean',
  })
  fallo?: boolean;

  @property({
    type: 'string',
    jsonSchema: {
      enum: Object.values(Motivo_fallo),
    },
  })
  motivo_fallo?: Motivo_fallo;


  constructor(data?: Partial<ItemPlanilla>) {
    super(data);
  }
}

export interface ItemPlanillaRelations {
  // describe navigational properties here
}

export type ItemPlanillaWithRelations = ItemPlanilla & ItemPlanillaRelations;
