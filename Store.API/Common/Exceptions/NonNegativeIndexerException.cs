namespace Store.API.Common.Exceptions;

public class NonNegativeIndexerException : Exception
{
    public NonNegativeIndexerException() : base("The index value cannot be less than 0.")
    {

    }
}