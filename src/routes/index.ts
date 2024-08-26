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
import {SearchCodig} from '../controllers/guests/search_codigo'
import { Modifyguests } from '../controllers/guests/modify_guests'
import { ModificarEstadoFamiliar } from '../controllers/guests/modify_familiar'


export const index:Router = Router()

index.post('/Administrador/IniciarSesion', loginPage)
index.post('/Administrador/Agregar', validateJwt, AddAdmin)
index.post('/Invitados/Agregar', validateJwt, AddGuests)
index.put('/Invitados/Familiares', validateJwt, AddFamili)
index.get('/Invitados/Lista', validateJwt, ListGuests)
index.get('/Administrador/Lista', validateJwt, ListAdmin)
index.post('/Invitados/BucarInvitado', validateJwt, SearchGuests)
index.post('/Invitados/CodigoInvitacion', validateJwt, SearchCodig)
index.put('/Invitados/Modificarinvitado',  validateJwt, Modifyguests)
index.put('/Invitados/Modificarfamiliar', validateJwt, ModificarEstadoFamiliar)
index.get('/', homePage)