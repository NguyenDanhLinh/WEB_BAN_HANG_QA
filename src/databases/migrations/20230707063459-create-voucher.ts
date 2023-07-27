module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('voucher', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      name: {
        type: Sequelize.STRING(255),
        field: 'name',
        allowNull: false,
      },

      barcode: {
        type: Sequelize.STRING(255),
        field: 'barcode',
        allowNull: false,
        unique: true,
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

      inventoryNumber: {
        type: Sequelize.INTEGER,
        field: 'inventory_number',
        allowNull: false,
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

  down: async (queryInterface) => queryInterface.dropTable('voucher'),
}
