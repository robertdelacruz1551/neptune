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
    text: 'Account/Product Information'
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
      },
      {
        type: 'textbox',
        textbox: {
          bind: 'purpose',
          config: {
            label: { text: 'Purpose' },
            input: { name: 'modal.products.purpose', size: '6' }
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

const identificationModal = {
  header: {
    enable: true,
    text: 'Identification Information'
  },
  form: {
    elements: [
      {
        type: 'dropdown',
        dropdown: {
          bind: 'type',
          config: {
            label: { text: 'Identification Type' },
            input: {
              size: 'medium',
              name: 'modal.identification.type',
              options: [
                { value: 'Drivers License', text: 'Drivers License' },
                { value: 'State Issued ID', text: 'State Issued ID' },
                { value: 'Passport', text: 'Passport' }
              ]
            }
          }
        }
      },
      {
        type: 'textbox',
        textbox: {
          bind: 'number',
          config: {
            label: { text: 'ID Number' },
            input: { name: 'modal.identification.number', size: '6' }
          }
        }
      },
      {
        type: 'textbox',
        textbox: {
          bind: 'issuer',
          config: {
            label: { text: 'Issuer' },
            input: { name: 'modal.identification.issuer', size: '6' }
          }
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
              name: 'modal.identification.country',
              options: [
                { value: 'USA', text: 'United States' },
                { value: 'Other', text: 'Other' }
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

const citizenshipModal = {
  header: {
    enable: true,
    text: 'Country of Citizenship'
  },
  form: {
    elements: [
      {
        type: 'dropdown',
        dropdown: {
          bind: 'country',
          config: {
            label: { text: 'Country' },
            input: {
              size: 'medium',
              name: 'modal.citizenship.country',
              options: [
                { value: 'USA', text: 'United States' },
                { value: 'Other', text: 'Other' }
              ]
            }
          }
        }
      },
      {
        type: 'textbox',
        textbox: {
          bind: 'proof',
          config: {
            label: { text: 'Proof of Citizenship' },
            input: { name: 'modal.citizenship.proof', size: '6' }
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
  workflow: {
    enable: true,
    id: '1',
    statuses: [
      {
        id: '1',
        name: 'Start',
        next: [
          {
            id: '2',
            name: 'In Progress'
          },
          {
            id: '3',
            name: 'End'
          }
        ]
      }
    ]
  },
  panels: [
    {
      id: '005',
      name: 'Individual (CIP)',
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
                bind: 'identification',
                config: {
                  size: 'large',
                  label: { text: 'Identification' },
                  headers: [
                    { key: 'type', text: 'Type' },
                    { key: 'number', text: 'Number' },
                    { key: 'issuer', text: 'Issuer' },
                    { key: 'country', text: 'Country' }
                  ],
                  action: {
                    enable: true,
                    button: {
                      add: { enable: true, modal: identificationModal },
                      view: { enable: false },
                      edit: { enable: true, modal: identificationModal },
                      delete: { enable: true }
                    }
                  }
                }
              }
            },
            {
              type: 'datatable', // textbox/checkbox/radio/dropdown/datatable
              datatable: {
                bind: 'contact',
                config: {
                  size: 'medium',
                  label: { text: 'Contact Information' },
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
            },
          ]
        },
        {
          elements: [
            {
              type: 'datatable', // textbox/checkbox/radio/dropdown/datatable
              datatable: {
                bind: 'addresses',
                config: {
                  size: 'large',
                  label: { text: 'Address' },
                  headers: [
                    { key: 'line1', text: 'Address' },
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
    { // this panel will have an array of containers with cdd input fields
      id: '006',
      name: 'Customer Due Diligence',
      containers: [
        {
          elements: [
            {
              type: 'radio',
              radio: {
                bind: 'citizenship',
                config: {
                  label: { text: 'Citizenship Status' },
                  input: {
                    name: 'client.individual.citizenship',
                    options: [
                      { value: 'US Citizen', text: 'US Citizen' },
                      { value: 'US Resident', text: 'US Resident' },
                      { value: 'NRA', text: 'Non-Resident Alien' }
                    ]
                  }
                }
              }
            },
            {
              type: 'datatable', // textbox/checkbox/radio/dropdown/datatable
              datatable: {
                bind: 'citizenshipCountry',
                config: {
                  size: 'medium',
                  label: { text: 'Country of Citizenship' },
                  headers: [
                    { key: 'country', text: 'Country' },
                    { key: 'proof', text: 'Proof' }
                  ],
                  action: {
                    enable: true,
                    button: {
                      add: { enable: true, modal: citizenshipModal },
                      view: { enable: false },
                      edit: { enable: true, modal: citizenshipModal },
                      delete: { enable: true }
                    }
                  }
                }
              }
            }
          ]
        },
        {
          elements: [
            {
              type: 'textbox',
              textbox: {
                bind: 'occupation',
                config: {
                  label: { text: 'Primary Occupation' },
                  input: { name: 'client.occupation', size: 'medium' }
                }
              }
            }
          ]
        }
      ]
    },
    {
      id: '003',
      name: 'Accounts',
      containers: [
        {
          elements: [
            {
              type: 'datatable', // textbox/checkbox/radio/dropdown/datatable
              datatable: {
                bind: 'products',
                config: {
                  size: 'large',
                  label: { text: 'List all accounts' },
                  headers: [
                    { key: 'number', text: 'Number' },
                    { key: 'type', text: 'Type' },
                    { key: 'relationship', text: 'Relationship' },
                    { key: 'purpose', text: 'Purpose' }
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
      name: 'Internal Contacts',
      header: {
        align: 'left',
        text: 'Relationship Managers'
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
    },
  ], // end panels
  data: {
    workitem: {
      id: '122323',
      name: null,
      type: null,
      created: null,
      status: 'Start',
      entity: null,
      source: null,
      createdBy: null,
    },
    subject: {
      name: null,
      tin: null,
      dob: null,
      license: [],
      contact: [],
      addresses: [],
      products: [],
      branches: [],
      identification: [],
      citizenship: null,
      citizenshipCountry: []
    }
  }
};
