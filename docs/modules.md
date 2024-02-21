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

- [TLabelResolverFn](modules.md#tlabelresolverfn)
- [TOtpLabel](modules.md#totplabel)
- [TOtpSecretResolver](modules.md#totpsecretresolver)

## Type Aliases

### TLabelResolverFn

Ƭ **TLabelResolverFn**: (`request?`: `Request`) => `string` \| `Promise`\<`string`\>

#### Type declaration

▸ (`request?`): `string` \| `Promise`\<`string`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `request?` | `Request` |

##### Returns

`string` \| `Promise`\<`string`\>

#### Defined in

[lib/interfaces/otp.interface.ts:19](https://github.com/mwognicki/nestjs-otp/blob/019ed90/lib/interfaces/otp.interface.ts#L19)

___

### TOtpLabel

Ƭ **TOtpLabel**: `string` \| [`TLabelResolverFn`](modules.md#tlabelresolverfn)

#### Defined in

[lib/interfaces/otp.interface.ts:21](https://github.com/mwognicki/nestjs-otp/blob/019ed90/lib/interfaces/otp.interface.ts#L21)

___

### TOtpSecretResolver

Ƭ **TOtpSecretResolver**: [`IOtpSecretResolver`](interfaces/IOtpSecretResolver.md) \| (`request?`: `Request`) => `string` \| `Promise`\<`string`\>

#### Defined in

[lib/interfaces/otp.interface.ts:15](https://github.com/mwognicki/nestjs-otp/blob/019ed90/lib/interfaces/otp.interface.ts#L15)
