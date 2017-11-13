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
  name: String,
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
    '_id name description panels',
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

// /**
//  * This query finds all interfaces accessible to the tenant 
//  * and returns the list to be displayed as a list of checkboxes.
//  * The value fields should contain an object with the following 
//  * properties: _id, name, type: 'INTERFACE', permission: 0.
//  * the text should be in format: "name, description"
//  */
// InterfaceSchema.methods.TenantAccessibleInterfaceList = function(tenant, callback) {
//   this.model('interfaces').aggregate([
//     {
//       $match: {
//         tenants: { $in: ['neptune' , tenant] }
//       },
//     },
//     {
//       $project: {
//         _id: 0,
//         "value" : { _id: "$_id", name: "$name", description: "$description" },
//         "text" : "$title"
//       }
//     }
//   ]).exec(function(err, options) {
//     if (err) console.log(err);
//     if (options) {
//       callback(options);
//     }
//   })
// }


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
    'url type name', // return only the id and title elements
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
    '_id tenant secure roles name toolstrip panels saves data',
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
      text: 'Interface Access Control'
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
                  bind: 'comments',
                  checkbox: {
                    label: { text: 'Comments' },
                    input: { name: 'permissions.interface.comments',
                    options: [
                      { value: 1, text: 'View all comments' },
                      { value: 2, text: 'Enter new comments' },
                      { value: 3, text: 'Edit comments' },
                      { value: 4, text: 'Delete comments' }
                    ] }                  
                  }
                },
                {
                  type: 'checkbox',
                  bind: 'attachments',
                  checkbox: {
                    label: { text: 'Attachments' },
                    input: { name: 'permissions.interface.attachments',
                    options: [
                      { value: 1, text: 'Download attachments' },
                      { value: 2, text: 'Add attachments' },
                      { value: 3, text: 'Delete attachments' }
                    ] }                  
                  }
                }
              ]
            },
            {
              elements: [
                {
                  type: 'datatable',
                  bind: 'elements',
                  datatable: {
                    size: 'large',
                    label: { text: 'Elements' },
                    headers: [
                      { key: 'name', text: 'Name' },
                      { key: 'type', text: 'Type' },
                      { key: 'edit', text: 'Edit', input: { checkbox: true } }
                    ],
                    action: {
                      enable: false,
                      add: false,
                      edit: false,
                      delete: false,
                    }
                  }
                },
                {
                  type: 'datatable',
                  bind: 'actions',
                  datatable: {
                    size: 'large',
                    label: { text: 'Actions' },
                    headers: [
                      { key: 'name', text: 'Name' },
                      { key: 'execute', text: 'Execute', input: { checkbox: true } }
                    ],
                    action: {
                      enable: false,
                      add: false,
                      edit: false,
                      delete: false,
                    }
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
              label: { text: 'Name' },
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
                { key: 'name', text: 'Name' },
                { key: 'description', text: 'Description' },
                { key: 'permission', text: 'Permission',
                  input: { dropdown: [
                              { value: 0, text: 'Forbidden' },
                              { value: 1, text: 'Access Allowed' }
                            ] }
                }
              ],
              action: {
                enable: true,
                add: false,
                edit: {
                  modal: MODAL_INTERFACE[0]
                },
                delete: false,
              }
            }
          }
        ]
      }
    ]
  },
  {
    active: false,
    name: 'Web Services',
    containers: [
      {
        elements: [
          {
            type: 'datatable',
            bind: 'role.apis',
            datatable: {
              headers: [
                { key: 'name', text: 'Name' },
                { key: 'description', text: 'Description' },
                { key: 'permission', text: 'Permission',
                  input: {
                    dropdown: [
                      { value: 0, text: 'Block' },
                      { value: 1, text: 'Allow' }
                    ]
                  }
                }
              ],
              action: {
                enable: false,
                add: false,
                edit: false,
                delete: false,
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
  name: 'Edit Role',
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



let q = mongoose.model('interfaces', InterfaceSchema);
let a = new q({
  _id: 'roles',
  type: 'ibox',
  sidebar: true,
  secure: true,
  name: 'Roles',
  description: null,
  tenants: ['neptune'],
  roles: ['tenant-role-manager'],
  toolstrip: false,
  panels: [
    {
      active: true,
      name: 'Roles List',
      containers: [
        {
          elements: [
            {
              type: 'datatable',
              bind: 'roles',
              datatable: {
                headers: [
                  { key: 'name', text: 'Name' },
                  { key: 'description', text: 'Description' },
                  { key: 'status', text: 'Status' }
                ],
                action: {
                  feed: 'tenant-role-list',
                  enable: true,
                  delete: false,
                  edit: {
                    link: {
                      url: 'secure/interface/role-edit',
                      id: '_id'
                    }
                  },
                  add: {
                    model: { name: null, description: null, active: true, users: [], assets: []},
                    modal: {
                      header: {
                        enable: true,
                        text: 'Interface Access Control'
                      },
                      footer: {
                        enable: true,
                        commit: {
                          enable: true,
                          text: 'Save',
                          clearFormAfterSubmit: true
                        }
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
                                    type: 'textbox',
                                    bind: 'name',
                                    textbox: {
                                      label: { text: 'Name' },
                                      input: { name: 'modal.role.name', size: 'large' }
                                    }
                                  },
                                  {
                                    type: 'textblock',
                                    bind: 'description',
                                    textblock: {
                                      label: { text: 'Description' },
                                      input: { name: 'modal.role.description' }
                                    }
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    }
                  }
                }
              }
            }
          ]
        }
      ]
    }
  ],
  data: {
    roles: [] 
  }
}, {strict: true});

// a.save(function(err){
//   if(err) {
//     console.log(err);
//   } else {
//     console.log('Landed ' + a._id);
//   }
// });