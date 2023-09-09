import { DemandsDtoCreate } from "../../domain/dtos/DataBasic/Demands/Demands/DemandsDtoCreate";
import { IDemandsRepository } from "../../domain/interfaces/repository/DataBasic/IDemandsRepository";
import { IDemandsService } from "../../domain/interfaces/service/DataBasic/IDemandsService";
import { GeneralResponse } from "../../domain/interfaces/service/generalResponse";

class DemandsService implements IDemandsService {
  private readonly _demandsRepository: IDemandsRepository;

  constructor(demandsRespository: IDemandsRepository) {
    this._demandsRepository = demandsRespository;
  }

  async create(entity: DemandsDtoCreate): Promise<GeneralResponse> {
    console.log('entity - service: ', entity)
    return await this._demandsRepository.create(entity);
  }

  async read(id: string): Promise<GeneralResponse> {
    return await this._demandsRepository.read(id);
  }

  async readByOwnerId(ownerId: string): Promise<GeneralResponse> {
    return await this._demandsRepository.readByOwnerId(ownerId);
  }
}

export { DemandsService }