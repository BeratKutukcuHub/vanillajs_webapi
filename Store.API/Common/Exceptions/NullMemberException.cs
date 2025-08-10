namespace Store.API.Common.Exceptions;

public class NullMemberException : Exception
{
    public NullMemberException() : base("The member cannot be empty.")
    {
        
    }
}