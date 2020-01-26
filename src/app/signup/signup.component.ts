import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CryptoService } from '../_services/crypto.service';
import { IClipboardResponse } from 'ngx-clipboard';
import * as FileSaver from 'file-saver';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  keypair = '';

  myForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private cryptoService: CryptoService, private authService: AuthService) {
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      cn: [''],
      givenName: [''],
      sn: [''],
      telephoneNumber: [''],
      userPassword: [''],
      userCertificateRequest: ['']
    });


  }

  submit() {


    console.log(this.cryptoService.ATTRIBUTES);
    this.authService.signup(this.myForm.value).subscribe(
      data => {
        console.log(data);
        this.router.navigateByUrl('/login');
      }
    );
  }

  onGenerateKeyPairClick() {
    this.cryptoService.generateKeyPair();
  }


  onCopySuccess($event: IClipboardResponse) {
    alert('copied');
  }

  onGenerateCSR() {
    this.cryptoService.ATTRIBUTES = [{
      name: 'commonName',
      value: this.myForm.value.cn
    }, {
      name: 'countryName',
      value: 'TN'
    }, {
      shortName: 'ST',
      value: 'TUNISIA'
    }, {
      name: 'localityName',
      value: 'TUNIS'
    }, {
      name: 'organizationName',
      value: 'GL'
    }];
    this.cryptoService.generateCSR();
    this.myForm.patchValue({ userCertificateRequest: this.cryptoService.CSR_PEM });
  }

  onSave(text, filename) {
    var blob = new Blob([text], {
        type: 'text/plain;charset=utf-8'
      })
    ;
    FileSaver.saveAs(blob, filename);
  }
}
