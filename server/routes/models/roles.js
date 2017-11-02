var express	 	= require('express');
var router	 	= express.Router();
var mongoose	= require('../connections/NeptuneConnection.js');

let PermissionSchema = mongoose.Schema({
  _id: String,
  type: { type: String, enum: ['API', 'INTERFACE', 'WORKFLOW']},
  name: String,
  description: String,
  permission: { type: Number, default: 0, enum: [0, 1] } // 0 = read, 1 = write
});

let RoleSchema = mongoose.Schema({
  _id: { type: String, default: new mongoose.Types.ObjectId() },
  name: String,
  description: String,
  active: { type: Boolean, default: true },
  tenant: String,
  users: [String],
  assets: [PermissionSchema]
});

/**
 * Method used to find the users roles and find the least 
 * restrictive permission level for each asset
 */
RoleSchema.methods.GetActiveUserRoles = function(tenant, user, roles, callback) {
  let tuser = tenant + '.' + user;
  this.model('roles').aggregate([
    {
      $match: {
        _id: { $in: roles },
        tenant: { $in: ['neptune', tenant] },
        users: { $in: [tuser] },
        active: true        
      }
    },
    { $unwind: "$assets" },
    {
      $group: {
        _id: "$assets._id",
        type: { $max: "$assets.type" },
        permission: { $max: "$assets.permission"}
      }
    }
  ]).exec(function(err, assets) {
    if (assets) {
      callback(assets);
    } else {
      callback([]);
      console.log('Something bad happened');
    }
  });
};

RoleSchema.methods.GetTenantRoles = function(tenant, callback) {
  this.model('roles').find(
    {
      tenant: { $in: ['neptune', tenant] }
    },
    '_id name description active',
    function(err, roles) {
      if ( roles ) {
        callback(roles);
      } else {
        callback([]);
      }
    }
  );
};

RoleSchema.methods.TenantRolesForUserForm = function(tenant, callback) {
  this.model('roles').find(
    {
      tenant: { $in: ['neptune', tenant] },
    },
    '_id name',
    function(err, roles) {
      let roleOptions = [];
      if (roles) {
        roles.forEach(function(role) {
          roleOptions.push({value: role._id, text: role.name });
        });
      }
      callback(roleOptions);
    }
  );
};

RoleSchema.methods.findTenantRole = function(callback) {
  this.model('roles').aggregate([
    {
      $match: {
        _id: this._id,
        tenant: { 
          $in: ['neptune', this.tenant] 
        }
      }
    },
    {
      $project: {
        _id: 1,
        name: 1,
        description: 1,
        active: 1,
        interfaces: {
          $filter: {
            input: "$assets",
            as: "interfaces",
            cond: { 
              $eq: ["$$interfaces.type", "INTERFACE"]
            }
          }
        },
        apis: {
          $filter: {
            input: "$assets",
            as: "apis",
            cond: { 
              $eq: ["$$apis.type", "API"]
            }
          }
        },
        feeds: {
          $filter: {
            input: "$assets",
            as: "feeds",
            cond: { 
              $eq: ["$$feeds.type", "FEED"]
            }
          }
        }
      }
   }
  ]).exec(function(err, role) {
    if (role) {
      callback(role[0]);
    } else if (!err) {
      callback({});
    } 
  });
};

RoleSchema.methods.UpdateRole = function(role, tenant, callback) {
  let ErrorMessage = { code: 500, message: 'Internal server error. Could complete request.' };

  this.model('roles').findById(role._id, function(err, Role) {
    if (err) {
      callback(ErrorMessage);
    } else if (Role) {
      if (Role.tenant === 'neptune' || Role.tenant === tenant) {
        let assets = role.interfaces.concat(role.apis, role.feeds);

        Role.name        = role.name;
        Role.description = role.description;
        Role.active      = role.active;
        Role.assets      = assets;
      } else {
        callback({ code: 403, message: 'Could not update requested role. Request forbiden.'});
      }
      Role.save(function(err) {
        if (err) {
          callback(ErrorMessage);
        } else {
          callback({ code: 200, message: 'Role updated.' });
        }  
      });
    } else {
      callback({ code: 400, message: 'Role not found' });
    }
  });
}

module.exports = mongoose.model('roles', RoleSchema);
