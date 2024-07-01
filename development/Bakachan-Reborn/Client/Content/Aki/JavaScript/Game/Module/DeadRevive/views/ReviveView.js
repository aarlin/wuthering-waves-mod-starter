"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ReviveView = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	ReviveById_1 = require("../../../../Core/Define/ConfigQuery/ReviveById"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
	ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
	InstanceDungeonEntranceController_1 = require("../../InstanceDungeon/InstanceDungeonEntranceController"),
	ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
	TrainingView_1 = require("../../TrainingDegree/TrainingView"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	DeadReviveController_1 = require("../DeadReviveController"),
	TIME_SECOND = 1e3,
	AUTO_REVIVE_TIME = 60;
class ReviveView extends UiTickViewBase_1.UiTickViewBase {
	constructor() {
		super(...arguments),
			(this.V2t = 0),
			(this.H2t = 0),
			(this.j2t = -1),
			(this.W2t = 0),
			(this.K2t = !1),
			(this.Q2t = void 0),
			(this.X2t = void 0),
			(this.$2t = void 0),
			(this.Y2t = void 0),
			(this.J2t = void 0),
			(this.z2t = !1),
			(this.Z2t = void 0),
			(this.eFt = !1),
			(this.tFt = () => {
				0 === this.j2t
					? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
							"CannotRevive",
						)
					: this.z2t
						? DeadReviveController_1.DeadReviveController.ReviveRequest(
								!1,
								(e) => {
									e && this.CloseMe();
								},
							)
						: Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("Battle", 4, "Time Or Times Limit!!!");
			}),
			(this.iFt = () => {
				this.CloseMe(),
					InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeon();
			}),
			(this.oFt = () => {
				var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(98);
				e.SetTextArgs(this.Y2t, this.J2t),
					e.FunctionMap.set(2, () => {
						this.z2t
							? DeadReviveController_1.DeadReviveController.ReviveRequest(
									!0,
									(e) => {
										e && this.CloseMe();
									},
								)
							: Log_1.Log.CheckInfo() &&
								Log_1.Log.Info("Battle", 4, "Time Or Times Limit!!!");
					}),
					ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
						e,
					);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIButtonComponent],
			[3, UE.UIButtonComponent],
			[4, UE.UIText],
			[5, UE.UIText],
			[6, UE.UIText],
			[7, UE.UIHorizontalLayout],
			[8, UE.UIButtonComponent],
			[9, UE.UIText],
			[10, UE.UITexture],
			[11, UE.UIText],
			[12, UE.UIText],
		]),
			(this.BtnBindInfo = [
				[2, this.tFt],
				[3, this.iFt],
				[8, this.oFt],
			]);
	}
	OnStart() {
		(this.Q2t = this.GetText(4)), (this.X2t = this.GetText(9));
		var e = this.GetItem(0),
			t = this.GetItem(1),
			i = this.GetButton(3),
			o = this.GetButton(2);
		(this.$2t = o
			.GetOwner()
			.GetComponentByClass(UE.UIInteractionGroup.StaticClass())),
			(this.eFt =
				ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()),
			this.eFt
				? ModelManager_1.ModelManager.GameModeModel.IsMulti &&
					(this.GetButton(2).GetRootComponent().SetUIActive(!1),
					LguiUtil_1.LguiUtil.SetLocalText(this.GetText(12), "ExitInstance"),
					LguiUtil_1.LguiUtil.SetLocalText(
						this.GetText(6),
						"MatchInstanceDead",
					))
				: (o
						.GetRootComponent()
						.SetAnchorOffset(i.GetRootComponent().GetAnchorOffset()),
					i.GetRootComponent().SetUIActive(!1),
					this.rFt()),
			(o = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
				ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
			).ReviveId);
		(i = ReviveById_1.configReviveById.GetConfig(o)) &&
			(this.j2t = i.ReviveTimes),
			t.SetUIActive(!0),
			e.SetUIActive(!1),
			(this.H2t = ModelManager_1.ModelManager.DeadReviveModel.ReviveLimitTime);
		let n = !(this.z2t = !1);
		0 < this.H2t
			? (this.Q2t.SetText(this.H2t.toString() + "s"),
				this.$2t.SetInteractable(!1))
			: this.H2t <= 0
				? ((n = !1),
					(this.z2t = !0),
					(this.W2t = 60),
					ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() ||
						this.X2t.SetUIActive(!0),
					LguiUtil_1.LguiUtil.SetLocalText(
						this.X2t,
						"ReviveItemTips",
						this.W2t,
					))
				: (LguiUtil_1.LguiUtil.SetLocalText(this.Q2t, "ReachReviveCount"),
					this.$2t.SetInteractable(!1)),
			this.Q2t.SetUIActive(n),
			this.GetText(5).ShowTextNew(
				ModelManager_1.ModelManager.DeadReviveModel.ReviveConfig?.ReviveTitle ??
					"",
			),
			(o = this.GetText(6)),
			ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() ||
				ModelManager_1.ModelManager.GameModeModel.IsMulti ||
				o.ShowTextNew(
					ModelManager_1.ModelManager.DeadReviveModel.ReviveConfig
						?.ReviveContent ?? "",
				),
			(this.Z2t = new TrainingView_1.TrainingView()),
			this.Z2t.Show(this.GetHorizontalLayout(7));
	}
	rFt() {
		let e = -1;
		var t,
			i,
			o,
			n,
			r = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon;
		(r =
			((r = ReviveById_1.configReviveById.GetConfig(r.ReviveId)) &&
				(e = r.UseItemId),
			ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e))) <=
			0 ||
			((t = this.GetButton(8)).GetRootComponent().SetUIActive(!0),
			(n = this.GetTexture(10)),
			(i = this.GetText(11)),
			(o = ModelManager_1.ModelManager.BuffItemModel),
			this.SetItemIcon(n, e),
			(this.Y2t = ConfigManager_1.ConfigManager.ItemConfig.GetItemName(e)),
			(n =
				ConfigManager_1.ConfigManager.BuffItemConfig.GetBuffItemTotalCdTime(
					e,
				)) < TimeUtil_1.TimeUtil.Minute
				? (this.J2t =
						n + ConfigManager_1.ConfigManager.TextConfig.GetTextById("Second"))
				: ((this.J2t =
						Math.floor(n / TimeUtil_1.TimeUtil.Minute) +
						ConfigManager_1.ConfigManager.TextConfig.GetTextById("MinuteText")),
					0 < (n %= TimeUtil_1.TimeUtil.Minute) &&
						(this.J2t +=
							n +
							ConfigManager_1.ConfigManager.TextConfig.GetTextById("Second"))),
			0 < o.GetBuffItemRemainCdTime(e)
				? (LguiUtil_1.LguiUtil.SetLocalText(i, "ReviveItemCd"),
					t
						.GetOwner()
						.GetComponentByClass(UE.UIInteractionGroup.StaticClass())
						.SetInteractable(!1))
				: i.SetText(r.toString()));
	}
	OnTick(e) {
		((this.z2t || this.H2t < 0) && this.K2t) ||
			((this.V2t += e),
			this.V2t >= 1e3 && ((this.V2t = 0), this.nFt(), this.sFt()));
	}
	nFt() {
		this.eFt ||
			this.K2t ||
			(this.W2t <= 0
				? ((this.K2t = !0),
					ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView(),
					this.tFt())
				: (--this.W2t,
					LguiUtil_1.LguiUtil.SetLocalText(
						this.X2t,
						"ReviveItemTips",
						this.W2t,
					)));
	}
	sFt() {
		this.H2t <= 0
			? ((this.z2t = !0),
				this.Q2t.SetUIActive(!1),
				this.$2t.SetInteractable(!0))
			: (--this.H2t, this.Q2t.SetText(this.H2t.toString() + "s"));
	}
	OnBeforeDestroy() {
		this.Z2t && this.Z2t.Clear(),
			(this.Z2t = void 0),
			(this.Q2t = void 0),
			(this.X2t = void 0),
			(this.$2t = void 0),
			(this.Y2t = void 0),
			(this.J2t = void 0),
			(this.j2t = -1),
			(this.V2t = 0),
			(this.H2t = 0),
			(this.W2t = 0),
			(this.z2t = !1),
			(this.eFt = !1),
			(this.K2t = !1);
	}
}
exports.ReviveView = ReviveView;
