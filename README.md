## Instructions For Integrating Mono with Prisma Accelerate"

1) Create an account at Prisma Accelerate
2) Create a new project and Click on Connect to Database
3) Get Postgres db url (by clicking on pooled connection; Direct_DB_URL) and Get Prisma+Posgtres Url (By clicking on Prisma Accelerate - Connection Pool Url- DATABASE_URL)
4) npm create hono@ltatest
5) npx i prisma
6) npx prisma init
7) Paste Both Url in env file with Direct and Database Url, and paste Connection Pool URL in wrangler.jsonc as well (not needed though); Do not keep both in variable with same name
8) npx prisma migrate dev
9) npx prisma generate
10) npx install @prisma/extends-accelerate
11) npm run dev


## Sample ##
<!-- import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'

type Env = {
  DATABASE_URL: string,
  JWT_SECRET_KEY: string,
  DIRECT_URL : string
}

const app = new Hono<{ Bindings: Env }>()


app.post('/api/v1/signup', async (c) => {
  const prisma = new PrismaClient({
    accelerateUrl: c.env.DATABASE_URL, //Connection Pool + Accelerate URL
}).$extends(withAccelerate());
} 
!-->
