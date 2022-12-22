import UserInterface from '../../interfaces/UserInterface';
import UserModel from '../models/UserModel';

const getAll = async () => {
  const data =  await UserModel.findAll();
  return data;
};

const getById = async (id: (number | string)) => {
  if (typeof id === 'number') {
    const data = await UserModel.findOne({ where: { id } });
    return data;
  }
  const data = await UserModel.findOne({ where: { email: id } });
  return data;
}

const create = async (infos: UserInterface) => {
  const data = await UserModel.create({ ...infos });
  return data;
}

const update =  async (infos: UserInterface, id: number) => {
  const data = await UserModel.update({ ...infos }, { where: { id } }); 
  return data;
};

const destroy = async (id: number) => {
  await UserModel.destroy({ where: { id } });
  return;
}

export default {
  getAll,
  getById,
  create,
  update,
  destroy,
};
