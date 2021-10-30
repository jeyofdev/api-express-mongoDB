import { Request, Response } from 'express';
import Joi from 'joi';

export type RouteCallbackType = (req: Request, res: Response) => void;

export type MovieType = {
  _id?: string;
  title: string;
  director: string;
  year: number;
  rating: number;
  duration: number;
  type: string;
};

export type ValidationType = (
  datas: MovieType,
  forPost?: boolean
) => Joi.ValidationError | undefined;
