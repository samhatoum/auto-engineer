import type { CommandProcessor, EventStore, MessageHandlerResult } from '@event-driven-io/emmett';
import { handle } from './handle';
import type { NotifyHost } from './commands';

export function register(messageBus: CommandProcessor, eventStore: EventStore) {
  messageBus.handle<NotifyHost>(async (command: NotifyHost): Promise<MessageHandlerResult> => {
    try {
      await handle(eventStore, command);
      return;
    } catch (error) {
      return {
        type: 'SKIP',
        reason: `Failed with error: ${error instanceof Error ? error.message : String(error)}`,
      };
    }
  }, 'NotifyHost');
}
