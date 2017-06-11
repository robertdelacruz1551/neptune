const individualContactModal = {
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
      clearFormAfterSubmit: true,
      text: 'Save',
      enable: true
    }
  }
};

const individualClassificationOptions = [
  { name: 'type1', value: 'type i', text: 'Type 1' },
  { name: 'type2', value: 'type ii', text: 'Type 2' }
];

const individualCitizenshipModal = {
  header: {
    enable: true,
    text: 'Citizenship'
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
              name: 'citizenshipModalCountry',
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
            label: { text: 'Proof Obtained' },
            input: { name: 'citizenshipModalProof', size: '6' }}
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

const individualPepPositionModal = {
  header: {
    enable: true,
    text: 'Politically Exposed Person'
  },
  form: {
    elements: [
      {
        type: 'textbox',
        textbox: {
          bind: 'office',
          config: {
            label: { text: 'Office' },
            input: { name: 'pepModalOffice', size: '6' }}
        }
      },
      {
        type: 'textbox',
        textbox: {
          bind: 'title',
          config: {
            label: { text: 'Title' },
            input: { name: 'pepModalTitle', size: '6' }}
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
              name: 'pepModalCountry',
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

const individualIdentificationModal = {
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
            label: { text: 'Type' },
            input: {
              size: 'medium',
              name: 'identificationModalType',
              options: [
                { value: 'Drivers License', text: 'Drivers License' },
                { value: 'State Issued Identification', text: 'State Issued Identification' },
                { value: 'Passort', text: 'Passport' }
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
            label: { text: 'Number' },
            input: { name: 'identificationModalNumber', size: '6' }}
        }
      },
      {
        type: 'textbox',
        textbox: {
          bind: 'issuer',
          config: {
            label: { text: 'Issuer' },
            input: { name: 'identificationModalIssuer', size: '6' }}
        }
      },
      {
        type: 'textbox',
        textbox: {
          bind: 'expiration',
          config: {
            label: { text: 'Expiration' },
            input: { name: 'identificationModalExpiration', size: '6' }}
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
              name: 'identificationModalCountry',
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

const individualAddressModal = {
  header: {
    enable: true,
    text: 'Identification Information'
  },
  form: {
    elements: [
      {
        type: 'textbox',
        textbox: {
          bind: 'line1',
          config: {
            label: { text: 'Street address' },
            input: { name: 'addressModalLine1', size: '6', placeholder: 'Line 1' }}
        }
      },
      {
        type: 'textbox',
        textbox: {
          bind: 'line2',
          config: {
            label: { text: null },
            input: { name: 'addressModalLine2', size: '6', placeholder: 'Line 2' }}
        }
      },
      {
        type: 'textbox',
        textbox: {
          bind: 'line3',
          config: {
            label: { text: null },
            input: { name: 'addressModalLine3', size: '6', placeholder: 'Line 3' }}
        }
      },
      {
        type: 'textbox',
        textbox: {
          bind: 'city',
          config: {
            label: { text: 'City' },
            input: { name: 'addressModalCity', size: '6' }}
        }
      },
      {
        type: 'textbox',
        textbox: {
          bind: 'state',
          config: {
            label: { text: 'State' },
            input: { name: 'addressModalState', size: '6' }}
        }
      },
      {
        type: 'textbox',
        textbox: {
          bind: 'zip',
          config: {
            label: { text: 'Postal Code' },
            input: { name: 'addressModalZip', size: '6' }}
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
              name: 'addressModalType',
              options: [
                { value: 'Primary Residence', text: 'Primary Residence' },
                { value: 'Vacation Home', text: 'Other' }
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

export const FormDefaultConfig = {
  individual: {
    name: {
      config: {label: { text: 'Entity Name' }, input: { name: 'name', size: '6' }}
    },
    tin: {
      config: {label: { text: 'Tax ID Number' }, input: { name: 'tin', size: 'small' }}
    },
    dob: {
      config: {label: { text: 'Date of Birth' }, input: { name: 'dob', size: 'small' }}
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
            add: { enable: true, modal: individualContactModal },
            view: { enable: false },
            edit: { enable: true, modal: individualContactModal },
            delete: { enable: true }
          }
        }
      }
    },
    classification: {
      config: {
        label: { text: 'Client Classification' },
        input: { options: individualClassificationOptions }
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
          { key: 'office', text: 'Office' },
          { key: 'title', text: 'Title' },
          { key: 'country', text: 'Country'}
        ],
        action: {
          enable: true,
          button: {
            add: { enable: true, modal: individualPepPositionModal },
            view: { enable: false },
            edit: { enable: true, modal: individualPepPositionModal },
            delete: { enable: true }
          }
        }
      }
    },
    citizenship: {
      config: {
        headers: [
          { key: 'country', text: 'Country' },
          { key: 'proof', text: 'Proof Obtained' }
        ],
        action: {
          enable: true,
          button: {
            add: { enable: true, modal: individualCitizenshipModal },
            view: { enable: false },
            edit: { enable: true, modal: individualCitizenshipModal },
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
            add: { enable: true, modal: individualIdentificationModal },
            view: { enable: false },
            edit: { enable: true, modal: individualIdentificationModal },
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
            add: { enable: true, modal: individualAddressModal },
            view: { enable: true },
            edit: { enable: true, modal: individualAddressModal },
            delete: { enable: true }
          }
        }
      }
    }
  }
};

