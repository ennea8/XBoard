import { Model } from 'radiks'

export default class Message extends Model {
    static className = 'Card';

    static schema = {
      title: String,
      description: String,
      status: String,
      priority: String,

      projectId: {
        type: String,
        decrypted: true
      },
      ListId: {
        type: String,
        decrypted: true
      },
      content: String

    }

    static defaults = {
    }
}
