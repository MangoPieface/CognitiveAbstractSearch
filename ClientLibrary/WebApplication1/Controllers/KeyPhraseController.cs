using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.ProjectOxford.Text.Core;
using Microsoft.ProjectOxford.Text.KeyPhrase;
using WebApplication1.Models.Configuration;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KeyPhraseController : ControllerBase
    {
        private readonly IOptions<AzureCoginitiveAccountDetails> _azureCoginitiveAccountDetails;

        public  KeyPhraseController(IOptions<AzureCoginitiveAccountDetails> azureCoginitiveAccountDetails)
        {
            _azureCoginitiveAccountDetails = azureCoginitiveAccountDetails;
        }
        
        [HttpPost("[action]")]
        public IEnumerable<string> ProcessTextToFindKeyPhrases(string myData)
        {

            var keyPhraseClient = new KeyPhraseClient(_azureCoginitiveAccountDetails.Value.KeyPhraseApiKey);
            var keyPhraseRequest = new KeyPhraseRequest();

            IDocument doc = new KeyPhraseDocument { Id = "1", Text = myData, Language = "en" };

            keyPhraseRequest.Documents.Add(doc);

            IEnumerable<string> phrases = new List<string>();

            var response = keyPhraseClient.GetKeyPhrases(keyPhraseRequest);


            return response.Documents.First().KeyPhrases;
        }

    }
}