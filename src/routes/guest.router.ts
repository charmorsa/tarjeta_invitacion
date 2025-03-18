import { AddFamily } from "../controllers/guests/add_familiar"
import { AddGuests } from "../controllers/guests/add_guests"
import { ListGuests } from "../controllers/guests/list_guests"
import { ModStateFamily } from "../controllers/guests/modify_familiar"
import { ModifyGuests } from "../controllers/guests/modify_guests"
import { SearchCodig } from "../controllers/guests/search_codigo"
import { SearchGuests } from "../controllers/guests/search_guests"
import { Router } from "express"
import { validateJwt } from "../middlewares/validateToken.middleware"

export const guests:Router = Router()

guests.post('/Agregar', validateJwt, AddGuests)
guests.put('/Familiares', validateJwt, AddFamily)
guests.get('/Lista', validateJwt, ListGuests)
guests.post('/BucarInvitado', validateJwt, SearchGuests)

guests.post('/CodigoInvitacion', SearchCodig)
guests.put('/Modificarinvitado', ModifyGuests)
guests.put('/Modificarfamiliar', ModStateFamily)
