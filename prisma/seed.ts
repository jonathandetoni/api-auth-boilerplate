import { PrismaClient } from '@prisma/client'
import { getEnv } from '../src/infrastructure/config/env'
import { hashPassword } from '../src/infrastructure/utils/middleware/authHelper'

const prisma = new PrismaClient()

async function main() {
  console.log('NODE_ENV: ', getEnv().NODE_ENV);
  switch (getEnv().NODE_ENV) {
    case 'development':
      const tenant = await prisma.tenants.upsert({
        where: {
          name: 'NewProjectX'
        },
        create: {
          name: 'NewProjectX',
          description: 'New project'
        },
        update: {
          name: 'NewProjectX',
          description: 'New project'
        }
      })
    
      console.log('Tenant criado: ', tenant)
    
      const user = await prisma.users.upsert({
        where: {
          email: 'user@newproject.com'
        },
        create: {
          email: 'user@newproject.com',
          password: await hashPassword('NewProjectPassword'),
          cpf: '01234567890',
          tenantId: tenant.id,
          typeUser: 'ADMINISTRATOR',
          role: 'Admin:Geral',
        },
        update: {
          email: 'user@newproject.com',
          password: await hashPassword('NewProjectPassword'),
          cpf: '01234567890',
          tenantId: tenant.id,
          typeUser: 'ADMINISTRATOR',
          role: 'Admin:Geral'
        }
      })
      
      console.log('User criado: ', user)

      const dataBasic = await prisma.dataBasicUsers.upsert({
        where: {
          id: '2c494e19-e412-474a-8869-c2d5c7634094'
        },
        create: {
          fullname: 'Usuário Teste',
          userId: user.id
        },
        update: {
          fullname: 'Usuário Teste',
          userId: user.id
        }
      })
      
      console.log('DataBasic criado: ', dataBasic)
        
      const address = await prisma.adresses.upsert({
        where: {
          id: '2c494e19-e412-474a-8869-c2d5c7634094'
        },
        create: {
          dataBasicUsersId: dataBasic.id
        },
        update: {
          dataBasicUsersId: dataBasic.id
        },

      })

      console.log('Address criado: ', address)
      break
    case 'production':
      /** data for your test environment */
      break
    default:
      break
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })