"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FragmentMemoryController = exports.INFO_FRAGMENTMEMORYITEM = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
	Net_1 = require("../../../Core/Net/Net"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiManager_1 = require("../../Ui/UiManager");
exports.INFO_FRAGMENTMEMORYITEM = 70140004;
class FragmentMemoryController extends ControllerBase_1.ControllerBase {
	static OnInit() {
		return this.OnAddEvents(), this.OnRegisterNetEvent(), !0;
	}
	static OnClear() {
		return this.OnRemoveEvents(), this.OnUnRegisterNetEvent(), !0;
	}
	static OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnLoadingNetDataDone,
			this.POt,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ActiveBattleView,
				this.JDe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnSpecialItemUse,
				this.k6e,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CreateViewInstance,
				this.g7e,
			);
	}
	static OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnSpecialItemUse,
			this.k6e,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnLoadingNetDataDone,
				this.POt,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ActiveBattleView,
				this.JDe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CreateViewInstance,
				this.g7e,
			);
	}
	static OnRegisterNetEvent() {
		Net_1.Net.Register(11253, this.EUn), Net_1.Net.Register(27525, this.yUn);
	}
	static OnUnRegisterNetEvent() {
		Net_1.Net.UnRegister(11253), Net_1.Net.UnRegister(27525);
	}
	static iVi() {
		0 !==
			ModelManager_1.ModelManager.FragmentMemoryModel.CurrentUnlockCollectId &&
			!UiManager_1.UiManager.IsViewShow("ObtainFragmentView") &&
			UiManager_1.UiManager.IsViewShow("BattleView") &&
			(ModelManager_1.ModelManager.FragmentMemoryModel
				.CurrentUnlockCollectId ===
				ModelManager_1.ModelManager.FragmentMemoryModel
					.CurrentTrackFragmentId &&
				ModelManager_1.ModelManager.FragmentMemoryModel.TryRemoveCurrentTrackEntity(),
			UiManager_1.UiManager.OpenView(
				"ObtainFragmentView",
				ModelManager_1.ModelManager.FragmentMemoryModel.CurrentUnlockCollectId,
			));
	}
	static RequestPhotoMemory() {
		Net_1.Net.Call(3571, Protocol_1.Aki.Protocol.ums.create(), (e) => {
			ModelManager_1.ModelManager.FragmentMemoryModel.OnPhotoMemoryResponse(e);
		});
	}
	static RequestMemoryReward(e) {
		var t = Protocol_1.Aki.Protocol.Cms.create();
		(t.o5n = e),
			Net_1.Net.Call(10748, t, (e) => {
				e.K0s !== Protocol_1.Aki.Protocol.lkn.Sys &&
					ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
						e.K0s,
						12270,
					);
			});
	}
	static OpenFragmentMemoryView() {
		UiManager_1.UiManager.OpenView("MemoryDetailView");
	}
}
(exports.FragmentMemoryController = FragmentMemoryController),
	((_a = FragmentMemoryController).POt = () => {
		_a.RequestPhotoMemory();
	}),
	(FragmentMemoryController.EUn = (e) => {
		const t = ModelManager_1.ModelManager.FragmentMemoryModel.GetCollectedIds();
		ModelManager_1.ModelManager.FragmentMemoryModel.OnPhotoMemoryUpdate(e),
			0 <
				(e =
					ModelManager_1.ModelManager.FragmentMemoryModel.GetCollectedIds().filter(
						(e) => !t.includes(e),
					)).length &&
				(ModelManager_1.ModelManager.FragmentMemoryModel.CurrentUnlockCollectId =
					e[0]),
			_a.iVi();
	}),
	(FragmentMemoryController.JDe = () => {
		_a.iVi();
	}),
	(FragmentMemoryController.yUn = (e) => {
		ModelManager_1.ModelManager.FragmentMemoryModel.OnPhotoMemoryCollectUpdate(
			e,
		),
			ModelManager_1.ModelManager.FragmentMemoryModel.TryRemoveCurrentTrackEntity();
	}),
	(FragmentMemoryController.k6e = (e, t) => {
		e === exports.INFO_FRAGMENTMEMORYITEM && _a.OpenFragmentMemoryView();
	}),
	(FragmentMemoryController.g7e = (e) => {
		"CommonActivityView" === e.Info.Name &&
			(ModelManager_1.ModelManager.FragmentMemoryModel.ActivitySubViewTryPlayAnimation =
				"");
	});
