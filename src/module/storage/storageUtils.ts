import { Config } from '../../component/config';
import MemoryStorage from './memory';
import Storage from './storage';
import ServerStorage from './server';

class StorageUtils {
    /**
     * Accepts a Config object and tries to guess and return a Storage type
     *
     * @param config
     */
    public static createFromConfig(config: Config): Storage<any> {
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
