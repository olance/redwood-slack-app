import { RedwoodRecord } from '@redwoodjs/record'

export class BaseModel extends RedwoodRecord {
  static async upsert(attributes, where, options = {}) {
    const record = this.build(attributes)

    return await record.upsert(where, options)
  }

  async upsert(where, options = {}) {
    const attributes = JSON.parse(JSON.stringify(this.attributes))

    try {
      this.attributes = await this.constructor.accessor.upsert({
        where,
        create: attributes,
        update: attributes,
      })
    } catch (e) {
      this._saveErrorHandler(e, options.throw)
      return false
    }

    return this
  }
}
