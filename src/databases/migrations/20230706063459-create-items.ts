module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('items', {
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

      inputPrice: {
        type: Sequelize.STRING(255),
        field: 'input_price',
        allowNull: false,
      },

      outputPrice: {
        type: Sequelize.STRING(255),
        field: 'output_price',
        allowNull: false,
      },

      weight: {
        type: Sequelize.STRING(255),
        field: 'weight',
        allowNull: false,
      },

      avatar: {
        type: Sequelize.STRING(255),
        field: 'avatar',
        allowNull: false,
      },

      imgDetail: {
        type: Sequelize.STRING(255),
        field: 'img_detail',
        allowNull: false,
      },

      description: {
        type: Sequelize.STRING(255),
        field: 'description',
        allowNull: true,
      },

      inventoryNumber: {
        type: Sequelize.INTEGER,
        field: 'inventory_number',
        allowNull: false,
      },

      categoryId: {
        type: Sequelize.INTEGER,
        field: 'category_id',
        allowNull: true,
        refer: {
          model: 'categories',
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

  down: async (queryInterface) => queryInterface.dropTable('items'),
}
