[@ognicki/nestjs-otp](../README.md) / [Exports](../modules.md) / OtpService

# Class: OtpService

## Table of contents

### Constructors

- [constructor](OtpService.md#constructor)

### Properties

- [config](OtpService.md#config)
- [logger](OtpService.md#logger)

### Methods

- [getTOTP](OtpService.md#gettotp)
- [pair](OtpService.md#pair)
- [qrDataURL](OtpService.md#qrdataurl)
- [qrString](OtpService.md#qrstring)
- [resolveLabel](OtpService.md#resolvelabel)
- [secret](OtpService.md#secret)

## Constructors

### constructor

• **new OtpService**(`config`): [`OtpService`](OtpService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Required`\<[`IOtpModuleOptions`](../interfaces/IOtpModuleOptions.md)\> |

#### Returns

[`OtpService`](OtpService.md)

#### Defined in

[lib/services/otp.service.ts:12](https://github.com/mwognicki/nestjs-otp/blob/019ed90/lib/services/otp.service.ts#L12)

## Properties

### config

• `Private` **config**: `Required`\<[`IOtpModuleOptions`](../interfaces/IOtpModuleOptions.md)\>

#### Defined in

[lib/services/otp.service.ts:13](https://github.com/mwognicki/nestjs-otp/blob/019ed90/lib/services/otp.service.ts#L13)

___

### logger

• `Private` `Readonly` **logger**: `Logger`

#### Defined in

[lib/services/otp.service.ts:10](https://github.com/mwognicki/nestjs-otp/blob/019ed90/lib/services/otp.service.ts#L10)

## Methods

### getTOTP

▸ **getTOTP**(`opts`): `TOTP`

Generate a TOTP object with the given options.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `opts` | `Omit`\<[`IOtpPairOpts`](../interfaces/IOtpPairOpts.md), ``"label"``\> & \{ `label`: `string`  } | Options for generating the TOTP object. |

#### Returns

`TOTP`

The generated TOTP object.

#### Defined in

[lib/services/otp.service.ts:72](https://github.com/mwognicki/nestjs-otp/blob/019ed90/lib/services/otp.service.ts#L72)

___

### pair

▸ **pair**(`opts`, `request?`): `Promise`\<`string`\>

Return a link for pairing with authenticator application.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `opts` | [`IOtpPairOpts`](../interfaces/IOtpPairOpts.md) | Options for generating the subscription. |
| `request?` | `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\> |  |

#### Returns

`Promise`\<`string`\>

Link for pairing with authenticator application.

#### Defined in

[lib/services/otp.service.ts:54](https://github.com/mwognicki/nestjs-otp/blob/019ed90/lib/services/otp.service.ts#L54)

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

[lib/services/otp.service.ts:86](https://github.com/mwognicki/nestjs-otp/blob/019ed90/lib/services/otp.service.ts#L86)

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

[lib/services/otp.service.ts:103](https://github.com/mwognicki/nestjs-otp/blob/019ed90/lib/services/otp.service.ts#L103)

___

### resolveLabel

▸ **resolveLabel**(`request`): `Promise`\<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\> |

#### Returns

`Promise`\<`string`\>

#### Defined in

[lib/services/otp.service.ts:40](https://github.com/mwognicki/nestjs-otp/blob/019ed90/lib/services/otp.service.ts#L40)

___

### secret

▸ **secret**(`length?`): `string`

Generate a random secret for the OTP.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `length` | `number` | `OTP_DEFAULT_SECRET_LENGTH` | The length of the secret, in characters. |

#### Returns

`string`

The generated secret.

#### Defined in

[lib/services/otp.service.ts:22](https://github.com/mwognicki/nestjs-otp/blob/019ed90/lib/services/otp.service.ts#L22)
