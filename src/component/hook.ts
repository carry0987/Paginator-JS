import { useStore } from '@/module/hook/useStore';
import { useSelector } from '@/module/hook/useSelector';
import { useConfig } from '@/module/hook/useConfig';
import { useOption } from '@/module/hook/useOption';
import { useTranslator } from '@/module/hook/useTranslator';

class Hook {
    static useStore: typeof useStore = useStore;
    static useSelector: typeof useSelector = useSelector;
    static useConfig: typeof useConfig = useConfig;
    static useOption: typeof useOption = useOption;
    static useTranslator: typeof useTranslator = useTranslator;
}

export default Hook;
