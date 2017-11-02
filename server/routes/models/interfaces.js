var express	 	= require('express');
var router	 	= express.Router();
var mongoose	= require('../connections/NeptuneConnection.js');


var ToolstripSchema = mongoose.Schema({
  enable: { type: Boolean, default: false },
  _save: {
    api: {
      url: String,
      onSuccessMessage: [String],
      onFailureMessage: [String],
      protocal: { type: String, default: null },
      params: [ 
        { key: String, value: String }
      ],
      body: [ 
        { key: String, value: String }
      ]
    }
  }
});

var PanelSchema = mongoose.Schema({
  active: { type: Boolean, default: false },
  name: String,
  header: {
    aling: String,
    text: String,
    subtext: String
  },
  containers: [
    {
      elements: []
    }
  ]
});

var InterfaceSchema = mongoose.Schema({
  _id: String,
  type: String,
  sidebar: { type: Boolean, default: false },
  title: String,
  secure: { type: Boolean, default: true },
  description: String,
  tenants: [String],
  roles: [String],
  toolstrip: ToolstripSchema,
  panels: [PanelSchema],
  data: {}
});

InterfaceSchema.methods.FindTenantInterfaces = function(tenant, callback) {
  this.model('interfaces').find(
    {
      tenants: { $in: ['neptune', tenant] }
    },
    '_id title description panels',
    {
      sort: {
        title: 1
      }
    },
    function(err, interfaces) {
      if (interfaces) {
        callback(null, interfaces);
      } else {
        callback(err, null);
      }
    }
  );
};

/**
 * This query finds all interfaces accessible to the tenant 
 * and returns the list to be displayed as a list of checkboxes.
 * The value fields should contain an object with the following 
 * properties: _id, name, type: 'INTERFACE', permission: 0.
 * the text should be in format: "name, description"
 */
InterfaceSchema.methods.TenantAccessibleInterfaceList = function(tenant, callback) {
  this.model('interfaces').aggregate([
    {
      $match: {
        tenants: { $in: ['neptune' , tenant] }
      },
    },
    {
      $project: {
        _id: 0,
        "value" : { _id: "$_id", name: "$title", description: "$description" },
        "text" : "$title"
      }
    }
  ]).exec(function(err, options) {
    if (err) console.log(err);
    if (options) {
      console.log(options);
      callback(options);
    }
  })
}


InterfaceSchema.methods.CreateInputOptions = function(data, text, value) {
  let options = [];
  if (Array.isArray(data)) {
    data.forEach(function(option) {
      options.push({ text: option[text], value: option[value] });
    });
  };
  return options;
};

// Get the list of lines the user can access based on their assigned roles
InterfaceSchema.methods.AuthorizedLinks = function(tenant, roles, callback) {
  this.model('interfaces').find(
    {
      tenants: { $in : [ tenant, 'neptune' ] }, 
      sidebar: true,
      $or: [
        { secure: true, roles:   { $in: roles } },
        { secure: false }
      ]
    },
    'url type title', // return only the id and title elements
    function(err, links) {
      if(err) {
        callback(err, null);
      } else if(links) {
        callback(null, links);
      }
    }
  )
};


InterfaceSchema.methods.AuthorizedInterface = function(tenant, roles, id, callback) {
  this.model('interfaces').findOne(
    {
      _id: id,
      tenants: { $in: [ tenant, 'neptune' ] },
      $or: [
        { secure: true, roles:   { $in: roles } },
        { secure: false }
      ]
    },
    '_id tenant secure roles title toolstrip panels saves data',
    function(err, interface) {
      if (interface) {
        callback(null, interface);
      } else if (err) {
        callback(err, null);
      }
    }
  );
};



module.exports = mongoose.model('interfaces', InterfaceSchema);

