"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CompositeRewardView = void 0);
const UE = require("ue"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	RewardItemList_1 = require("./RewardItemList"),
	RewardProgressBar_1 = require("./RewardProgressBar"),
	ItemRewardController_1 = require("../ItemRewardController");
class CompositeRewardView extends UiTickViewBase_1.UiTickViewBase {
	constructor() {
		super(...arguments),
			(this.jIt = void 0),
			(this.sOe = void 0),
			(this.Hgi = void 0),
			(this.iSt = () => {
				UiManager_1.UiManager.CloseView("CompositeRewardView");
			}),
			(this.B$t = (e) => {
				this.b$t() && this.q$t();
			}),
			(this.jgi = () => {
				this.Wgi() && this.Kgi();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIText],
			[2, UE.UITexture],
			[3, UE.UITexture],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UIItem],
			[7, UE.UIItem],
		]),
			(this.BtnBindInfo = [[0, this.iSt]]);
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnRefreshRewardViewItemList,
			this.B$t,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnRefreshRewardProgressBar,
				this.jgi,
			);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnRefreshRewardViewItemList,
			this.B$t,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnRefreshRewardProgressBar,
				this.jgi,
			);
	}
	async OnBeforeStartAsync() {
		this.sOe = new RewardItemList_1.RewardItemList();
		var e = this.GetItem(5);
		await this.sOe.CreateThenShowByActorAsync(e.GetOwner(), e),
			(this.Hgi = new RewardProgressBar_1.RewardProgressBar(
				this.GetItem(6).GetOwner(),
			));
	}
	OnStart() {
		(this.jIt = this.OpenParam),
			this.G$t() && this.mGe(),
			this.Qgi() && this.Xgi(),
			this.N$t() && this.O$t(),
			this.b$t() && this.q$t(),
			this.Wgi() && this.Kgi();
		var e = this.jIt.GetRewardInfo().AudioId;
		ItemRewardController_1.ItemRewardController.PlayAudio(e);
	}
	OnAfterShow() {
		this.jIt.GetRewardInfo().IsSuccess
			? this.UiViewSequence.PlaySequence("Success", !0)
			: this.UiViewSequence.PlaySequence("Fail", !0),
			EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnShowRewardView);
	}
	OnBeforeDestroy() {
		(this.Hgi = void 0),
			(this.jIt = void 0),
			ModelManager_1.ModelManager.ItemRewardModel.ClearCurrentRewardData();
	}
	OnTick(e) {
		this.Hgi.Tick(e);
	}
	G$t() {
		var e = this.jIt.GetRewardInfo().Title;
		e = !StringUtils_1.StringUtils.IsEmpty(e);
		return this.GetItem(4).SetUIActive(e), e;
	}
	mGe() {
		var e,
			t = this.jIt.GetRewardInfo().Title;
		StringUtils_1.StringUtils.IsEmpty(t) ||
			((e = this.GetText(1)), LguiUtil_1.LguiUtil.SetLocalTextNew(e, t));
	}
	Qgi() {
		var e = this.jIt.GetRewardInfo().TitleIconPath,
			t = ((e = !StringUtils_1.StringUtils.IsEmpty(e)), this.GetTexture(2)),
			i = this.GetTexture(3);
		return t.SetUIActive(e), i.SetUIActive(e), e;
	}
	Xgi() {
		var e = this.jIt.GetRewardInfo().TitleIconPath;
		if (!StringUtils_1.StringUtils.IsEmpty(e)) {
			const t = this.GetTexture(2);
			t.SetUIActive(!1),
				this.SetTextureByPath(e, t, void 0, () => {
					t.SetUIActive(!0);
				});
		}
	}
	N$t() {
		var e = this.jIt.GetRewardInfo().ContinueText;
		e = !StringUtils_1.StringUtils.IsEmpty(e);
		return this.GetItem(7).SetUIActive(e), e;
	}
	O$t() {
		var e,
			t = this.jIt.GetRewardInfo().ContinueText;
		StringUtils_1.StringUtils.IsEmpty(t) ||
			((e = this.GetText(7)), LguiUtil_1.LguiUtil.SetLocalTextNew(e, t));
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
	Wgi() {
		var e = this.jIt.GetRewardInfo(),
			t = this.jIt.GetExtendRewardInfo();
		(e = e.IsProgressVisible),
			(t = t.ProgressQueue),
			(e = e && void 0 !== t && 0 < t?.length);
		return this.Hgi.SetActive(e), e;
	}
	Kgi() {
		var e = this.jIt.GetRewardInfo(),
			t = this.jIt.GetExtendRewardInfo().ProgressQueue;
		t &&
			0 !== t.length &&
			this.Hgi.Refresh(e.ProgressBarTitle, t, e.ProgressBarAnimationTime);
	}
}
exports.CompositeRewardView = CompositeRewardView;
