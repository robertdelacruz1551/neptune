var express	 	= require('express');
var router	 	= express.Router();
var mongoose	= require('../connections/NeptuneConnection.js');

let ElementsSchema = mongoose.Schema({
  _id: { type: String, default: new mongoose.Types.ObjectId() },
  bind: String,
  name: String,
  type: String,
  editable: { type: Boolean, default: true }
});

let AppsSchema = mongoose.Schema({
  _id: String,
  type: { type: String, enum: ['API', 'INTERFACE']},
  name: String,
  description: String,
  permission: { type: Number, default: 0, enum: [0, 1] }, // 0 = read, 1 = write
  comments: [],
  attachments: [],
  elements: [ElementsSchema]
});

let RoleSchema = mongoose.Schema({
  _id: { type: String, default: new mongoose.Types.ObjectId() },
  name: String,
  description: String,
  status: { type: Boolean, default: true },
  tenant: String,
  users: [String],
  apps: [AppsSchema]
});

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
        tenant: { $in: ['neptune', this.tenant] }
      }
    },
    {
      $project: {
        _id:  1,
        name:  1,
        description:  1,
        status: 1,
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
    if (err) callback({});
    if (role) {
      callback(role[0]);
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

        console.log(assets);

        Role.name        = role.name;
        Role.description = role.description;
        Role.active      = role.active;
        Role.assets      = assets;
      } else {
        callback({ code: 403, message: 'Could not update role. Request forbiden.'});
      }
      Role.save(function(err, r) {
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

let r = mongoose.model('roles', RoleSchema);

let o = new r({});
o.FindRole('59cef139d689bab413b49a91', function(role) {
  if ( role ) {
    role.assets = [
      { permission: 1,
        type: 'INTERFACE',
        description: 'List of trusted users',
        name: 'User list',
        _id: 'users' ,
        elements: [ 
          { _id: '927432882393882939999302098272b03', bind: '', name: 'Users', type: 'datatable', editable: true }
        ] },
      { permission: 1,
        type: 'INTERFACE',
        description: 'List of client roles',
        name: 'Role List',
        _id: 'roles',
        elements: [ 
          { _id: '927432889923892000499472999939s34', bind: '', name: 'Role', type: 'datatable', editable: true }
        ] },
      { permission: 1,
        type: 'INTERFACE',
        description: 'Form used to edit user profile by client admin',
        name: 'User Edit Form',
        _id: 'user',
        elements: [ 
          { _id: '927432889923892000499472999939s32', bind: '', name: 'Username', type: 'textbox', editable: true },
          { _id: '927432889923892000499472999939s36', bind: '', name: 'Status', type: 'dropdown', editable: true },
          { _id: '927432889923892000499472999939s24', bind: '', name: 'First Name', type: 'textbox', editable: true },
          { _id: '927432889923892000499472999939s89', bind: '', name: 'Middle Name', type: 'textbox', editable: true },
          { _id: '927432889923892000499472999939s39', bind: '', name: 'Last Name', type: 'textbox', editable: true },
          { _id: '927432889923892000499472999939s22', bind: '', name: 'Email', type: 'textbox', editable: true },
          { _id: '927432889923892000499472999939s00', bind: '', name: 'Department', type: 'dropdown', editable: true },
          { _id: '927432889923892000499472999939s01', bind: '', name: 'Job Title', type: 'dropdown', editable: true },
          { _id: '927432889923892000499472999939s76', bind: '', name: 'User Roles', type: 'checkbox', editable: true },
        ] },
      { permission: 1,
        type: 'INTERFACE',
        description: 'Form used to edit roles created by client admin',
        name: 'Role Edit Form',
        _id: 'role-edit',
        elements: [
          { _id: '92743288992389930200499472999939s34', bind: '', name: 'Role Name', type: 'textbox', editable: true },
          { _id: '92743288992389883394751222999939s34', bind: '', name: 'Description', type: 'textarea', editable: true },
          { _id: '92743288992312233342499472999939s34', bind: '', name: 'Status', type: 'dropdown', editable: true },
          { _id: '92740000020299394923332001299939s34', bind: '', name: 'Interfaces', type: 'dropdown', editable: true },
        ] },
      { permission: 1,
        type: 'API',
        description: 'API used to retrive a list of roles',
        name: 'Role list API',
        _id: '/api/feed/tenant-role-list' },
      { permission: 1,
        type: 'API',
        description: 'API used to retrive a list of users',
        name: 'User list API',
        _id: '/api/feed/tenant-users-list' },
      { permission: 1,
        type: 'API',
        description: 'API used to retrive a list of roles to present in the User Edit Form',
        name: 'Role Options API',
        _id: '/api/feed/role-options-to-select-from' },
      { permission: 1,
        type: 'API',
        name: 'Update Role API',
        description: 'API used to update role data',
        _id: '/api/secure/update-role' },
      { permission: 1,
        type: 'API',
        name: 'List of interfaces API',
        description: 'API used to retrive a list of interfaces to display in the roles interface table',
        _id: '/api/feed/list-of-tenant-accessible-interfaces' }
    ];

    // role.save(function(err) {
    //   if ( err ) {console.log(err)}
    //   else {
    //     console.log(role.assets[2]);
    //   }
    // });
  }
});