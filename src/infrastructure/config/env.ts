// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function getEnv() {
    return {
        PORT: Number(process.env.PORT) ?? 8080,
        NODE_ENV: process.env.NODE_DEV ?? 'development',
        JWT_SECRET: process.env.JWT_SECRET ?? 'secret',
        DATABASE_URL: process.env.DATABASE_URL,
        LEVEL_LOGS: process.env.LEVEL_LOGS ?? 4,
    }
}
