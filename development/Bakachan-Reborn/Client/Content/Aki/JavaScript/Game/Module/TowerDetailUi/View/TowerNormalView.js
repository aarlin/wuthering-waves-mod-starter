"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TowerNormalView = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	RedDotController_1 = require("../../../RedDot/RedDotController"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
	ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
	InstanceDungeonEntranceController_1 = require("../../InstanceDungeon/InstanceDungeonEntranceController"),
	GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
	TowerController_1 = require("../TowerController"),
	TowerData_1 = require("../TowerData"),
	TowerAreaItem_1 = require("./TowerAreaItem"),
	TowerTitleItem_1 = require("./TowerTitleItem");
class TowerNormalView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.jLo = void 0),
			(this.WLo = void 0),
			(this.KLo = void 0),
			(this.QLo = !1),
			(this.XLo = !0),
			(this.uTt = void 0),
			(this.EPe = void 0),
			(this.$Lo = 1),
			(this.sGe = () => new TowerAreaItem_1.TowerAreaItem()),
			(this.YLo = (e) => {
				1 === e &&
					(this.EPe.StopCurrentSequence(),
					this.EPe.PlaySequencePurely("Switch"),
					(this.XLo = !0),
					this.WLo.SetToggleState(0),
					this.JLo(TowerData_1.LOW_RISK_DIFFICULTY));
			}),
			(this.zLo = (e) => {
				1 === e &&
					(this.EPe.StopCurrentSequence(),
					this.EPe.PlaySequencePurely("Switch"),
					(this.XLo = !1),
					this.jLo.SetToggleState(0),
					this.JLo(TowerData_1.HIGH_RISK_DIFFICULTY));
			}),
			(this.ZLo = () => {
				1 ===
					ModelManager_1.ModelManager.TowerModel?.GetDifficultyRewardProgress(
						ModelManager_1.ModelManager.TowerModel.CurrentSelectDifficulties,
					) &&
					ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsById(
						"HaveAllReward",
					),
					UiManager_1.UiManager.OpenView("TowerRewardView", void 0, (e, t) => {
						this.AddChildViewById(t);
					});
			}),
			(this.eDo = () => {
				UiManager_1.UiManager.GetViewByName("TowerVariationView")
					? this.CloseMe()
					: UiManager_1.UiManager.OpenViewAsync("TowerVariationView");
			}),
			(this.tDo = () => {
				ControllerHolder_1.ControllerHolder.PayShopController.OpenPayShopViewWithTab(
					5,
					0,
				);
			}),
			(this.iDo = () => {
				var e =
					ModelManager_1.ModelManager.TowerModel?.GetDifficultyRewardProgress(
						ModelManager_1.ModelManager.TowerModel.CurrentSelectDifficulties,
					);
				this.GetSprite(9)?.SetFillAmount(e),
					1 === e
						? (this.GetItem(15)?.SetUIActive(!0),
							this.GetItem(16)?.SetUIActive(!0))
						: (this.GetItem(15)?.SetUIActive(!1),
							this.GetItem(16)?.SetUIActive(!1));
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIHorizontalLayout],
			[2, UE.UIButtonComponent],
			[3, UE.UIButtonComponent],
			[4, UE.UIExtendToggle],
			[5, UE.UIExtendToggle],
			[6, UE.UIItem],
			[7, UE.UIItem],
			[8, UE.UIItem],
			[9, UE.UISprite],
			[10, UE.UIButtonComponent],
			[11, UE.UIItem],
			[12, UE.UIItem],
			[13, UE.UIItem],
			[14, UE.UIItem],
			[15, UE.UIItem],
			[16, UE.UIItem],
		]),
			(this.BtnBindInfo = [
				[2, this.ZLo],
				[3, this.eDo],
				[10, this.tDo],
			]);
	}
	async oDo() {
		UiManager_1.UiManager.GetViewByName("TowerVariationView") &&
			(await UiManager_1.UiManager.CloseViewAsync("TowerVariationView")),
			this.CloseMe();
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnTowerRewardReceived,
			this.iDo,
		);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnTowerRewardReceived,
			this.iDo,
		);
	}
	OnStart() {
		(this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
			(this.KLo = new GenericLayout_1.GenericLayout(
				this.GetHorizontalLayout(1),
				this.sGe,
			)),
			(this.jLo = this.GetExtendToggle(4)),
			(this.WLo = this.GetExtendToggle(5)),
			this.jLo.OnStateChange.Add(this.YLo),
			this.WLo.OnStateChange.Add(this.zLo),
			(this.QLo = ModelManager_1.ModelManager.TowerModel.GetDifficultyIsClear(
				TowerData_1.LOW_RISK_DIFFICULTY,
			)),
			(this.QLo
				? ((this.XLo = !1),
					this.JLo(TowerData_1.HIGH_RISK_DIFFICULTY),
					this.WLo)
				: ((this.XLo = !0), this.JLo(TowerData_1.LOW_RISK_DIFFICULTY), this.jLo)
			).SetToggleState(1),
			this.GetItem(7).SetUIActive(this.QLo),
			this.GetItem(8).SetUIActive(
				ModelManager_1.ModelManager.TowerModel.GetDifficultyIsClear(
					TowerData_1.HIGH_RISK_DIFFICULTY,
				),
			),
			(this.uTt = new TowerTitleItem_1.TowerTitleItem(this.GetItem(0), () => {
				var e;
				ModelManager_1.ModelManager.TowerModel.CheckInTower()
					? ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
							137,
						)).FunctionMap.set(2, () => {
							TowerController_1.TowerController.LeaveTower();
						}),
						ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
							e,
						))
					: this.oDo();
			})),
			this.uTt.RefreshText("InstanceDungeonTitle_31_CommonText"),
			(ModelManager_1.ModelManager.TowerModel.CurrentTowerLock =
				!this.XLo && !this.QLo),
			this.iDo();
	}
	OnBeforeShow() {
		RedDotController_1.RedDotController.BindRedDot(
			"TowerReward",
			this.GetItem(6),
		),
			RedDotController_1.RedDotController.BindRedDot(
				"TowerRewardByDifficulties",
				this.GetItem(11),
				void 0,
				1,
			),
			RedDotController_1.RedDotController.BindRedDot(
				"TowerRewardByDifficulties",
				this.GetItem(12),
				void 0,
				2,
			),
			RedDotController_1.RedDotController.BindRedDot(
				"TowerRewardByDifficulties",
				this.GetItem(13),
				void 0,
				3,
			),
			(ModelManager_1.ModelManager.TowerModel.CurrentSelectDifficulties =
				this.$Lo),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RedDotTowerReward,
			),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RedDotTowerRewardByDifficulties,
				this.$Lo,
			),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RedDotTowerRewardByDifficulties,
				4,
			);
	}
	OnBeforeDestroy() {
		InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.RestoreDungeonEntranceEntity(),
			this.KLo && (this.KLo = void 0),
			(this.jLo = void 0),
			(this.WLo = void 0),
			this.uTt?.Destroy(),
			this.EPe?.Clear(),
			(this.EPe = void 0),
			InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.RestoreDungeonEntranceEntity();
	}
	OnAfterHide() {
		RedDotController_1.RedDotController.UnBindGivenUi(
			"TowerReward",
			this.GetItem(6),
		),
			RedDotController_1.RedDotController.UnBindGivenUi(
				"TowerRewardByDifficulties",
				this.GetItem(11),
				1,
			),
			RedDotController_1.RedDotController.UnBindGivenUi(
				"TowerRewardByDifficulties",
				this.GetItem(12),
				2,
			),
			RedDotController_1.RedDotController.UnBindGivenUi(
				"TowerRewardByDifficulties",
				this.GetItem(13),
				3,
			);
	}
	JLo(e) {
		(ModelManager_1.ModelManager.TowerModel.CurrentSelectDifficulties = e),
			(this.$Lo = e),
			(ModelManager_1.ModelManager.TowerModel.CurrentTowerLock =
				!this.XLo && !this.QLo),
			this.KLo.RefreshByData(
				ModelManager_1.ModelManager.TowerModel.GetDifficultyAllAreaFirstFloor(
					e,
				),
			),
			this.iDo(),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RedDotTowerReward,
			),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RedDotTowerRewardByDifficulties,
				this.$Lo,
			),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RedDotTowerRewardByDifficulties,
				4,
			);
	}
}
exports.TowerNormalView = TowerNormalView;
