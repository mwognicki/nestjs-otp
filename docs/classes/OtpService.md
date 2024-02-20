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

[lib/services/otp.service.ts:11](https://github.com/mwognicki/nestjs-otp/blob/f9a2fb7/lib/services/otp.service.ts#L11)

## Properties

### config

• `Private` **config**: `Required`\<[`IOtpModuleOptions`](../interfaces/IOtpModuleOptions.md)\>

#### Defined in

[lib/services/otp.service.ts:12](https://github.com/mwognicki/nestjs-otp/blob/f9a2fb7/lib/services/otp.service.ts#L12)

___

### logger

• `Private` `Readonly` **logger**: `Logger`

#### Defined in

[lib/services/otp.service.ts:9](https://github.com/mwognicki/nestjs-otp/blob/f9a2fb7/lib/services/otp.service.ts#L9)

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

[lib/services/otp.service.ts:55](https://github.com/mwognicki/nestjs-otp/blob/f9a2fb7/lib/services/otp.service.ts#L55)

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

[lib/services/otp.service.ts:44](https://github.com/mwognicki/nestjs-otp/blob/f9a2fb7/lib/services/otp.service.ts#L44)

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

[lib/services/otp.service.ts:68](https://github.com/mwognicki/nestjs-otp/blob/f9a2fb7/lib/services/otp.service.ts#L68)

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

[lib/services/otp.service.ts:85](https://github.com/mwognicki/nestjs-otp/blob/f9a2fb7/lib/services/otp.service.ts#L85)

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

[lib/services/otp.service.ts:21](https://github.com/mwognicki/nestjs-otp/blob/f9a2fb7/lib/services/otp.service.ts#L21)
