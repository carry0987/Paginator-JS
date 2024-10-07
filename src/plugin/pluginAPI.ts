import { useStore } from '@/module/hook/useStore';
import { useSelector } from '@/module/hook/useSelector';
import { useConfig } from '@/module/hook/useConfig';
import { useOption } from '@/module/hook/useOption';
import { useTranslator } from '@/module/hook/useTranslator';
import { classJoin, className } from '@/module/utils/className';

// Preact
import { useSignal } from '@preact/signals';
import { useEffect } from 'preact/hooks';

class PluginAPI {
    useStore = useStore;
    useSelector = useSelector;
    useConfig = useConfig;
    useOption = useOption;
    useTranslator = useTranslator;
    classJoin = classJoin;
    className = className;
    // Preact
    useSignal = useSignal;
    useEffect = useEffect;
}

export const pluginAPI = new PluginAPI();
