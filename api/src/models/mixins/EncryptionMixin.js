import { decrypt, encrypt } from 'src/lib/encryption/encryption'

function transformFields(transformFn, obj, fields) {
  for (let field of fields) {
    const path = field.split('.')
    const parents = path.slice(0, path.length - 1)
    const leaf = path[path.length - 1]

    while (parents.length > 0) {
      obj = obj[parents.shift()]
    }

    obj[leaf] = transformFn(obj[leaf])
  }
}

const encryptFields = transformFields.bind(null, encrypt)
const decryptFields = transformFields.bind(null, decrypt)

export default (Base, ...fieldsToEncrypt) =>
  class extends Base {
    static async create(attributes, options = {}) {
      const fields = options.fieldsToEncrypt || fieldsToEncrypt

      encryptFields(attributes, fields)

      return super.create(attributes, options)
    }

    static async upsert(attributes, where, options = {}) {
      const fields = options.fieldsToEncrypt || fieldsToEncrypt

      encryptFields(attributes, fields)

      return super.upsert(attributes, where, options)
    }

    _createPropertyForAttribute(name) {
      const fieldsRoots = []
      const nestedPaths = {}

      for (let field of fieldsToEncrypt) {
        const path = field.split('.')

        fieldsRoots.push(path[0])

        if (path.length > 1) {
          nestedPaths[path[0]] = nestedPaths[path[0]] || []
          nestedPaths[path[0]].push(path.slice(1).join('.'))
        }
      }

      if (!fieldsRoots.includes(name)) {
        super._createPropertyForAttribute(name)
      } else {
        Object.defineProperty(this, name, {
          get() {
            if (name in nestedPaths) {
              const value = JSON.parse(
                JSON.stringify(this._attributeGetter(name))
              )
              decryptFields(value, nestedPaths[name])
              return value
            } else {
              return decrypt(this._attributeGetter(name))
            }
          },
          set(value) {
            if (name in nestedPaths) {
              encryptFields(value, nestedPaths[name])
              this._attributeSetter(name, value)
            } else {
              this._attributeSetter(name, encrypt(value))
            }
          },
          enumerable: true,
        })
      }
    }

    encrypt(fields = null) {
      if (fields == null) {
        fields = fieldsToEncrypt
      }

      encryptFields(this.attributes, fields)

      return this
    }
  }
