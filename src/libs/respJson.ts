import { Response } from 'express'

export const respJson = (res: Response, status: number, ok: boolean, others: {}): any => res.status(status).json({ok, status, ...others})
