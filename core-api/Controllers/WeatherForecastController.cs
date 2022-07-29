using Microsoft.AspNetCore.Mvc;

namespace core_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetWeatherForecast")]
        public IEnumerable<WeatherForecast> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }

        [HttpPost(Name = "UploadImage")]
        public async Task<IActionResult> Post([FromBody] FileModel fileModel)
        {
            try
            {
                byte[] bytes = Convert.FromBase64String(fileModel.Base64Image);
                string filedir = Path.Combine(Directory.GetCurrentDirectory(), "UploadedImages");
                if (!Directory.Exists(filedir))
                { //check if the folder exists;
                    Directory.CreateDirectory(filedir);
                }

                string file = Path.Combine(filedir, $"imageUpload.{fileModel.Type.Split('/').Last()}");
                if (bytes.Length > 0)
                {
                    using (var stream = new FileStream(file, FileMode.Create))
                    {
                        stream.Write(bytes, 0, bytes.Length);
                        stream.Flush();
                    }
                }

                return Ok();
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}