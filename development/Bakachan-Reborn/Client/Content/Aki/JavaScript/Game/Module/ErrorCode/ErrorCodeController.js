"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ErrorCodeController = void 0);
const Cpp = require("cpp"),
	UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../Core/Net/Net"),
	PackageConfigUtil_1 = require("../../Common/PackageConfigUtil"),
	PublicUtil_1 = require("../../Common/PublicUtil"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
	ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
	LoginModel_1 = require("../Login/LoginModel"),
	LogReportController_1 = require("../LogReport/LogReportController"),
	LogReportDefine_1 = require("../LogReport/LogReportDefine"),
	ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
class MessageDecodeData extends LogReportDefine_1.CommonLogData {
	constructor() {
		super(),
			(this.event_id = "1022"),
			(this.i_kcp_conv = 0),
			(this.i_seq_no = 0),
			(this.i_message_id = 0),
			(this.i_crc = 0),
			(this.i_error_code = 0),
			(this.s_channel_id = ""),
			(this.s_client_ip = ""),
			(this.s_before_hexdump = ""),
			(this.s_after_hexdump = "");
	}
}
class ErrorCodeController extends UiControllerBase_1.UiControllerBase {
	static OnInit() {
		return (
			Net_1.Net.SetExceptionHandle(ErrorCodeController.X4t),
			Cpp.FKuroPuertsBridget.RegisterSeriousErrorCallback(
				this.OpenConfirmBoxByText,
			),
			!0
		);
	}
	static OnClear() {
		return (
			Cpp.FKuroPuertsBridget.RegisterSeriousErrorCallback(
				this.OpenConfirmBoxByText,
			),
			!0
		);
	}
	static OnRegisterNetEvent() {
		Net_1.Net.Register(7982, this.$4t), Net_1.Net.Register(19534, this.Y4t);
	}
	static OnUnRegisterNetEvent() {
		Net_1.Net.UnRegister(7982), Net_1.Net.UnRegister(19534);
	}
	static OpenErrorCodeScrollingTipsView(r, o) {
		var e = ConfigManager_1.ConfigManager.ErrorCodeConfig.GetTextByErrorId(r);
		r === Protocol_1.Aki.Protocol.lkn.Proto_PropRewardTips &&
			((r = o[0]),
			(o[0] =
				ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexLocalName(
					Number(r),
				))),
			(r = ErrorCodeController.J4t(e, o));
		ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(r);
	}
	static OpenErrorCodeTipView(r, o, e = void 0, t = !0, i = !0) {
		var n = ConfigManager_1.ConfigManager.ErrorCodeConfig,
			l = n.GetTextByErrorId(r);
		let C = ErrorCodeController.J4t(l, e);
		if (
			((l = n.IsTipsOnly(r)),
			(n =
				PackageConfigUtil_1.PackageConfigUtil.GetPackageConfigOrDefault(
					LoginModel_1.STREAM,
				) === LoginModel_1.STREAM_MAINLINE),
			t && ErrorCodeController.IsErrorCodeOpen)
		) {
			if (l && !n)
				return (
					ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(
						9,
						void 0,
						void 0,
						[C],
					),
					void (
						Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug(
							"ErrorCode",
							9,
							"服务器错误信息",
							["error", C],
							["errorCode", r],
							["errorParams", e],
						)
					)
				);
			i && (C = `[${o}][${r}]:` + C), this.OpenConfirmBoxByText(C);
		}
		Log_1.Log.CheckError() &&
			Log_1.Log.Error(
				"ErrorCode",
				9,
				"服务器错误信息",
				["error", C],
				["errorParams", e],
			);
	}
	static LogOnlyErrorCode(r, o = void 0) {
		var e = ConfigManager_1.ConfigManager.ErrorCodeConfig.GetTextByErrorId(r);
		r = `[${r}]:` + ErrorCodeController.J4t(e, o);
		Log_1.Log.CheckError() &&
			Log_1.Log.Error(
				"ErrorCode",
				9,
				"服务器错误信息",
				["error", r],
				["errorParams", o],
			);
	}
	static J4t(r, o) {
		let e = r;
		if (o)
			for (let r = 0; r < o.length; r++) {
				var t = o[r],
					i = `{${r}}`;
				e = e.split(i).join(t);
			}
		return e;
	}
	static OpenLoginStatusCodeTipView(r) {
		var o = ConfigManager_1.ConfigManager.ErrorCodeConfig.GetTextByErrorId(r);
		ErrorCodeController.IsErrorCodeOpen && this.OpenConfirmBoxByText(o),
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"ErrorCode",
					9,
					"Http登录返回错误码",
					["code", r],
					["info", o],
				);
	}
	static OpenConfirmBoxByTextId(r) {
		var o;
		ErrorCodeController.IsErrorCodeOpen &&
			((r = ConfigManager_1.ConfigManager.TextConfig.GetTextById(r)),
			(o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(33)).SetTextArgs(r),
			(o.NotAddChildToTopStackView = !0),
			ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
				o,
			));
	}
}
(exports.ErrorCodeController = ErrorCodeController),
	((_a = ErrorCodeController).IsErrorCodeOpen = !0),
	(ErrorCodeController.$4t = (r) => {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("Net", 31, "服务端通知客户端消息解码失败:", [
				"notify",
				r,
			]);
		var o = new MessageDecodeData();
		(o.s_channel_id = r.Z4n),
			(o.i_kcp_conv = r.tPs),
			(o.i_error_code = r.Kms),
			(o.i_seq_no = r.iPs),
			(o.s_client_ip = PublicUtil_1.PublicUtil.GetLocalHost()),
			([o.i_message_id, o.i_crc, o.s_before_hexdump, o.s_after_hexdump] =
				Net_1.Net.GetCachedMessageData(r.iPs)),
			LogReportController_1.LogReportController.LogReport(o);
	}),
	(ErrorCodeController.Y4t = (r) => {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("Gm", 8, "5651_服务端通知客户端系统提示信息:", [
				"notify",
				r,
			]);
		var o = r.Fms;
		r = r.lkn;
		ErrorCodeController.OpenErrorCodeScrollingTipsView(r, o);
	}),
	(ErrorCodeController.X4t = (r, o, e, t, i) => {
		o === Protocol_1.Aki.Protocol.lkn.Proto_MsgFunctionClose
			? (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
					MultiTextLang_1.configMultiTextLang.GetLocalTextNew("FunctionClose"),
				),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"ErrorCode",
						38,
						"服务器异常: 功能关闭",
						["errorCode", o],
						["RpcId", r],
						["msgId", e],
						["message", t],
						["errorMessage", i],
					))
			: (UE.KuroStaticLibrary.IsBuildShipping() ||
					_a.OpenErrorCodeTipView(o, e),
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"ErrorCode",
						9,
						"服务器异常",
						["errorCode", o],
						["RpcId", r],
						["msgId", e],
						["message", t],
						["errorMessage", i],
					));
	}),
	(ErrorCodeController.OpenConfirmBoxByText = (r) => {
		var o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(33);
		o.SetTextArgs(r),
			ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
				o,
			);
	});
