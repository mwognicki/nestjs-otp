[@ognicki/nestjs-otp](../README.md) / [Exports](../modules.md) / OtpService

# Class: OtpService

## Implements

- `OnModuleInit`

## Table of contents

### Constructors

- [constructor](OtpService.md#constructor)

### Properties

- [\_config](OtpService.md#_config)
- [logger](OtpService.md#logger)

### Accessors

- [config](OtpService.md#config)

### Methods

- [getTOTP](OtpService.md#gettotp)
- [onModuleInit](OtpService.md#onmoduleinit)
- [pair](OtpService.md#pair)
- [qrDataURL](OtpService.md#qrdataurl)
- [qrString](OtpService.md#qrstring)
- [secret](OtpService.md#secret)
- [setDefaultOpts](OtpService.md#setdefaultopts)
- [validateOpts](OtpService.md#validateopts)
- [verify](OtpService.md#verify)

## Constructors

### constructor

• **new OtpService**(`_config`): [`OtpService`](OtpService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_config` | [`IOtpModuleOptions`](../interfaces/IOtpModuleOptions.md) |

#### Returns

[`OtpService`](OtpService.md)

#### Defined in

[lib/otp.service.ts:25](https://github.com/mwognicki/nestjs-otp/blob/35d8f2c/lib/otp.service.ts#L25)

## Properties

### \_config

• `Private` **\_config**: [`IOtpModuleOptions`](../interfaces/IOtpModuleOptions.md)

#### Defined in

[lib/otp.service.ts:25](https://github.com/mwognicki/nestjs-otp/blob/35d8f2c/lib/otp.service.ts#L25)

___

### logger

• `Private` `Readonly` **logger**: `Logger`

#### Defined in

[lib/otp.service.ts:23](https://github.com/mwognicki/nestjs-otp/blob/35d8f2c/lib/otp.service.ts#L23)

## Accessors

### config

• `get` **config**(): `Required`\<[`IOtpModuleOptions`](../interfaces/IOtpModuleOptions.md)\>

#### Returns

`Required`\<[`IOtpModuleOptions`](../interfaces/IOtpModuleOptions.md)\>

#### Defined in

[lib/otp.service.ts:27](https://github.com/mwognicki/nestjs-otp/blob/35d8f2c/lib/otp.service.ts#L27)

## Methods

### getTOTP

▸ **getTOTP**(`opts`): `TOTP`

Generate a TOTP object with the given options.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `opts` | [`IOtpPairOpts`](../interfaces/IOtpPairOpts.md) | Options for generating the TOTP object. |

#### Returns

`TOTP`

The generated TOTP object.

#### Defined in

[lib/otp.service.ts:76](https://github.com/mwognicki/nestjs-otp/blob/35d8f2c/lib/otp.service.ts#L76)

___

### onModuleInit

▸ **onModuleInit**(): `void`

#### Returns

`void`

#### Implementation of

OnModuleInit.onModuleInit

#### Defined in

[lib/otp.service.ts:31](https://github.com/mwognicki/nestjs-otp/blob/35d8f2c/lib/otp.service.ts#L31)

___

### pair

▸ **pair**(`opts`): `Promise`\<`string`\>

Return a link for pairing with authenticator application.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `opts` | [`IOtpPairOpts`](../interfaces/IOtpPairOpts.md) | Options for generating the subscription. |

#### Returns

`Promise`\<`string`\>

Link for pairing with authenticator application.

#### Defined in

[lib/otp.service.ts:65](https://github.com/mwognicki/nestjs-otp/blob/35d8f2c/lib/otp.service.ts#L65)

___

### qrDataURL

▸ **qrDataURL**(`link`): `Promise`\<`string`\>

Generate a QR code as a data URL.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `link` | `string` | The link to encode in the QR code. |

#### Returns

`Promise`\<`string`\>

A promise that resolves to the data URL of the QR code.

#### Defined in

[lib/otp.service.ts:114](https://github.com/mwognicki/nestjs-otp/blob/35d8f2c/lib/otp.service.ts#L114)

___

### qrString

▸ **qrString**(`link`): `Promise`\<`string`\>

Generate a QR code as a string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `link` | `string` | The link to encode in the QR code. |

#### Returns

`Promise`\<`string`\>

A promise that resolves to the string representation of the QR code.

#### Defined in

[lib/otp.service.ts:131](https://github.com/mwognicki/nestjs-otp/blob/35d8f2c/lib/otp.service.ts#L131)

___

### secret

▸ **secret**(`length?`): `string`

Generate a random secret for the OTP.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `length` | `number` | `16` | The length of the secret, in characters. |

#### Returns

`string`

The generated secret.

#### Defined in

[lib/otp.service.ts:42](https://github.com/mwognicki/nestjs-otp/blob/35d8f2c/lib/otp.service.ts#L42)

___

### setDefaultOpts

▸ **setDefaultOpts**(): `void`

#### Returns

`void`

#### Defined in

[lib/otp.service.ts:191](https://github.com/mwognicki/nestjs-otp/blob/35d8f2c/lib/otp.service.ts#L191)

___

### validateOpts

▸ **validateOpts**(): `void`

#### Returns

`void`

#### Defined in

[lib/otp.service.ts:142](https://github.com/mwognicki/nestjs-otp/blob/35d8f2c/lib/otp.service.ts#L142)

___

### verify

▸ **verify**(`token`, `secret`, `shouldThrow?`): `Promise`\<`boolean`\>

Verify an OTP token against a secret.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `token` | `string` | `undefined` | The OTP token to verify. |
| `secret` | `string` | `undefined` | The secret used to verify the token. |
| `shouldThrow` | `boolean` | `true` | Whether to throw an exception if the token is invalid. |

#### Returns

`Promise`\<`boolean`\>

Whether the token is valid.

**`Throws`**

If the token is invalid and `shouldThrow` is true.

#### Defined in

[lib/otp.service.ts:91](https://github.com/mwognicki/nestjs-otp/blob/35d8f2c/lib/otp.service.ts#L91)
