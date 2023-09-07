import { API } from '@notify-me/shared/types';

declare global {
  interface Window {
    api: API;
  }
}
