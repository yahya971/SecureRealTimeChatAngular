import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CryptoService } from '../_services/crypto.service';
import { IClipboardResponse } from 'ngx-clipboard';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  keypair = '';

  myForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private cryptoService: CryptoService) {
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      cn: [''],
      givenName: [''],
      sn: [''],
      telephoneNumber: [''],
      userPassword: ['']
    });


  }

  submit() {
    console.log(this.myForm.value);
    this.router.navigate(['/login']);
  }

  onGenerateKeyPairClick() {
    this.cryptoService.generateKeyPair();
  }


  onCopySuccess($event: IClipboardResponse) {
    alert('copied');
  }

  onGenerateCSR() {
    this.cryptoService.generateCSR();
  }

  onSave(text, filename) {
    var blob = new Blob([text], {
        type: 'text/plain;charset=utf-8'
      })
    ;
    FileSaver.saveAs(blob, filename);
  }
}
