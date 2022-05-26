import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Planilla, ItemPlanilla} from '../models';
import {PlanillaRepository, ItemPlanillaRepository} from '../repositories';
import {PlanillaService} from '../services';
import {BindingKey} from '@loopback/core';
import {injectable, inject,  BindingScope} from '@loopback/core';
import {CoreTags, asService} from '@loopback/core';

export class PlanillaController {
  constructor(
  @inject('service.PlanillaService') private planillaService: PlanillaService,
    @repository(PlanillaRepository)
    public planillaRepository : PlanillaRepository,
	@repository(ItemPlanillaRepository)
    public itemPlanillaRepository : ItemPlanillaRepository,
  ) {}

  @post('/planilla')
  @response(200, {
    description: 'Planilla model instance',
    content: {'application/json': {schema: getModelSchemaRef(Planilla)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Planilla, {
            title: 'NewPlanilla',
            exclude: ['numero_planilla'],
          }),
        },
      },
    })
    planilla: Omit<Planilla, 'numero_planilla'>,
  ): Promise<Planilla> {
    return this.planillaRepository.create(planilla);
  }

  @get('/planilla/count')
  @response(200, {
    description: 'Planilla model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Planilla) where?: Where<Planilla>,
  ): Promise<Count> {
    return this.planillaRepository.count(where);
  }

  @get('/planilla')
  @response(200, {
    description: 'Array of Planilla model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Planilla, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Planilla) filter?: Filter<Planilla>,
  ): Promise<Planilla[]> {
    return this.planillaRepository.find(filter);
  }

  @patch('/planilla')
  @response(200, {
    description: 'Planilla PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Planilla, {partial: true}),
        },
      },
    })
    planilla: Planilla,
    @param.where(Planilla) where?: Where<Planilla>,
  ): Promise<Count> {
    return this.planillaRepository.updateAll(planilla, where);
  }

  @get('/planilla/{id}')
  @response(200, {
    description: 'Planilla model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Planilla, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Planilla, {exclude: 'where'}) filter?: FilterExcludingWhere<Planilla>
  ): Promise<Planilla> {
    return this.planillaRepository.findById(id, filter);
  }
  
  @post('/planilla/{idpla}/item/{idpaq}')
    @response(200, {
    description: 'ItemPlanilla model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ItemPlanilla, {includeRelations: true}),
      },
    },
  })
  async createItem(@param.path.string('idpla') id: string, @param.path.string('idpaq') tracking: string): Promise<ItemPlanilla> {
	let duplicate = await this.itemPlanillaRepository.find({where: {planillaId: id, paqueteId: tracking}})
	if (duplicate.length == 0)
	{
		let pos = await this.itemPlanillaRepository.find({where: {planillaId: id}});
		return this.itemPlanillaRepository.create({"paqueteId" : tracking, "planillaId" : id, "posicion" : pos.length + 1});
	}
	else
	{
		throw new Error("Ese paquete ya existe como item de esta planilla");
	}
  }

  @patch('/planilla/{id}')
  @response(204, {
    description: 'Planilla PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Planilla, {partial: true}),
        },
      },
    })
    planilla: Planilla,
  ): Promise<void> {
    await this.planillaRepository.updateById(id, planilla);
  }

  @del('/planilla/{id}')
  @response(204, {
    description: 'Planilla DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.planillaRepository.deleteById(id);
  }
  
  @patch('/planilla/items/{id}')
  @response(204, {
    description: 'Planilla PATCH success',
  })
  async moverTransito(
    @param.path.string('id') id: string  ): Promise<Planilla> {
		
    return this.planillaService.moverTransito(id);
  }
}
