/**
 * A constant that represents the name of the OTP configuration token.
 */
export const OTP_CONFIG_TOKEN = '__OTP_CONFIG_TOKEN__';

/**
 * The minimum number of secure digits required for an OTP.
 */
export const OTP_MIN_SECURE_DIGITS = 6;

/**
 * The minimum number of digits required for an OTP.
 */
export const OTP_MIN_DIGITS = 3;

/**
 * The minimum period (in seconds) required for an OTP.
 */
export const OTP_MIN_PERIOD = 10;

/**
 * The minimum secure period (in seconds) required for an OTP.
 */
export const OTP_MIN_SECURE_PERIOD = 30;

/**
 * The maximum secure period (in seconds) required for an OTP.
 */
export const OTP_MAX_SECURE_PERIOD = 120;

/**
 * The default header used for sending OTPs.
 */
export const OTP_DEFAULT_HEADER = 'X-One-Time-Password';

/**
 * The default secret length (for UTF-8 characters).
 */
export const OTP_DEFAULT_SECRET_LENGTH = 16;
