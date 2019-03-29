module.exports = (sequelize, DataTypes) => (
    sequelize.define('equipment', {
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        ip: {
            type: DataTypes.STRING(50),
            allowNull: false,
        }
    }, {
        timestamps: true
    })
);
