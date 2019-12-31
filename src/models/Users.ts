import { Model, DataTypes, BuildOptions } from 'sequelize';

require('dotenv').config();

interface UserModelFields {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profileUrl: string;
  type: string;
  isAdmin: boolean;
}

export default class Users extends Model {
  static modelFields = {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    profileUrl: DataTypes.STRING,
    type: DataTypes.ENUM('client', 'staff'),
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  };

  /* static associate(models) {
    this.hasOne(models.Accounts, {
      foreignKey: 'ownerId',
      onDelete: 'CASCADE',
    });

    this.hasMany(models.Transactions, {
      foreignKey: 'cashierId',
      as: 'cashier',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  } */

  /**
   * @method init
   * @description initializes the user model
   *
   * @static
   * @memberof User
   * @param {any} sequelize
   *
   * @returns {Object} users model
   */
  /* static init(sequelize) {
    const model = super.init(Users.modelFields, { tableName: 'Users', sequelize });

    model.beforeCreate(Users.beforeHook);
    model.beforeUpdate(Users.beforeUpdateHook);

    return model;
  } */

  /**
   * @method beforeHook
   * @description hook for the User model
   *
   * @static
   * @memberof User
   * @param {Object} user
   *
   * @returns {Object} user to create or update
   */
  // static beforeHook = async (user) => this.hashPassword(user);

  /**
   * @method beforeUpdateHook
   * @description beforeUpdateHook for the User model
   *
   * @static
   * @memberof User
   * @param {Object} user
   *
   * @returns {Object} user to update
   */
  // static beforeUpdateHook = async (user) => this.hashPassword(user);

  /**
   * @method hashPassword
   * @description hashes user password before insertion to DB
   *
   * @static
   * @memberof User
   * @param {Object} user
   *
   * @returns {Object} user with encrypted password
   */
  /* static hashPassword = (user) => {
    const hash = bcrypt.hashSync(user.password, +process.env.SALT);
    user.password = hash;
    return user;
  } */

  /**
   * @method comparePassword
   * @description compares password with hashed password
   *
   * @static
   * @memberof User
   * @param {string} password
   * @param {string} hashedPassword
   *
   * @returns {boolean} true or false
   */
  /* static isPassword(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
  } */

  /**
   * @method getSafeDataValues
   * @description returns user's safe dataValue
   *
   * @memberof User
   *
   * @returns {Object} user object without password field (value)
   */
  /* getSafeDataValues() {
    const { password, ...data } = this.getDataValue;
    return data;
  } */

  /**
   * @method getExistingUser
   * @description get existing user
   *
   * @static
   * @memberof User
   *
   * @param {string} queryString string to sort in the database
   * @param {string} column column to search
   *
   * @returns {Object} user object
   */
  /* static async getExistingUser(queryString, column = 'email') {
    const user = await Users.findOne({
      where: { [column]: queryString },
    });

    return user;
  } */
}
