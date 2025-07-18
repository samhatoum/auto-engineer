export interface Integration<T extends string = string> {
  readonly __brand: 'Integration';
  readonly type: T;
  readonly name: string;
}

export const createIntegration = <T extends string>(type: T, name: string): Integration<T> =>
  ({
    __brand: 'Integration' as const,
    type,
    name,
  }) as Integration<T>;

// Data flow types
export interface MessageTarget {
  type: 'Event' | 'Command' | 'State';
  name: string;
  fields?: Record<string, unknown>;
}

export interface StreamDestination {
  type: 'stream';
  pattern: string;
}

export interface IntegrationDestination {
  type: 'integration';
  systems: string[];
}

export interface DatabaseDestination {
  type: 'database';
  collection: string;
}

export interface TopicDestination {
  type: 'topic';
  name: string;
}

export interface Destination {
  type: string;
  pattern?: string;
  systems?: string[];
  collection?: string;
  name?: string;
}

// Helper functions to create destinations
export const createStreamDestination = (pattern: string): StreamDestination => ({ type: 'stream', pattern });
export const createIntegrationDestination = (systems: string[]): IntegrationDestination => ({
  type: 'integration',
  systems,
});
export const createDatabaseDestination = (collection: string): DatabaseDestination => ({
  type: 'database',
  collection,
});
export const createTopicDestination = (name: string): TopicDestination => ({ type: 'topic', name });

export interface ProjectionOrigin {
  type: 'projection';
  name: string;
}

export interface ReadModelOrigin {
  type: 'readModel';
  name: string;
}

export interface DatabaseOrigin {
  type: 'database';
  collection: string;
  query?: Record<string, unknown>;
}

export interface ApiOrigin {
  type: 'api';
  endpoint: string;
  method?: string;
}

export interface IntegrationOrigin {
  type: 'integration';
  systems: string[];
}

export interface Origin {
  type: string;
  name?: string;
  collection?: string;
  query?: Record<string, unknown>;
  endpoint?: string;
  method?: string;
  systems?: string[];
}

// Helper functions to create origins
export const createProjectionOrigin = (name: string): ProjectionOrigin => ({ type: 'projection', name });
export const createReadModelOrigin = (name: string): ReadModelOrigin => ({ type: 'readModel', name });
export const createDatabaseOrigin = (collection: string, query?: Record<string, unknown>): DatabaseOrigin => ({
  type: 'database',
  collection,
  query,
});
export const createApiOrigin = (endpoint: string, method?: string): ApiOrigin => ({ type: 'api', endpoint, method });
export const createIntegrationOrigin = (systems: string[]): IntegrationOrigin => ({ type: 'integration', systems });

export interface DataSink {
  target: MessageTarget;
  destination: Destination;
  transform?: string;
}

export interface DataSource {
  target: MessageTarget;
  origin: Origin;
  transform?: string;
}

// Branded types for type safety in arrays
export interface DataSinkItem extends DataSink {
  readonly __type: 'sink';
}

export interface DataSourceItem extends DataSource {
  readonly __type: 'source';
}

export interface DataItem {
  __type: 'sink' | 'source';
}

type DefaultRecord = Record<string, unknown>;

export type State<
  StateType extends string = string,
  StateData extends DefaultRecord = DefaultRecord,
  EventMetaData extends DefaultRecord | undefined = undefined,
> = Readonly<
  EventMetaData extends undefined
    ? {
        type: StateType;
        data: StateData;
      }
    : {
        type: StateType;
        data: StateData;
        metadata: EventMetaData;
      }
> & {
  readonly kind?: 'State';
};
