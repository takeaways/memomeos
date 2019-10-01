module.exports = (sequelize, DataTypes) => {
    const Memo = sequelize.define('Memo', { // 테이블명은 posts
      content: {
        type: DataTypes.TEXT, // 매우 긴 글
        allowNull: false,
      },
    }, {
      charset: 'utf8mb4', //  한글+이모티콘
      collate: 'utf8mb4_general_ci',
    });
    Memo.associate = (db) => {
      db.Memo.belongsTo(db.User); // 테이블에 UserId 컬럼이 생겨요
    };
    return Memo;
  };
