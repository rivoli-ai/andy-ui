# Testing Strategy

## Overview

The Omnifex UI monorepo uses a comprehensive testing strategy with Jest for unit tests and Testing Library for component tests. Each project type (core libraries, framework adapters, applications) has tailored testing configurations to match its needs.

## Testing Stack

| Tool | Purpose | Used By |
|------|---------|---------|
| **Jest** | Test runner and assertion library | All projects |
| **@testing-library/angular** | Angular component testing | Angular projects |
| **@testing-library/react** | React component testing | React projects |
| **Stencil Test** | Stencil component testing | ui-components |
| **ts-jest** | TypeScript transformation | Core libraries, React |
| **babel-jest** | ES module transformation | Angular (for `.mjs` files) |
| **jest-preset-angular** | Angular test configuration | Angular projects |

## Test Structure

### Co-Located Tests

Tests are co-located with source files:

```
libs/identity/
├── src/
│   ├── lib/
│   │   ├── auth.service.ts
│   │   └── auth.service.spec.ts    # ✅ Next to implementation
│   └── public-api.ts
```

### Test Naming Convention

- Unit tests: `*.spec.ts`
- Integration tests: `*.integration.spec.ts`
- E2E tests: `*.e2e.spec.ts`

## Core Library Testing

### Example: @omnifex/identity

**Test Configuration** (`libs/identity/jest.config.cjs`):
```javascript
module.exports = {
  displayName: 'identity',
  preset: '../../jest.preset.js',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/libs/identity',
};
```

**Test Example**:
```typescript
// libs/identity/src/lib/auth.service.spec.ts
import { initAuth, getAuthService, resetAuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => {
    resetAuthService(); // Clear singleton state
  });
  
  afterEach(() => {
    resetAuthService();
  });
  
  describe('initialization', () => {
    it('should throw if not initialized', () => {
      expect(() => getAuthService()).toThrow('AuthService not initialized');
    });
    
    it('should initialize with valid config', () => {
      initAuth({
        authority: 'https://example.com',
        clientId: 'test-client',
        redirectUri: 'http://localhost:4200/callback',
        scope: 'openid profile email',
      });
      
      expect(() => getAuthService()).not.toThrow();
    });
  });
  
  describe('authentication', () => {
    beforeEach(() => {
      initAuth({
        authority: 'https://example.com',
        clientId: 'test-client',
        redirectUri: 'http://localhost:4200/callback',
        scope: 'openid profile',
      });
    });
    
    it('should expose login method', () => {
      const service = getAuthService();
      expect(typeof service.login).toBe('function');
    });
    
    it('should expose logout method', () => {
      const service = getAuthService();
      expect(typeof service.logout).toBe('function');
    });
  });
});
```

### Testing Benefits

1. **No Framework Mocking**: Pure TypeScript tests don't require Angular/React mocks
2. **Fast Execution**: No framework bootstrapping overhead
3. **Focused Tests**: Test business logic in isolation
4. **Easy Debugging**: Simple stack traces

## Angular Testing

### Configuration

**Test Setup** (`libs/identity-angular/src/test-setup.ts`):
```typescript
import 'jest-preset-angular/setup-jest';
import '@testing-library/jest-dom';
```

**Jest Config** (`libs/identity-angular/jest.config.cjs`):
```javascript
module.exports = {
  displayName: 'identity-angular',
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|html)$': ['jest-preset-angular', {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    }],
    '^.+\\.mjs$': ['babel-jest'], // Transform ES modules
  },
  transformIgnorePatterns: [
    'node_modules/(?!.*\\.mjs$|@angular|@omnifex)',
  ],
  moduleNameMapper: {
    '^@omnifex/identity$': '<rootDir>/../../libs/identity/src/public-api.ts',
    '^@omnifex/styles$': '<rootDir>/../../libs/styles/src/public-api.ts',
  },
};
```

### Testing Angular Services

```typescript
// libs/identity-angular/src/lib/auth.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { initAuth } from '@omnifex/identity';

describe('AuthService', () => {
  let service: AuthService;
  
  beforeEach(() => {
    // Initialize core auth
    initAuth({
      authority: 'https://example.com',
      clientId: 'test',
      redirectUri: 'http://localhost:4200/callback',
      scope: 'openid',
    });
    
    TestBed.configureTestingModule({
      providers: [AuthService],
    });
    
    service = TestBed.inject(AuthService);
  });
  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should initialize with null user', () => {
    expect(service.user()).toBeNull();
  });
  
  it('should have isAuthenticated signal', () => {
    expect(service.isAuthenticated()).toBe(false);
  });
  
  it('should provide login method', () => {
    expect(typeof service.login).toBe('function');
  });
});
```

### Testing Angular Components

