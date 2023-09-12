export type TenantDtoList= {
  id: string;
  name: string;
  description: string;
  createdAt: Date;  
  updatedAt: Date;
  deletedAt?: Date;
  deleted: boolean;
}