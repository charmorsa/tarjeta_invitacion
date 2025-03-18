import { messGuests } from "../config/message.controller"
import { AddAdmin } from "../controllers/admin/add.admin"
import { ListAdmin } from "../controllers/admin/list.admin"
import { loginPage } from "../controllers/login"
import { Router } from "express"
import { validateJwt } from "../middlewares/validateToken.middleware"

export const admin:Router = Router()

admin.post('/IniciarSesion', loginPage)
admin.post('/Agregar', validateJwt, AddAdmin)
admin.get('/Lista', validateJwt, ListAdmin)
admin.post('/Message', validateJwt, messGuests)