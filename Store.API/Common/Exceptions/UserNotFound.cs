namespace Store.API.Common.Exceptions;

public class UserNotFound : Exception
{
    public UserNotFound():base("The user is not found.")
    {
        
    }
}