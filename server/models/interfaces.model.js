var express	 	= require('express');
var router	 	= express.Router();
var mongoose	= require('../connections/neptune.connection.js');

let ModalSchema = mongoose.Schema({
  button: {
    enable: Boolean,
    text: String
  },
  labelBy: String,
  size: String,
  header: {
    enable: Boolean,
    text: String
  },
  form: {
    panels: []
  },
  footer: {
    enable: Boolean,
    commit: {
      enable: Boolean,
      text: String,
      clearFormAfterSubmit: Boolean
    }
  }
});

let DatatableSchema = mongoose.Schema({
  size: String,
  label: { text: String },
  headers: [
    {
      key: String,
      text: String,
      input: { 
        type: {
          dropdown: [ { value: mongoose.Schema.Types.Mixed, text: String } ],
          checkbox: Boolean
        }, default: undefined 
      }
    }
  ],
  action: {
    enable: { type: Boolean, default: false },
    feed: { type: String, default: undefined },
    edit: { 
      type: {
        link: { url: String, id: String, label: String },
        modal: ModalSchema,
      },
      default: false
    },
    add: {
      type: {
        link: { url: String, id: String },
        model: String,
        modal: ModalSchema
      },
      default: false
    },
    delete: { type: Boolean, default: false }
  }
})

let ButtonSchema = mongoose.Schema({
  text: String,
  style: { type:{ position: Number, color: String }, default: undefined },
  api: {
    url: String,
    onSuccessMessage: [String],
    onFailureMessage: [String],
    protocal: String,
    params: String | [{ key: String, value: String }],
    body: String | [{ key: String, value: String }]
  }
});

let CheckboxSchema = mongoose.Schema({
  label: { text: String },
  input: { 
    readonly: Boolean,
    name: String,
    options: [{ value: mongoose.Schema.Types.Mixed, text: String }] 
  },
  feed: { type: String, default: undefined }
});

let DropdownSchema = mongoose.Schema({
  label: { text: String },
  input: {
    readonly: { type: Boolean, default: false },
    size: { type: String, default: undefined },
    name: String,
    emptyOption: { type: Boolean, default: false },
    otherOption: { type: Boolean, default: false },
    options: [ { value: mongoose.Schema.Types.Mixed, text: String } ]
  },
  feed: { type: String, default: undefined }
});

let RadioSchema = mongoose.Schema({
  label: { text: String },
  input: {
    readonly: { type: Boolean, default: false },
    name: String,
    options: [{ value: mongoose.Schema.Types.Mixed, text: String }]
  },
  feed: { type: String, default: undefined }
});

let TextblockSchema = mongoose.Schema({
  label: { text: String },
  input: {
    readonly: { type: Boolean, default: false },
    name: String,
    placeholder: String,
    rows: { type: Number, default: 3 }
  }
});

let TextboxSchema = mongoose.Schema({
  label: { text: String },
  input: { name: String, placeholder: String, size: String }
});

let ElementsSchema = mongoose.Schema({
  // _id: { type: String, default: new mongoose.Schema.Types.ObjectId() },
  type: { type: String, default: null },
  bind: { type: String, default: null },
  name: { type: String, default: null },
  // accordion: { type: DatatableSchema, default: undefined },
  button: { type: ButtonSchema, default: undefined },
  checkbox: { type: CheckboxSchema, default: undefined },
  datatable: { type: DatatableSchema, default: undefined },
  dropdown: { type: DropdownSchema, default: undefined },
  modal: { type: ModalSchema, default: undefined },
  radio: { type: RadioSchema, default: undefined },
  textblock: { type: TextblockSchema, default: undefined },
  textbox: { type: TextboxSchema, default: undefined }
});

let PanelSchema = mongoose.Schema({
  active: { type: Boolean, default: false },
  name: String,
  header: {
    aling: String,
    text: String,
    subtext: String
  },
  containers: [{elements: [ElementsSchema]}]
});

