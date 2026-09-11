export type YMapsMap = {
  geoObjects: { add: (object: unknown) => void };
  behaviors: { disable: (name: string | string[]) => void };
  destroy: () => void;
};

export type YMapsPlacemark = {
  events: { add: (type: string, callback: () => void) => void };
  options: { set: (key: string, value: unknown) => void };
};

export type YMapsApi = {
  ready: (callback?: () => void) => void;
  Map: new (
    container: HTMLElement,
    state: { center: number[]; zoom: number; controls: string[] },
    options?: {
      suppressMapOpenBlock?: boolean;
      yandexMapDisablePoiInteractivity?: boolean;
    },
  ) => YMapsMap;
  Placemark: new (
    geometry: number[],
    properties?: Record<string, unknown>,
    options?: Record<string, unknown>,
  ) => YMapsPlacemark;
};

declare global {
  interface Window {
    ymaps?: YMapsApi;
  }
}

let loading: Promise<YMapsApi> | null = null;

export function loadYmaps(): Promise<YMapsApi> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("ymaps is browser-only"));
  }

  if (window.ymaps) {
    return new Promise((resolve) => {
      window.ymaps!.ready(() => resolve(window.ymaps!));
    });
  }

  if (loading) return loading;

  loading = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    const key = process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY;
    const query = new URLSearchParams({ lang: "ru_RU" });
    if (key) query.set("apikey", key);
    script.src = `https://api-maps.yandex.ru/2.1/?${query.toString()}`;
    script.async = true;
    script.onload = () => {
      if (!window.ymaps) {
        reject(new Error("Yandex Maps failed to initialize"));
        return;
      }
      window.ymaps.ready(() => resolve(window.ymaps!));
    };
    script.onerror = () => reject(new Error("Yandex Maps failed to load"));
    document.head.appendChild(script);
  });

  return loading;
}

export function yandexWidgetUrl(
  items: readonly { coords: readonly [number, number] }[],
  center: readonly [number, number],
  zoom: number,
) {
  const points = items
    .map((item) => `${item.coords[1]},${item.coords[0]},pm2dgl`)
    .join("~");
  return `https://yandex.ru/map-widget/v1/?ll=${center[1]},${center[0]}&z=${zoom}&l=map&pt=${points}`;
}
