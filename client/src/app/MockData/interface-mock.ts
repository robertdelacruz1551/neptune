const contactModal = {
  header: {
    enable: true,
    text: 'Contact Information'
  },
  form: {
    elements: [
      {
        type: 'dropdown',
        dropdown: {
          bind: 'type',
          config: {
            label: { text: 'Type' },
            input: {
              size: 'medium',
              name: 'modal.contact.type',
              options: [
                { value: 'Email', text: 'Email' },
                { value: 'Mobile Number', text: 'Mobile Number' },
                { value: 'Home Number', text: 'Home Number' }
              ]
            }
          }
        }
      },
      {
        type: 'textbox',
        textbox: {
          bind: 'description',
          config: {
            label: { text: 'Description' },
            input: { name: 'modal.contact.description', size: '6' }
          }
        }
      }
    ]
  },
  footer: {
    enable: true,
    commit: {
      clearFormAfterSubmit: true,
      text: 'Save',
      enable: true
    }
  }
};

const addressModal = {
  header: {
    enable: true,
    text: 'Client Address'
  },
  form: {
    elements: [
      {
        type: 'textbox',
        textbox: {
          bind: 'line1',
          config: {
            label: { text: 'Street address' },
            input: { name: 'modal.addresses.line1', size: '6', placeholder: 'Line 1' }}
        }
      },
      {
        type: 'textbox',
        textbox: {
          bind: 'line2',
          config: {
            label: { text: null },
            input: { name: 'modal.addresses.line2', size: '6', placeholder: 'Line 2' }}
        }
      },
      {
        type: 'textbox',
        textbox: {
          bind: 'line3',
          config: {
            label: { text: null },
            input: { name: 'modal.addresses.line3', size: '6', placeholder: 'Line 3' }}
        }
      },
      {
        type: 'textbox',
        textbox: {
          bind: 'city',
          config: {
            label: { text: 'City' },
            input: { name: 'modal.addresses.city', size: '6' }}
        }
      },
      {
        type: 'textbox',
        textbox: {
          bind: 'state',
          config: {
            label: { text: 'State' },
            input: { name: 'modal.addresses.state', size: 'small' }}
        }
      },
      {
        type: 'textbox',
        textbox: {
          bind: 'zip',
          config: {
            label: { text: 'Postal Code' },
            input: { name: 'modal.addresses.zip', size: 'medium' }}
        }
      },
      {
        type: 'dropdown',
        dropdown: {
          bind: 'country',
          config: {
            label: { text: 'Country' },
            input: {
              size: 'medium',
              name: 'modal.addresses.country',
              options: [
                { value: 'USA', text: 'United States' },
                { value: 'Other', text: 'Other' }
              ]
            }
          }
        }
      },
      {
        type: 'dropdown',
        dropdown: {
          bind: 'type',
          config: {
            label: { text: 'Type' },
            input: {
              size: 'medium',
              name: 'modal.addresses.type',
              options: [
                { value: 'Primary Residence', text: 'Primary Residence' },
                { value: 'Vacation Home', text: 'Vacation Home' }
              ]
            }
          }
        }
      }
    ]
  },
  footer: {
    enable: true,
    commit: {
      text: 'Save',
      enable: true
    }
  }
};

const productModal = {
  header: {
    enable: true,
    text: 'Products and Services'
  },
  form: {
    elements: [
      {
        type: 'textbox',
        textbox: {
          bind: 'number',
          config: {
            label: { text: 'Number' },
            input: { name: 'modal.products.number', size: '6' }
          }
        }
      },
      {
        type: 'textbox',
        textbox: {
          bind: 'name',
          config: {
            label: { text: 'Product Name' },
            input: { name: 'modal.products.name', size: '6' }
          }
        }
      },
      {
        type: 'dropdown',
        dropdown: {
          bind: 'type',
          config: {
            label: { text: 'Type' },
            input: {
              size: 'medium',
              name: 'modal.product.type',
              options: [
                { value: 'Accounting', text: 'Accounting' },
                { value: 'Tax Audit Services', text: 'Tax Audit Services' }
              ]
            }
          }
        }
      },
      {
        type: 'dropdown',
        dropdown: {
          bind: 'relationship',
          config: {
            label: { text: 'Relationship' },
            input: {
              size: 'medium',
              name: 'modal.product.relationship',
              options: [
                { value: 'Primary', text: 'Primary Signor' },
                { value: 'Secondary', text: 'Secondary Signor' }
              ]
            }
          }
        }
      }
    ]
  },
  footer: {
    enable: true,
    commit: {
      text: 'Save',
      enable: true
    }
  }
};

