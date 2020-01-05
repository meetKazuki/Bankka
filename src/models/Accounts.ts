import { Model, DataTypes, BuildOptions } from 'sequelize';

export default class Accounts extends Model {
  static modelFields = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    accountNumber: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    type: DataTypes.ENUM('savings', 'current'),
    ownerId: DataTypes.UUID,
    balance: {
      type: DataTypes.FLOAT,
      default: 0.0,
    },
    status: {
      type: DataTypes.ENUM('draft', 'active', 'dormant'),
      defaultValue: 'draft',
    },
    createdOn: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
  };

  /**
   * @method associate
   * @description model associations
   *
   * @static
   * @memberof Accounts
   * @param {any} models all models
   *
   * @returns {void} no return
   */
  /* static associate(models) {
    this.belongsTo(models.Users, {
      foreignKey: 'ownerId',
      as: 'owner',
      onDelete: 'CASCADE',
    });

    this.hasMany(models.Transactions, {
      foreignKey: 'accountNumber',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  } */

  /**
   * @method init
   * @description initializes the account model
   *
   * @static
   * @memberof User
   * @param {any} sequelize
   *
   * @returns {Object} accounts model
   */
  /* static init(sequelize) {
    const model = super.init(Accounts.modelFields, {
      tableName: 'Accounts',
      sequelize,
    });
    return model;
  } */
}
