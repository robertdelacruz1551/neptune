var express	 	= require('express');
var router	 	= express.Router();
var mongoose	= require('../connections/NeptuneConnection.js');
var Tenants   = require('./tenants.model.js');

  // _id: { type: String, default: new mongoose.Types.ObjectId() },

let ElementsSchema = mongoose.Schema({
  bind: String,
  name: String,
  type: String,
  permission: { type: Number, default: 0, enum: [0, 1] }
});

let PermissionSchema = mongoose.Schema({
  action: String,
  permission: { type: Number, default: 0, enum: [0, 1] }
});

let AppsSchema = mongoose.Schema({
  _id: String,
  name: String,
  _save: { type: Boolean, default: true },
  description: { type:String, default: null },
  permission: { type: Number, default: 0, enum: [0, 1] },
  comments: [PermissionSchema],
  attachments: [PermissionSchema],
  actions: [PermissionSchema],
  elements: [ElementsSchema],
  datatables: [ { bind: String,
                  name: String,
                  add: { type: Number, default: 0, enum: [0, 1] },
                  edit: { type: Number, default: 0, enum: [0, 1] },
                  delete: { type: Number, default: 0, enum: [0, 1] } } ],
  assets: [{ bind: String,
             name: String,
             permission: { type: Number, default: 0, enum: [0, 1] },
             add: { type: Number, default: 0, enum: [0, 1] },
             edit: { type: Number, default: 0, enum: [0, 1] },
             delete: { type: Number, default: 0, enum: [0, 1] } }]
});

let RoleSchema = mongoose.Schema({
  name: String,
  description: String,
  status: { type: Boolean, default: true },
  tenant: String,
  members: [ { _id: String, tenant: String, member: { type: Number, default: 0, enum: [0, 1] } } ],
  apps: [AppsSchema],
  // assets: [ {_id: String, permission: Number } ]
});

RoleSchema.methods.FindRoleForRoleEditForm = function(callback) {
  this.model('roles').aggregate([
    {$match: {_id: this._id, tenant: { $in: ['neptune', this.tenant] }}},
    {$lookup:{
      from: "interfaces",
      localField: "tenant",
      foreignField: "tenants",
      as: "apps_"
    }},
    {$project:{
      _id: 1, tenant: 1, status: 1, name: 1, description: 1, apps_: 1, t: this.tenant,
      apps:  {
        _id: 1,tenants: 1,name: 1,description: 1,permission: 1,
        assets: { _id: 1,bind: 1,name: 1,type: 1, permission: 1, add: 1, edit: 1, delete: 1 }
      }
    }},
    {$lookup:{
      from: "tenants",
      localField: "t",
      foreignField: "tenant",
      as: "users"
    }},
    {$project:{
      _id: 1, tenant: 1, status: 1, name: 1, description: 1, users: 1, t: 1, apps:  { $concatArrays: ["$apps", "$apps_"]}
    }},
    {$unwind: {path:"$apps", preserveNullAndEmptyArrays: true}},
    {$unwind: {path:"$users", preserveNullAndEmptyArrays: true}},
    {$unwind: {path:"$apps.assets", preserveNullAndEmptyArrays: true}},
    {$unwind: {path:"$apps.tenants", preserveNullAndEmptyArrays: true}},
    {$unwind: {path:"$apps.panels", preserveNullAndEmptyArrays: true}},
    {$unwind: {path:"$apps.panels.containers", preserveNullAndEmptyArrays: true}},
    {$unwind: {path:"$apps.panels.containers.elements", preserveNullAndEmptyArrays: true}},
    {$project:{
      _id: 1, tenant: 1, status: 1, name: 1, description: 1, t: 1, members: "$users.users",
      apps:  {
        _id: 1, tenants: 1, name: 1, description: 1, permission: {$ifNull: ["$apps.permission", 0]},
        assets: { $ifNull: ["$apps.assets", { 
                    _id: "$apps.panels.containers.elements._id",
                    bind: "$apps.panels.containers.elements.bind",
                    name: "$apps.panels.containers.elements.name",
                    type: "$apps.panels.containers.elements.type",
                    permission: { $literal: 0 },
                    add: { $literal: 0 },
                    edit: { $literal: 0 },
                    delete: { $literal: 0 }
                  }]}
      }
    }},
    {$unwind: {path:"$members", preserveNullAndEmptyArrays: true}},
    {$project:{
      _id: 1, tenant: 1, status: 1, name: 1, description: 1,
      members: { _id: 1, name: 1, title: 1, status: 1, tenant: "$t", member: { $in: [ "$_id", "$members.roles" ] } },
      apps:  {
        _id: 1, tenants: 1, name: 1, description: 1, permission: 1,
        assets: {
          _id: 1, bind: 1, name: 1, type: 1, permission: 1, add: 1, edit: 1, delete: 1
        }
      }
    }},
    {$group: {
      _id: {
        role_id: "$_id",
        app_id: "$apps._id",
        app_assets_id: "$apps.assets._id"
      },
      tenant: {$last: "$tenant"},
      status: {$first: "$status"},
      name: {$last: "$name"},
      description: {$last: "$description"},
      members: {$addToSet: "$members" },
      app_tenants: {$addToSet: "$apps.tenants"},
      app_name: {$last: "$apps.name"},
      app_description: {$last: "$apps.description"},
      app_permission: { $max: "$apps.permission"},
      app_asset_bind: {$last: "$apps.assets.bind"},
      app_asset_name: {$last: "$apps.assets.name"},
      app_asset_type: {$last: "$apps.assets.type"},
      app_asset_permission: { $max: "$apps.assets.permission" },
      app_asset_add: { $max: "$apps.assets.add" },
      app_asset_edit: { $max: "$apps.assets.edit" },
      app_asset_delete: { $max: "$apps.assets.delete" }
    }},
    {$group: {
      _id: {
        role_id: "$_id.role_id",
        app_id: "$_id.app_id",
      },
      assets: {$addToSet: {
        _id: "$_id.app_assets_id",
        bind: "$app_asset_bind",
        name: "$app_asset_name",
        type: "$app_asset_type",
        permission: "$app_asset_permission",
        add: "$app_asset_add",
        edit: "$app_asset_edit",
        delete: "$app_asset_delete"
      }},
      tenant: {$last: "$tenant"},
      status: {$first: "$status"},
      name: {$last: "$name"},
      description: {$last: "$description"},
      members: {$last: "$members" },
      app_tenants: {$last: "$app_tenants"},
      app_name: {$last: "$app_name"},
      app_description: {$last: "$app_description"},
      app_permission: { $max: "$app_permission"},
    }},
    {$project: {
      _id: 1, tenant: 1, status: 1, name: 1, description: 1, members: 1, app_tenants: 1, app_name: 1, app_description: 1, app_permission: 1, assets: 1,
      app_elements: { $filter: { input: "$assets", as: "asset",
        cond: {$and: [ { $ne: ["$$asset.type", "datatable"] },
                       { $ne: ["$$asset.type", "button"] },
                       { $ne: ["$$asset.type", null] } ] }
      }},
      app_action: { $filter: { input: "$assets", as: "asset",
        cond: { $eq: ["$$asset.type", "button"] }
      }},
      app_datatable: { $filter: { input: "$assets", as: "asset",
        cond: { $eq: ["$$asset.type", "datatable"] }
      }}
    }},
    {$group: {
      _id: {
        role_id: "$_id.role_id",
      },
      tenant: {$last: "$tenant"},
      status: {$first: "$status"},
      name: {$last: "$name"},
      description: {$last: "$description"},
      members: {$last: "$members"},
      apps: { $push: {
        _id: "$_id.app_id",
        tenants: "$app_tenants",
        name: "$app_name",
        description: "$app_description",
        permission: "$app_permission",
        assets: "$assets",
        elements: "$app_elements",
        actions: "$app_action",
        datatables: "$app_datatable"
      }}
    }},
    {$project: { _id: "$_id.role_id", tenant: 1, status: 1, name: 1, description: 1, members: 1, apps: 1 }}
  ]).exec(function(err, r) {
    if (err) console.log(err);
    if (r) {
      console.log(r);
      callback(r);
    }
  })
}








