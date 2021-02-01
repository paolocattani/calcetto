// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
export enum HTTPStatusCode {
	Continue = 100,
	SwitchingProtocols = 101,
	Processing = 102,
	EarlyHints = 103,

	/**
	 * All `1xx` status codes.
	 */
	InformationalResponses = Continue | SwitchingProtocols | Processing | EarlyHints,

	OK = 200,
	Created = 201,
	Accepted = 202,
	NonAuthoritativeInformation = 203,
	NoContent = 204,
	ResetContent = 205,
	PartialContent = 206,
	MultiStatus = 207,
	AlreadyReported = 208,
	IMUsed = 226,

	/**
	 * All `2xx` status codes.
	 */
	Success = OK |
		Created |
		Accepted |
		NonAuthoritativeInformation |
		NoContent |
		ResetContent |
		PartialContent |
		MultiStatus |
		AlreadyReported |
		IMUsed,

	MultipleChoices = 300,
	MovedPermanently = 301,
	Found = 302,
	SeeOther = 303,
	NotModified = 304,
	UseProxy = 305,
	SwitchProxy = 306,
	TemporaryRedirect = 307,
	PermanentRedirect = 308,

	/**
	 * All `3xx` status codes.
	 */
	Redirection = MultipleChoices |
		MovedPermanently |
		Found |
		SeeOther |
		NotModified |
		UseProxy |
		SwitchProxy |
		TemporaryRedirect |
		PermanentRedirect,

	BadRequest = 400,
	/**
	 * The HTTP 401 Unauthorized client error status response code indicates that the request has not been applied because it lacks valid authentication credentials for the target resource.
	 */
	Unauthorized = 401,
	PaymentRequired = 402,
	/**
	 * The HTTP 403 Forbidden client error status response code indicates that the server understood the request but refuses to authorize it.
	 * This status is similar to 401, but in this case, re-authenticating will make no difference.
	 * The access is permanently forbidden and tied to the application logic, such as insufficient rights to a resource.
	 */
	Forbidden = 403,
	NotFound = 404,
	MethodNotAllowed = 405,
	NotAcceptable = 406,
	ProxyAuthenticationRequired = 407,
	RequestTimeout = 408,
	Conflict = 409,
	Gone = 410,
	LengthRequired = 411,
	PreconditionFailed = 412,
	PayloadTooLarge = 413,
	URITooLong = 414,
	UnsupportedMediaType = 415,
	RangeNotSatisfiable = 416,
	ExpectationFailed = 417,
	ImATeapot = 418,
	MisdirectedRequest = 421,
	UnprocessableEntity = 422,
	Locked = 423,
	FailedDependency = 424,
	UpgradeRequired = 426,
	PreconditionRequired = 428,
	TooManyRequests = 429,
	RequestHeaderFieldsTooLarge = 431,
	UnavailableForLegalReasons = 451,

	/**
	 * All `4xx` error codes.
	 */
	ClientErrors = BadRequest |
		Unauthorized |
		PaymentRequired |
		Forbidden |
		NotFound |
		MethodNotAllowed |
		NotAcceptable |
		ProxyAuthenticationRequired |
		RequestTimeout |
		Conflict |
		Gone |
		LengthRequired |
		PreconditionFailed |
		PayloadTooLarge |
		URITooLong |
		UnsupportedMediaType |
		RangeNotSatisfiable |
		ExpectationFailed |
		ImATeapot |
		MisdirectedRequest |
		UnprocessableEntity |
		Locked |
		FailedDependency |
		UpgradeRequired |
		PreconditionRequired |
		TooManyRequests |
		RequestHeaderFieldsTooLarge |
		UnavailableForLegalReasons,

	InternalServerError = 500,
	NotImplemented = 501,
	BadGateway = 502,
	ServiceUnavailable = 503,
	GatewayTimeout = 504,
	HTTPVersionNotSupported = 505,
	VariantAlsoNegotiates = 506,
	InsufficientStorage = 507,
	LoopDetected = 508,
	NotExtended = 510,
	NetworkAuthenticationRequired = 511,

