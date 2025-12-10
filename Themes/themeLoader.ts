type ThemeLoader = () => Promise<unknown>;

const noopLoader: ThemeLoader = () => Promise.resolve();

const themeLoaders: ThemeLoader[] = [
  noopLoader,
  () => import(/* webpackChunkName: "theme-wuteng-blue" */ "./wuteng_blue.scss"),
  () => import(/* webpackChunkName: "theme-forgive-green" */ "./forgive_green.scss"),
  () => import(/* webpackChunkName: "theme-deep-dark-green" */ "./deep_dark_green.scss"),
  () => import(/* webpackChunkName: "theme-summer" */ "./summer.scss"),
  () => import(/* webpackChunkName: "theme-autumn-orange" */ "./autumn_orange.scss"),
  () => import(/* webpackChunkName: "theme-autumn-red" */ "./autumn_red.scss"),
  () => import(/* webpackChunkName: "theme-singleday-pink" */ "./singleday_pink.scss"),
  () => import(/* webpackChunkName: "theme-mid-autumn-dark" */ "./mid_autumn_dark.scss"),
  () => import(/* webpackChunkName: "theme-mid-autumn-light" */ "./mid_autumn_light.scss"),
  () => import(/* webpackChunkName: "theme-light-snow-dark" */ "./light_snow_dark.scss"),
  () => import(/* webpackChunkName: "theme-light-snow-light" */ "./light_snow_light.scss"),
  () => import(/* webpackChunkName: "theme-spring-festival-dark" */ "./spring_festival_dark.scss"),
  () => import(/* webpackChunkName: "theme-spring-festival-light" */ "./spring_festival_light.scss"),
  () => import(/* webpackChunkName: "theme-zhongchun" */ "./zhongchun.scss"),
  () => import(/* webpackChunkName: "theme-dragon-boat-festival" */ "./dragon_boat_festival.scss"),
  () => import(/* webpackChunkName: "theme-qingming" */ "./qingming.scss"),
  () => import(/* webpackChunkName: "theme-autumn-2022-dark" */ "./autumn_2022_dark.scss"),
  () => import(/* webpackChunkName: "theme-autumn-2022-light" */ "./autumn_2022_light.scss"),
  () => import(/* webpackChunkName: "theme-winter-2022-dark" */ "./winter_2022_dark.scss"),
  () => import(/* webpackChunkName: "theme-winter-2022-light" */ "./winter_2022_light.scss"),
  () => import(/* webpackChunkName: "theme-spring-2023-dark" */ "./spring_2023_dark.scss"),
  () => import(/* webpackChunkName: "theme-spring-2023-light" */ "./spring_2023_light.scss"),
  () => import(/* webpackChunkName: "theme-chongyang-dark" */ "./chongyang_dark.scss"),
  () => import(/* webpackChunkName: "theme-chongyang-light" */ "./chongyang_light.scss"),
  () => import(/* webpackChunkName: "theme-spring-festival-2025-dark" */ "./spring_festival_2025_dark.scss"),
  () => import(/* webpackChunkName: "theme-spring-festival-2025-light" */ "./spring_festival_2025_light.scss"),
];

const fallbackThemeIndex = themeLoaders.length - 1;

const normalizeThemeIndex = (index: number): number => {
  if (Number.isNaN(index) || index <= 0 || index >= themeLoaders.length) {
    return fallbackThemeIndex;
  }
  return index;
};

let currentThemeIndex = -1;
let pendingLoad: Promise<void> | null = null;

export const getThemeCount = (): number => themeLoaders.length;

export const loadThemeStyles = async (index: number): Promise<void> => {
  const normalizedIndex = normalizeThemeIndex(index);

  if (normalizedIndex === currentThemeIndex && !pendingLoad) {
    return;
  }

  const loader = themeLoaders[normalizedIndex] ?? themeLoaders[fallbackThemeIndex];
  const loadPromise = Promise.resolve(loader()).then(() => {
    currentThemeIndex = normalizedIndex;
  });

  pendingLoad = loadPromise.finally(() => {
    pendingLoad = null;
  });

  return loadPromise;
};

