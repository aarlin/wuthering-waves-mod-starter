"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AchievementController = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
	Net_1 = require("../../../Core/Net/Net"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiManager_1 = require("../../Ui/UiManager");
class AchievementController extends ControllerBase_1.ControllerBase {
	static OnInit() {
		return this.OnAddEvents(), this.OnRegisterNetEvent(), !0;
	}
	static OnClear() {
		return this.OnRemoveEvents(), this.OnUnRegisterNetEvent(), !0;
	}
	static OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnLoadingNetDataDone,
			AchievementController.obe,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.BattleViewActiveSequenceFinish,
				this.rbe,
			);
	}
	static OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnLoadingNetDataDone,
			AchievementController.obe,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.BattleViewActiveSequenceFinish,
				this.rbe,
			);
	}
	static OnRegisterNetEvent() {
		Net_1.Net.Register(9417, AchievementController.nbe),
			Net_1.Net.Register(2341, AchievementController.sbe),
			Net_1.Net.Register(11507, AchievementController.abe);
	}
	static OnUnRegisterNetEvent() {
		Net_1.Net.UnRegister(9417),
			Net_1.Net.UnRegister(2341),
			Net_1.Net.UnRegister(11507);
	}
	static OpenAchievementMainView() {
		UiManager_1.UiManager.OpenView("AchievementMainView");
	}
	static OpenAchievementDetailView(e, t, n = -1) {
		(t =
			ModelManager_1.ModelManager.AchievementModel.GetAchievementGroupData(t)),
			(e = ModelManager_1.ModelManager.AchievementModel.GetCategory(e)),
			(ModelManager_1.ModelManager.AchievementModel.CurrentSelectCategory = e),
			(ModelManager_1.ModelManager.AchievementModel.CurrentSelectGroup = t),
			(ModelManager_1.ModelManager.AchievementModel.AchievementSearchState =
				!1),
			(ModelManager_1.ModelManager.AchievementModel.CurrentSelectAchievementId =
				n),
			(ModelManager_1.ModelManager.AchievementModel.CurrentSearchText = ""),
			UiManager_1.UiManager.OpenView("AchievementDetailView");
	}
	static RequestGetAchievementReward(e, t) {
		var n = new Protocol_1.Aki.Protocol.o$n();
		(n.Ekn = t),
			(n.QFn = e),
			Net_1.Net.Call(24815, n, (e) => {
				e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
					ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
						e.lkn,
						8951,
					);
			});
	}
	static RequestAchievementFinish(e) {
		var t = new Protocol_1.Aki.Protocol.l$n();
		(t.Ekn = e),
			Net_1.Net.Call(8348, t, (e) => {
				e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
					ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
						e.lkn,
						27573,
					);
			});
	}
	static hbe(e) {
		var t = ModelManager_1.ModelManager.AchievementModel.GetAchievementData(
				e.Ekn,
			).GetFinishState(),
			n =
				(ModelManager_1.ModelManager.AchievementModel.OnAchievementProgressNotify(
					e,
				),
				ModelManager_1.ModelManager.AchievementModel.GetAchievementData(
					e.Ekn,
				).GetFinishState());
		t !== n &&
			2 !== n &&
			0 !== n &&
			((t = ModelManager_1.ModelManager.AchievementModel.GetAchievementData(
				e.Ekn,
			)),
			ModelManager_1.ModelManager.AchievementModel?.IsHideAchievementGroup(
				t.GetGroupId(),
			) ||
				(ModelManager_1.ModelManager.AchievementModel.CurrentFinishAchievementArray.push(
					e.Ekn,
				),
				this.lbe()));
	}
	static lbe() {
		if (
			!UiManager_1.UiManager.IsViewOpen("AchievementCompleteTipsView") &&
			UiManager_1.UiManager.IsViewShow("BattleView")
		)
			for (
				var e =
					ModelManager_1.ModelManager.AchievementModel
						.CurrentFinishAchievementArray;
				0 < e.length;
			) {
				var t = e.shift();
				t = ModelManager_1.ModelManager.AchievementModel.GetAchievementData(t);
				UiManager_1.UiManager.OpenView("AchievementCompleteTipsView", t);
			}
	}
}
(exports.AchievementController = AchievementController),
	((_a = AchievementController).obe = async () => {
		var e = new Protocol_1.Aki.Protocol.i$n();
		e = await Net_1.Net.CallAsync(10739, e);
		ModelManager_1.ModelManager.AchievementModel.PhraseBaseData(e);
	}),
	(AchievementController.nbe = (e) => {
		AchievementController.hbe(e.$ms);
	}),
	(AchievementController.rbe = () => {
		_a.lbe();
	}),
	(AchievementController.abe = (e) => {
		var t = e.kms.length;
		for (let n = 0; n < t; n++) AchievementController.hbe(e.kms[n]);
	}),
	(AchievementController.sbe = (e) => {
		ModelManager_1.ModelManager.AchievementModel.OnAchievementGroupProgressNotify(
			e,
		);
	});