let MODAL_INTERFACE = [
  {
    header: {
      enable: true,
      text: 'Interface Selection'
    },
    form: {
      panels: [
        {
          active: true,
          name: 'Interfaces',
          containers: [
            {
              elements: [
                {
                  type: 'checkbox',
                  bind: 'interfaces',
                  checkbox: {
                    label: { text: 'Interfaces' },
                    input: {
                      name: 'interface.datatable.modal.listof.interfaces',
                      options: []
                    },
                    feed: 'list-of-tenant-accessible-interfaces'
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    footer: {
      enable: true,
      commit: {
        enable: true,
        text: 'Save',
        clearFormAfterSubmit: true
      }
    }
  },

  {
    header: {
      enable: true,
      text: 'Web Service Selection'
    },
    form: {
      panels: [
        {
          active: true,
          name: 'apis',
          containers: [
            {
              elements: [
                {
                  type: 'checkbox',
                  bind: 'apis',
                  checkbox: {
                    label: { text: 'Web Services' },
                    input: {
                      name: 'api.datatable.modal.listof.apis',
                      options: []
                    },
                    feed: 'list-of-tenant-accessible-apis'
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    footer: {
      enable: true,
      commit: {
        enable: true,
        text: 'Save',
        clearFormAfterSubmit: true
      }
    }
  },

  {
    header: {
      enable: true,
      text: 'Feed Selection'
    },
    form: {
      panels: [
        {
          active: true,
          name: 'feeds',
          containers: [
            {
              elements: [
                {
                  type: 'checkbox',
                  bind: 'feeds',
                  checkbox: {
                    label: { text: 'Feeds' },
                    input: {
                      name: 'feed.datatable.modal.listof.feeds',
                      options: []
                    },
                    feed: 'list-of-tenant-accessible-feeds'
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    footer: {
      enable: true,
      commit: {
        enable: true,
        text: 'Save',
        clearFormAfterSubmit: true
      }
    }
  }
];





let panels = [
  {
    active: true,
    name: 'General Information',
    containers: [
      {
        elements: [
          {
            type: 'textbox',
            bind: 'role.name',
            textbox: {
              label: { text: 'Group Name' },
              input: { name: 'role.name', size: 'large' }
            }
          },
          {
            type: 'textblock',
            bind: 'role.description',
            textblock: {
              label: { text: 'Description' },
              input: { name: 'role.description' }
            }
          },
          {
            type: 'dropdown',
            bind: 'role.active',
            dropdown: {
              label: { text: 'Status' },
              input: {
                size: 'small',
                name: 'role.active',
                options: [
                  { value: true, text: 'Active' },
                  { value: false, text: 'Inactive' }
                ]
              }
            }
          }
        ]
      }
    ]
  },
  {
    active: false,
    name: 'Interfaces',
    containers: [
      {
        elements: [
          {
            type: 'datatable',
            bind: 'role.interfaces',
            datatable: {
              headers: [
                {
                  key: 'name',
                  text: 'Name'
                },
                {
                  key: 'description',
                  text: 'Description'
                },
                {
                  key: 'permission',
                  text: 'Permission',
                  input: {
                    dropdown: [
                      { value: 0, text: 'Read Only' },
                      { value: 1, text: 'Contribute' },
                    ]
                  }
                }
              ],
              action: {
                enable: true,
                add: {
                  modal: MODAL_INTERFACE[0]
                },
                edit: false,
                delete: true,
              }
            }
          }
        ]
      }
    ]
  },
  {
    active: false,
    name: 'Web Service',
    containers: [
      {
        elements: [
          {
            type: 'datatable',
            bind: 'role.apis',
            datatable: {
              headers: [
                {
                  key: 'name',
                  text: 'Name'
                },
                {
                  key: 'description',
                  text: 'Description'
                },
                {
                  key: 'permission',
                  text: 'Permission',
                  input: {
                    dropdown: [
                      { value: 0, text: 'Block' },
                      { value: 1, text: 'Allow' }
                    ]
                  }
                }
              ],
              action: {
                enable: true,
                add: {
                  modal: MODAL_INTERFACE[1]
                },
                edit: false,
                delete: true,
              }
            }
          }
        ]
      }
    ]
  },
  {
    active: false,
    name: 'Data feeds',
    containers: [
      {
        elements: [
          {
            type: 'datatable',
            bind: 'role.feeds',
            datatable: {
              headers: [
                {
                  key: 'name',
                  text: 'Name'
                },
                {
                  key: 'description',
                  text: 'Description'
                },
                {
                  key: 'permission',
                  text: 'Permission',
                  input: {
                    dropdown: [
                      { value: 0, text: 'Block' },
                      { value: 1, text: 'Allow' }
                    ]
                  }
                }
              ],
              action: {
                enable: true,
                add: {
                  modal: MODAL_INTERFACE[2]
                },
                edit: false,
                delete: true,
              }
            }
          }
        ]
      }
    ]
  }
];


let p = mongoose.model('interfaces', InterfaceSchema);
let i = new p({
  _id: 'role-edit',
  type: 'ibox',
  sidebar: false,
  secure: true,
  title: 'Edit Role',
  description: null,
  tenants: ['neptune'],
  roles: ['tenant-role-manager'],
  toolstrip: {
    _save: {
      api: {
        url: 'api/secure/update-role',
        onSuccessMessage: [],
        onFailureMessage: [],
        protocal: 'POST',
        params: [],
        body: [
          { key: 'role', value: 'role' } 
        ]
      }
    }
  },
  data: {
    role: {
      _id: null,
      name: null,
      description: null,
      active: true,
      tenant: 'neptune',
      interfaces: [],
      apis: [],
      feeds: []
    }
  },
  panels: panels
}, {strict: true}); 

// i.save(function(err){
//   if(err) {
//     console.log(err);
//   } else {
//     console.log('Landed ' + i._id);
//   }
// });
