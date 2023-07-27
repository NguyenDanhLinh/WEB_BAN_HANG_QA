module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('order_item', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      orderId: {
        type: Sequelize.INTEGER,
        field: 'order_id',
        allowNull: false,
        refer: {
          model: 'orders',
          key: 'id',
        },
      },

      itemId: {
        type: Sequelize.INTEGER,
        field: 'item_id',
        allowNull: false,
        refer: {
          model: 'items',
          key: 'id',
        },
      },

      quantity: {
        type: Sequelize.INTEGER,
        field: 'quantity',
        allowNull: false,
      },

      flashSaleId: {
        type: Sequelize.INTEGER,
        field: 'flashSale_id',
        allowNull: true,
        refer: {
          model: 'flash_sale',
          key: 'id',
        },
      },

      price: {
        type: Sequelize.STRING(255),
        field: 'price',
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

  down: async (queryInterface) => queryInterface.dropTable('order_item'),
}
