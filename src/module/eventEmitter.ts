import { EventArgs } from '../type/types';

export class EventEmitter<EventTypes> {
    // Initialize callbacks with an empty object
    private callbacks: { [event: string]: ((...args: any[]) => void)[] } = {};

    private init(event?: string): void {
        if (!this.callbacks) {
            this.callbacks = {};
        }

        if (event && !this.callbacks[event]) {
            this.callbacks[event] = [];
        }
    }

    listeners(): { [event: string]: ((...args: any[]) => void)[] } {
        return this.callbacks;
    }

    on<EventName extends keyof EventTypes>(
        event: EventName,
        listener: (...args: EventArgs<EventTypes[EventName]>) => void
    ): EventEmitter<EventTypes> {
        this.init(event as string);
        this.callbacks[event as string].push(listener);

        return this;
    }

    off<EventName extends keyof EventTypes>(
        event: EventName,
        listener: (...args: EventArgs<EventTypes[EventName]>) => void
    ): EventEmitter<EventTypes> {
        const eventName = event as string;

        this.init();

        if (!this.callbacks[eventName] || this.callbacks[eventName].length === 0) {
            // There is no callbacks with this key
            return this;
        }

        this.callbacks[eventName] = this.callbacks[eventName].filter(
            (value) => value != listener
        );

        return this;
    }

    emit<EventName extends keyof EventTypes>(
        event: EventName,
        ...args: EventArgs<EventTypes[EventName]>
    ): boolean {
        const eventName = event as string;

        // Initialize the event
        this.init(eventName);

        // If there are callbacks for this event
        if (this.callbacks[eventName].length > 0) {
            this.callbacks[eventName].forEach((value) => value(...args));
            return true;
        }

        return false;
    }
}
