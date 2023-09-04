export class UserModel {
    readonly id: string
    readonly createdAt: Date
    readonly updatedAt: Date

    readonly email: string
    readonly password: string
    readonly cpf: string

    readonly dataBasicUser: object

    constructor (
        id: string,
        createdAt: Date,
        updatedAt: Date,
        email: string,
        password: string,
        cpf: string,
        dataBasicUser: object
    ) {
        this.id = id
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.email = email
        this.password = password
        this.cpf = cpf
        this.dataBasicUser = dataBasicUser
    } 

}