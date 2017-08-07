using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace CC98.Forum
{
	/// <summary>
	/// 应用程序的启动类型。
	/// </summary>
	public class Startup
	{
		/// <summary>
		/// 配置应用程序服务。
		/// </summary>
		/// <param name="services">应用程序的服务容器。</param>
		[UsedImplicitly]
		public void ConfigureServices(IServiceCollection services)
		{
		}

		/// <summary>
		/// 配置应用程序功能。
		/// </summary>
		/// <param name="app">应用程序对象。</param>
		[UsedImplicitly]
		public void Configure(IApplicationBuilder app)
		{
			// 允许静态文件请求。
			app.UseStaticFiles();

			// 对其它所有路径执行 URL 重写并返回 index 文件。
			var rewriteOptions = new RewriteOptions().AddRewrite(@".*", "index.html", true);
			app.UseRewriter(rewriteOptions);
			app.UseStaticFiles();
		}
	}
}
