# React App Troubleshooting Guide

## Safari Browser Extension Error (_0x Variables)

### Issue Description
When running the React app in Safari browser, you may encounter obfuscated error messages like:
```
Can't find variable: _0x4761
_0x5e4966@http://localhost:3000/:1:65
webkit-masked-url://hidden/
```

### Root Cause
This error is caused by **browser extension script injection** or **Safari's Intelligent Tracking Prevention (ITP)**. The obfuscated variable names (`_0x` prefix) are characteristic of:
- Ad blockers (AdBlock, uBlock Origin, etc.)
- Privacy extensions
- Safari's anti-tracking features
- Browser security extensions

The injected scripts execute before your application code and can cause errors that appear to come from your app.

### Solutions Implemented

#### 1. Global Error Handler (index.html)
The very first script in `public/index.html` overrides error handling to catch and suppress these errors:
- Intercepts `window.onerror` before any other scripts
- Filters errors containing `_0x` patterns
- Uses capture phase event listeners for earliest possible interception
- Logs suppressed errors to console for debugging

#### 2. Webpack Dev Server Configuration (config-overrides.js)
The webpack configuration filters the error overlay:
- Prevents webpack from showing overlay for injected script errors
- Only displays legitimate application errors
- Maintains debugging capability for real issues

#### 3. React Error Boundary (ErrorBoundary.tsx)
React-level error catching:
- Catches component errors
- Filters out injected script errors
- Provides user-friendly error UI for legitimate errors
- Includes reload functionality

#### 4. Component-Level Protection
All components use defensive coding:
- Try-catch blocks around critical operations
- Graceful fallbacks for missing dependencies
- Component readiness checks before rendering

### Quick Fixes

#### Option 1: Disable Safari Extensions (Recommended for Development)
1. Open Safari
2. Go to **Safari → Settings → Extensions**
3. Disable all extensions temporarily
4. Reload the application

#### Option 2: Disable Safari Tracking Prevention
1. Open Safari
2. Go to **Develop → Disable Cross-Origin Restrictions** (for testing)
3. **Note**: Only for development, don't use in production

#### Option 3: Use a Different Browser
Test in Chrome or Firefox to confirm it's Safari-specific:
```bash
# The app should work without errors in Chrome/Firefox
```

### Expected Behavior

With the solutions in place, you should see:
- ✅ **No error overlay** breaking the UI
- ⚠️ **Console warnings** showing suppressed errors (for debugging)
- ✅ **Application continues functioning** normally
- ✅ **Login/logout works** without interruption

Console output will show:
```
[Error Suppressed] External script injection detected: Can't find variable: _0x4761
```

### Restart Required

After updating configuration files, restart the dev server:
```bash
# Stop the current server (Ctrl+C)
corepack pnpm nx serve react-app
```

### Production Deployment

For production builds:
1. The error handlers remain in place as a safety net
2. Consider adding Content Security Policy (CSP) headers
3. The build process doesn't include source maps by default
4. Users with extensions will have errors suppressed gracefully

### Still Having Issues?

If errors persist after implementing these solutions:

1. **Check Browser Console** - Look for the suppression messages
2. **Clear Browser Cache** - Hard reload (Cmd+Shift+R)
3. **Check for Multiple Extensions** - Some extensions inject code that interferes with error handlers
4. **Test in Incognito Mode** - Extensions are usually disabled
5. **Update Safari** - Ensure you're running the latest version

### Related Files
- `public/index.html` - Global error handler
- `config-overrides.js` - Webpack configuration
- `src/components/ErrorBoundary.tsx` - React error boundary
- `src/App.tsx` - App-level error handling
- `src/components/Callback.tsx` - Component readiness checks

### Technical Details

The error occurs because:
1. Browser extensions inject scripts into web pages
2. These scripts often use obfuscation for anti-detection
3. They run in the page context, not isolated
4. Timing issues cause undefined variable access
5. The browser reports these as "your" errors

Our solution:
1. Catches errors at the earliest possible moment
2. Identifies injection patterns (`_0x`, `webkit-masked-url`)
3. Suppresses only external errors, preserving legitimate error reporting
4. Maintains debugging capabilities through console warnings
