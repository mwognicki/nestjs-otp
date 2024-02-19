import { UnauthorizedException } from '@nestjs/common';

export class NoSecretException extends UnauthorizedException {
  constructor() {
    super('No secret provided');
  }
}
