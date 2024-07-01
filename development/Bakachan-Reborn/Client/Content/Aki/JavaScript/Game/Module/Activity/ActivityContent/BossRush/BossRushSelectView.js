"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BossRushSelectView = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	RedDotController_1 = require("../../../../RedDot/RedDotController"),
	UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase"),
	UiManager_1 = require("../../../../Ui/UiManager"),
	LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
	ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
	GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
	LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
class BossRushSelectView extends UiTabViewBase_1.UiTabViewBase {
	constructor() {
		super(...arguments),
			(this.CPr = void 0),
			(this.v5t = void 0),
			(this.EPe = void 0),
			(this.Iki = () => new BossRushMainViewScrollItem()),
			(this.cDo = () => {
				UiManager_1.UiManager.OpenView(
					"ActivityRewardPopUpView",
					this.CPr.GetRewardViewData(),
				);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIText],
			[2, UE.UILoopScrollViewComponent],
			[3, UE.UIItem],
			[4, UE.UIItem],
		]),
			(this.BtnBindInfo = [[0, this.cDo]]);
	}
	OnStart() {
		var e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(
			ModelManager_1.ModelManager.BossRushModel.CurrentSelectActivityId,
		);
		(this.CPr = e),
			(this.v5t = new LoopScrollView_1.LoopScrollView(
				this.GetLoopScrollViewComponent(2),
				this.GetItem(3).GetOwner(),
				this.Iki,
			)),
			(this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem));
	}
	x6e() {
		var e = this.GetItem(4);
		RedDotController_1.RedDotController.BindRedDot(
			"BossRushReward",
			e,
			void 0,
			this.CPr?.Id,
		);
	}
	Dpt() {
		var e = this.GetItem(4);
		RedDotController_1.RedDotController.UnBindGivenUi("BossRushReward", e);
	}
	Mni() {
		this.v5t && this.v5t.RefreshByData(this.CPr.GetBossRushLevelDetailInfo());
	}
	OnBeforeShow() {
		this.Ebn(), this.Mni(), this.ELn(), this.x6e();
	}
	Ebn() {
		let e = "Start";
		ModelManager_1.ModelManager.BossRushModel.PlayBackAnimation &&
			(e = "ShowView"),
			this.EPe?.PlaySequencePurely(e),
			(ModelManager_1.ModelManager.BossRushModel.PlayBackAnimation = !1);
	}
	OnBeforeHide() {
		this.Dpt();
	}
	ELn() {
		this.GetText(1).SetText(this.CPr.GetFullScore().toString());
	}
	GetGuideUiItemAndUiItemForShowEx(e) {
		if (1 === e.length && !isNaN(Number(e[0])))
			return (
				(e = Number(e[0])),
				(e = this.v5t.UnsafeGetGridProxy(e).GetButtonItem()) ? [e, e] : void 0
			);
	}
}
exports.BossRushSelectView = BossRushSelectView;
class BossRushMainViewScrollItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments),
			(this.Y6i = void 0),
			(this.nqe = () => {
				var e;
				this.Y6i?.GetUnLockState()
					? ((e =
							ModelManager_1.ModelManager.BossRushModel.GetBossRushTeamInfoByActivityId(
								ModelManager_1.ModelManager.BossRushModel
									.CurrentSelectActivityId,
							)).Clear(),
						e.SetCurrentSelectLevel(this.Y6i),
						(ModelManager_1.ModelManager.BossRushModel.CurrentSelectLevelDetailData =
							this.Y6i),
						(ModelManager_1.ModelManager.BossRushModel.CurrentTeamInfo =
							ModelManager_1.ModelManager.BossRushModel.CurrentSelectLevelDetailData.ConvertToTeamInfo()),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.RequestChangeBossRushView,
							"BossRushLevelDetailView",
						))
					: ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
							"BossRushLevelLock",
						);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UITexture],
			[2, UE.UIItem],
			[1, UE.UIItem],
			[3, UE.UIText],
			[4, UE.UIText],
			[5, UE.UIButtonComponent],
			[6, UE.UITexture],
		]),
			(this.BtnBindInfo = [[5, this.nqe]]);
	}
	Refresh(e, t, o) {
		(this.Y6i = e), this.L7e(e), this.Q2e(e), this.gPr(e), this.fPr(e);
	}
	fPr(e) {
		this.SetTextureByPath(e.GetMonsterTexturePath(), this.GetTexture(0));
		var t = this.GetTexture(6);
		t.SetUIActive(!e.GetUnLockState()),
			this.SetTextureByPath(e.GetMonsterTexturePath(), t);
	}
	L7e(e) {
		(e = e.GetUnLockState()),
			this.GetItem(1).SetUIActive(e),
			this.GetItem(2).SetUIActive(!e);
	}
	Q2e(e) {
		e.GetUnLockState() && this.GetText(3).SetText(e.GetScore().toString());
	}
	gPr(e) {
		e.GetUnLockState() || this.GetText(4).SetText(e.GetUnlockTimeText());
	}
	GetButtonItem() {
		return this.GetButton(5)?.RootUIComp;
	}
}
