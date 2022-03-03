import { RedwoodRecord } from '@redwoodjs/record'
import EncryptionMixin from 'src/models/mixins/EncryptionMixin'

export default class AppInstallation extends EncryptionMixin(
  RedwoodRecord,
  'botToken',
  'installationData.bot.token'
) {}
