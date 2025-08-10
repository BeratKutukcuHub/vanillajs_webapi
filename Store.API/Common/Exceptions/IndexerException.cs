namespace Store.API.Common.Exceptions;

public class IndexerException : Exception
{
    public IndexerException() : base("There is no user with this index.")
    {

    }
}