"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TutorialController = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../Core/Net/Net"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
	UiManager_1 = require("../../Ui/UiManager"),
	ItemHintController_1 = require("../ItemHint/ItemHintController"),
	TutorialDefine_1 = require("./TutorialDefine");
class TutorialController extends UiControllerBase_1.UiControllerBase {
	static OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnLoadingNetDataDone,
			this.w4e,
		);
	}
	static OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnLoadingNetDataDone,
			this.w4e,
		);
	}
	static OnRegisterNetEvent() {
		Net_1.Net.Register(16903, this.BDo);
	}
	static OnUnRegisterNetEvent() {
		Net_1.Net.UnRegister(16903);
	}
	static OnAddOpenViewCheckFunction() {
		UiManager_1.UiManager.AddOpenViewCheckFunction(
			"TutorialView",
			TutorialController.V4e,
			"TutorialController.CanOpenView",
		);
	}
	static OnRemoveOpenViewCheckFunction() {
		UiManager_1.UiManager.RemoveOpenViewCheckFunction(
			"TutorialView",
			TutorialController.V4e,
		);
	}
	static OnTutorialTipExistChanged(e) {
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.OnTutorialTipExistChanged,
			e,
		);
	}
	static GmUnlockOneTutorial(e) {
		var o = Protocol_1.Aki.Protocol.Mcs.create();
		(o.Ekn = e),
			Net_1.Net.Call(1832, o, (e) => {
				e &&
					e.lkn === Protocol_1.Aki.Protocol.lkn.Sys &&
					ModelManager_1.ModelManager.TutorialModel.UpdateUnlockTutorials(
						e.cbs,
					);
			});
	}
	static RemoveRedDotTutorialId(e) {
		ModelManager_1.ModelManager.TutorialModel.RemoveRedDotTutorialId(e),
			this.bDo(e);
	}
	static bDo(e) {
		var o = Protocol_1.Aki.Protocol.Mcs.create();
		(o.Ekn = e),
			Net_1.Net.Call(20188, o, (o) => {
				var a;
				o &&
					o.lkn === Protocol_1.Aki.Protocol.lkn.Sys &&
					((a = Number(Object.keys(o.Vms)[0])),
					(o = o.Vms[a]),
					ModelManager_1.ModelManager.TutorialModel.RewardInfo
						? (ModelManager_1.ModelManager.TutorialModel.RewardInfo.Y5n[0].I5n +=
								o)
						: ((a = {
								$Fn: ConfigManager_1.ConfigManager.TutorialConfig.GetTutorial(e)
									.DropId,
								Y5n: [
									{
										r6n: TutorialDefine_1.TutorialUtils.FixedDropDropShowPlanId,
										G3n: a,
										I5n: o,
										Q5n: 0,
									},
								],
								V5n: 0,
								W5n: 1,
							}),
							(ModelManager_1.ModelManager.TutorialModel.RewardInfo = a)));
			});
	}
	static TryOpenAwardUiViewPending() {
		var e;
		ModelManager_1.ModelManager.TutorialModel.RewardInfo &&
			((e = ModelManager_1.ModelManager.TutorialModel.RewardInfo),
			ItemHintController_1.ItemHintController.AddItemRewardList(e),
			(ModelManager_1.ModelManager.TutorialModel.RewardInfo = void 0));
	}
	static TryUnlockAndOpenTutorialTip(e, o = void 0) {
		var a;
		ModelManager_1.ModelManager.TutorialModel.GetSavedDataById(e)
			? o(!0)
			: (((a = Protocol_1.Aki.Protocol.Mcs.create()).Ekn = e),
				Net_1.Net.Call(1832, a, (e) => {
					e && e.lkn === Protocol_1.Aki.Protocol.lkn.Sys
						? (ModelManager_1.ModelManager.TutorialModel.UpdateUnlockTutorials(
								e.cbs,
							),
							o(!0))
						: o(!1);
				}));
	}
}
((exports.TutorialController = TutorialController).BDo = (e) => {
	if (e)
		for (const o of e.ubs)
			ModelManager_1.ModelManager.TutorialModel.UpdateUnlockTutorials(o);
}),
	(TutorialController.w4e = () => {
		var e = Protocol_1.Aki.Protocol.fcs.create();
		Net_1.Net.Call(1137, e, (e) => {
			e &&
				(ModelManager_1.ModelManager.TutorialModel.InitUnlockTutorials(e.ubs),
				(e =
					ModelManager_1.ModelManager.TutorialModel.GetUnlockedTutorialDataByType(
						TutorialDefine_1.ETutorialType.All,
					))?.length &&
					ModelManager_1.ModelManager.TutorialModel.InvokeTutorialRedDot(
						e[0].SavedData,
					),
				ModelManager_1.ModelManager.TutorialModel.InitTutorialTotalData());
		});
	}),
	(TutorialController.V4e = (e) =>
		!(
			!ModelManager_1.ModelManager.FunctionModel.IsOpen(10022) ||
			(UiManager_1.UiManager.IsViewOpen("GuideTutorialTipsView") &&
				!UiManager_1.UiManager.IsViewOpen("FunctionView") &&
				!ModelManager_1.ModelManager.GuideModel.HaveCurrentTutorial())
		)),
	(TutorialController.OpenTutorialView = () => {
		UiManager_1.UiManager.OpenView("TutorialView");
	});