let ToolstripSchema = mongoose.Schema({
  enable: { type: Boolean, default: false },
  _save: {
    type: {
      enable: true,
      api: {
        url: String,
        onSuccessMessage: [String],
        onFailureMessage: [String],
        protocal: { type: String, default: undefined },
        params: [ { key: String, value: String } ],
        body: [ { key: String, value: String } ]
      }
    }, default: { enable: false }
  },
  attachments: {
    type: { enable: true },
    default: { enable: false }
  },
  comments: {
    type: { enable: true },
    default: { enable: false }
  }
});

let InterfaceSchema = mongoose.Schema({
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

InterfaceSchema.methods.Test = function(callback) {
  this.model('interfaces').aggregate([
    { $project: {
        name: 1,
        description: 1,
        tenants: 1,
        panels: 1,
        _save: {
          $cond: { if: { $eq: ["$toolstrip._save.enable", true] }, then: [
            {_id: { $concat: [ "$_id", ".document.create" ] }, name: { $literal: 'Create' }, permission: { $literal: 1 }},
            {_id: { $concat: [ "$_id", ".document.update" ] }, name: { $literal: 'Update' }, permission: { $literal: 1 }}
          ], else: [] }
        },
        attachments: {
          $cond: { if: { $eq: ["$toolstrip.attachments.enable", true] }, then: [
            {_id: { $concat: [ "$_id", ".attachments.1.add" ] }, name: { $literal: 'Add attachments' }, permission: { $literal: 1 }},
            {_id: { $concat: [ "$_id", ".attachments.1.delete" ] }, name: { $literal: 'Remove documents attached by user' }, permission: { $literal: 1 }},
            {_id: { $concat: [ "$_id", ".attachments.0.delete" ] }, name: { $literal: 'Remove documents attached by anyone' }, permission: { $literal: 1 }}
          ], else: [] }
        },
        comments: {
          $cond: { if: { $eq: ["$toolstrip.comments.enable", true] }, then: [
            {_id: { $concat: [ "$_id", ".comments.1.add" ] }, name: { $literal: 'Add comments' }, permission: { $literal: 1 }},
            {_id: { $concat: [ "$_id", ".comments.1.edit" ] }, name: { $literal: 'Edit/delete comments entered by user' }, permission: { $literal: 1 }},
            {_id: { $concat: [ "$_id", ".comments.0.delete" ] }, name: { $literal: 'Delete comments entered by anyone' }, permission: { $literal: 1 }}
          ], else: [] }
        } 
    } },
    { $unwind: "$panels" },
    { $unwind: "$panels.containers" },
    { $unwind: "$panels.containers.elements"},
    { $addFields: { "panels.containers.elements.permission" : 1 } },
    { $group: {
        _id: {
          _id: "$_id",
          tenants: "$tenants",
          name: "$name",
          description: "$description",
          comments: "$comments",
          _save: "$_save",
          attachments: "$attachments"
        },
        elements: { $addToSet: "$panels.containers.elements" }
    } },
    { $project: {
        _id: "$_id._id",
        tenant: "$_id.tenants",
        asset: { $concatArrays: [ "$elements", "$_id.comments", "$_id.attachments", "$_id._save" ] }
    } },
    { $unwind: "$asset" },
    { $unwind: "$tenant" }
  ]).exec(function(err, ui) {
    if (ui) {
      callback(ui);
    } else if (err) {
      console.log(err);
      callback([]);
    }
  });
}

InterfaceSchema.methods.FindTenantInterfaces = function(tenant, callback) {
  this.model('interfaces').find(
    {
      tenants: { $in: ['neptune', tenant] }
    },
    '_id name description panels',
    { sort: { title: 1 } },
    function(err, interfaces) {
      if (interfaces) {
        callback(null, interfaces);
      } else {
        callback(err, null);
      }
    }
  );
};


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
      // $or: [
      //   { secure: true, roles:   { $in: roles } },
      //   { secure: false }
      // ]
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
      // $or: [
      //   { secure: true, roles:   { $in: roles } },
      //   { secure: false }
      // ]
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
            name: 'Role name',
            type: 'textbox',
            bind: 'role.name',
            textbox: {
              label: { text: 'Name' },
              input: { name: 'role.name', size: 'large' }
            }
          },
          {
            name: 'Role description',
            type: 'textblock',
            bind: 'role.description',
            textblock: {
              label: { text: 'Description' },
              input: { name: 'role.description' }
            }
          },
          {
            name: 'Role status',
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
          },
          {
            name: 'test',
            type: 'button',
            button: {
              api: {
                url: 'test',
                onSuccessMessage: [],
                onFailureMessage: [],
                protocal: null,
                params: [],
                body: []
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
            name: 'Interfaces',
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
      status: true,
      tenant: null,
      users: [],
      apps: [],
      assets: []
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
              name: 'List of roles',
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
                                    name: 'Role name',
                                    type: 'textbox',
                                    bind: 'name',
                                    textbox: {
                                      label: { text: 'Name' },
                                      input: { name: 'modal.role.name', size: 'large' }
                                    }
                                  },
                                  {
                                    name: 'Role description',
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


/**
 * [
    { $project: {
        name: 1,
        description: 1,
        tenants: 1,
        panels: 1,
        _save: {
          $cond: { if: { $eq: ["$toolstrip._save.enable", true] }, then: [
            {_id: { $concat: [ "$_id", ".document.create" ] }, action: { $literal: 'Create' }, permission: { $literal: 1 }},
            {_id: { $concat: [ "$_id", ".document.update" ] }, action: { $literal: 'Update' }, permission: { $literal: 1 }}
          ], else: [] }
        },
        attachments: {
          $cond: { if: { $eq: ["$toolstrip.attachments.enable", true] }, then: [
            {_id: { $concat: [ "$_id", ".attachments.1.add" ] }, action: { $literal: 'Add attachments' }, permission: { $literal: 1 }},
            {_id: { $concat: [ "$_id", ".attachments.1.delete" ] }, action: { $literal: 'Remove documents attached by user' }, permission: { $literal: 1 }},
            {_id: { $concat: [ "$_id", ".attachments.0.delete" ] }, action: { $literal: 'Remove documents attached by anyone' }, permission: { $literal: 1 }}
          ], else: [] }
        },
        comments: {
          $cond: { if: { $eq: ["$toolstrip.comments.enable", true] }, then: [
            {_id: { $concat: [ "$_id", ".comments.1.add" ] }, action: { $literal: 'Add comments' }, permission: { $literal: 1 }},
            {_id: { $concat: [ "$_id", ".comments.1.edit" ] }, action: { $literal: 'Edit/delete comments entered by user' }, permission: { $literal: 1 }},
            {_id: { $concat: [ "$_id", ".comments.0.delete" ] }, action: { $literal: 'Delete comments entered by anyone' }, permission: { $literal: 1 }}
          ], else: [] }
        } 
    } },
    { $unwind: "$panels" },
    { $unwind: "$panels.containers" },
    { $unwind: "$panels.containers.elements"},
    { $addFields: { 
        "panels.containers.elements.permission" : 1,
        "panels.containers.elements.add" : 1,
        "panels.containers.elements.edit" : 1,
        "panels.containers.elements.delete" : 1
    } },
    { $group: {
        _id: {
          _id: "$_id",
          tenants: "$tenants",
          name: "$name",
          description: "$description",
          comments: "$comments",
          _save: "$_save",
          attachments: "$attachments"
        },
        elements: { $addToSet: "$panels.containers.elements" }
    } },
    { $project: {
        _id: "$_id._id",
        tenants: "$_id.tenants",
        name: "$_id.name",
        description: "$_id.description",
        _save: "$_id._save",
        comments: "$_id.comments",
        attachments: "$_id.attachments",
        actions: {
          $filter: {
            input: "$elements",
            as: "element",
            cond: { $eq: ["$$element.type", "button"] }
        } },
        datatables: {
          $filter: {
            input: "$elements",
            as: "element",
            cond: { $eq: ["$$element.type", "datatable"] }
        } },
        elements: {
          $filter: {
            input: "$elements",
            as: "element",
            cond: { $and: [{$ne: ["$$element.type", "datatable"]}, {$ne: ["$$element.type", "button"]}] }
        } },
        assets: { $concatArrays: [ "$elements", "$_id.comments", "$_id.attachments", "$_id._save" ] }
    } }
  ]
 */