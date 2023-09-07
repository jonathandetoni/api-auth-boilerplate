export class TenantModel {
    readonly id: string
    readonly createdAt: Date
    readonly updatedAt: Date

    readonly name: string
    readonly description: string

    constructor (
        id: string,
        createdAt: Date,
        updatedAt: Date,
        name: string,
        description: string,
    ) {
        this.id = id
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.name = name
        this.description = description
    } 

}