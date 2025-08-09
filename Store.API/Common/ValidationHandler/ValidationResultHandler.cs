namespace Store.API.Common.ValidationHandler;

public class ValidationResultHandler
{
    public bool isValid { get; set; }
    public List<string> ErrorMessages = new();

    public ValidationResultHandler(bool valid,List<string> errorMessage)
    {
        isValid = valid;
        ErrorMessages = errorMessage;
    }
}