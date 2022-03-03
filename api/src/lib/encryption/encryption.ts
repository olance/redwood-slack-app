import crypto from 'crypto'

export function encrypt(str: string): string {
  if (str == null) {
    return str
  }

  const salt = crypto.randomBytes(Number(process.env.CRYPTO_SALT_LEN))
  const iv = crypto.randomBytes(Number(process.env.CRYPTO_IV_LEN))
  const key = crypto.pbkdf2Sync(
    process.env.CRYPTO_KEY_PASSWORD,
    salt,
    Number(process.env.CRYPTO_KEY_ITERATIONS),
    Number(process.env.CRYPTO_KEY_LEN),
    process.env.CRYPTO_KEY_DIGEST_ALG
  )

  const cipher = crypto.createCipheriv(process.env.CRYPTO_ALG, key, iv)
  cipher.write(str)

  cipher.end()

  return Buffer.concat([salt, iv, cipher.read()]).toString('base64')
}

export function decrypt(str: string): string {
  if (str == null) {
    return str
  }

  const encrypted = Buffer.from(str, 'base64')

  const cipherPos =
    Number(process.env.CRYPTO_SALT_LEN) + Number(process.env.CRYPTO_IV_LEN)

  const salt = encrypted.slice(0, Number(process.env.CRYPTO_SALT_LEN))
  const iv = encrypted.slice(Number(process.env.CRYPTO_SALT_LEN), cipherPos)

  const key = crypto.pbkdf2Sync(
    process.env.CRYPTO_KEY_PASSWORD,
    salt,
    Number(process.env.CRYPTO_KEY_ITERATIONS),
    Number(process.env.CRYPTO_KEY_LEN),
    process.env.CRYPTO_KEY_DIGEST_ALG
  )

  const decipher = crypto.createDecipheriv(process.env.CRYPTO_ALG, key, iv)

  decipher.write(encrypted.slice(cipherPos))
  decipher.end()

  return decipher.read().toString()
}
