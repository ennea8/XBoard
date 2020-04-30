import { Model } from 'radiks'

export default class Message extends Model {
    static className = 'List';

    static schema = {
      title: String,

      projectId: {
        type: String,
        decrypted: true
      }
    }

    static defaults = {
    }
}
