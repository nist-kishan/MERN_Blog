import { connectMongo, closeMongo } from './mongo.js';


export const connectAll = async () => {
  await connectMongo();
};

export const closeAll = async () => {
  await closeMongo();
};
