import {inject} from '@loopback/core';
import {repository,} from '@loopback/repository';
import {post, Request, requestBody, Response, RestBindings, param,} from '@loopback/rest';
import {PlanillaRepository} from '../repositories';
import {Planilla} from '../models';

const csv = require('csv-parser');
const fs = require('fs');

export class CSVController {
  constructor(@repository(PlanillaRepository) private planillaRepository : PlanillaRepository) {}
  @post('/loadto/{id}', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'Planilla',
            },
          },
        },
        description: 'planilla con los paquetes cargados',
      },
    },
  })
  async CSVLoadTo(@param.path.string('id') id: string,): Promise<Planilla> 
  {
    await fs.createReadStream("./CSV/Paquetes.csv").pipe(csv()).on('data', row => {this.planillaRepository.paquetes(id).create(row)});
	return this.planillaRepository.findById(id, {include: ['paquetes']});
  }
}