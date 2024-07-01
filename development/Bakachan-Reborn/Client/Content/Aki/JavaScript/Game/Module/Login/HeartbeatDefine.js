"use strict";
var EBeginHeartbeat, EStopHeartbeat;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EStopHeartbeat = exports.EBeginHeartbeat = void 0),
	(function (e) {
		(e[(e.GetLoginResponse = 0)] = "GetLoginResponse"),
			(e[(e.ReConnectSuccess = 1)] = "ReConnectSuccess");
	})(
		(EBeginHeartbeat =
			exports.EBeginHeartbeat || (exports.EBeginHeartbeat = {})),
	),
	(function (e) {
		(e[(e.LogoutNotify = 0)] = "LogoutNotify"),
			(e[(e.BeforeGetToken = 1)] = "BeforeGetToken"),
			(e[(e.LoginStatusInit = 2)] = "LoginStatusInit"),
			(e[(e.BackLoginView = 3)] = "BackLoginView"),
			(e[(e.ReconnectStart = 4)] = "ReconnectStart");
	})(
		(EStopHeartbeat = exports.EStopHeartbeat || (exports.EStopHeartbeat = {})),
	);
