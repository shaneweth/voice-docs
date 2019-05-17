module.exports = function(sequelize, DataTypes) {
    let Project = sequelize.define("Project", {
        pid: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        title: DataTypes.STRING,
        description: DataTypes.STRING(150),
        oid: DataTypes.STRING,
        cids: DataTypes.JSON,
    });

    Project.associate = function(models) {
        Project.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
            },
        });
    }

    return Project;
}