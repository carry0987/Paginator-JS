import { useStore } from '@/module/hook/useStore';
import { useSelector } from '@/module/hook/useSelector';
import { useConfig } from '@/module/hook/useConfig';
import { useOption } from '@/module/hook/useOption';
import { useTranslator } from '@/module/hook/useTranslator';

// Preact
import { useEffect, useCallback, useState, useRef } from 'preact/hooks';

class PluginAPI {
    public useStore = useStore;
    public useSelector = useSelector;
    public useConfig = useConfig;
    public useOption = useOption;
    public useTranslator = useTranslator;

    // Preact
    public useEffect = useEffect;
    public useCallback = useCallback;
    public useState = useState;
    public useRef = useRef;
}

export const pluginAPI = new PluginAPI();