```typescript
// apps/angular-app/src/app/home/home.spec.ts
import { render, screen, waitFor } from '@testing-library/angular';
import { signal } from '@angular/core';
import { HomeComponent } from './home';
import { AuthService } from '@omnifex/identity-angular';

describe('HomeComponent', () => {
  it('should render welcome message', async () => {
    await render(HomeComponent);
    
    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
  });
  
  it('should show login button when not authenticated', async () => {
    const mockAuthService = {
      user: signal(null),
      isAuthenticated: signal(false),
      isLoading: signal(false),
      login: jest.fn(),
      logout: jest.fn(),
    };
    
    await render(HomeComponent, {
      providers: [
        { provide: AuthService, useValue: mockAuthService },
      ],
    });
    
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });
  
  it('should call login on button click', async () => {
    const mockAuthService = {
      user: signal(null),
      isAuthenticated: signal(false),
      isLoading: signal(false),
      login: jest.fn(),
      logout: jest.fn(),
    };
    
    const { click } = await render(HomeComponent, {
      providers: [
        { provide: AuthService, useValue: mockAuthService },
      ],
    });
    
    const loginButton = screen.getByRole('button', { name: /login/i });
    await click(loginButton);
    
    expect(mockAuthService.login).toHaveBeenCalled();
  });
});
```

### Mocking Angular Signals

```typescript
import { signal } from '@angular/core';

const mockAuthService = {
  // Signal with test data
  user: signal({
    profile: {
      sub: '123',
      name: 'Test User',
      email: 'test@example.com',
    },
  }),
  isAuthenticated: signal(true),
  isLoading: signal(false),
  
  // Methods
  login: jest.fn(),
  logout: jest.fn(),
};
```

## React Testing

### Configuration

**Test Setup** (`apps/react-app/src/setupTests.ts`):
```typescript
import '@testing-library/jest-dom';
import 'whatwg-fetch'; // Polyfill for fetch in jsdom
```

**Jest Config** (`apps/react-app/jest.config.ts`):
```javascript
module.exports = {
  displayName: 'react-app',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[tj]sx?$': ['ts-jest', {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    '^@omnifex/identity$': '<rootDir>/../../libs/identity/src/public-api.ts',
    '^@omnifex/identity-react$': '<rootDir>/../../libs/identity-react/src/public-api.ts',
    '^@omnifex/styles$': '<rootDir>/../../libs/styles/src/public-api.ts',
    '^@omnifex/styles-react$': '<rootDir>/../../libs/styles-react/src/public-api.ts',
    '\\.(css|less|scss)$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: ['node_modules/(?!@omnifex)'],
};
```

### Testing React Hooks

```typescript
// libs/identity-react/src/useAuth.spec.tsx
import { renderHook, waitFor } from '@testing-library/react';
import { ReactNode } from 'react';
import { AuthProvider, useAuth } from './useAuth';
import { initAuth } from '@omnifex/identity';

describe('useAuth', () => {
  beforeAll(() => {
    initAuth({
      authority: 'https://example.com',
      clientId: 'test',
      redirectUri: 'http://localhost:3000/callback',
      scope: 'openid',
    });
  });
  
  const wrapper = ({ children }: { children: ReactNode }) => (
    <AuthProvider>{children}</AuthProvider>
  );
  
  it('should provide auth context', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });
  
  it('should throw when used outside provider', () => {
    // Suppress console.error for this test
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => {
      renderHook(() => useAuth());
    }).toThrow('useAuth must be used within AuthProvider');
    
    spy.mockRestore();
  });
  
  it('should provide login method', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    expect(typeof result.current.login).toBe('function');
  });
});
```

### Testing React Components

```typescript
// apps/react-app/src/pages/Home.spec.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Home } from './Home';
import { AuthProvider } from '@omnifex/identity-react';

describe('Home', () => {
  it('should render welcome message', () => {
    render(
      <AuthProvider>
        <Home />
      </AuthProvider>
    );
    
    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
  });
  
  it('should show login button when not authenticated', async () => {
    render(
      <AuthProvider>
        <Home />
      </AuthProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });
  });
  
  it('should handle login click', async () => {
    const user = userEvent.setup();
    
    render(
      <AuthProvider>
        <Home />
      </AuthProvider>
    );
    
    const loginButton = await screen.findByRole('button', { name: /login/i });
    await user.click(loginButton);
    
    // Would redirect to identity provider in real app
    // In tests, just verify the function was called
  });
});
```

### Mocking React Context

```typescript
import { AuthContext } from '@omnifex/identity-react';

const mockAuthContext = {
  user: {
    profile: {
      sub: '123',
      name: 'Test User',
      email: 'test@example.com',
    },
  },
  isAuthenticated: true,
  isLoading: false,
  login: jest.fn(),
  logout: jest.fn(),
  handleCallback: jest.fn(),
};

// Render with mock context
<AuthContext.Provider value={mockAuthContext}>
  <ComponentUnderTest />
</AuthContext.Provider>
```

## Stencil Component Testing

### Configuration

Stencil uses its own test runner:

```typescript
// libs/ui-components/stencil.config.ts
export const config: Config = {
  testing: {
    browserHeadless: true,
  },
};
```

### Unit Tests

