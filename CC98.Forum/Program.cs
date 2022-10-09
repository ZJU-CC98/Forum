using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace CC98.Forum
{
	/// <summary>
	/// 应用程序的主类型。
	/// </summary>
    public static class Program
    {
		/// <summary>
		/// 应用程序的启动方法。
		/// </summary>
		/// <param name="args">应用程序的启动参数。</param>
		[UsedImplicitly]
		public static void Main(string[] args)
		{
			CreateHostBuilder(args).Build().Run();
		}

		public static IHostBuilder CreateHostBuilder(string[] args) =>
			Host.CreateDefaultBuilder(args)
				.ConfigureWebHostDefaults(webBuilder =>
				{
					webBuilder.UseStartup<Startup>();
				});
    }
}
