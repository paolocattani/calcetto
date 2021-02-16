"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerErrorsCodes = exports.ClientErrorsCodes = exports.RedirectCodes = exports.SuccessCodes = exports.InformationCodes = exports.HTTPStatusCode = void 0;
var HTTPStatusCode;
(function (HTTPStatusCode) {
    HTTPStatusCode[HTTPStatusCode["Continue"] = 100] = "Continue";
    HTTPStatusCode[HTTPStatusCode["SwitchingProtocols"] = 101] = "SwitchingProtocols";
    HTTPStatusCode[HTTPStatusCode["Processing"] = 102] = "Processing";
    HTTPStatusCode[HTTPStatusCode["EarlyHints"] = 103] = "EarlyHints";
    HTTPStatusCode[HTTPStatusCode["InformationalResponses"] = 103] = "InformationalResponses";
    HTTPStatusCode[HTTPStatusCode["OK"] = 200] = "OK";
    HTTPStatusCode[HTTPStatusCode["Created"] = 201] = "Created";
    HTTPStatusCode[HTTPStatusCode["Accepted"] = 202] = "Accepted";
    HTTPStatusCode[HTTPStatusCode["NonAuthoritativeInformation"] = 203] = "NonAuthoritativeInformation";
    HTTPStatusCode[HTTPStatusCode["NoContent"] = 204] = "NoContent";
    HTTPStatusCode[HTTPStatusCode["ResetContent"] = 205] = "ResetContent";
    HTTPStatusCode[HTTPStatusCode["PartialContent"] = 206] = "PartialContent";
    HTTPStatusCode[HTTPStatusCode["MultiStatus"] = 207] = "MultiStatus";
    HTTPStatusCode[HTTPStatusCode["AlreadyReported"] = 208] = "AlreadyReported";
    HTTPStatusCode[HTTPStatusCode["IMUsed"] = 226] = "IMUsed";
    HTTPStatusCode[HTTPStatusCode["Success"] = 255] = "Success";
    HTTPStatusCode[HTTPStatusCode["MultipleChoices"] = 300] = "MultipleChoices";
    HTTPStatusCode[HTTPStatusCode["MovedPermanently"] = 301] = "MovedPermanently";
    HTTPStatusCode[HTTPStatusCode["Found"] = 302] = "Found";
    HTTPStatusCode[HTTPStatusCode["SeeOther"] = 303] = "SeeOther";
    HTTPStatusCode[HTTPStatusCode["NotModified"] = 304] = "NotModified";
    HTTPStatusCode[HTTPStatusCode["UseProxy"] = 305] = "UseProxy";
    HTTPStatusCode[HTTPStatusCode["SwitchProxy"] = 306] = "SwitchProxy";
    HTTPStatusCode[HTTPStatusCode["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    HTTPStatusCode[HTTPStatusCode["PermanentRedirect"] = 308] = "PermanentRedirect";
    HTTPStatusCode[HTTPStatusCode["Redirection"] = 319] = "Redirection";
    HTTPStatusCode[HTTPStatusCode["BadRequest"] = 400] = "BadRequest";
    HTTPStatusCode[HTTPStatusCode["Unauthorized"] = 401] = "Unauthorized";
    HTTPStatusCode[HTTPStatusCode["PaymentRequired"] = 402] = "PaymentRequired";
    HTTPStatusCode[HTTPStatusCode["Forbidden"] = 403] = "Forbidden";
    HTTPStatusCode[HTTPStatusCode["NotFound"] = 404] = "NotFound";
    HTTPStatusCode[HTTPStatusCode["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    HTTPStatusCode[HTTPStatusCode["NotAcceptable"] = 406] = "NotAcceptable";
    HTTPStatusCode[HTTPStatusCode["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
    HTTPStatusCode[HTTPStatusCode["RequestTimeout"] = 408] = "RequestTimeout";
    HTTPStatusCode[HTTPStatusCode["Conflict"] = 409] = "Conflict";
    HTTPStatusCode[HTTPStatusCode["Gone"] = 410] = "Gone";
    HTTPStatusCode[HTTPStatusCode["LengthRequired"] = 411] = "LengthRequired";
    HTTPStatusCode[HTTPStatusCode["PreconditionFailed"] = 412] = "PreconditionFailed";
    HTTPStatusCode[HTTPStatusCode["PayloadTooLarge"] = 413] = "PayloadTooLarge";
    HTTPStatusCode[HTTPStatusCode["URITooLong"] = 414] = "URITooLong";
    HTTPStatusCode[HTTPStatusCode["UnsupportedMediaType"] = 415] = "UnsupportedMediaType";
    HTTPStatusCode[HTTPStatusCode["RangeNotSatisfiable"] = 416] = "RangeNotSatisfiable";
    HTTPStatusCode[HTTPStatusCode["ExpectationFailed"] = 417] = "ExpectationFailed";
    HTTPStatusCode[HTTPStatusCode["ImATeapot"] = 418] = "ImATeapot";
    HTTPStatusCode[HTTPStatusCode["MisdirectedRequest"] = 421] = "MisdirectedRequest";
    HTTPStatusCode[HTTPStatusCode["UnprocessableEntity"] = 422] = "UnprocessableEntity";
    HTTPStatusCode[HTTPStatusCode["Locked"] = 423] = "Locked";
    HTTPStatusCode[HTTPStatusCode["FailedDependency"] = 424] = "FailedDependency";
    HTTPStatusCode[HTTPStatusCode["UpgradeRequired"] = 426] = "UpgradeRequired";
    HTTPStatusCode[HTTPStatusCode["PreconditionRequired"] = 428] = "PreconditionRequired";
    HTTPStatusCode[HTTPStatusCode["TooManyRequests"] = 429] = "TooManyRequests";
    HTTPStatusCode[HTTPStatusCode["RequestHeaderFieldsTooLarge"] = 431] = "RequestHeaderFieldsTooLarge";
    HTTPStatusCode[HTTPStatusCode["UnavailableForLegalReasons"] = 451] = "UnavailableForLegalReasons";
    HTTPStatusCode[HTTPStatusCode["ClientErrors"] = 511] = "ClientErrors";
    HTTPStatusCode[HTTPStatusCode["InternalServerError"] = 500] = "InternalServerError";
    HTTPStatusCode[HTTPStatusCode["NotImplemented"] = 501] = "NotImplemented";
    HTTPStatusCode[HTTPStatusCode["BadGateway"] = 502] = "BadGateway";
    HTTPStatusCode[HTTPStatusCode["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    HTTPStatusCode[HTTPStatusCode["GatewayTimeout"] = 504] = "GatewayTimeout";
    HTTPStatusCode[HTTPStatusCode["HTTPVersionNotSupported"] = 505] = "HTTPVersionNotSupported";
    HTTPStatusCode[HTTPStatusCode["VariantAlsoNegotiates"] = 506] = "VariantAlsoNegotiates";
    HTTPStatusCode[HTTPStatusCode["InsufficientStorage"] = 507] = "InsufficientStorage";
    HTTPStatusCode[HTTPStatusCode["LoopDetected"] = 508] = "LoopDetected";
    HTTPStatusCode[HTTPStatusCode["NotExtended"] = 510] = "NotExtended";
    HTTPStatusCode[HTTPStatusCode["NetworkAuthenticationRequired"] = 511] = "NetworkAuthenticationRequired";
    HTTPStatusCode[HTTPStatusCode["ServerErrors"] = 511] = "ServerErrors";
})(HTTPStatusCode = exports.HTTPStatusCode || (exports.HTTPStatusCode = {}));
exports.InformationCodes = [
    HTTPStatusCode.Continue,
    HTTPStatusCode.SwitchingProtocols,
    HTTPStatusCode.Processing,
    HTTPStatusCode.EarlyHints,
];
exports.SuccessCodes = [
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
exports.RedirectCodes = [
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
exports.ClientErrorsCodes = [
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
exports.ServerErrorsCodes = [
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
