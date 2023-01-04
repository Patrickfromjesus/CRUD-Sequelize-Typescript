import UserInterface from '../../interfaces/UserInterface';
import UserModel from '../models/UserModel';

class UserService {
  async getAll () {
    const data =  await UserModel.findAll();
    return data;
  };
  
  async getById (id: (number | string)) {
    if (typeof id === 'number') {
      const data = await UserModel.findOne({ where: { id } });
      return data;
    }
    const data = await UserModel.findOne({ where: { email: id } });
    return data;
  }
  
  async create (infos: UserInterface) {
    const data = await UserModel.create({ ...infos });
    return data;
  }
  
  async update (infos: UserInterface, id: number) {
    const data = await UserModel.update({ ...infos }, { where: { id } }); 
    return data;
  };
  
  async destroy (id: number) {
    await UserModel.destroy({ where: { id } });
    return;
  };
  
  async getByEmail (email: string, password: string) {
    const data = await UserModel.findOne({ where: { email, password } });
    return data;
  };
}

export default UserService;
