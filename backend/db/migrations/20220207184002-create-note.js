'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Notes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(30)
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      notebookId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Notebooks" }
      },
      content: {
        allowNull: true,
        type: Sequelize.TEXT,
        defaultValue: "New note..."
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Notes');
  }
};
