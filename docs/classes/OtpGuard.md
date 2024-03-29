[@ognicki/nestjs-otp](../README.md) / [Exports](../modules.md) / OtpGuard

# Class: OtpGuard

A guard that verifies a one-time password (OTP) sent with a request.

## Implements

- `CanActivate`

## Table of contents

### Constructors

- [constructor](OtpGuard.md#constructor)

### Properties

- [config](OtpGuard.md#config)
- [otpService](OtpGuard.md#otpservice)

### Methods

- [canActivate](OtpGuard.md#canactivate)
- [extractOtpToken](OtpGuard.md#extractotptoken)
- [getRequest](OtpGuard.md#getrequest)
- [getSecret](OtpGuard.md#getsecret)
- [validateOTP](OtpGuard.md#validateotp)
- [validateSecret](OtpGuard.md#validatesecret)
- [verify](OtpGuard.md#verify)
- [resolveSecretResolver](OtpGuard.md#resolvesecretresolver)

## Constructors

### constructor

• **new OtpGuard**(): [`OtpGuard`](OtpGuard.md)

#### Returns

[`OtpGuard`](OtpGuard.md)

## Properties

### config

• `Protected` `Readonly` **config**: `Required`\<[`IOtpModuleOptions`](../interfaces/IOtpModuleOptions.md)\>

#### Defined in

[lib/guards/otp.guard.ts:22](https://github.com/mwognicki/nestjs-otp/blob/019ed90/lib/guards/otp.guard.ts#L22)

___

### otpService

• `Private` `Readonly` **otpService**: [`OtpService`](OtpService.md)

#### Defined in

[lib/guards/otp.guard.ts:24](https://github.com/mwognicki/nestjs-otp/blob/019ed90/lib/guards/otp.guard.ts#L24)

## Methods

### canActivate

▸ **canActivate**(`context`): `Promise`\<`boolean`\>

Verifies the OTP and returns a boolean indicating whether it is valid.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context` | `ExecutionContext` | The execution context. |

#### Returns

`Promise`\<`boolean`\>

#### Implementation of

CanActivate.canActivate

#### Defined in

[lib/guards/otp.guard.ts:49](https://github.com/mwognicki/nestjs-otp/blob/019ed90/lib/guards/otp.guard.ts#L49)

___

### extractOtpToken

▸ **extractOtpToken**(`request`): `Promise`\<`string`\>

Gets the OTP from the request or OTP token resolver if configured.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\> | The request. |

#### Returns

`Promise`\<`string`\>

The OTP.

#### Defined in

[lib/guards/otp.guard.ts:89](https://github.com/mwognicki/nestjs-otp/blob/019ed90/lib/guards/otp.guard.ts#L89)

___

### getRequest

▸ **getRequest**(`context`): `any`

Gets the request from the execution context or request resolver if configured.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context` | `ExecutionContext` | The execution context. |

#### Returns

`any`

The request.

#### Defined in

[lib/guards/otp.guard.ts:76](https://github.com/mwognicki/nestjs-otp/blob/019ed90/lib/guards/otp.guard.ts#L76)

___

### getSecret

▸ **getSecret**(`request`): `Promise`\<`string`\>

Gets the secret used for OTP verification.

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\> |

#### Returns

`Promise`\<`string`\>

The secret.

#### Defined in

[lib/guards/otp.guard.ts:66](https://github.com/mwognicki/nestjs-otp/blob/019ed90/lib/guards/otp.guard.ts#L66)

___

### validateOTP

▸ **validateOTP**(`otp?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `otp?` | `string` |

#### Returns

`void`

#### Defined in

[lib/guards/otp.guard.ts:141](https://github.com/mwognicki/nestjs-otp/blob/019ed90/lib/guards/otp.guard.ts#L141)

___

### validateSecret

▸ **validateSecret**(`secret?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `secret?` | `string` |

#### Returns

`void`

#### Defined in

[lib/guards/otp.guard.ts:135](https://github.com/mwognicki/nestjs-otp/blob/019ed90/lib/guards/otp.guard.ts#L135)

___

### verify

▸ **verify**(`token`, `secret`, `request`, `shouldThrow?`): `Promise`\<`boolean`\>

Verify an OTP token against a secret.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `token` | `string` | `undefined` | The OTP token to verify. |
| `secret` | `string` | `undefined` | The secret used to verify the token. |
| `request` | `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\> | `undefined` |  |
| `shouldThrow` | `boolean` | `true` | Whether to throw an exception if the token is invalid. |

#### Returns

`Promise`\<`boolean`\>

Whether the token is valid.

**`Throws`**

If the token is invalid and `shouldThrow` is true.

#### Defined in

[lib/guards/otp.guard.ts:115](https://github.com/mwognicki/nestjs-otp/blob/019ed90/lib/guards/otp.guard.ts#L115)

___

### resolveSecretResolver

▸ **resolveSecretResolver**(`options`): (`request?`: `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\>) => `string` \| `Promise`\<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Pick`\<[`IOtpModuleOptions`](../interfaces/IOtpModuleOptions.md), ``"secretResolver"``\> |

#### Returns

`fn`

▸ (`request?`): `string` \| `Promise`\<`string`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `request?` | `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\> |

##### Returns

`string` \| `Promise`\<`string`\>

#### Defined in

[lib/guards/otp.guard.ts:26](https://github.com/mwognicki/nestjs-otp/blob/019ed90/lib/guards/otp.guard.ts#L26)
