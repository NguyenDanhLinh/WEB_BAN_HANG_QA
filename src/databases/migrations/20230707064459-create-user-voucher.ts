module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('user_voucher', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      userId: {
        type: Sequelize.INTEGER,
        field: 'user_id',
        allowNull: true,
        refer: {
          model: 'users',
          key: 'id',
        },
      },

      voucherId: {
        type: Sequelize.INTEGER,
        field: 'voucher_id',
        allowNull: true,
        refer: {
          model: 'voucher',
          key: 'id',
        },
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

  down: async (queryInterface) => queryInterface.dropTable('user_voucher'),
}