RoleSchema.methods.Test = function(callback) {
  let tenant = "598d0e04a848bf4e7f8df53d";

  this.model('roles').aggregate([
    {$match: {_id: "5a0918e0aaf930b37901db84", tenant: { $in: ['neptune',tenant] }}},
  ]).exec(function(err, r) {
    if (err) console.log(err);
    if (r) {
      callback(r[0]);
    }
  })
}


/**
 * Returns a single role from the collection
 */
RoleSchema.methods.FindRole = function(role, callback) {
  this.model('roles').findById(role, function(err, role) {
    if ( role ) {
      callback(role);
    } else {
      callback({})
    };
  })
};


/**
 * Returns a list of roles from the collection
 */
RoleSchema.methods.FindRoles = function(roles, tenant, callback) {
  this.model('roles').find(
    { $or: [
      { _id: { $in: roles } },
      { tenant: { $in: tenant } }
    ] }, function(err, roles) {
    if ( roles ) {
      callback(roles);
    } else {
      callback([]);
    }
  })
}

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
        status: true        
      }
    },
    { $unwind: "$assets" },
    {
      $group: {
        _id: "$assets._id",
        permission: { $max: "$assets.permission"}
      }
    }
  ]).exec(function(err, assets) {
    if (assets) {
      callback(assets);
    } else {
      callback([]);
    }
  });
};

RoleSchema.methods.GetTenantRoles = function(callback) {
  this.model('roles').find(
    { tenant: { $in: ['neptune', this.tenant] } },
    '_id name description status',
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

/**
 * Updates thos role
 */
RoleSchema.methods.UpdateRole = function(role, tenant, callback) {
  let ErrorMessage = { code: 500, message: 'Internal server error. Could complete request.' };

  this.model('roles').findById(role._id, function(err, Role) {
    if (err) {
      callback(ErrorMessage);
    } else if (Role) {
      /**
       * when the role is found, ensure the role is 
       * accessible to the users attempting to update the role
       */
      if (Role.tenant === 'neptune' || Role.tenant === tenant) {
        // update the role
        Role.name        = role.name;
        Role.description = role.description;
        Role.status      = role.status;
        Role.members     = role.members;

        // update the apps within the role
        let apps = [];
        role.apps.forEach(function(app) {
          let assets = [].concat(app.elements, app.actions, app.datatables)
          app.assets = assets;

          apps.push(app);
        });
        Role.apps = apps;

        // update the members in the tenant 
        let Tenant = new Tenants({tenant: tenant});
        Tenant.findTenantByTenant(function(tenant) {
          if (tenant) {
            Role.members.forEach(function(member) {
              tenant.UpdateRole(member._id, Role._id, member.member)
            });
          } else {
            console.log(tenant);
          }
        });
      } else {
        callback({ code: 403, message: 'Could not update role. Request forbiden.'});
      }
      Role.save(function(err, r) {
        if (err) {
          console.log(err);
          callback(ErrorMessage);
        } else if(r) {
          callback({ code: 200, message: 'Role updated.', data: r });
        }  
      });
    } else {
      callback({ code: 400, message: 'Role not found' });
    }
  });
}

module.exports = mongoose.model('roles', RoleSchema);
