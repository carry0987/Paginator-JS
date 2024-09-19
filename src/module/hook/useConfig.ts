import { Options } from '@/interface/options';
import { ConfigContext } from '@/component/config';
import { useContext } from 'preact/hooks';

export const useConfig = (): Options => {
    const context = useContext(ConfigContext);

    if (context === undefined) {
        throw new Error('useConfig must be used within a ConfigProvider');
    }

    return context;
};
