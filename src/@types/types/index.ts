import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import jwt from 'jsonwebtoken';

export type RouteCallbackType = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export type MovieType = {
  _id?: string;
  title: string;
  director: string;
  year: number;
  rating: number;
  duration: number;
  type: string;
};

export type UserType = {
  _id?: string;
  email: string;
  password: string;
};

export type ValidationType = (
  datas: MovieType,
  forPost?: boolean
) => Joi.ValidationError | undefined;

export type HashPasswordType = (plainPassword: string) => Promise<string>;
