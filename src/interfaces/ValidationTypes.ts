import { RequestHandler } from "express"
import { SchemaOf } from "yup"

export type TProperty = 'body' | 'header' | 'params' | 'query'

export type TAllSchemas = Record<TProperty, SchemaOf<any>>

export type TValidation = (schemas: Partial<TAllSchemas>) => RequestHandler