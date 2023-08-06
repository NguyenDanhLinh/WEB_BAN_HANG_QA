module.exports = {
  async up(queryInterface) {
    await Promise.all([
      queryInterface.addIndex('user_voucher', ['user_id', 'voucher_id'], {
        name: 'user_voucher_user_id_voucher_id',
        type: 'unique',
      }),
    ])
  },

  async down(queryInterface) {
    await Promise.all([
      queryInterface.removeIndex('user_voucher', 'user_voucher_user_id_voucher_id'),
    ])
  },
}
