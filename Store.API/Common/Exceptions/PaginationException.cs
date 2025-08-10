namespace Store.API.Common.Exceptions;

public class PaginationException : Exception
{
    public PaginationException() : base("Pagination number or page number cannot be found")
    {

    }
}