import { useStore } from '../module/hook/useStore';
import { useSelector } from '../module/hook/useSelector';
import { useConfig } from '../module/hook/useConfig';
import { useOption } from '../module/hook/useOption';
import { useTranslator } from '../module/hook/useTranslator';

class PluginAPI {
    useStore = useStore;
    useSelector = useSelector;
    useConfig = useConfig;
    useOption = useOption;
    useTranslator = useTranslator;
}

export const pluginAPI = new PluginAPI();
