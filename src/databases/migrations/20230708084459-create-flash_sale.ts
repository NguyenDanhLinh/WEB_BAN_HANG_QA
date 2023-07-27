module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('flash_sale', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      percent: {
        type: Sequelize.INTEGER,
        field: 'percent',
        allowNull: false,
        defaultValue: 0,
      },

      moneyReduced: {
        type: Sequelize.STRING(255),
        field: 'money_reduced',
        allowNull: false,
        defaultValue: '0',
      },

      startDate: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'start_date',
      },

      endDate: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'end_date',
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at',
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at',
      },
    })
  },

  down: async (queryInterface) => queryInterface.dropTable('flash_sale'),
}
