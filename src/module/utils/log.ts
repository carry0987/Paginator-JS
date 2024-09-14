/**
 * Centralized logging lib
 *
 * This class needs some improvements but so far it has been used to have a coherent way to log
 */
class Logger {
    private format(message: string, type: string): string {
        return `[Paginator] [${type.toUpperCase()}]: ${message}`;
    }

    public error(message: unknown, throwException: true): never;
    public error(message: unknown, throwException?: false): void;
    public error(message: unknown, throwException = false): void | never {
        const msg = this.format(message as string, 'error');

        if (throwException) {
            throw Error(msg);
        } else {
            console.error(msg);
        }
    }

    public warn(message: unknown): void {
        console.warn(this.format(message as string, 'warn'));
    }

    public info(message: unknown): void {
        console.info(this.format(message as string, 'info'));
    }
}

export default new Logger();
