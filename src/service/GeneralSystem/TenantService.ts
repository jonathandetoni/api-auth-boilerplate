import { TenantDtoCreate } from "../../domain/dtos/GeneralSystem/Tenant/TenantDtoCreate";
import { TenantDtoList } from "../../domain/dtos/GeneralSystem/Tenant/TenantDtoList";
import { TenantDtoCreateResult } from "../../domain/dtos/GeneralSystem/Tenant/result/TenantDtoCreateResult";
import { ITenantRepository } from "../../domain/interfaces/repository/GeneralSystem/ITenantRepository";
import { ITenantService } from "../../domain/interfaces/service/GeneralSystem/ITenantService";
import { GeneralResponse } from "../../domain/interfaces/service/generalResponse";
import { HttpStatusCode } from "../../infrastructure/utils/constants/httpStatusCode";

export interface ITenantResult {
  tenant: {
    id: string;
    name: string;
    description: string;
  }
}

class TenantService implements ITenantService {
  private readonly _tenantRepository: ITenantRepository;
  constructor(tenantRespository: ITenantRepository) {
    this._tenantRepository = tenantRespository;
  }
  async create(entity: TenantDtoCreate): Promise<GeneralResponse> {
    return await this._tenantRepository.create(entity);
  }
  async read(id: string): Promise<GeneralResponse> {
    return await this._tenantRepository.read(id);
  }
  async readByName(name: string): Promise<GeneralResponse> {
    return await this._tenantRepository.readByName(name);
  }
}

export { TenantService }