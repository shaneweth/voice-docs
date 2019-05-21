module.exports = function(sequelize, DataTypes) {
    let Project = sequelize.define("Project", {
        title: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        description: DataTypes.STRING(150),
        category: DataTypes.STRING(),
        location: DataTypes.JSON,
        oName: DataTypes.STRING,
        cNames: DataTypes.JSON,
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