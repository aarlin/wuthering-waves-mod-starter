"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattleUiSetController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../Core/Net/Net"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
class BattleUiSetController extends UiControllerBase_1.UiControllerBase {
	static OnInit() {
		return !0;
	}
	static OnClear() {
		return !0;
	}
	static OnRegisterNetEvent() {
		Net_1.Net.Register(20372, BattleUiSetController.Jdt);
	}
	static OnUnRegisterNetEvent() {
		Net_1.Net.UnRegister(20372);
	}
	static MobileButtonSettingUpdateRequest(e) {
		var t = new Protocol_1.Aki.Protocol.x_s();
		(t.R3n = e),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"BattleUiSet",
					8,
					"MobileButtonSettingUpdateRequest 客户端请求移动端键位设置",
					["request", t],
				),
			Net_1.Net.Call(23115, Protocol_1.Aki.Protocol.x_s.create(t), this.zdt);
	}
}
((exports.BattleUiSetController = BattleUiSetController).Jdt = (e) => {
	if (
		(Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("BattleUiSet", 8, "SettingNotify 通知移动端按键设置", [
				"notify",
				e,
			]),
		(e = e.R3n))
	) {
		var t = ModelManager_1.ModelManager.BattleUiSetModel;
		for (const r of e) {
			var o = r.Ekn;
			if (!(o = t.GetPanelItemDataByConfigId(o))) return;
			(o.Size = r.x3n),
				(o.EditSize = r.x3n),
				(o.Alpha = r.P3n),
				(o.EditAlpha = r.P3n),
				(o.OffsetX = r.B3n),
				(o.EditOffsetX = r.B3n),
				(o.OffsetY = r.w3n),
				(o.EditOffsetY = r.w3n),
				(o.HierarchyIndex = r.b3n),
				(o.EditorHierarchyIndex = r.b3n);
		}
	}
}),
	(BattleUiSetController.zdt = (e) => {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"BattleUiSet",
				8,
				"MobileButtonSettingUpdateResponse 服务端返回移动端键位设置",
				["response", e],
			),
			e.lkn === Protocol_1.Aki.Protocol.lkn.Sys &&
				ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
					"SaveButton",
				);
	});