```typescript
// libs/ui-components/src/components/omnifex-button/omnifex-button.spec.tsx
import { newSpecPage } from '@stencil/core/testing';
import { OmnifexButton } from './omnifex-button';

describe('omnifex-button', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [OmnifexButton],
      html: `<omnifex-button>Click Me</omnifex-button>`,
    });
    
    expect(page.root).toEqualHtml(`
      <omnifex-button>
        <mock:shadow-root>
          <button class="btn btn-primary btn-solid">
            <slot></slot>
          </button>
        </mock:shadow-root>
        Click Me
      </omnifex-button>
    `);
  });
  
  it('renders with variant prop', async () => {
    const page = await newSpecPage({
      components: [OmnifexButton],
      html: `<omnifex-button variant="danger">Delete</omnifex-button>`,
    });
    
    const button = page.root.shadowRoot.querySelector('button');
    expect(button.classList.contains('btn-danger')).toBe(true);
  });
  
  it('disables button when disabled prop is true', async () => {
    const page = await newSpecPage({
      components: [OmnifexButton],
      html: `<omnifex-button disabled>Disabled</omnifex-button>`,
    });
    
    const button = page.root.shadowRoot.querySelector('button');
    expect(button.disabled).toBe(true);
  });
});
```

## Running Tests

### Single Project

```bash
# Run tests for a specific project
corepack pnpm nx test identity
corepack pnpm nx test identity-angular
corepack pnpm nx test react-app
corepack pnpm nx test ui-components
```

### All Projects

```bash
# Run all tests
corepack pnpm nx run-many -t test --all

# Run with coverage
corepack pnpm nx run-many -t test --all --coverage
```

### Affected Tests

```bash
# Run tests for affected projects only
corepack pnpm nx affected -t test

# Useful for CI to only test changed code
```

### Watch Mode

```bash
# Run in watch mode for development
corepack pnpm nx test identity --watch
```

### Debug Mode

```bash
# Run with Node debugger
corepack pnpm nx test identity --runInBand --no-cache

# In VS Code, use the Jest extension for debugging
```

## Coverage Reports

### Generating Coverage

```bash
# Generate coverage for a project
corepack pnpm nx test identity --coverage

# Output: coverage/libs/identity/
```

### Coverage Thresholds

Configure in `jest.config.cjs`:

```javascript
module.exports = {
  // ...
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

### Viewing Reports

Coverage reports are generated in HTML format:

```bash
# Open coverage report
open coverage/libs/identity/index.html
```

## Test Organization

### AAA Pattern

Use Arrange-Act-Assert:

```typescript
describe('ThemeService', () => {
  it('should toggle theme', () => {
    // Arrange
    const service = getThemeService();
    service.setTheme('light');
    
    // Act
    service.toggleTheme();
    
    // Assert
    expect(service.getTheme()).toBe('dark');
  });
});
```

### Test Grouping

Group related tests with `describe`:

```typescript
describe('AuthService', () => {
  describe('initialization', () => {
    // Tests for initialization
  });
  
  describe('authentication', () => {
    // Tests for login/logout
  });
  
  describe('token refresh', () => {
    // Tests for token management
  });
});
```

### Test Isolation

Each test should be independent:

```typescript
beforeEach(() => {
  // Reset state before each test
  resetAuthService();
  localStorage.clear();
  jest.clearAllMocks();
});

afterEach(() => {
  // Clean up after each test
  jest.restoreAllMocks();
});
```

## Common Patterns

### Testing Async Operations

```typescript
it('should load user on initialization', async () => {
  const service = new AuthService();
  
  await waitFor(() => {
    expect(service.user()).not.toBeNull();
  });
});
```

### Testing Error Handling

```typescript
it('should handle login errors', async () => {
  const service = getAuthService();
  
  await expect(service.login()).rejects.toThrow('Network error');
});
```

### Testing DOM Updates

```typescript
it('should update theme attribute', () => {
  const service = getThemeService();
  
  service.setTheme('dark');
  
  expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
});
```

### Mocking External Dependencies

```typescript
jest.mock('oidc-client-ts', () => ({
  UserManager: jest.fn().mockImplementation(() => ({
    getUser: jest.fn().mockResolvedValue(null),
    signinRedirect: jest.fn().mockResolvedValue(undefined),
  })),
}));
```

## CI Integration

Tests run automatically in GitHub Actions:

```yaml
# .github/workflows/ci.yml
- name: Test
  run: corepack pnpm nx affected -t test --base=${{ github.event.before }}
```

Only affected projects are tested, dramatically reducing CI time.

## Best Practices

1. **Write Tests First (TDD)**: Define behavior before implementation
2. **Test Behavior, Not Implementation**: Focus on public APIs
3. **Keep Tests Simple**: One assertion per test when possible
4. **Use Descriptive Names**: `it('should logout when user clicks logout button')`
5. **Avoid Test Interdependence**: Each test runs in isolation
6. **Mock External Dependencies**: Don't rely on real APIs or databases
7. **Test Edge Cases**: Null values, empty arrays, error states
8. **Maintain Tests**: Update tests when refactoring
9. **Run Tests Frequently**: Catch issues early
10. **Aim for High Coverage**: But prioritize critical paths

## Next Steps

- **Build & CI**: Understand build optimization in [build-and-ci.md](./build-and-ci.md)
- **Troubleshooting**: Debug test failures in [troubleshooting.md](./troubleshooting.md)

