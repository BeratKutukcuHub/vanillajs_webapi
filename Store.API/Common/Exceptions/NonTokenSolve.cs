namespace Store.API.Common.Exceptions;

public class NonTokenSolve : Exception
{
    public NonTokenSolve() : base("No user found for this token or token expired!")
    {
        
    }
}