import { registerTimberPluginKit } from './pluginKit';

// Registered as a separate CP asset ahead of the app entry so custom-element upgrades
// are page-level work rather than per-mount init work.
await registerTimberPluginKit();
