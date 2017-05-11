/**
 * The client class will host all 
 * elements to support client specific 
 * information. This class will be 
 * exportable and accessable to 
 * suport other apps
 */

export class Client {
  name: string;
  tin: string;
  type?: string; // individual / nonindividual
  constacts: {type: string, contact: string } [];
  addresses?: Address [];
  products?: Product [];
  branch?: { employee?: string; relationship?: string; division?: string; branch?: string; } [];
  information?: {
    individual?: {
      classification: string [];
      dob: Date;
      identifications: { type: string; number: string; issuer?: string; expiration?: Date; country?: string; } [];
      citizenship: { country: string; proof: string; } [];
      politician: {
        pep: boolean;
        positions: {
          office: string;
          title: string;
          country: string;
        } [];
      };
    };
    nonindividual?: {
      classification: string [];
      industries: { code: string; description: string; } [];
      entity: {
        structure: string;
        formationDate: Date;
        status: string;
        country: string;
        agent: Firm [];
      };
      stock: { traded: boolean; information: { exchange: string; symbol: string; } []; };
      legal: Firm [];
      accountant: Firm [];
      marketing: Firm []
      owners: { name: string; dob?: Date; address: Address; type: string; ownership: number; title: string; active: boolean; } [];
    }
  };
}

export class Address {
  line1: string;
  line2?: string;
  line3?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  type?: string; // primary residence, head quarters...
}

export class Product {
  number: string;
  family?: string;
  name: string;
  relationship?: string;
}

export class Firm {
  firm: string;
  address: Address [];
  email: string;
  phone: string;
  contactPerson: string;
};



