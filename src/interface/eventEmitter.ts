import { EventArgs } from '../type/types';

/**
 * Example:
 *
 * export interface BaseEvents<P, S> {
 *   SET_STATE: (component: BaseComponent<P, S>, state: S) => void;
 * }
 */
export interface EventEmitter<EventTypes> {
    addListener<EventName extends keyof EventTypes>(
        event: EventName,
        listener: (...args: EventArgs<EventTypes[EventName]>) => void
    ): EventEmitter<EventTypes>;

    on<EventName extends keyof EventTypes>(
        event: EventName,
        listener: (...args: EventArgs<EventTypes[EventName]>) => void
    ): EventEmitter<EventTypes>;

    off<EventName extends keyof EventTypes>(
        event: EventName,
        listener: (...args: EventArgs<EventTypes[EventName]>) => void
    ): EventEmitter<EventTypes>;

    emit<EventName extends keyof EventTypes>(
        event: EventName,
        ...args: EventArgs<EventTypes[EventName]>
    ): boolean;
}
