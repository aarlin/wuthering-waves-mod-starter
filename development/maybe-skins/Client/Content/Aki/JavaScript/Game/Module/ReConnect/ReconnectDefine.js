"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ellipsis =
		exports.reconnectMapName =
		exports.EBackLoginViewReason =
		exports.ELogoutReason =
		exports.EReconnectProcessStep =
			void 0);
const UE = require("ue");
var EReconnectProcessStep, ELogoutReason, EBackLoginViewReason;
!(function (e) {
	(e[(e.ConvGate = 0)] = "ConvGate"),
		(e[(e.ConvRet = 1)] = "ConvRet"),
		(e[(e.ProtoKeyReq = 2)] = "ProtoKeyReq"),
		(e[(e.ProtoKeyRet = 3)] = "ProtoKeyRet"),
		(e[(e.ReconvReq = 4)] = "ReconvReq"),
		(e[(e.ReconvRet = 5)] = "ReconvRet"),
		(e[(e.ReconvCancel = 6)] = "ReconvCancel"),
		(e[(e.ReconvSuccess = 7)] = "ReconvSuccess"),
		(e[(e.ReconvFail = 8)] = "ReconvFail"),
		(e[(e.Max = 9)] = "Max");
})(
	(EReconnectProcessStep =
		exports.EReconnectProcessStep || (exports.EReconnectProcessStep = {})),
),
	(function (e) {
		(e[(e.GmBackLoginView = 0)] = "GmBackLoginView"),
			(e[(e.LogoutNotify = 1)] = "LogoutNotify"),
			(e[(e.SdkLogoutAccount = 2)] = "SdkLogoutAccount"),
			(e[(e.LoginViewQuit = 3)] = "LoginViewQuit"),
			(e[(e.NetWorkMaskViewBackBtn = 4)] = "NetWorkMaskViewBackBtn"),
			(e[(e.ExitGameConfirmBox = 5)] = "ExitGameConfirmBox");
	})((ELogoutReason = exports.ELogoutReason || (exports.ELogoutReason = {}))),
	(function (e) {
		(e[(e.Logout = 0)] = "Logout"),
			(e[(e.ReconnectMax = 1)] = "ReconnectMax"),
			(e[(e.ReconnectError = 2)] = "ReconnectError");
	})(
		(EBackLoginViewReason =
			exports.EBackLoginViewReason || (exports.EBackLoginViewReason = {})),
	),
	(exports.reconnectMapName = new UE.FName("/Game/Aki/Map/Launch/Bootstrap")),
	(exports.ellipsis = ["", ".", "..", "..."]);
