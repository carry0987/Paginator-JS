import { ConfigContext } from '@/component/config';
import { InternalConfig } from '@/interface/internalConfig';
import { useContext } from 'preact/hooks';

export const useConfig = (): InternalConfig => {
    const context = useContext(ConfigContext);

    if (context === undefined) {
        throw new Error('useConfig must be used within a ConfigProvider');
    }

    return context.internal;
};
