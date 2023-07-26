module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('categories', {
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
        unique: true,
      },

      img: {
        type: Sequelize.STRING(255),
        field: 'img',
        allowNull: false,
      },

      status: {
        field: 'status',
        type: Sequelize.ENUM('active', 'inactive'),
        allowNull: false,
        defaultValue: 'active',
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

  down: async (queryInterface) => queryInterface.dropTable('categories'),
}
