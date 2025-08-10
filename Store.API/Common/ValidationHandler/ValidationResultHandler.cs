namespace Store.API.Common.ValidationHandler;

public class ValidationResultHandler
{
    public bool isValid { get; set; }
    public Dictionary<string,string> ErrorMessages = new();

    public ValidationResultHandler(bool valid,Dictionary<string,string> errorMessage)
    {
        isValid = valid;
        ErrorMessages = errorMessage;
    }
}