import { ThemeService, getThemeService } from './theme.service.js';

// Mock window and document for jsdom environment
const mockMatchMedia = jest.fn((query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
}));

const createMockLocalStorage = () => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    _reset: () => {
      store = {};
    },
  };
};

let mockLocalStorage = createMockLocalStorage();

describe('ThemeService', () => {
  let themeService: ThemeService;

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Reset localStorage mock
    mockLocalStorage = createMockLocalStorage();
    
    // Mock window.matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: mockMatchMedia,
    });

    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      writable: true,
      value: mockLocalStorage,
    });

    // Reset document.documentElement
    document.documentElement.classList.remove('dark');
    
    themeService = new ThemeService();
  });

  afterEach(() => {
    themeService.destroy();
  });

  describe('Initialization', () => {
    it('should create ThemeService with system theme by default', () => {
      expect(themeService.getTheme()).toBe('system');
    });

    it('should restore theme from localStorage', () => {
      mockLocalStorage.setItem('app-theme', 'dark');
      const service = new ThemeService();
      expect(service.getTheme()).toBe('dark');
      service.destroy();
    });

    it('should use system theme if localStorage has invalid value', () => {
      mockLocalStorage.setItem('app-theme', 'invalid');
      const service = new ThemeService();
      expect(service.getTheme()).toBe('system');
      service.destroy();
    });
  });

  describe('Theme Management', () => {
    it('should set theme to light', () => {
      themeService.setTheme('light');
      expect(themeService.getTheme()).toBe('light');
      expect(themeService.getIsDark()).toBe(false);
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('app-theme', 'light');
    });

    it('should set theme to dark', () => {
      themeService.setTheme('dark');
      expect(themeService.getTheme()).toBe('dark');
      expect(themeService.getIsDark()).toBe(true);
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('app-theme', 'dark');
    });

    it('should set theme to system', () => {
      themeService.setTheme('system');
      expect(themeService.getTheme()).toBe('system');
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('app-theme', 'system');
    });

    it('should toggle from light to dark', () => {
      themeService.setTheme('light');
      themeService.toggleTheme();
      expect(themeService.getTheme()).toBe('dark');
    });

    it('should toggle from dark to light', () => {
      themeService.setTheme('dark');
      themeService.toggleTheme();
      expect(themeService.getTheme()).toBe('light');
    });
  });

  describe('Subscription', () => {
    it('should subscribe to theme changes', () => {
      const callback = jest.fn();
      const unsubscribe = themeService.subscribe(callback);
      
      expect(callback).toHaveBeenCalled();
      expect(typeof unsubscribe).toBe('function');
    });

    it('should notify listeners on theme change', () => {
      const callback = jest.fn();
      themeService.subscribe(callback);
      
      themeService.setTheme('dark');
      
      expect(callback).toHaveBeenCalledWith('dark', true);
    });

    it('should allow unsubscribing', () => {
      const callback = jest.fn();
      const unsubscribe = themeService.subscribe(callback);
      
      unsubscribe();
      themeService.setTheme('dark');
      
      // Callback should only be called once (initial call)
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });

  describe('getThemeService', () => {
    it('should return singleton instance', () => {
      const service1 = getThemeService();
      const service2 = getThemeService();
      
      expect(service1).toBe(service2);
    });
  });
});


