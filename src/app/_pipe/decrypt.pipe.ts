import { Pipe, PipeTransform } from '@angular/core';
import { CryptoService } from '../_services/crypto.service';
import { Message } from '../_models/Message';

@Pipe({
  name: 'decrypt'
})
export class DecryptPipe implements PipeTransform {
  constructor(private cryptoService: CryptoService) {
  }

  transform(value: Message, ...args: any[]): any {
    if (value.encrypted==true)
      return this.cryptoService.decryptMessage(value.content);
    else
      return value.content
  }

}
