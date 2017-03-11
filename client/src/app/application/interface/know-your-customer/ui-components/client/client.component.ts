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

  justChecking() {
    console.log(this.contactdata);
  }
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
      military: {
        active: boolean;
        start: Date;
        end?: Date;
        rank?: string;
        branch?: string;
      };
      politician: {
        pep: boolean;
        positions: {
          active: boolean;
          office: string;
          title: string;
          country: string;
        } [];
      };
    };
    nonindividual?: {
      classification: string [];
      industries: { code: string; name: string; active: boolean} [];
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
  active: boolean;
}

export class Product {
  number: string;
  family?: string;
  name: string;
  relationship?: string;
  active: boolean;
}

export class Firm {
  firm: string;
  address: Address [];
  email: string;
  phone: string;
  contactPerson: string;
}

