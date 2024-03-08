import { Router } from 'express'

import { ListAdmin } from '../controllers/admin/list.admin'
import { AddAdmin } from '../controllers/admin/add.admin'

import { ListGuests } from '../controllers/guests/list_guests'
import { AddGuests } from '../controllers/guests/add_guests'

import { loginPage } from '../controllers/login'
import { homePage } from '../controllers/home'

import { validateJwt } from '../middlewares/validateToken.middleware'

export const index:Router = Router()

index.post('/Administrador/IniciarSesion', loginPage)
index.post('/Administrador/Agregar', validateJwt, AddAdmin)
index.post('/Invitados/Agregar', validateJwt, AddGuests)

index.get('/Invitados/Lista', validateJwt, ListGuests)
index.get('/Administrador/Lista', validateJwt, ListAdmin)
index.get('/', homePage)