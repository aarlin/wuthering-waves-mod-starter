"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AchievementSearchContentItem = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	AchievementController_1 = require("../AchievementController"),
	AchievementProgressConfirmItem_1 = require("./AchievementProgressConfirmItem"),
	AchievementProgressItem_1 = require("./AchievementProgressItem"),
	AchievementStarItem_1 = require("./AchievementStarItem"),
	AchievementGridItem_1 = require("./AchievementGridItem");
class AchievementSearchContentItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.tqe = void 0),
			(this.iqe = void 0),
			(this.hGe = void 0),
			(this.oqe = void 0),
			(this.lGe = void 0),
			(this.wqe = void 0),
			(this.rqe = (e) => {
				ModelManager_1.ModelManager.AchievementModel.AchievementSearchState ||
					(e === this.iqe?.GetId() &&
						(this.iqe?.IfSingleAchievement() ||
							(!this.iqe?.IfSingleAchievement() &&
								0 === this.iqe.GetNextLink())) &&
						(this.Pqe(),
						this.Nqe(),
						this.aqe(),
						this._Ge(),
						this.jqe(),
						this.uGe(),
						this.cGe()));
			}),
			(this.nqe = () => {
				AchievementController_1.AchievementController.RequestGetAchievementReward(
					!1,
					this.iqe.GetId(),
				);
			}),
			(this.wqe = e);
	}
	async Init() {
		await this.CreateByActorAsync(this.wqe.GetOwner());
	}
	GetItemSize(e) {
		var t = this.GetRootItem();
		return e.Set(t.GetWidth(), t.GetHeight()), e.ToUeVector2D(!0);
	}
	ClearItem() {
		this.Destroy();
	}
	GetUsingItem() {
		return this.GetRootItem().GetOwner();
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIText],
			[3, UE.UIText],
			[4, UE.UIText],
			[5, UE.UIItem],
			[6, UE.UIItem],
		];
	}
	OnStart() {
		(this.hGe = new AchievementProgressItem_1.AchievementProgressItem(
			this.GetItem(6),
		)),
			this.hGe.SetActive(!0),
			(this.oqe = new AchievementGridItem_1.AchievementGridItem()),
			this.oqe.Initialize(this.GetItem(1).GetOwner()),
			(this.lGe =
				new AchievementProgressConfirmItem_1.AchievementProgressConfirmItem(
					this.GetItem(0),
				)),
			this.lGe.SetClickCallback(this.nqe),
			this.AddEventListener();
	}
	AddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnAchievementDataWithIdNotify,
			this.rqe,
		);
	}
	RemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnAchievementDataWithIdNotify,
			this.rqe,
		);
	}
	Update(e) {
		(this.iqe = e.AchievementData),
			this.mGe(),
			this.Pqe(),
			this.Nqe(),
			this.aqe(),
			this._Ge(),
			this.jqe(),
			this.uGe(),
			this.cGe();
	}
	mGe() {
		ModelManager_1.ModelManager.AchievementModel.AchievementSearchState
			? this.GetText(2).SetText(
					this.iqe.GetReplaceTitle(
						ModelManager_1.ModelManager.AchievementModel.CurrentSearchText,
					),
				)
			: this.GetText(2).SetText(this.iqe.GetTitle());
	}
	Pqe() {
		ModelManager_1.ModelManager.AchievementModel.AchievementSearchState
			? this.GetText(4).SetText(
					this.iqe.GetReplaceDesc(
						ModelManager_1.ModelManager.AchievementModel.CurrentSearchText,
					),
				)
			: this.GetText(4).SetText(this.iqe.GetDesc());
	}
	Nqe() {
		var e = this.iqe.GetCurrentProgress(),
			t = this.iqe.GetMaxProgress();
		LguiUtil_1.LguiUtil.SetLocalText(this.GetText(3), "CollectProgress", e, t);
	}
	aqe() {
		void 0 !== this.tqe && (this.tqe.Destroy(), (this.tqe = void 0));
		var e = this.iqe.IfSingleAchievement()
			? this.iqe.GetAchievementShowStar()
			: AchievementSearchContentItem.hqe;
		this.tqe = new AchievementStarItem_1.AchievementStarItem(
			e,
			this.iqe,
			this.GetItem(5),
		);
	}
	_Ge() {
		this.lGe.RefreshRedPoint(this.iqe.RedPoint());
	}
	uGe() {
		this.lGe.SetActive(1 === this.iqe.GetFinishState());
	}
	cGe() {
		this.hGe.RefreshState(this.iqe);
	}
	jqe() {
		var e = this.iqe.GetRewards();
		0 < e.length && this.sqe(e[0]);
	}
	sqe(e) {
		var t = new AchievementGridItem_1.AchievementGridItemData();
		(t.Data = e),
			(t.GetRewardState = 2 === this.iqe.GetFinishState()),
			this.oqe.Refresh(t);
	}
	OnBeforeDestroy() {
		this.tqe && (this.tqe.Destroy(), (this.tqe = void 0)),
			this.RemoveEventListener();
	}
}
(exports.AchievementSearchContentItem = AchievementSearchContentItem).hqe = 3;
