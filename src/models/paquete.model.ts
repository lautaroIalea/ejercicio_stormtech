import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Planilla} from './planilla.model';
import {ItemPlanilla} from './item-planilla.model';

export enum Estado {
  depo = "en deposito",
  dist = "en distribucion"
}

export enum Tipo {
  pequeño = 'P',
  mediano = 'M',
  grande = 'G'
}

@model()
export class Paquete extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  tracking: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion_dest: string;

  @property({
    type: 'number',
    required: true,
  })
  telefono_dest: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre_dest: string;

  @property({
    type: 'number',
    required: true,
  })
  peso: number;

  @property({
    type: 'number',
    required: true,
  })
  altura: number;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: Object.values(Estado),
    },
  })
  estado: Estado;

  @property({
    type: 'string',
    jsonSchema: {
      enum: Object.values(Tipo),
    },
  })
  tipo?: Tipo;

  @belongsTo(() => Cliente)
  clienteId: string;

  @hasMany(() => Planilla, {through: {model: () => ItemPlanilla}})
  planillas: Planilla[];

  constructor(data?: Partial<Paquete>) {
    super(data);
    if (this.peso < 1000)
      this.tipo = Tipo.pequeño;
    else
      if (this.peso < 3000)
        this.tipo = Tipo.mediano;
      else
        this.tipo = Tipo.grande;
  }
}

export interface PaqueteRelations {
  // describe navigational properties here
}

export type PaqueteWithRelations = Paquete & PaqueteRelations;
