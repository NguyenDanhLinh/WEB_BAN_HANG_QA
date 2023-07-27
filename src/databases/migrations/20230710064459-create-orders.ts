module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      userId: {
        type: Sequelize.INTEGER,
        field: 'user_id',
        allowNull: false,
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

      status: {
        field: 'status',
        type: Sequelize.ENUM('pending', 'confirmed', 'delivery', 'delivered', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending',
      },

      totalPrice: {
        type: Sequelize.STRING(255),
        field: 'total_price',
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

  down: async (queryInterface) => queryInterface.dropTable('orders'),
}
