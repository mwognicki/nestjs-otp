[@ognicki/nestjs-otp](../README.md) / [Exports](../modules.md) / OtpModule

# Class: OtpModule

## Table of contents

### Constructors

- [constructor](OtpModule.md#constructor)

### Methods

- [register](OtpModule.md#register)
- [registerAsync](OtpModule.md#registerasync)
- [resolveConfig](OtpModule.md#resolveconfig)
- [setDefaultOpts](OtpModule.md#setdefaultopts)
- [validateOpts](OtpModule.md#validateopts)

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

[lib/otp.module.ts:20](https://github.com/mwognicki/nestjs-otp/blob/77280bc/lib/otp.module.ts#L20)

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

[lib/otp.module.ts:38](https://github.com/mwognicki/nestjs-otp/blob/77280bc/lib/otp.module.ts#L38)

___

### resolveConfig

▸ **resolveConfig**(`config`): `Required`\<[`IOtpModuleOptions`](../interfaces/IOtpModuleOptions.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`IOtpModuleOptions`](../interfaces/IOtpModuleOptions.md) |

#### Returns

`Required`\<[`IOtpModuleOptions`](../interfaces/IOtpModuleOptions.md)\>

#### Defined in

[lib/otp.module.ts:60](https://github.com/mwognicki/nestjs-otp/blob/77280bc/lib/otp.module.ts#L60)

___

### setDefaultOpts

▸ **setDefaultOpts**(`config`): `Required`\<[`IOtpModuleOptions`](../interfaces/IOtpModuleOptions.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`IOtpModuleOptions`](../interfaces/IOtpModuleOptions.md) |

#### Returns

`Required`\<[`IOtpModuleOptions`](../interfaces/IOtpModuleOptions.md)\>

#### Defined in

[lib/otp.module.ts:113](https://github.com/mwognicki/nestjs-otp/blob/77280bc/lib/otp.module.ts#L113)

___

### validateOpts

▸ **validateOpts**(`config`): [`IOtpModuleOptions`](../interfaces/IOtpModuleOptions.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`IOtpModuleOptions`](../interfaces/IOtpModuleOptions.md) |

#### Returns

[`IOtpModuleOptions`](../interfaces/IOtpModuleOptions.md)

#### Defined in

[lib/otp.module.ts:66](https://github.com/mwognicki/nestjs-otp/blob/77280bc/lib/otp.module.ts#L66)
