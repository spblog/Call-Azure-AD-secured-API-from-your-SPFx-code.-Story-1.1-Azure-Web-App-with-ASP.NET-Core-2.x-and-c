## Sample on how to call remote API from SPFx web part. Uses ASP.NET Core 2.1 as backend API (Azure AD authentication) and cookie authentication from SPFx side (xhr "with credentials") 

Blog post - [Call Azure AD secured API from your SPFx code. Story #1.1: Azure Web App with ASP.NET Core 2.x and cookie authentication (xhr "with credentials")](http://spblog.net/post/2018/07/26/call-azure-ad-secured-api-from-your-spfx-code-story-1-1-azure-web-app-with-asp-net-core-2-x-and-cookie-authentication-xhr-with-credentials)

### How to use

1. Create new app regisration in Azure AD. Copy Client Id and your TenantId (can be found in Azure Portal under App Registrations - > Endpoints, copy guid from any endpoint). In reply url specify `https://localhost:44361/` (for local debugging, after deployment add your real site url)
web app folder contains ASP.NET code. 
2. Open `web app\WebApp-OpenIDConnect-DotNet.sln` in Visual Studio 2017 (15.7 minimum)
3. Update `appsettings.json` - change `Domain`, `TenantId`, `ClientId` to match your configuration
4. `Ctrl + F5` to run web app. Try to open `https://localhost:44361/` - you should be redirected to your organization login page.
5. Under spfx folder run `npm install` and `gulp serve`
6. Add Hello World web part to local workbench and observe console - data from Web API should be available.