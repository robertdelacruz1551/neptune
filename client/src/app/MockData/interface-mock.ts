import { Interfaces } from '../application/interface/ibox/ibox.service';
import { ModalConfig } from '../application/interface/elements/modal/modal.component';

const contactModal = {
  header: {
    enable: true,
    text: 'Contact Information'
  },
  form: {
    panels: [
      {
        id: '001',
        name: 'Contact',
        containers: [
          {
            elements: [
              {
                type: 'dropdown',
                bind: 'type',
                dropdown: {
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
              },
              {
                type: 'textbox',
                bind: 'description',
                textbox: {
                  label: { text: 'Description' },
                  input: { name: 'modal.contact.description', size: '6' }
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
    panels: [
      {
        id: '001',
        name: 'Contact',
        containers: [
          {
            elements: [
              {
                type: 'textbox',
                bind: 'line1',
                textbox: {
                  label: { text: 'Street address' },
                  input: { name: 'modal.addresses.line1', size: '6', placeholder: 'Line 1' }
                }
              },
              {
                type: 'textbox',
                bind: 'line2',
                textbox: {
                  label: { text: null },
                  input: { name: 'modal.addresses.line2', size: '6', placeholder: 'Line 2' }
                }
              },
              {
                type: 'textbox',
                bind: 'line3',
                textbox: {
                  label: { text: null },
                  input: { name: 'modal.addresses.line3', size: '6', placeholder: 'Line 3' }
                }
              },
              {
                type: 'textbox',
                bind: 'city',
                textbox: {
                  label: { text: 'City' },
                  input: { name: 'modal.addresses.city', size: '6' }
                }
              },
              {
                type: 'textbox',
                bind: 'state',
                textbox: {
                  label: { text: 'State' },
                  input: { name: 'modal.addresses.state', size: 'small' }
                }
              },
              {
                type: 'textbox',
                bind: 'zip',
                textbox: {
                  label: { text: 'Postal Code' },
                  input: { name: 'modal.addresses.zip', size: 'medium' }
                }
              },
              {
                type: 'dropdown',
                bind: 'country',
                dropdown: {
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
              },
              {
                type: 'dropdown',
                bind: 'type',
                dropdown: {
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
            ]
          }
        ]
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
    panels: [
      {
        id: '001',
        name: 'Contact',
        containers: [
          {
            elements: [
              {
                type: 'textbox',
                bind: 'number',
                textbox: {
                  label: { text: 'Number' },
                  input: { name: 'modal.products.number', size: '6' }
                }
              },
              {
                type: 'dropdown',
                bind: 'type',
                dropdown: {
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
              },
              {
                type: 'dropdown',
                bind: 'relationship',
                dropdown: {
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
              },
              {
                type: 'checkbox',
                bind: 'use',
                checkbox: {
                  label: { text: 'Expected activity'},
                  input: { options: [
                    { name: 'modal.product.use', value: 'Wires (International)', text: 'International Wires' },
                    { name: 'modal.product.use', value: 'Wires (Domestic)', text: 'Domestic Wires' },
                    { name: 'modal.product.use', value: 'ACH', text: 'Account Clearing House (ACH)' },
                    { name: 'modal.product.use', value: 'RDC', text: 'Remote Deposit Capture (RDC)' }
                  ]}
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
    panels: [
      {
        id: '001',
        name: 'Contact',
        containers: [
          {
            elements: [
              {
                type: 'textbox',
                bind: 'employee',
                textbox: {
                  label: { text: 'Employee Name' },
                  input: { name: 'modal.branchs.employee', size: '6' }
                }
              },
              {
                type: 'dropdown',
                bind: 'relationship',
                dropdown: {
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
              },
              {
                type: 'dropdown',
                bind: 'division',
                dropdown: {
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
              },
              {
                type: 'textbox',
                bind: 'branch',
                textbox: {
                  label: { text: 'Branch' },
                  input: { name: 'modal.branchs.branch', size: '6' }
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
    panels: [
      {
        id: '001',
        name: 'Contact',
        containers: [
          {
            elements: [
              {
                type: 'dropdown',
                bind: 'type',
                dropdown: {
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
              },
              {
                type: 'textbox',
                bind: 'number',
                textbox: {
                  label: { text: 'ID Number' },
                  input: { name: 'modal.identification.number', size: '6' }
                }
              },
              {
                type: 'textbox',
                bind: 'issuer',
                textbox: {
                  label: { text: 'Issuer' },
                  input: { name: 'modal.identification.issuer', size: '6' }
                }
              },
              {
                type: 'dropdown',
                bind: 'country',
                dropdown: {
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
            ]
          }
        ]
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
    panels: [
      {
        id: '001',
        name: 'Contact',
        containers: [
          {
            elements: [
              {
                type: 'dropdown',
                bind: 'country',
                dropdown: {
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
              },
              {
                type: 'textbox',
                bind: 'proof',
                textbox: {
                  label: { text: 'Proof of Citizenship' },
                  input: { name: 'modal.citizenship.proof', size: '6' }
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
      text: 'Save',
      enable: true
    }
  }
};


export const CUSTOMFORM: Interfaces = {
  id: 'test',
  title: 'Vendor Onboarding Form',
  version: '1.1',
  description: null,
  panels: [
    {
      id: '1221',
      name: 'Case',
      containers: [
        {
          elements: [
            {
              type: 'dlist',
              dlist: {
                terms: [
                  { text: 'Work Item', bind: 'id' }
                ]
              }
            }
          ]
        }
      ]
    }
  ],
  data: {
    
  }
};


export const CUSTOMFORM2: Interfaces = {
  id: 'rouge1',
  title: 'Prospect Engagement Form',
  version: '1.0',
  description: null,
  panels: [
    {
      id: '005',
      name: 'Individual Information',
      containers: [
        {
          elements: [
            {
              type: 'textbox', // textbox/checkbox/radio/dropdown/datatable
              bind: 'name',
              textbox: {
                label: { text: 'Name' },
                input: { name: 'client.name', size: 'medium' }
              }
            },
            {
              type: 'textbox', // textbox/checkbox/radio/dropdown/datatable
              bind: 'tin',
              textbox: {
                label: { text: 'Tax Identification No.' },
                input: { name: 'client.tin', size: 'small' }
              }
            },
            {
              type: 'textbox', // textbox/checkbox/radio/dropdown/datatable
              bind: 'dob',
              textbox: {
                label: { text: 'Date of Birth' },
                input: { name: 'client.dob', size: 'small' }
              }
            },
            {
              type: 'datatable', // textbox/checkbox/radio/dropdown/datatable
              bind: 'identification',
              datatable: {
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
                  modal: identificationModal,
                  edit: true,
                  add: true,
                }
              }
            }
          ]
        },
        {
          elements: [
            {
              type: 'datatable', // textbox/checkbox/radio/dropdown/datatable
              bind: 'contact',
              datatable: {
                size: 'medium',
                label: { text: 'Contact Information' },
                headers: [
                  { key: 'type', text: 'Type' },
                  { key: 'description', text: 'Description' }
                ],
                action: {
                  enable: true,
                  modal: contactModal,
                  edit: true,
                  add: true
                }
              }
            }
          ]
        },
        {
          elements: [
            {
              type: 'datatable', // textbox/checkbox/radio/dropdown/datatable
              bind: 'addresses',
              datatable: {
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
                  modal: addressModal,
                  edit: true,
                  add: true
                }
              }
            }
          ]
        }
      ]
    },
    {
      id: '006',
      name: 'Due Diligence',
      containers: [
        {
          elements: [
            {
              type: 'radio',
              bind: 'citizenship',
              radio: {
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
            },
            {
              type: 'datatable', // textbox/checkbox/radio/dropdown/datatable
              bind: 'citizenshipCountry',
              datatable: {
                size: 'medium',
                label: { text: 'Country of Citizenship' },
                headers: [
                  { key: 'country', text: 'Country' },
                  { key: 'proof', text: 'Proof Obtained' }
                ],
                action: {
                  enable: true,
                  modal: citizenshipModal,
                  edit: true,
                  add: true
                }
              }
            }
          ]
        },
        {
          elements: [
            {
              type: 'radio',
              bind: 'employed',
              radio: {
                label: { text: 'Employed' },
                input: {
                  name: 'client.employed',
                  options: [
                    { value: true, text: 'Yes' },
                    { value: false, text: 'No' }
                  ]
                }
              }
            },
            {
              type: 'textbox',
              bind: 'occupation',
              textbox: {
                label: { text: 'Primary Occupation' },
                input: { name: 'client.occupation', size: 'medium' }
              }
            }
          ]
        },
        {
          elements: [
            {
              type: 'datatable', // textbox/checkbox/radio/dropdown/datatable
              bind: 'products',
              datatable: {
                size: 'large',
                label: { text: 'List all accounts' },
                headers: [
                  { key: 'number', text: 'Number' },
                  { key: 'type', text: 'Type' },
                  { key: 'relationship', text: 'Relationship' },
                  { key: 'use', text: 'Expect Use' }
                ],
                action: {
                  enable: true,
                  modal: productModal,
                  edit: true,
                  add: true
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
              bind: 'branches',
              datatable: {
                headers: [
                  { key: 'employee', text: 'Employee' },
                  { key: 'relationship', text: 'Relationship' },
                  { key: 'division', text: 'Division' },
                  { key: 'branch', text: 'Branch' }
                ],
                action: {
                  enable: true,
                  modal: branchModal,
                  edit: true,
                  add: true
                }
              }
            }
          ]
        }
      ]
    },
  ], // end panels
  data: {
    id: null,
    workitem: {
      id: '122323',
      type: 'OPDD',
      description: 'Onboarding clients requires client risk assessment prior to establishing account relationship',
      created: new Date(),
      modified: new Date(),
      status: 'Start',
      source: 'DRT',
      creator: 'System',
      modifier: 'Timothy Blair',
      comments: [],
      attachments: [],
      history: [],
      subject: {
        contact: []
      }
    }
  }
};
