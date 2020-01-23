export class User {


  id: number;
  name: string;
  lastName: string;
  phoneNumber: string;
  certificate: any;
  status: string;

  constructor(id: number = Math.floor(Math.random() * (999999 - 100000)) + 100000,
              name: string = 'default_name',
              lastName = 'default_name',
              phoneNumber = 'default_phone',
              certificate = 'default_certificate',
              status = 'default_status') {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.certificate = certificate;
    this.status = status;
  }
}
