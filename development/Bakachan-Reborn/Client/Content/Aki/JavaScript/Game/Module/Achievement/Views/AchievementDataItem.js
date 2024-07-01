"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AchievementDataItem = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	AchievementController_1 = require("../AchievementController"),
	AchievementGridItem_1 = require("./AchievementGridItem"),
	AchievementStarItem_1 = require("./AchievementStarItem");
class AchievementDataItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments),
			(this.ScrollViewDelegate = void 0),
			(this.GridIndex = 0),
			(this.DisplayIndex = 0),
			(this.tqe = void 0),
			(this.iqe = void 0),
			(this.oqe = void 0),
			(this.rqe = (e) => {
				e === this.iqe?.GetId() &&
					(this.iqe?.IfSingleAchievement() ||
						(!this.iqe?.IfSingleAchievement() &&
							0 === this.iqe.GetNextLink())) &&
					this.RefreshUi(this.iqe);
			}),
			(this.nqe = () => {
				AchievementController_1.AchievementController.RequestGetAchievementReward(
					!1,
					this.iqe.GetId(),
				);
			});
	}
	async Init(e) {
		await this.CreateByActorAsync(e.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[1, UE.UIItem],
			[2, UE.UIButtonComponent],
			[3, UE.UIText],
			[4, UE.UIItem],
			[5, UE.UIText],
			[6, UE.UIText],
			[7, UE.UIText],
			[8, UE.UIItem],
			[9, UE.UIItem],
		]),
			(this.BtnBindInfo = [[2, this.nqe]]);
	}
	OnStart() {
		void 0 === this.oqe &&
			((this.oqe = new AchievementGridItem_1.AchievementGridItem()),
			this.oqe.Initialize(this.GetItem(8).GetOwner())),
			this.oqe.SetActive(!1),
			this.AddEventListener();
	}
	Refresh(e, t, i) {
		this.RefreshUi(e);
	}
	RefreshUi(e) {
		var t, i, r, n, s, h, o;
		void 0 === e
			? Log_1.Log.CheckError() &&
				Log_1.Log.Error("Achievement", 59, "AchievementDataItem Data为空")
			: ((t = (this.iqe = e).GetCurrentProgress()),
				(i = e.GetMaxProgress()),
				(r = e.GetFinishState()),
				(o = this.GetText(5)),
				(n = this.GetText(6)),
				(s = this.GetText(3)),
				ModelManager_1.ModelManager.AchievementModel.AchievementSearchState
					? ((h =
							ModelManager_1.ModelManager.AchievementModel.CurrentSearchText),
						o.SetText(e.GetReplaceTitle(h)),
						n.SetText(e.GetReplaceDesc(h)))
					: (o.SetText(e.GetTitle()), n.SetText(e.GetDesc())),
				LguiUtil_1.LguiUtil.SetLocalText(
					this.GetText(7),
					"CollectProgress",
					t,
					i,
				),
				this.SetButtonUiActive(2, 1 === r),
				this.GetItem(1)?.SetUIActive(e.RedPoint()),
				this.GetItem(4)?.SetUIActive(2 === r),
				0 === r
					? (s?.SetUIActive(!0),
						LguiUtil_1.LguiUtil.SetLocalTextNew(s, "Text_Doing_Text"))
					: 1 === r
						? s?.SetUIActive(!1)
						: (s?.SetUIActive(!0),
							(h = TimeUtil_1.TimeUtil.DateFormat4(
								new Date(
									e.GetFinishTime() * TimeUtil_1.TimeUtil.InverseMillisecond,
								),
							)),
							s?.SetText(h)),
				0 < (o = e.GetRewards()).length && this.sqe(o[0]),
				this.aqe());
	}
	ClearItem() {
		this.Destroy();
	}
	GetUsingItem(e) {
		return this.GetRootItem().GetOwner();
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
	aqe() {
		void 0 !== this.tqe && (this.tqe.Destroy(), (this.tqe = void 0));
		var e = this.iqe.IfSingleAchievement()
			? this.iqe.GetAchievementShowStar()
			: AchievementDataItem.hqe;
		this.tqe = new AchievementStarItem_1.AchievementStarItem(
			e,
			this.iqe,
			this.GetItem(9),
		);
	}
	sqe(e) {
		this.oqe.SetActive(!0);
		var t = new AchievementGridItem_1.AchievementGridItemData();
		(t.Data = e),
			(t.GetRewardState = 2 === this.iqe.GetFinishState()),
			this.oqe.Refresh(t);
	}
	OnBeforeDestroy() {
		this.tqe && this.tqe.Destroy(),
			this.oqe && this.oqe.Destroy(),
			this.iqe && (this.iqe = void 0),
			this.RemoveEventListener();
	}
}
(exports.AchievementDataItem = AchievementDataItem).hqe = 3;
