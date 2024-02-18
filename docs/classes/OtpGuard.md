[@ognicki/nestjs-otp](../README.md) / [Exports](../modules.md) / OtpGuard

# Class: OtpGuard

A guard that verifies an one-time password (OTP) sent with a request.

## Implements

- `CanActivate`

## Table of contents

### Constructors

- [constructor](OtpGuard.md#constructor)

### Properties

- [otpService](OtpGuard.md#otpservice)

### Methods

- [canActivate](OtpGuard.md#canactivate)
- [getOTP](OtpGuard.md#getotp)
- [getRequest](OtpGuard.md#getrequest)
- [getSecret](OtpGuard.md#getsecret)

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

[lib/guards/otp.guard.ts:15](https://github.com/mwognicki/nestjs-otp/blob/3c1985d/lib/guards/otp.guard.ts#L15)

## Properties

### otpService

• `Private` `Readonly` **otpService**: [`OtpService`](OtpService.md)

#### Defined in

[lib/guards/otp.guard.ts:15](https://github.com/mwognicki/nestjs-otp/blob/3c1985d/lib/guards/otp.guard.ts#L15)

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

[lib/guards/otp.guard.ts:21](https://github.com/mwognicki/nestjs-otp/blob/3c1985d/lib/guards/otp.guard.ts#L21)

___

### getOTP

▸ **getOTP**(`request`): `Promise`\<`string`\>

Gets the OTP from the request.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | `Request` | The request. |

#### Returns

`Promise`\<`string`\>

The OTP.

#### Defined in

[lib/guards/otp.guard.ts:57](https://github.com/mwognicki/nestjs-otp/blob/3c1985d/lib/guards/otp.guard.ts#L57)

___

### getRequest

▸ **getRequest**(`context`): `any`

Gets the request from the execution context.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context` | `ExecutionContext` | The execution context. |

#### Returns

`any`

The request.

#### Defined in

[lib/guards/otp.guard.ts:45](https://github.com/mwognicki/nestjs-otp/blob/3c1985d/lib/guards/otp.guard.ts#L45)

___

### getSecret

▸ **getSecret**(): `Promise`\<`string`\>

Gets the secret used for OTP verification.

#### Returns

`Promise`\<`string`\>

The secret.

#### Defined in

[lib/guards/otp.guard.ts:33](https://github.com/mwognicki/nestjs-otp/blob/3c1985d/lib/guards/otp.guard.ts#L33)
