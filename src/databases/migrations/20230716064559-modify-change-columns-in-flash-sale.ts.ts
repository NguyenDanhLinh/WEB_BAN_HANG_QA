module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.addColumn('flashSale_item', 'percent', {
      type: Sequelize.INTEGER,
      field: 'percent',
      allowNull: false,
      defaultValue: 0,
    })

    await QueryInterface.addColumn('flashSale_item', 'money_reduced', {
      type: Sequelize.STRING(255),
      field: 'money_reduced',
      allowNull: false,
      defaultValue: '0',
    })

    await QueryInterface.removeColumn('flash_sale', 'percent')

    await QueryInterface.removeColumn('flash_sale', 'money_reduced')
  },

  down: async (QueryInterface, Sequelize) => {
    await QueryInterface.removeColumn('flashSale_item', 'percent')

    await QueryInterface.removeColumn('flashSale_item', 'money_reduced')

    await QueryInterface.addColumn('flash_sale', 'percent', {
      type: Sequelize.INTEGER,
      field: 'percent',
      allowNull: false,
      defaultValue: 0,
    })

    await QueryInterface.addColumn('flash_sale', 'money_reduced', {
      type: Sequelize.STRING(255),
      field: 'money_reduced',
      allowNull: false,
      defaultValue: '0',
    })
  },
}
