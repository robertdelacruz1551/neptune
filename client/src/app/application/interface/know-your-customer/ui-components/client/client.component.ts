import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'client-module',
  templateUrl: 'client.component.html'
})
export class ClientComponent {
  client: Client;

  contactdata = [
    { type: 'Email', description: 'rd@neptune.com'},
    { type: 'Email', description: 'rd@aol.com'}
  ];

  addressdata = [
    {line1: '9876 Street Ave', city: 'Warwick', state: 'Rhode Island', zip: '02993-0990', type: 'Home'},
  ];

  productsdata = [
    {number: '90-88394382', family: 'Checking', name: 'Classic Checking', relationship: 'Primary'},
    {number: '10-288263332', family: 'Savings', name: 'Standard Savings', relationship: 'Primary'},
    {number: '453366232', family: 'Accounting', name: 'Federal Income Tax Preperation', relationship: 'Subscriber'}
  ];

  branchdata = [
    { employee: 'Bobby Dixon', relationship: 'Branch Manager', division: 'New England', branch: 'MA122'},
    { employee: 'Jeanne Silva', relationship: 'Personal Banker', division: 'New England', branch: 'MA122'}
  ];

  identificationData = [
    { type: 'Drivers License', number: '500032', issuer: 'Rhode Island', expiration: '02/2/20018', country: 'USA' }
  ];

  citizenshipData = [
    { country: 'United State', proof: 'US issued passport'}
  ];

  politicalpositionData = [];

  industryData = [
    { code: '32344', description: 'General Construction' },
    { code: '4322', description: 'Plumber' },
  ];

  entity = [
    { structure: 'LTD', formationDate: '22-Dec-1977', status: 'Active', country: 'United States' }
  ];

  marketing = [];
  accounting = [];
  legal = [];
  agent = [];
}



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
}

