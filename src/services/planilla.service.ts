import {injectable, BindingScope} from '@loopback/core';
import {Planilla, Estado} from '../models';
import {PlanillaRepository} from '../repositories';
import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where,} from '@loopback/repository';
import {BindingKey} from '@loopback/core';

export const Planilla_Service = BindingKey.create<PlanillaService>('service.PlanillaService');
@injectable({scope: BindingScope.TRANSIENT})

export class PlanillaService {
  constructor(@repository(PlanillaRepository) private planillaRepository : PlanillaRepository) {}
  
  async moverTransito(id : string) : Promise<Planilla>
  {
	this.planillaRepository.paquetes(id).patch({"estado" : Estado.dist})
	return this.planillaRepository.findById(id, {include: ['paquetes']});
  }
}
