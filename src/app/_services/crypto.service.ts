import { Injectable } from '@angular/core';
import * as forge from 'node-forge';
import { pki } from 'node-forge';
import CertificateRequest = module;
import KeyPair = module;

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  constructor() {
  }

  private _PUBLIC_KEY_PEM: string;

  get PUBLIC_KEY_PEM(): string {
    return this._PUBLIC_KEY_PEM;
  }

  private _PRIVATE_KEY_PEM: string;

  get PRIVATE_KEY_PEM(): string {
    return this._PRIVATE_KEY_PEM;
  }

  private _KEYPAIR: KeyPair;

  get KEYPAIR(): KeyPair {
    return this._KEYPAIR;
  }

  private _CSR: CertificateRequest;

  get CSR(): CertificateRequest {
    return this._CSR;
  }

  private _CSR_PEM: string;

  get CSR_PEM(): string {
    return this._CSR_PEM;
  }

  generateKeyPair() {
    console.log('starting generating key pair ');
    this.resetCSR();

    new Promise<KeyPair>((f, r) => forge.pki.rsa.generateKeyPair
    (
      {
        bits: 2048,
        e: 65537
      },
      (err, pair) => err ? r(err) : f(pair)))
      .then((keypair) => {

        this._KEYPAIR = keypair;

        this._PRIVATE_KEY_PEM = pki.privateKeyToPem(keypair.privateKey);
        console.log('[PRIVATE KEY] ');
        console.log(this.PRIVATE_KEY_PEM);


        this._PUBLIC_KEY_PEM = pki.publicKeyToPem(keypair.publicKey);
        console.log('[PUBLIC KEY] ');
        console.log(this.PUBLIC_KEY_PEM);

      });
  }

  generateCSR() {
    const csr = pki.createCertificationRequest();


    csr.publicKey = this._KEYPAIR.publicKey;
    csr.sign(this._KEYPAIR.privateKey);

    const pemCsr = pki.certificationRequestToPem(csr);

    const attrs = [{
      name: 'commonName',
      value: 'example.org'
    }, {
      name: 'countryName',
      value: 'US'
    }, {
      shortName: 'ST',
      value: 'Virginia'
    }, {
      name: 'localityName',
      value: 'Blacksburg'
    }, {
      name: 'organizationName',
      value: 'Test'
    }, {
      shortName: 'OU',
      value: 'Test'
    }];


    csr.setSubject(attrs);

    this._CSR = csr;
    this._CSR_PEM = pemCsr;

    console.log('[CERTIFICATION REQUEST]');
    console.log(this.CSR_PEM);
    console.log(this.CSR);
  }

  resetCSR() {
    this._CSR = null;
    this._CSR_PEM = null;
  }

}
