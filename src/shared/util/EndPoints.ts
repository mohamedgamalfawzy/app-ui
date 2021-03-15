export class EndPoints{
  public static readonly  BASE_URI : string ="http://localhost:8080"
  public static readonly  CUSTOMER_PATH : string="/api//customer";

}
export class  CustomerEndPoint{
  public static SEARCH_PATH : string = `/api/customer`
  public static SEARCH_FULL_PATH =  `${EndPoints.BASE_URI}${EndPoints.CUSTOMER_PATH}`

}
export class  CountryEndPoint{
  public static GETALL_URI =  `${EndPoints.BASE_URI}/api/country`

}

