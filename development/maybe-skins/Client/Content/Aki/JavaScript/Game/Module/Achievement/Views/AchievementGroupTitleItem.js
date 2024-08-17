"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AchievementGroupTitleItem = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	AchievementController_1 = require("../AchievementController"),
	AchievementGridItem_1 = require("./AchievementGridItem"),
	AchievementProgressConfirmItem_1 = require("./AchievementProgressConfirmItem");
class AchievementGroupTitleItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.Fqe = void 0),
			(this.oqe = void 0),
			(this.Vqe = void 0),
			(this.Fbe = () => {
				this.Hqe(this.Fqe);
			}),
			(this.nqe = () => {
				AchievementController_1.AchievementController.RequestGetAchievementReward(
					!0,
					this.Fqe.GetId(),
				);
			});
	}
	Initialize(e) {
		this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIText],
			[3, UE.UIText],
			[4, UE.UITexture],
			[5, UE.UIText],
			[6, UE.UIText],
			[7, UE.UITexture],
		];
	}
	OnStart() {
		(this.oqe = new AchievementGridItem_1.AchievementGridItem()),
			this.oqe.Initialize(this.GetItem(1).GetOwner()),
			this.oqe.SetActive(!1),
			(this.Vqe =
				new AchievementProgressConfirmItem_1.AchievementProgressConfirmItem(
					this.GetItem(0),
				)),
			this.Vqe.SetClickCallback(this.nqe),
			this.AddEventListener();
	}
	AddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnAchievementGroupDataNotify,
			this.Fbe,
		);
	}
	Update(e) {
		(this.Fqe = e), this.Hqe(e);
	}
	Hqe(e) {
		var t, i, n, r, s;
		e &&
			((t = this.GetText(3)),
			(i = this.GetText(5)),
			(n = this.GetText(6)),
			(r = e.GetFinishState()),
			(s = 0 < e.GetRewards().length),
			this.GetText(2)?.SetText(e.GetTitle()),
			t.SetText(e.GetAchievementGroupProgress()),
			t?.SetUIActive(s),
			n?.SetUIActive(s),
			this.SetTextureByPath(e.GetTexture(), this.GetTexture(4)),
			this.SetTextureByPath(e.GetBackgroundIcon(), this.GetTexture(7)),
			this.Vqe?.SetActive(1 === r && s),
			this.Vqe?.RefreshRedPoint(e.RedPoint()),
			s && 1 !== r
				? 2 === r
					? (i?.SetUIActive(!0),
						LguiUtil_1.LguiUtil.SetLocalTextNew(
							i,
							"CollectActivity_state_recived",
						))
					: (i?.SetUIActive(!0),
						LguiUtil_1.LguiUtil.SetLocalTextNew(i, "Text_Doing_Text"))
				: i?.SetUIActive(!1),
			this.jqe(e));
	}
	jqe(e) {
		var t,
			i = e?.GetRewards();
		0 < i.length
			? (this.oqe.SetActive(!0),
				((t = new AchievementGridItem_1.AchievementGridItemData()).Data = i[0]),
				(t.GetRewardState = 2 === e.GetFinishState()),
				this.oqe.Refresh(t))
			: this.oqe.SetActive(!1);
	}
	OnBeforeDestroy() {
		this.RemoveEventListener();
	}
	RemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnAchievementGroupDataNotify,
			this.Fbe,
		);
	}
}
exports.AchievementGroupTitleItem = AchievementGroupTitleItem;
