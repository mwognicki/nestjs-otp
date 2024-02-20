[@ognicki/nestjs-otp](README.md) / Exports

# @ognicki/nestjs-otp

## Table of contents

### Classes

- [OtpGuard](classes/OtpGuard.md)
- [OtpModule](classes/OtpModule.md)
- [OtpService](classes/OtpService.md)

### Interfaces

- [IOtpModuleAsyncOptions](interfaces/IOtpModuleAsyncOptions.md)
- [IOtpModuleOptions](interfaces/IOtpModuleOptions.md)
- [IOtpPairOpts](interfaces/IOtpPairOpts.md)
- [IOtpSecretResolver](interfaces/IOtpSecretResolver.md)

### Type Aliases

- [TOtpSecretResolver](modules.md#totpsecretresolver)

## Type Aliases

### TOtpSecretResolver

Ƭ **TOtpSecretResolver**: [`IOtpSecretResolver`](interfaces/IOtpSecretResolver.md) \| (`request?`: `Request`) => `string` \| `Promise`\<`string`\>

#### Defined in

[lib/interfaces/otp.interface.ts:15](https://github.com/mwognicki/nestjs-otp/blob/eb7d539/lib/interfaces/otp.interface.ts#L15)
