export class User {


  id: string;
  name: string;
  lastName: string;
  phoneNumber: string;
  certificate: any;
  pubkey: string;
  status: string;

  constructor(id: string='',
              name: string = 'default_name',
              lastName = 'default_name',
              phoneNumber = 'default_phone',
              certificate = 'default_certificate',
              pubkey:string='',
              status = 'default_status') {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.certificate = certificate;
    this.status = status;
    this.pubkey = pubkey;
  }
}
