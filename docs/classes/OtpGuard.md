[@ognicki/nestjs-otp](../README.md) / [Exports](../modules.md) / OtpGuard

# Class: OtpGuard

A guard that verifies a one-time password (OTP) sent with a request.

## Implements

- `CanActivate`

## Table of contents

### Constructors

- [constructor](OtpGuard.md#constructor)

### Properties

- [otpService](OtpGuard.md#otpservice)

### Methods

- [canActivate](OtpGuard.md#canactivate)
- [extractOtpToken](OtpGuard.md#extractotptoken)
- [getRequest](OtpGuard.md#getrequest)
- [getSecret](OtpGuard.md#getsecret)
- [validateOTP](OtpGuard.md#validateotp)
- [validateSecret](OtpGuard.md#validatesecret)
- [resolveSecretResolver](OtpGuard.md#resolvesecretresolver)

## Constructors

### constructor

• **new OtpGuard**(`otpService`): [`OtpGuard`](OtpGuard.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `otpService` | [`OtpService`](OtpService.md) |

#### Returns

[`OtpGuard`](OtpGuard.md)

#### Defined in

[lib/guards/otp.guard.ts:14](https://github.com/mwognicki/nestjs-otp/blob/e6a60e8/lib/guards/otp.guard.ts#L14)

## Properties

### otpService

• `Private` `Readonly` **otpService**: [`OtpService`](OtpService.md)

#### Defined in

[lib/guards/otp.guard.ts:14](https://github.com/mwognicki/nestjs-otp/blob/e6a60e8/lib/guards/otp.guard.ts#L14)

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

[lib/guards/otp.guard.ts:39](https://github.com/mwognicki/nestjs-otp/blob/e6a60e8/lib/guards/otp.guard.ts#L39)

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

[lib/guards/otp.guard.ts:76](https://github.com/mwognicki/nestjs-otp/blob/e6a60e8/lib/guards/otp.guard.ts#L76)

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

[lib/guards/otp.guard.ts:64](https://github.com/mwognicki/nestjs-otp/blob/e6a60e8/lib/guards/otp.guard.ts#L64)

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

[lib/guards/otp.guard.ts:55](https://github.com/mwognicki/nestjs-otp/blob/e6a60e8/lib/guards/otp.guard.ts#L55)

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

[lib/guards/otp.guard.ts:98](https://github.com/mwognicki/nestjs-otp/blob/e6a60e8/lib/guards/otp.guard.ts#L98)

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

[lib/guards/otp.guard.ts:92](https://github.com/mwognicki/nestjs-otp/blob/e6a60e8/lib/guards/otp.guard.ts#L92)

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

[lib/guards/otp.guard.ts:16](https://github.com/mwognicki/nestjs-otp/blob/e6a60e8/lib/guards/otp.guard.ts#L16)
