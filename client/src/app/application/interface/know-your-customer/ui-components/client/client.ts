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
  contacts: {type: string, description: string } [];
  addresses?: Address [];
  products?: Product [];
  branches?: Branch [];
  information?: {
    individual?: {
      classification: string [];
      dob: Date;
      identifications: {
        type: string;
        number: string;
        issuer?: string;
        expiration?: Date;
        country?: string;
      } [];
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
      stock: {
        traded: boolean;
        information: { exchange: string; symbol: string; } [];
      };
      legal: Firm [];
      accountant: Firm [];
      marketing: Firm []
      owners: { name: string; dob?: Date; address: Address; type: string; ownership: number; title: string; active: boolean; } [];
    }
  };
}

export class Branch {
  employee?: string;
  relationship?: string;
  division?: string;
  branch?: string;
};

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
  type?: string;
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


export const ClientDefault = {
  name: null,
  tin: null,
  type: null,
  contacts: [],
  addresses: [],
  products: [],
  branch: [],
  information: {
    individual: {
      classification: [],
      dob: null,
      identifications: [],
      citizenship: [],
      politician: {
        pep: false,
        positions: [],
      }
    },
    nonindividual: {
      classification: [],
      industries: [],
      entity: {
        structure: null,
        formationDate: null,
        status: null,
        country: null,
        agent: []
      },
      stock: {
        traded: false,
        information: []
      },
      legal: [],
      accountant: [],
      marketing: [],
      owners: [],
    }
  }
};
