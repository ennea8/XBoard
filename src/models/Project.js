import { Model } from 'radiks'

export default class Message extends Model {
  static className = 'Project';

  static schema = {
    title: String,
    description: String,
    status: String,
    currentGroupId: { // 预留，可以更改group从而变更密钥
      type: String,
      decrypted: true
    },
    groups: [String] // 记录关联的group
  }

  static defaults = {
  }
}
