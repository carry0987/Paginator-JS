import { Options } from '@/interface/options';
import { ConfigContext } from '@/component/config';
import { useContext } from 'preact/hooks';

export const useOption = (): Options => {
    const context = useContext(ConfigContext);

    if (context === undefined) {
        throw new Error('useOption must be used within a ConfigProvider');
    }

    return context.options;
};
