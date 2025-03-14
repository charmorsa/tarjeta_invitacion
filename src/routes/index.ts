import { Router } from 'express'
import { admin } from './admin.router'
import { homePage } from '../controllers/home'
import { guests } from './guest.router'

export const index:Router = Router()

index.get('/', homePage)
index.use('/Administrador', admin)
index.use('/Invitados', guests)
