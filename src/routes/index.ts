import { Router } from 'express'

import { ListAdmin } from '../controllers/admin/list.admin'
import { AddAdmin } from '../controllers/admin/add.admin'
import { AddFamili } from '../controllers/guests/add_familiar'
import { ListGuests } from '../controllers/guests/list_guests'
import { AddGuests } from '../controllers/guests/add_guests'

import { loginPage } from '../controllers/login'
import { homePage } from '../controllers/home'

import { validateJwt } from '../middlewares/validateToken.middleware'
import { SearchGuests } from '../controllers/guests/search_guests'

export const index:Router = Router()

index.post('/Administrador/IniciarSesion', loginPage)
index.post('/Administrador/Agregar', AddAdmin)
index.post('/Invitados/Agregar', validateJwt, AddGuests)
index.put('/Invitados/Familiares', validateJwt, AddFamili)
index.get('/Invitados/Lista', validateJwt, ListGuests)
index.get('/Administrador/Lista', validateJwt, ListAdmin)
index.post('/Invitados/CodigoInvitacion', SearchGuests)
index.get('/', homePage)