module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('cart_item', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      cartId: {
        type: Sequelize.INTEGER,
        field: 'cart_id',
        allowNull: true,
        refer: {
          model: 'carts',
          key: 'id',
        },
      },

      itemId: {
        type: Sequelize.INTEGER,
        field: 'item_id',
        allowNull: true,
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

  down: async (queryInterface) => queryInterface.dropTable('cart_item'),
}
