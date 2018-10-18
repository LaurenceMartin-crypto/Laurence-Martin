using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hubs.Gamehub;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Project_Dynamo.APICore.Models;

namespace Project_Dynamo.APICore
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //services.AddCors();
            services.AddSignalR();
            services.AddMvc();
            services.AddScoped<CacheService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseCors(config =>
               config.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin().AllowCredentials());

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseStaticFiles();

            app.UseSignalR(routes =>
            {
                routes.MapHub<Gamehub>("/game");
            });

            app.UseMvc();
        }
    }
}
