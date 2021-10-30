import Joi, { PresenceMode } from 'joi';
import { ValidationType } from '../@types/types';

const movieValidation: ValidationType = (datas, forPost = true) => {
  const presence: PresenceMode = forPost ? 'required' : 'optional';

  return Joi.object({
    title: Joi.string().max(255).presence(presence),
    director: Joi.string().max(255).presence(presence),
    year: Joi.number().min(1900).max(2021).presence(presence),
    rating: Joi.number().min(0).max(10).presence(presence),
    duration: Joi.number().min(0).max(500).presence(presence),
    type: Joi.string().max(50).presence(presence),
  }).validate(datas, { abortEarly: false }).error;
};

export default movieValidation;
