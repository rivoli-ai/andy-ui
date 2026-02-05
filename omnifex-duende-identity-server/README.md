# Omnifex Duende Identity Server

A Duende IdentityServer implementation providing OAuth 2.0 and OpenID Connect authentication for the Omnifex application.

## Prerequisites

- .NET 10 SDK

## Getting Started

### 1. Restore Dependencies

```bash
cd omnifex-duende-identity-server
dotnet restore
```

### 2. Seed the Database

Run the following command to create test users:

```bash
dotnet run /seed
```

This creates two test users:
- **alice** / `Pass123$`
- **bob** / `Pass123$`

### 3. Start the Server

```bash
dotnet run
```

The server will start on **https://localhost:5001**

> ⚠️ **Important:** Use `https://` (not `http://`). The server only listens on HTTPS.

### 4. Trust the Development Certificate (First Time Only)

If you see certificate warnings, run:

```bash
dotnet dev-certs https --trust
```

## Testing Authentication

### Login Page

Open in your browser:
```
https://localhost:5001/Account/Login
```

### OpenID Connect Discovery Document

View the server configuration:
```
https://localhost:5001/.well-known/openid-configuration
```

## Test Users

| Username | Password  | Email                    | Roles          |
|----------|-----------|--------------------------|----------------|
| alice    | Pass123$  | AliceSmith@email.com     | admin, user    |
| bob      | Pass123$  | BobSmith@email.com       | user           |
| charlie  | Pass123$  | CharlieWilson@email.com  | manager, user  |

## Configured Clients

### Angular SPA (Authorization Code + PKCE)

This is the primary client for the Omnifex Angular application using the secure PKCE flow.

| Property              | Value                                          |
|-----------------------|------------------------------------------------|
| Client ID             | `omnifex-ui`                                      |
| Client Secret         | None (public client)                           |
| Grant Type            | Authorization Code + PKCE                      |
| Redirect URI          | `http://localhost:4200/callback`               |
| Post Logout URI       | `http://localhost:4200`                        |
| CORS Origins          | `http://localhost:4200`                        |
| Scopes                | `openid`, `profile`, `email`, `api`            |
| Refresh Tokens        | Enabled (sliding, 1 day)                       |
| Access Token Lifetime | 1 hour                                         |

#### PKCE Flow Explained

1. Angular app generates a random `code_verifier` and `code_challenge`
2. User is redirected to `/connect/authorize` with `code_challenge`
3. After login, user is redirected back with an authorization `code`
4. Angular exchanges `code` + `code_verifier` for tokens at `/connect/token`

### Machine-to-Machine (Client Credentials)

| Property      | Value                                      |
|---------------|--------------------------------------------|
| Client ID     | `m2m.client`                               |
| Client Secret | `511536EF-F270-4058-80CA-1C89C192F69A`     |
| Grant Type    | Client Credentials                         |
| Scopes        | `scope1`, `api`                            |

### Interactive Server-Side (Authorization Code + PKCE)

| Property              | Value                                          |
|-----------------------|------------------------------------------------|
| Client ID             | `interactive`                                  |
| Client Secret         | `49C1A7E1-0C79-4A89-A3D6-A37998FB86B0`         |
| Grant Type            | Authorization Code + PKCE                      |
| Redirect URI          | `https://localhost:44300/signin-oidc`          |
| Post Logout URI       | `https://localhost:44300/signout-callback-oidc`|
| Scopes                | `openid`, `profile`, `email`, `api`, `scope2`  |

## API Scopes

| Scope    | Description           |
|----------|-----------------------|
| openid   | OpenID Connect        |
| profile  | User profile claims   |
| email    | User email address    |
| api      | Omnifex API access       |
| scope1   | API scope 1           |
| scope2   | API scope 2           |

## Endpoints

| Endpoint                          | URL                                              |
|-----------------------------------|--------------------------------------------------|
| Authorization                     | `https://localhost:5001/connect/authorize`       |
| Token                             | `https://localhost:5001/connect/token`           |
| UserInfo                          | `https://localhost:5001/connect/userinfo`        |
| End Session                       | `https://localhost:5001/connect/endsession`      |
| JWKS                              | `https://localhost:5001/.well-known/jwks`        |
| Discovery                         | `https://localhost:5001/.well-known/openid-configuration` |

## Testing with cURL

### Get Token (Client Credentials)

```bash
curl -X POST https://localhost:5001/connect/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "client_id=m2m.client" \
  -d "client_secret=511536EF-F270-4058-80CA-1C89C192F69A" \
  -d "grant_type=client_credentials" \
  -d "scope=api"
```

## Testing PKCE Flow (Angular SPA)

### Step 1: Generate PKCE Values

In your Angular app or for testing, generate:
- `code_verifier`: Random string (43-128 characters)
- `code_challenge`: Base64URL encoded SHA256 hash of code_verifier

Example values for testing:
```
code_verifier: dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk
code_challenge: E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM
```

### Step 2: Authorization Request

Open in browser:
```
https://localhost:5001/connect/authorize?
  client_id=omnifex-ui&
  redirect_uri=http://localhost:4200/callback&
  response_type=code&
  scope=openid profile email api&
  code_challenge=E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM&
  code_challenge_method=S256&
  state=random_state_value
```

### Step 3: Exchange Code for Tokens

After login, you'll be redirected with a `code`. Exchange it:

```bash
curl -X POST https://localhost:5001/connect/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "client_id=omnifex-ui" \
  -d "grant_type=authorization_code" \
  -d "code=YOUR_AUTH_CODE" \
  -d "redirect_uri=http://localhost:4200/callback" \
  -d "code_verifier=dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk"
```

### Step 4: Refresh Token

```bash
curl -X POST https://localhost:5001/connect/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "client_id=omnifex-ui" \
  -d "grant_type=refresh_token" \
  -d "refresh_token=YOUR_REFRESH_TOKEN"
```

## Troubleshooting

### "Connection Refused" or Page Won't Load

- Make sure you're using `https://` not `http://`
- Verify the server is running (`dotnet run`)
- Check the terminal for error messages

### Certificate Warnings

Run:
```bash
dotnet dev-certs https --trust
```

### "Invalid Username or Password"

- Ensure you ran `dotnet run /seed` to create test users
- Password is case-sensitive: `Pass123$`

## License

This project uses [Duende IdentityServer](https://duendesoftware.com/products/identityserver) which is free for development and testing. A license is required for production use.
