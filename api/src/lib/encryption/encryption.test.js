import { decrypt, encrypt } from 'src/lib/encryption/encryption'

describe('Encryption', () => {
  it('Should encrypt and decrypt data', () => {
    const testString = 'I want this data encrypted'

    const encrypted = encrypt(testString)
    expect(encrypted).not.toEqual(testString)

    expect(decrypt(encrypted)).toEqual(testString)
  })
})