export const FormDefaultConfig = {
  general: {
    address: {
      config: {
        headers: [
          {key: 'line1', text: 'Street Address'},
          {key: 'city', text: 'City'},
          {key: 'state', text: 'State'},
          {key: 'zip', text: 'Postal Code'},
          {key: 'type', text: 'Type'}
        ],
        action: {
          enable: true,
          button: {
            add: { enable: true },
            view: { enable: true },
            edit: { enable: true },
            delete: { enable: true }
          }
        }
      }
    },
    products: {
      config: {
        headers: [
          {key: 'number', text: 'Account Number'},
          {key: 'family', text: 'Product Family'},
          {key: 'name', text: 'Name'},
          {key: 'relationship', text: 'Relationship'}
        ],
        action: {
          enable: true,
          button: {
            add: { enable: true },
            view: { enable: false },
            edit: { enable: true },
            delete: { enable: true }
          }
        }
      }
    },
    branch: {
      config: {
        headers: [
          {key: 'employee', text: 'Employee'},
          {key: 'relationship', text: 'Relationship'},
          {key: 'division', text: 'Division'},
          {key: 'branch', text: 'Branch'}
        ],
        action: {
          enable: true,
          button: {
            add: { enable: true },
            view: { enable: false },
            edit: { enable: true },
            delete: { enable: true }
          }
        }
      }
    }
  },
  individual: {
    name: {
      config: {label: { text: 'Entity Name' }, input: { name: 'name', size: '6' }}
    },
    tin: {
      config: {label: { text: 'Tax ID Number' }, input: { name: 'tin', size: 'small' }}
    },
    contact: {
      config: {
        headers: [
          { key: 'type', text: 'Type' },
          { key: 'description', text: 'Description' }
        ],
        action: {
          enable: true,
          button: {
            add: {
              enable: true,
              modal: {
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
                            name: 'contactModalType',
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
                          input: { name: 'contactModalDescription', size: '6' }}
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
              }
            },
            view: { 
              enable: true,
              modal: {
                header: {
                  enable: true,
                  text: 'Contact Information'
                },
                form: {
                  elements: [
                    {
                      type: 'textbox',
                      textbox: {
                        bind: 'type',
                        config: {
                          label: { text: 'Type' }, 
                          input: { readonly: true, name: 'contactModalType', size: '3' }}
                      }
                    },
                    {
                      type: 'textbox',
                      textbox: {
                        bind: 'description',
                        config: {
                          label: { text: 'Description' }, 
                          input: { readonly: true, name: 'contactModalDescription', size: '6' }}
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
              }
            },
            edit: { 
              enable: true,
              modal: {
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
                            name: 'contactModalType', 
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
                          input: { name: 'contactModalDescription', size: '6' }}
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
              }
            },
            delete: { enable: true }
          }
        }
      }
    },
    dob: {
      config: {label: { text: 'Date of Birth' }, input: { name: 'dob', size: 'small' }}
    },
    classification: {
      config: {
        label: { text: 'Client Classification' },
        input: { options: [
          { name: 'type1', value: 'type i', text: 'Type 1' },
          { name: 'type2', value: 'type ii', text: 'Type 2' }
        ]}
      }
    },
    pep: {
      config: {
        label: { text: 'Is the client a politically involved person?'},
        input: { name: 'pep', options: [
          { value: true, text: 'Yes' },
          { value: false, text: 'No' }
        ]}
      }
    },
    pepPosition: {
      config: {
        headers: [
          { key: 'country', text: 'Country' },
          { key: 'proof', text: 'Proof Obtained' }
        ],
        action: {
          enable: true,
          button: {
            add: { enable: true },
            view: { enable: false },
            edit: { enable: true },
            delete: { enable: true }
          }
        }
      }
    },
    citizenship: {
      config: {
        headers: [
          { key: 'office', text: 'Office' },
          { key: 'title', text: 'Title' },
          { key: 'country', text: 'Country'}
        ],
        action: {
          enable: true,
          button: {
            add: { enable: true },
            view: { enable: false },
            edit: { enable: true },
            delete: { enable: true }
          }
        }
      }
    },
    identification: {
      config: {
        headers: [
          { key: 'type', text: 'Type' },
          { key: 'number', text: 'Number' },
          { key: 'issuer', text: 'Issuer' },
          { key: 'expiration', text: 'Expiration Date' },
          { key: 'country', text: 'Country' }
        ],
        action: {
          enable: true,
          button: {
            add: { enable: true },
            view: { enable: false },
            edit: { enable: true },
            delete: { enable: true }
          }
        }
      }
    },
    address: {
      config: {
        headers: [
          {key: 'line1', text: 'Street Address'},
          {key: 'city', text: 'City'},
          {key: 'state', text: 'State'},
          {key: 'zip', text: 'Postal Code'},
          {key: 'type', text: 'Type'}
        ],
        action: {
          enable: true,
          button: {
            add: { enable: true },
            view: { enable: true },
            edit: { enable: true },
            delete: { enable: true }
          }
        }
      }
    }
  },
  nonindividual: {
    name: {
      config: {label: { text: 'Entity Name' }, input: { name: 'name', size: '6' }}
    },
    tin: {
      config: {label: { text: 'Tax ID Number' }, input: { name: 'tin', size: 'small' }}
    },
    contact: {
      config: {
        headers: [
          { key: 'type', text: 'Type' },
          { key: 'description', text: 'Description' }
        ],
        action: {
          enable: true,
          button: {
            add: {
              enable: true,
              modal: {
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
                            name: 'contactModalType',
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
                          input: { name: 'contactModalDescription', size: '6' }}
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
              }
            },
            view: { 
              enable: true,
              modal: {
                header: {
                  enable: true,
                  text: 'Contact Information'
                },
                form: {
                  elements: [
                    {
                      type: 'textbox',
                      textbox: {
                        bind: 'type',
                        config: {
                          label: { text: 'Type' }, 
                          input: { readonly: true, name: 'contactModalType', size: '3' }}
                      }
                    },
                    {
                      type: 'textbox',
                      textbox: {
                        bind: 'description',
                        config: {
                          label: { text: 'Description' }, 
                          input: { readonly: true, name: 'contactModalDescription', size: '6' }}
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
              }
            },
            edit: { 
              enable: true,
              modal: {
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
                            name: 'contactModalType', 
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
                          input: { name: 'contactModalDescription', size: '6' }}
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
              }
            },
            delete: { enable: true }
          }
        }
      }
    },
    classification: {
      config: {
        label: { text: 'Client Classification' },
        input: {
          options: [
            { name: 'type1', value: 'type i', text: 'Type 1' },
            { name: 'type2', value: 'type ii', text: 'Type 2' }
          ]
        }
      }
    },
    industry: {
      config: {
        headers: [
          { key: 'code', text: 'Industry Code' },
          { key: 'description', text: 'Description' }
        ],
        action: {
          enable: true,
          button: {
            add: { enable: true },
            view: { enable: false },
            edit: { enable: true },
            delete: { enable: true }
          }
        }
      }
    },
    entityStructure: {
      config: {label: { text: 'Company Structure' }, input: { name: 'entityStructure', size: '4' }}
    },
    entityFormationDate: {
      config: {label: { text: 'Formation Date' }, input: { name: 'formationDate', size: '2' }}
    },
    entityStatus: {
      config: {label: { text: 'Status' }, input: { name: 'formationStatus', size: '2' }}
    },
    entityCountry: {
      config: {label: { text: 'Formation Country' }, input: { name: 'formationCountry', size: '1' }}
    },
    entityAgent: {
      config: {
        headers: [
          { key: 'firm', text: 'Register Agent' }
        ],
        action: {
          enable: true,
          button: {
            add: { enable: true },
            view: { enable: false },
            edit: { enable: true },
            delete: { enable: true }
          }
        }
      }
    },
    legal: {
      config: {
        headers: [
          { key: 'firm', text: 'Legal Service' }
        ],
        action: {
          enable: true,
          button: {
            add: { enable: true },
            view: { enable: false },
            edit: { enable: true },
            delete: { enable: true }
          }
        }
      }
    },
    accounting: {
      config: {
        headers: [
          { key: 'firm', text: 'Accounting Firm' }
        ],
        action: {
          enable: true,
          button: {
            add: { enable: true },
            view: { enable: false },
            edit: { enable: true },
            delete: { enable: true }
          }
        }
      }
    },
    marketing: {
      config: {
        headers: [
          { key: 'firm', text: 'Marketing Firm' }
        ],
        action: {
          enable: true,
          button: {
            add: { enable: true },
            view: { enable: false },
            edit: { enable: true },
            delete: { enable: true }
          }
        }
      }
    },
    stock: {
      config: {
        label: { text: 'Is the company publicly traded?'},
        input: { name: 'stock', options: [
          { value: true, text: 'Yes' },
          { value: false, text: 'No' }
        ]}
      }
    },
    stockData: {
      config: {
        headers: [
          { key: 'exchange', text: 'Exchange' },
          { key: 'symbol', text: 'Symbol' }
        ],
        action: {
          enable: true,
          button: {
            add: { enable: true },
            view: { enable: false },
            edit: { enable: true },
            delete: { enable: true }
          }
        }
      }
    }
  }
};