	/**
	 * All `5xx` error codes.
	 */
	ServerErrors = InternalServerError |
		NotImplemented |
		BadGateway |
		ServiceUnavailable |
		GatewayTimeout |
		HTTPVersionNotSupported |
		VariantAlsoNegotiates |
		InsufficientStorage |
		LoopDetected |
		NotExtended |
		NetworkAuthenticationRequired,
}

export const InformationCodes = [
	HTTPStatusCode.Continue,
	HTTPStatusCode.SwitchingProtocols,
	HTTPStatusCode.Processing,
	HTTPStatusCode.EarlyHints,
];
export const SuccessCodes = [
	HTTPStatusCode.OK,
	HTTPStatusCode.Created,
	HTTPStatusCode.Accepted,
	HTTPStatusCode.NonAuthoritativeInformation,
	HTTPStatusCode.NoContent,
	HTTPStatusCode.ResetContent,
	HTTPStatusCode.PartialContent,
	HTTPStatusCode.MultiStatus,
	HTTPStatusCode.AlreadyReported,
	HTTPStatusCode.IMUsed,
];

export const RedirectCodes = [
	HTTPStatusCode.MultipleChoices,
	HTTPStatusCode.MovedPermanently,
	HTTPStatusCode.Found,
	HTTPStatusCode.SeeOther,
	HTTPStatusCode.NotModified,
	HTTPStatusCode.UseProxy,
	HTTPStatusCode.SwitchProxy,
	HTTPStatusCode.TemporaryRedirect,
	HTTPStatusCode.PermanentRedirect,
];

export const ClientErrorsCodes = [
	HTTPStatusCode.BadRequest,
	HTTPStatusCode.Unauthorized,
	HTTPStatusCode.PaymentRequired,
	HTTPStatusCode.Forbidden,
	HTTPStatusCode.NotFound,
	HTTPStatusCode.MethodNotAllowed,
	HTTPStatusCode.NotAcceptable,
	HTTPStatusCode.ProxyAuthenticationRequired,
	HTTPStatusCode.RequestTimeout,
	HTTPStatusCode.Conflict,
	HTTPStatusCode.Gone,
	HTTPStatusCode.LengthRequired,
	HTTPStatusCode.PreconditionFailed,
	HTTPStatusCode.PayloadTooLarge,
	HTTPStatusCode.URITooLong,
	HTTPStatusCode.UnsupportedMediaType,
	HTTPStatusCode.RangeNotSatisfiable,
	HTTPStatusCode.ExpectationFailed,
	HTTPStatusCode.ImATeapot,
	HTTPStatusCode.MisdirectedRequest,
	HTTPStatusCode.UnprocessableEntity,
	HTTPStatusCode.Locked,
	HTTPStatusCode.FailedDependency,
	HTTPStatusCode.UpgradeRequired,
	HTTPStatusCode.PreconditionRequired,
	HTTPStatusCode.TooManyRequests,
	HTTPStatusCode.RequestHeaderFieldsTooLarge,
	HTTPStatusCode.UnavailableForLegalReasons,
];

export const ServerErrorsCodes = [
	HTTPStatusCode.InternalServerError,
	HTTPStatusCode.NotImplemented,
	HTTPStatusCode.BadGateway,
	HTTPStatusCode.ServiceUnavailable,
	HTTPStatusCode.GatewayTimeout,
	HTTPStatusCode.HTTPVersionNotSupported,
	HTTPStatusCode.VariantAlsoNegotiates,
	HTTPStatusCode.InsufficientStorage,
	HTTPStatusCode.LoopDetected,
	HTTPStatusCode.NotExtended,
	HTTPStatusCode.NetworkAuthenticationRequired,
];
