[@ognicki/nestjs-otp](../README.md) / [Exports](../modules.md) / OtpService

# Class: OtpService

## Table of contents

### Constructors

- [constructor](OtpService.md#constructor)

### Properties

- [\_config](OtpService.md#_config)

### Accessors

- [config](OtpService.md#config)

### Methods

- [getOTPHeaderName](OtpService.md#getotpheadername)
- [pair](OtpService.md#pair)
- [qrDataURL](OtpService.md#qrdataurl)
- [qrString](OtpService.md#qrstring)
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

[lib/otp.service.ts:9](https://github.com/mwognicki/nestjs-otp/blob/1d22df0/lib/otp.service.ts#L9)

## Properties

### \_config

• `Private` `Readonly` **\_config**: [`IOtpModuleOptions`](../interfaces/IOtpModuleOptions.md)

#### Defined in

[lib/otp.service.ts:10](https://github.com/mwognicki/nestjs-otp/blob/1d22df0/lib/otp.service.ts#L10)

## Accessors

### config

• `get` **config**(): [`IOtpModuleOptions`](../interfaces/IOtpModuleOptions.md)

#### Returns

[`IOtpModuleOptions`](../interfaces/IOtpModuleOptions.md)

#### Defined in

[lib/otp.service.ts:13](https://github.com/mwognicki/nestjs-otp/blob/1d22df0/lib/otp.service.ts#L13)

## Methods

### getOTPHeaderName

▸ **getOTPHeaderName**(): `string`

#### Returns

`string`

#### Defined in

[lib/otp.service.ts:90](https://github.com/mwognicki/nestjs-otp/blob/1d22df0/lib/otp.service.ts#L90)

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

[lib/otp.service.ts:22](https://github.com/mwognicki/nestjs-otp/blob/1d22df0/lib/otp.service.ts#L22)

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

[lib/otp.service.ts:62](https://github.com/mwognicki/nestjs-otp/blob/1d22df0/lib/otp.service.ts#L62)

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

[lib/otp.service.ts:79](https://github.com/mwognicki/nestjs-otp/blob/1d22df0/lib/otp.service.ts#L79)

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

[lib/otp.service.ts:38](https://github.com/mwognicki/nestjs-otp/blob/1d22df0/lib/otp.service.ts#L38)
