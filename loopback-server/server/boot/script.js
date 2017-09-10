module.exports = function(app) {
    var MongoDB = app.dataSources.MongoDB;
    MongoDB = app.dataSources.MongoDB;
    MongoDB.automigrate('Customer', function(err) {
        if(err) throw (err);
        var Customer = app.models.Customer;
        Customer.create([
            {username:'admin', email: 'admin@kapilkoul.com', password:'password'},
            {username:'testuser', email: 'testuser@kapilkoul.com', password:'password'}
        ], function(err, users) {
            if(err) return cb(err);
            
            var Role = app.models.Role;
            var RoleMapping = app.models.RoleMapping;
            
            Role.create({name:'admin'}, function(err, role) {
                role.principals.create({
                    principalType: RoleMapping.USER,
                    principalId: users[0].id
                }, function(err, principal) {
                    if(err) throw (err);
                }); //end principals create
            }); //end role create
        }); //end customer create
    }); //end mongodb automigrate
};