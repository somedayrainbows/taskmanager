'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tasks', [
      {title: 'Learn Elastic Beanstalk', priority: 1, createdAt: new Date(), updatedAt: new Date()},
      {title: 'Build things on AWS', priority: 2, createdAt: new Date(), updatedAt: new Date()},
      {title: 'Profit', priority: 3, createdAt: new Date(), updatedAt: new Date()},
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tasks', null, {});
  }
};
