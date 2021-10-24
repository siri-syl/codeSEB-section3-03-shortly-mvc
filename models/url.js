'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class url extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // models/index.js 38~40번째 줄 대신 다음과 같이 정의해도 됩니다 (undocumented)
      // models.url.belongsTo(models.user);
    }
  };
  url.init({
    url: DataTypes.STRING,
    title: DataTypes.STRING,
    visits: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'url',
  });

  return url;
};