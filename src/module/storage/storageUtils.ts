import MemoryStorage from './memory';
import ServerStorage from './server';
import { Config } from '@/component/config';

class StorageUtils {
    /**
     * Accepts a Config object and tries to guess and return a Storage type
     *
     * @param config
     */
    public static createFromConfig(config: Config): ServerStorage | MemoryStorage {
        let storage: ServerStorage | MemoryStorage | null = null;

        if (config.options.data) {
            storage = new MemoryStorage(config.options.data, config.options.beforeDataLoad);
        }

        if (config.options.server) {
            storage = new ServerStorage(config.options.server, config.options.beforeDataLoad);
        }

        if (!storage) {
            throw new Error('Could not determine the storage type');
        }

        return storage;
    }
}

export default StorageUtils;
