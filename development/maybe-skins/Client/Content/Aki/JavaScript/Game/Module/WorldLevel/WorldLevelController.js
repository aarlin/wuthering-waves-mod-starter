"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WorldLevelController = void 0);
const UE = require("ue"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../Core/Net/Net"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
	UiManager_1 = require("../../Ui/UiManager"),
	ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder");
class WorldLevelController extends UiControllerBase_1.UiControllerBase {
	static OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OriginWorldLevelUp,
			this.OnOriginWorldLevelUp,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.BackLoginView,
				this.mio,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CloseView,
				this.$Ge,
			);
	}
	static OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OriginWorldLevelUp,
			this.OnOriginWorldLevelUp,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.BackLoginView,
				this.mio,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CloseView,
				this.$Ge,
			);
	}
	static OnRegisterNetEvent() {}
	static OnUnRegisterNetEvent() {}
	static OnBasicInfoNotify(e) {
		this.SetWorldLevelAttributes(e);
	}
	static OnPlayerAttrNotify(e) {
		this.SetWorldLevelAttributes(e);
	}
	static SetWorldLevelAttributes(e) {
		for (const o of e)
			o.Ckn === Protocol_1.Aki.Protocol.U2s.Fgs &&
				(ModelManager_1.ModelManager.WorldLevelModel.OriginWorldLevel = o.Sfs),
				o.Ckn === Protocol_1.Aki.Protocol.U2s.Vgs &&
					(ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel = o.Sfs),
				o.Ckn === Protocol_1.Aki.Protocol.U2s.gbs &&
					(ModelManager_1.ModelManager.WorldLevelModel.LastChangeWorldLevelTimeStamp =
						o.Sfs),
				o.Ckn === Protocol_1.Aki.Protocol.U2s.x6n &&
					(ModelManager_1.ModelManager.WorldLevelModel.Sex = o.Sfs),
				o.Ckn === Protocol_1.Aki.Protocol.U2s.Proto_Sign &&
					ModelManager_1.ModelManager.PersonalModel.SetSignature(o.t4n);
	}
	static SendWorldLevelDownRequest() {
		var e = Protocol_1.Aki.Protocol.bcs.create();
		Net_1.Net.Call(3657, e, (e) => {
			e &&
				(e.lkn === Protocol_1.Aki.Protocol.lkn.Sys
					? ((ModelManager_1.ModelManager.WorldLevelModel.OriginWorldLevel =
							e.Fgs),
						(ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel = e.Vgs),
						(ModelManager_1.ModelManager.WorldLevelModel.LastChangeWorldLevelTimeStamp =
							e.gbs),
						ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
							WorldLevelController.GetLocalText(
								"WorldLevelAdjustTo",
								ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel.toString(),
							),
						))
					: ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
							e.lkn,
							2055,
						));
		});
	}
	static SendWorldLevelRegainRequest() {
		var e = Protocol_1.Aki.Protocol.qcs.create();
		Net_1.Net.Call(2780, e, (e) => {
			e &&
				(e.lkn === Protocol_1.Aki.Protocol.lkn.Sys
					? ((ModelManager_1.ModelManager.WorldLevelModel.OriginWorldLevel =
							e.Fgs),
						(ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel = e.Vgs),
						(ModelManager_1.ModelManager.WorldLevelModel.LastChangeWorldLevelTimeStamp =
							e.gbs),
						ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
							WorldLevelController.GetLocalText(
								"WorldLevelAdjustTo",
								ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel.toString(),
							),
						))
					: ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
							e.lkn,
							27127,
						));
		});
	}
	static GetLocalText(e, o) {
		e = ConfigManager_1.ConfigManager.TextConfig.GetTextById(e);
		var r = UE.NewArray(UE.BuiltinString);
		return r.Add(o), UE.KuroStaticLibrary.KuroFormatText(e ?? "", r);
	}
}
((exports.WorldLevelController = WorldLevelController).OnOriginWorldLevelUp =
	() => {
		UiManager_1.UiManager.IsViewShow("WorldLevelUpView")
			? EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.WorldLevelUpViewRefresh,
				)
			: UiManager_1.UiManager.OpenView("WorldLevelUpView");
	}),
	(WorldLevelController.OpenWorldLevelInfoView = () => {
		UiManager_1.UiManager.IsViewShow("WorldLevelInfoView") ||
			UiManager_1.UiManager.OpenView("WorldLevelInfoView");
	}),
	(WorldLevelController.$Ge = (e) => {
		"FunctionView" === e &&
			UiManager_1.UiManager.IsViewShow("WorldLevelInfoView") &&
			UiManager_1.UiManager.CloseView("WorldLevelInfoView");
	}),
	(WorldLevelController.mio = () => {
		UiManager_1.UiManager.IsViewShow("WorldLevelInfoView") &&
			UiManager_1.UiManager.CloseView("WorldLevelInfoView");
	});
