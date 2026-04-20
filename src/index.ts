import { Hono } from 'hono'
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
    accelerateUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate());

  const body = await c.req.json()

  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password
    },
  })

  const token = await sign({ id: user.id }, c.env.JWT_SECRET_KEY)
  return c.json({ jwt: token })
})

app.post('/api/v1/signin', async (c) => {
  const prisma = new PrismaClient({
    accelerateUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json()

  const user = await prisma.user.findUnique({
    where : {
      email:body.email,
      password:body.password
    }
  })

  if(!user){
    c.status(403)
    return c.json({error:"User not found"})
  }
  
  const jwt = await sign({id:user.id}, c.env.JWT_SECRET_KEY)
  return c.json ({jwt})
})

app.use("/api/v1/blog*", async(c, next)=> {
    const header = c.req.header("authorization") || ""
    let token = ""
    try{
      token = header.split(" ")[1]
    }
    catch{
      c.status(403)
      return c.json({error:"unauthorized"})
    }
    
    const response = await verify(token, c.env.JWT_SECRET_KEY, "HS256")
    if (response.id)
    {
      next()
    }
    else{
      c.status(403)
      return c.json({error:"unauthorized"})
    }
})

app.get('/api/v1/blog:id', async (c) => {
  const prisma = new PrismaClient({
    accelerateUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  // const body = await c.req.json()

  // const user = await prisma.user.findUnique({
  //   where : {
  //     email:body.email
  //   }
  // })

  // if(!user){
  //   c.status(403)
  //   return c.json({error:"User not found"})
  // }
  
  // const jwt = await sign({id:user.id}, c.env.JWT_SECRET_KEY)
  // return c.json ({jwt})
})

app.post('/api/v1/blog', async (c) => {
  const prisma = new PrismaClient({
    accelerateUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  // const body = await c.req.json()

  // const user = await prisma.user.findUnique({
  //   where : {
  //     email:body.email
  //   }
  // })

  // if(!user){
  //   c.status(403)
  //   return c.json({error:"User not found"})
  // }
  
  // const jwt = await sign({id:user.id}, c.env.JWT_SECRET_KEY)
  // return c.json ({jwt})
})

app.put('/api/v1/blog', async (c) => {
  const prisma = new PrismaClient({
    accelerateUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  // const body = await c.req.json()

  // const user = await prisma.user.findUnique({
  //   where : {
  //     email:body.email
  //   }
  // })

  // if(!user){
  //   c.status(403)
  //   return c.json({error:"User not found"})
  // }
  
  // const jwt = await sign({id:user.id}, c.env.JWT_SECRET_KEY)
  // return c.json ({jwt})
})

export default app