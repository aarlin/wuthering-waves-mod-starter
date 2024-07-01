"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ReportController = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../Core/Net/Net"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
	UiManager_1 = require("../../Ui/UiManager"),
	ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
	ReportDefine_1 = require("./ReportDefine");
class ReportController extends UiControllerBase_1.UiControllerBase {
	static ReportPlayerRequest(e, r, o, l = void 0) {
		var t = new Protocol_1.Aki.Protocol.oWn();
		((r =
			((t.P8n = e.GetPlayerId()),
			(t.B8n = r),
			(t.w8n = o),
			(t.b8n = e.GetSourceType()),
			(t.q8n = l ?? { G8n: "" }),
			new Protocol_1.Aki.Protocol.S2s())).e4n = e.GetName()),
			(r.l5n = e.GetSignature()),
			(t.O8n = r),
			Net_1.Net.Call(
				23930,
				Protocol_1.Aki.Protocol.oWn.create(t),
				this.ReportPlayerResponse,
			);
	}
	static OpenReportView(e, r) {
		(e = new ReportDefine_1.ReportPersonInfo(
			e.PlayerId,
			e.PlayerName,
			e.Signature,
			r,
		)),
			UiManager_1.UiManager.OpenView("ReportView", e);
	}
}
(exports.ReportController = ReportController).ReportPlayerResponse = (e) => {
	e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
		? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
				e.lkn,
				10274,
			)
		: (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
				"ReportSuccess",
			),
			UiManager_1.UiManager.IsViewShow("ReportView") &&
				UiManager_1.UiManager.CloseView("ReportView"));
};
