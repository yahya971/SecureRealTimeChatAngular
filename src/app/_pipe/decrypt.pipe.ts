import { Pipe, PipeTransform } from '@angular/core';
import { CryptoService } from '../_services/crypto.service';

@Pipe({
  name: 'decrypt'
})
export class DecryptPipe implements PipeTransform {
  constructor(private cryptoService: CryptoService) {
  }

  transform(value: any, ...args: any[]): any {
    return this.cryptoService.decryptMessage(value);
  }

}
