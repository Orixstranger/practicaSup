module.exports = function(sequelize, Sequelize){
    var aux = require('../models/persona');
    var Persona = new aux(sequelize, Sequelize);
    var Cuenta = sequelize.define('cuenta', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        usuario: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        clave: {
            type: Sequelize.STRING,
            allowNull: true
        },
        external_id: {
            type: Sequelize.UUID,
            allowNull: true
        }
    });
    Cuenta.belongsTo(Persona, {foreignKey: 'cedula',constraints: false});
    return Cuenta;
};


