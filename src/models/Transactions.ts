import { Model, DataTypes, BuildOptions } from 'sequelize';

export default class Transactions extends Model {
  static modelFields = {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    type: DataTypes.ENUM('credit', 'debit'),
    accountNumber: DataTypes.STRING,
    createdOn: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    amount: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
    oldBalance: DataTypes.FLOAT,
    newBalance: DataTypes.FLOAT,
    cashierId: DataTypes.UUID,
  };

  /**
   * @method associate
   * @description model associations
   *
   * @static
   * @memberof Transactions
   * @param {any} models all models
   *
   * @returns {void} no return
   */
  /* static associate(models) {
    this.belongsTo(models.Accounts, {
      foreignKey: 'accountNumber',
      as: 'account',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    this.belongsTo(models.Users, {
      foreignKey: 'cashierId',
      as: 'cashier',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  } */

  /**
   * @method init
   * @description initializes the transaction model
   *
   * @static
   * @memberof User
   * @param {any} sequelize
   *
   * @returns {Object} transactions model
   */
  /* static init(sequelize) {
    const model = super.init(Transactions.modelFields, {
      tableName: 'Transactions',
      sequelize,
    });
    return model;
  } */
}
