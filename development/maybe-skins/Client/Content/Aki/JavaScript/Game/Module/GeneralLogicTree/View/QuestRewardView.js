"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.QuestRewardView = void 0);
const UE = require("ue"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	QuestRewardItemList_1 = require("./QuestRewardItemList"),
	ItemRewardController_1 = require("../../ItemReward/ItemRewardController");
class QuestRewardView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.jIt = void 0),
			(this.sOe = void 0),
			(this.iSt = () => {
				UiManager_1.UiManager.CloseView(this.Info.Name);
			}),
			(this.B$t = (e) => {
				this.b$t() && this.q$t();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIText],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIText],
		]),
			(this.BtnBindInfo = [[0, this.iSt]]);
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnRefreshRewardViewItemList,
			this.B$t,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ChangeChildView,
				this.iSt,
			);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnRefreshRewardViewItemList,
			this.B$t,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ChangeChildView,
				this.iSt,
			);
	}
	OnStart() {
		var e = this.OpenParam;
		e &&
			((this.jIt = e),
			(this.sOe = new QuestRewardItemList_1.QuestRewardItemList(
				this.GetItem(3).GetOwner(),
			)),
			this.G$t() && this.mGe(),
			this.N$t() && this.O$t(),
			this.b$t() && this.q$t(),
			(e = e.GetRewardInfo().AudioId),
			ItemRewardController_1.ItemRewardController.PlayAudio(e));
	}
	OnAfterDestroy() {
		this.jIt = void 0;
	}
	OnAfterShow() {
		EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnShowRewardView);
	}
	OnBeforeDestroyImplement() {
		this.jIt.GetRewardInfo().OnCloseCallback?.(),
			ModelManager_1.ModelManager.ItemRewardModel.ClearCurrentRewardData();
	}
	G$t() {
		var e = this.jIt.GetRewardInfo().Title;
		e = !StringUtils_1.StringUtils.IsEmpty(e);
		return this.GetItem(2).SetUIActive(e), e;
	}
	mGe() {
		var e,
			t = this.jIt.GetRewardInfo().Title;
		StringUtils_1.StringUtils.IsEmpty(t) ||
			((e = this.GetText(1)), LguiUtil_1.LguiUtil.SetLocalTextNew(e, t));
	}
	N$t() {
		var e = this.jIt.GetRewardInfo().ContinueText;
		e = !StringUtils_1.StringUtils.IsEmpty(e);
		return this.GetText(4).SetUIActive(e), e;
	}
	O$t() {
		var e,
			t = this.jIt.GetRewardInfo().ContinueText;
		StringUtils_1.StringUtils.IsEmpty(t) ||
			((e = this.GetText(4)), LguiUtil_1.LguiUtil.SetLocalTextNew(e, t));
	}
	b$t() {
		var e = this.jIt.GetRewardInfo().IsItemVisible,
			t = this.jIt.GetItemList();
		e = e && void 0 !== t && 0 < t?.length;
		return this.sOe.GetActive() !== e && this.sOe.SetActive(e), e;
	}
	q$t() {
		this.sOe.Refresh(this.jIt.GetItemList());
	}
}
exports.QuestRewardView = QuestRewardView;
