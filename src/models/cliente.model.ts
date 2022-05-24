import {Entity, model, property} from '@loopback/repository';

@model()
export class Cliente extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  username: string;

  @property({
    type: 'string',
  })
  nombre?: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_creacion: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'number',
    required: true,
  })
  telefono: number;

  @property({
    type: 'boolean',
    required: true,
  })
  premium: boolean;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;


  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
