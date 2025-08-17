namespace Store.API.Common.Exceptions;

public class NonRefreshToken : Exception
{
    public NonRefreshToken(): base("The refresh token has expired or the user was not found.")
    {
        
    }
}