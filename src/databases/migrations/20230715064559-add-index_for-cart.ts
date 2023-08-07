module.exports = {
  async up(queryInterface) {
    await Promise.all([
      queryInterface.addIndex('carts', ['user_id'], {
        name: 'carts_user_id',
        type: 'unique',
      }),

      queryInterface.addIndex('cart_item', ['cart_id', 'item_id'], {
        name: 'cart_item_cart_id_item_id',
        type: 'unique',
      }),
    ])
  },

  async down(queryInterface) {
    await Promise.all([
      queryInterface.removeIndex('carts', 'carts_user_id'),
      queryInterface.removeIndex('cart_item', 'cart_item_cart_id_item_id'),
    ])
  },
}
