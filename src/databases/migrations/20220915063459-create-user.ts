module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      userName: {
        type: Sequelize.STRING(255),
        field: 'user_name',
        allowNull: false,
        unique: true,
      },

      password: {
        type: Sequelize.TEXT,
        field: 'password',
        allowNull: false,
      },

      name: {
        type: Sequelize.STRING(255),
        field: 'name',
        allowNull: false,
      },

      role: {
        field: 'role',
        type: Sequelize.ENUM('user', 'admin'),
        allowNull: false,
      },

      phoneNumber: {
        field: 'phone_number',
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },

      address: {
        type: Sequelize.STRING(255),
        field: 'address',
        allowNull: false,
        unique: true,
      },

      email: {
        type: Sequelize.STRING(255),
        field: 'email',
        allowNull: false,
        unique: true,
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

  down: async (queryInterface) => queryInterface.dropTable('users'),
}
