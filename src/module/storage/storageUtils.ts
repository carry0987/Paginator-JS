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
        let storage = null;

        if (config.options.data) {
            storage = new MemoryStorage(config.options.data);
        }

        if (config.options.server) {
            storage = new ServerStorage(config.options.server);
        }

        if (!storage) {
            throw new Error('Could not determine the storage type');
        }

        return storage;
    }
}

export default StorageUtils;
