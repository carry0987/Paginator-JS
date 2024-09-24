import { Config, ConfigContext } from '@/component/config';
import { useContext } from 'preact/hooks';

export const useConfig = (): Config => {
    const context = useContext(ConfigContext);

    if (context === undefined) {
        throw new Error('useConfig must be used within a ConfigProvider');
    }

    return context;
};
