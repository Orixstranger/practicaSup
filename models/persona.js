module.exports = function (sequelize, Sequelize) {
    var aux = require('../models/rol');
    var Rol = new aux(sequelize, Sequelize);
    var Persona = sequelize.define('persona', {
        cedula: {
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        nombres: {
            type: Sequelize.STRING(60),
            allowNull: false
        },
        apellidos: {
            type: Sequelize.STRING(60),
            allowNull: false
        },
        external_id: {
            type: Sequelize.UUID,
            allowNull: true
        }
    });
    //creo llaves foraneaws para relacionar con las demas tablas
    Persona.associate = function (models) {
        //creo llave foranea para cuenta
        models.persona.hasOne(models.cuenta, {
            foreignKey: 'cedula'
        });

    };

    Persona.belongsTo(Rol,{foreignKey: 'id_rol', constraints: false});
    return Persona;
};
