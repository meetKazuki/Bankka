export default {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.createTable('SAMPLE', {
        ID: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
        },
        NAME: {
          type: Sequelize.STRING,
        },
      }, { timestamps: false });
    } catch (error) {
      console.log(error);
    }
  },
  down: async (queryInterface) => {
    try {
      await queryInterface.dropTable('SAMPLE');
    } catch (error) {
      console.log(error);
    }
  },
};