const branchModal = {
  header: {
    enable: true,
    text: 'Branches and Relationhsip Managers'
  },
  form: {
    elements: [
      {
        type: 'textbox',
        textbox: {
          bind: 'employee',
          config: {
            label: { text: 'Employee Name' },
            input: { name: 'modal.branchs.employee', size: '6' }
          }
        }
      },
      {
        type: 'dropdown',
        dropdown: {
          bind: 'relationship',
          config: {
            label: { text: 'Relationship' },
            input: {
              size: 'medium',
              name: 'modal.branchs.relationship',
              options: [
                { value: 'Relationship Manager', text: 'Relationship Manager' },
                { value: 'Loan Officer', text: 'Loan Officer' },
                { value: 'Financial Advisor', text: 'Financial Advisor' }
              ]
            }
          }
        }
      },
      {
        type: 'dropdown',
        dropdown: {
          bind: 'division',
          config: {
            label: { text: 'Division' },
            input: {
              size: 'medium',
              name: 'modal.branchs.division',
              options: [
                { value: 'North America', text: 'North East' },
                { value: 'APAC', text: 'APAC' }
              ]
            }
          }
        }
      },
      {
        type: 'textbox',
        textbox: {
          bind: 'branch',
          config: {
            label: { text: 'Branch' },
            input: { name: 'modal.branchs.branch', size: '6' }
          }
        }
      }
    ]
  },
  footer: {
    enable: true,
    commit: {
      text: 'Save',
      enable: true
    }
  }
};

export const KYC = {
  name: 'Know Your Customer',
  description: null,
  url: null,
  panels: [
    {
      id: '001',
      name: 'General Information',
      containers: [
        {
          elements: [
            {
              type: 'textbox', // textbox/checkbox/radio/dropdown/datatable
              textbox: {
                bind: 'name',
                config: {
                  label: { text: 'Name' },
                  input: { name: 'client.name', size: 'medium' }
                }
              }
            },
            {
              type: 'textbox', // textbox/checkbox/radio/dropdown/datatable
              textbox: {
                bind: 'tin',
                config: {
                  label: { text: 'Tax Identification No.' },
                  input: { name: 'client.tin', size: 'small' }
                }
              }
            },
            {
              type: 'textbox', // textbox/checkbox/radio/dropdown/datatable
              textbox: {
                bind: 'dob',
                config: {
                  label: { text: 'Date of Birth' },
                  input: { name: 'client.dob', size: 'small' }
                }
              }
            },
            {
              type: 'datatable', // textbox/checkbox/radio/dropdown/datatable
              datatable: {
                bind: 'contact',
                config: {
                  size: 'small',
                  headers: [
                    { key: 'type', text: 'Type' },
                    { key: 'description', text: 'Description' }
                  ],
                  action: {
                    enable: true,
                    button: {
                      add: { enable: true, modal: contactModal },
                      view: { enable: false },
                      edit: { enable: true, modal: contactModal },
                      delete: { enable: true }
                    }
                  }
                }
              }
            }
          ]
        }
      ] // end interface
    },
    {
      id: '002',
      name: 'Addresses',
      header: {
        align: 'left',
        text: 'Client Addresses',
        subtext: 'List all client addresses below'
      },
      containers: [
        {
          elements: [
            {
              type: 'datatable', // textbox/checkbox/radio/dropdown/datatable
              datatable: {
                bind: 'addresses',
                config: {
                  headers: [
                    { key: 'line1', text: 'Address' },
                    { key: 'city', text: 'City' },
                    { key: 'state', text: 'State' },
                    { key: 'zip', text: 'Postal Code' },
                    { key: 'country', text: 'Country' },
                    { key: 'type', text: 'Type' }
                  ],
                  action: {
                    enable: true,
                    button: {
                      add: { enable: true, modal: addressModal },
                      view: { enable: false },
                      edit: { enable: true, modal: addressModal },
                      delete: { enable: true }
                    }
                  }
                }
              }
            }
          ]
        }
      ]
    },
    {
      id: '003',
      name: 'Products',
      header: {
        align: 'left',
        text: 'Products and Services',
        subtext: 'List all client products'
      },
      containers: [
        {
          elements: [
            {
              type: 'datatable', // textbox/checkbox/radio/dropdown/datatable
              datatable: {
                bind: 'products',
                config: {
                  headers: [
                    { key: 'number', text: 'Number' },
                    { key: 'type', text: 'Type' },
                    { key: 'name', text: 'Product Name' },
                    { key: 'relationship', text: 'Relationship' }
                  ],
                  action: {
                    enable: true,
                    button: {
                      add: { enable: true, modal: productModal },
                      view: { enable: false },
                      edit: { enable: true, modal: productModal },
                      delete: { enable: true }
                    }
                  }
                }
              }
            }
          ]
        }
      ]
    },
    {
      id: '004',
      name: 'Relationship Managers',
      header: {
        align: 'left',
        text: 'Relationship Managers',
        subtext: 'List all employees in charge maintaining contact with the client'
      },
      containers: [
        {
          elements: [
            {
              type: 'datatable', // textbox/checkbox/radio/dropdown/datatable
              datatable: {
                bind: 'branches',
                config: {
                  headers: [
                    { key: 'employee', text: 'Employee' },
                    { key: 'relationship', text: 'Relationship' },
                    { key: 'division', text: 'Division' },
                    { key: 'branch', text: 'Branch' }
                  ],
                  action: {
                    enable: true,
                    button: {
                      add: { enable: true, modal: branchModal },
                      edit: { enable: true, modal: branchModal },
                      delete: { enable: true }
                    }
                  }
                }
              }
            }
          ]
        }
      ]
    }
  ], // end panels
  data: {
    name: null,
    tin: null,
    dob: null,
    contact: [],
    addresses: [],
    products: [],
    branches: []
  }
};
