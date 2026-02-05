using Duende.IdentityServer.Models;

namespace omnifex_duende_identity_server;

public static class Config
{
    public static IEnumerable<IdentityResource> IdentityResources =>
        new IdentityResource[]
        {
            new IdentityResources.OpenId(),
            new IdentityResources.Profile(),
            new IdentityResources.Email(),
            // Custom identity resource for roles
            new IdentityResource(
                name: "roles",
                displayName: "User Roles",
                userClaims: new[] { "roles" }
            ),
        };

    public static IEnumerable<ApiScope> ApiScopes =>
        new ApiScope[]
        {
            new ApiScope("api", "Omnifex API", new[] { "roles" }),  // Include roles claim in access token
            new ApiScope("scope1"),
            new ApiScope("scope2"),
        };

    public static IEnumerable<Client> Clients =>
        new Client[]
        {
            // m2m client credentials flow client
            new Client
            {
                ClientId = "m2m.client",
                ClientName = "Client Credentials Client",

                AllowedGrantTypes = GrantTypes.ClientCredentials,
                ClientSecrets = { new Secret("511536EF-F270-4058-80CA-1C89C192F69A".Sha256()) },

                AllowedScopes = { "scope1", "api" }
            },

            // Angular SPA client using Authorization Code flow with PKCE
            new Client
            {
                ClientId = "omnifex-ui",
                ClientName = "Omnifex Angular SPA",
                
                // No client secret for public clients (SPAs)
                RequireClientSecret = false,
                
                // Authorization Code flow with PKCE
                AllowedGrantTypes = GrantTypes.Code,
                RequirePkce = true,
                
                // Where to redirect after login
                RedirectUris = 
                { 
                    "http://localhost:4200/callback",
                    "http://localhost:4200/silent-refresh.html",
                    "http://localhost:3000/callback"
                },
                
                // Where to redirect after logout
                PostLogoutRedirectUris = 
                { 
                    "http://localhost:4200",
                    "http://localhost:3000"
                },
                
                // Allowed CORS origins for token requests
                AllowedCorsOrigins = 
                { 
                    "http://localhost:4200",
                    "http://localhost:3000"
                },
                
                // Scopes the client can request
                AllowedScopes = { "openid", "profile", "email", "roles", "api" },
                
                // Include user claims (name, email, etc.) directly in the ID token
                AlwaysIncludeUserClaimsInIdToken = true,
                
                // Allow refresh tokens
                AllowOfflineAccess = true,
                
                // Token lifetimes
                AccessTokenLifetime = 3600, // 1 hour
                IdentityTokenLifetime = 3600,
                
                // Refresh token settings
                RefreshTokenUsage = TokenUsage.OneTimeOnly,
                RefreshTokenExpiration = TokenExpiration.Sliding,
                SlidingRefreshTokenLifetime = 86400, // 1 day
                
                // Allow access tokens via browser
                AllowAccessTokensViaBrowser = true
            },

            // interactive client using code flow + pkce (for server-side apps)
            new Client
            {
                ClientId = "interactive",
                ClientSecrets = { new Secret("49C1A7E1-0C79-4A89-A3D6-A37998FB86B0".Sha256()) },

                AllowedGrantTypes = GrantTypes.Code,
                RequirePkce = true,

                RedirectUris = { "https://localhost:44300/signin-oidc" },
                FrontChannelLogoutUri = "https://localhost:44300/signout-oidc",
                PostLogoutRedirectUris = { "https://localhost:44300/signout-callback-oidc" },

                AllowOfflineAccess = true,
                AllowedScopes = { "openid", "profile", "email", "api", "scope2" }
            },
        };
}
