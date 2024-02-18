[@ognicki/nestjs-otp](../README.md) / [Exports](../modules.md) / OtpModule

# Class: OtpModule

## Table of contents

### Constructors

- [constructor](OtpModule.md#constructor)

### Methods

- [register](OtpModule.md#register)
- [registerAsync](OtpModule.md#registerasync)

## Constructors

### constructor

• **new OtpModule**(): [`OtpModule`](OtpModule.md)

#### Returns

[`OtpModule`](OtpModule.md)

## Methods

### register

▸ **register**(`opts`): `DynamicModule`

Registers the OTP module.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `opts` | [`IOtpModuleOptions`](../interfaces/IOtpModuleOptions.md) | The options to use when registering the module. |

#### Returns

`DynamicModule`

#### Defined in

[lib/otp.module.ts:12](https://github.com/mwognicki/nestjs-otp/blob/d42d984/lib/otp.module.ts#L12)

___

### registerAsync

▸ **registerAsync**(`options`): `DynamicModule`

Registers the OTP module asynchronously.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`IOtpModuleAsyncOptions`](../interfaces/IOtpModuleAsyncOptions.md) | The options to use when registering the module. |

#### Returns

`DynamicModule`

#### Defined in

[lib/otp.module.ts:30](https://github.com/mwognicki/nestjs-otp/blob/d42d984/lib/otp.module.ts#L30)
