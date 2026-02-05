using System.Security.Claims;
using IdentityModel;
using omnifex_duende_identity_server.Data;
using omnifex_duende_identity_server.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Serilog;

namespace omnifex_duende_identity_server;

public class SeedData
{
    // Role constants
    public const string AdminRole = "admin";
    public const string UserRole = "user";
    public const string ManagerRole = "manager";

    public static void EnsureSeedData(WebApplication app)
    {
        using (var scope = app.Services.GetRequiredService<IServiceScopeFactory>().CreateScope())
        {
            var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
            context.Database.Migrate();

            var userMgr = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
            var roleMgr = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

            // Create roles
            EnsureRole(roleMgr, AdminRole);
            EnsureRole(roleMgr, UserRole);
            EnsureRole(roleMgr, ManagerRole);

            // Create Alice - Admin user
            var alice = userMgr.FindByNameAsync("alice").Result;
            if (alice == null)
            {
                alice = new ApplicationUser
                {
                    UserName = "alice",
                    Email = "AliceSmith@email.com",
                    EmailConfirmed = true,
                };
                var result = userMgr.CreateAsync(alice, "Pass123$").Result;
                if (!result.Succeeded)
                {
                    throw new Exception(result.Errors.First().Description);
                }

                // Add Alice to Admin and User roles
                result = userMgr.AddToRolesAsync(alice, new[] { AdminRole, UserRole }).Result;
                if (!result.Succeeded)
                {
                    throw new Exception(result.Errors.First().Description);
                }

                result = userMgr.AddClaimsAsync(alice, new Claim[]{
                    new Claim(JwtClaimTypes.Name, "Alice Smith"),
                    new Claim(JwtClaimTypes.GivenName, "Alice"),
                    new Claim(JwtClaimTypes.FamilyName, "Smith"),
                    new Claim(JwtClaimTypes.WebSite, "http://alice.com"),
                    new Claim("roles", AdminRole),
                    new Claim("roles", UserRole),
                }).Result;
                if (!result.Succeeded)
                {
                    throw new Exception(result.Errors.First().Description);
                }
                Log.Debug("alice created with admin role");
            }
            else
            {
                Log.Debug("alice already exists");
            }

            // Create Bob - Regular user
            var bob = userMgr.FindByNameAsync("bob").Result;
            if (bob == null)
            {
                bob = new ApplicationUser
                {
                    UserName = "bob",
                    Email = "BobSmith@email.com",
                    EmailConfirmed = true
                };
                var result = userMgr.CreateAsync(bob, "Pass123$").Result;
                if (!result.Succeeded)
                {
                    throw new Exception(result.Errors.First().Description);
                }

                // Add Bob to User role only
                result = userMgr.AddToRoleAsync(bob, UserRole).Result;
                if (!result.Succeeded)
                {
                    throw new Exception(result.Errors.First().Description);
                }

                result = userMgr.AddClaimsAsync(bob, new Claim[]{
                    new Claim(JwtClaimTypes.Name, "Bob Smith"),
                    new Claim(JwtClaimTypes.GivenName, "Bob"),
                    new Claim(JwtClaimTypes.FamilyName, "Smith"),
                    new Claim(JwtClaimTypes.WebSite, "http://bob.com"),
                    new Claim("roles", UserRole),
                    new Claim("location", "somewhere"),
                }).Result;
                if (!result.Succeeded)
                {
                    throw new Exception(result.Errors.First().Description);
                }
                Log.Debug("bob created with user role");
            }
            else
            {
                Log.Debug("bob already exists");
            }

            // Create Charlie - Manager user
            var charlie = userMgr.FindByNameAsync("charlie").Result;
            if (charlie == null)
            {
                charlie = new ApplicationUser
                {
                    UserName = "charlie",
                    Email = "CharlieWilson@email.com",
                    EmailConfirmed = true
                };
                var result = userMgr.CreateAsync(charlie, "Pass123$").Result;
                if (!result.Succeeded)
                {
                    throw new Exception(result.Errors.First().Description);
                }

                // Add Charlie to Manager and User roles
                result = userMgr.AddToRolesAsync(charlie, new[] { ManagerRole, UserRole }).Result;
                if (!result.Succeeded)
                {
                    throw new Exception(result.Errors.First().Description);
                }

                result = userMgr.AddClaimsAsync(charlie, new Claim[]{
                    new Claim(JwtClaimTypes.Name, "Charlie Wilson"),
                    new Claim(JwtClaimTypes.GivenName, "Charlie"),
                    new Claim(JwtClaimTypes.FamilyName, "Wilson"),
                    new Claim("roles", ManagerRole),
                    new Claim("roles", UserRole),
                }).Result;
                if (!result.Succeeded)
                {
                    throw new Exception(result.Errors.First().Description);
                }
                Log.Debug("charlie created with manager role");
            }
            else
            {
                Log.Debug("charlie already exists");
            }
        }
    }

    private static void EnsureRole(RoleManager<IdentityRole> roleMgr, string roleName)
    {
        var role = roleMgr.FindByNameAsync(roleName).Result;
        if (role == null)
        {
            var result = roleMgr.CreateAsync(new IdentityRole(roleName)).Result;
            if (!result.Succeeded)
            {
                throw new Exception(result.Errors.First().Description);
            }
            Log.Debug($"Role '{roleName}' created");
        }
    }
}
