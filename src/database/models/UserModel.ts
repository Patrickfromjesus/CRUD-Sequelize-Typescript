import { Model, INTEGER, STRING } from 'sequelize';
import db from '.'

class UserModel extends Model {
  declare id: number;
  declare name: string;
  declare email: string;
  declare password: string;
};

UserModel.init({
  id: { primaryKey: true, allowNull: false, autoIncrement: true, type: INTEGER },
  name: { type: STRING, allowNull: false },
  email: { type: STRING, allowNull: false },
  password: { type: STRING, allowNull: false },
}, {
  sequelize: db,
  timestamps: false,
  modelName: 'users',
});

export default UserModel;
