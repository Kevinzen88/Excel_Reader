using System.Collections.Generic;

namespace Toh.WebSite.Models
{
    public class ResponseDto
    {
        public string Status { get; set; } = "Success";

        public object Result { get; set; }

        public List<ErrorDto> Errors { get; set; }
    }

    public class ErrorDto
    {
        public string Message { get; set; }
        public string StatusCode { get; set; }
    }
}
