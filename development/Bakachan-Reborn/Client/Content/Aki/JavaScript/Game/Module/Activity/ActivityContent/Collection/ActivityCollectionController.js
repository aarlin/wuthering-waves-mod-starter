"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivityCollectionController = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../../../Core/Net/Net"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	ActivityController_1 = require("../../ActivityController"),
	ActivityControllerBase_1 = require("../../ActivityControllerBase"),
	ActivityCollectionData_1 = require("./ActivityCollectionData"),
	ActivitySubViewCollection_1 = require("./ActivitySubViewCollection");
class ActivityCollectionController extends ActivityControllerBase_1.ActivityControllerBase {
	constructor() {
		super(...arguments),
			(this.DEe = (e, t) => {
				var o,
					r,
					i = ActivityCollectionController.vNe();
				i &&
					(r = i.QuestStateMap.get(e)) &&
					(([o] = i.GetCurrentProgress()),
					t !== Protocol_1.Aki.Protocol.kMs.Proto_Delete) &&
					((r.QuestState = t),
					i.QuestStateMap.set(e, r),
					ModelManager_1.ModelManager.ActivityModel.SaveActivityData(
						i.Id,
						e,
						0,
						0,
						t === Protocol_1.Aki.Protocol.kMs.Gms ? 1 : 0,
					),
					([r] = i.GetCurrentProgress()),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.RefreshCommonActivityRedDot,
						ActivityCollectionController.CurrentActivityId,
					),
					r !== o) &&
					ActivityController_1.ActivityController.OpenActivityById(
						ActivityCollectionController.CurrentActivityId,
					);
			});
	}
	OnGetIsOpeningActivityRelativeView() {
		return !1;
	}
	OnOpenView(e) {}
	OnGetActivityResource(e) {
		return "UiItem_ActivityCollection_Complete";
	}
	OnCreateSubPageComponent(e) {
		return new ActivitySubViewCollection_1.ActivitySubViewCollection();
	}
	OnCreateActivityData(e) {
		return new ActivityCollectionData_1.ActivityCollectionData();
	}
	OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnQuestStateChange,
			this.DEe,
		);
	}
	OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnQuestStateChange,
			this.DEe,
		);
	}
	OnRegisterNetEvent() {}
	OnUnRegisterNetEvent() {}
	static vNe() {
		return ModelManager_1.ModelManager.ActivityModel?.GetActivityById(
			ActivityCollectionController.CurrentActivityId,
		);
	}
	static RequestCollectionQuestReward(e) {
		var t = new Protocol_1.Aki.Protocol.oes();
		(t.o3n = e),
			Net_1.Net.Call(13506, t, (e) => {
				e &&
					e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
					ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
						e.lkn,
						5125,
					);
			});
	}
}
(exports.ActivityCollectionController =
	ActivityCollectionController).CurrentActivityId = 0;
