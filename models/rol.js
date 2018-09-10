module.exports = function(sequelize, Sequelize){
    var Rol = sequelize.define('rol', {
       id_rol: {
           autoIncrement: true,
           primaryKey: true,
           type: Sequelize.INTEGER
       },
       nombre: {
           type: Sequelize.STRING
       }
    });
//    rol envia su id a la persona - creo la foreingkey
    Rol.associate = function (models) {        
        models.rol.hasMany(models.persona, {            
            foreignKey: 'id_rol'
        });        
    };    
    return Rol;
};