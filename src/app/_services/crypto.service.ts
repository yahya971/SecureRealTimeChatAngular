import { Injectable } from '@angular/core';
import * as forge from 'node-forge';
import { pki } from 'node-forge';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private _PRIVATE_KEY: any;

  constructor() {
  }

  private _PUBLIC_KEY_PEM: string;
  private _PUBLIC_KEY: any;


  get PUBLIC_KEY(): any {
    return this._PUBLIC_KEY;
  }

  set PUBLIC_KEY(value: any) {
    this._PUBLIC_KEY = value;
  }

  get PUBLIC_KEY_PEM(): string {
    return this._PUBLIC_KEY_PEM;
  }

  private _PRIVATE_KEY_PEM: string;

  get PRIVATE_KEY_PEM(): string {
    return this._PRIVATE_KEY_PEM;
  }

  private _KEYPAIR;

  get KEYPAIR() {
    return this._KEYPAIR;
  }

  private _ATTRIBUTES;


  get ATTRIBUTES() {
    return this._ATTRIBUTES;
  }

  set ATTRIBUTES(value) {
    this._ATTRIBUTES = value;
  }

  private _CSR;

  get CSR() {
    return this._CSR;
  }

  private _CSR_PEM: string;

  get CSR_PEM(): string {
    return this._CSR_PEM;
  }

  generateKeyPair() {
    console.log('starting generating key pair ');
    this.resetCSR();

    new Promise<any>((f, r) => forge.pki.rsa.generateKeyPair
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
    console.log(this._ATTRIBUTES);
    if (!this._ATTRIBUTES) {
      return;
    }
    const csr = pki.createCertificationRequest();


    csr.publicKey = this._KEYPAIR.publicKey;

    csr.setSubject(this.ATTRIBUTES);
    csr.sign(this._KEYPAIR.privateKey);

    // verify certification request
    // @ts-ignore
    const verified = csr.verify();
    console.log('verify');
    console.log(verified);
    console.log('subject in csr');
    console.log(csr.subject);


    const pemCsr = pki.certificationRequestToPem(csr);


    this._CSR = csr;
    this._CSR_PEM = pemCsr;


  }

  resetCSR() {
    this._CSR = null;
    this._CSR_PEM = null;
  }

  loadPrivateKey(key: string) {
    this._PRIVATE_KEY = pki.privateKeyFromPem(key);
    console.log(this._PRIVATE_KEY);


  }

  loadPublicKey(key: string) {
    this._PUBLIC_KEY = pki.publicKeyFromPem(key);
    console.log(this._PUBLIC_KEY);
  }

  encryptMessage(message: string, selectedUser: User)

    : string {
    let selectedUserPublickey: any = pki.publicKeyFromPem(selectedUser.pubkey);
    let encrypted: string;
    encrypted = selectedUserPublickey.encrypt(message);
    console.log(encrypted);
    return encrypted;
  }

  decryptMessage(encrypted: string): any {
    const decrypted = this._PRIVATE_KEY.decrypt(encrypted);
    console.log(decrypted);
    return decrypted;
  }
}
