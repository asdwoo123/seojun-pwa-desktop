module.exports = (sequelize, DataTypes) => (
    sequelize.define('project', {
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    }, {
        timestamps: true
    })
);
