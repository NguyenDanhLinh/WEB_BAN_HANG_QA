module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('flashSale_item', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
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

  down: async (queryInterface) => queryInterface.dropTable('flashSale_item'),
}
