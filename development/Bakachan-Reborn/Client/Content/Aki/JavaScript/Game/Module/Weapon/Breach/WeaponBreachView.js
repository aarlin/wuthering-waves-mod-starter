"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WeaponBreachView = void 0);
const UE = require("ue"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	LevelGeneralCommons_1 = require("../../../LevelGamePlay/LevelGeneralCommons"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	AttributeItem_1 = require("../../Common/AttributeItem"),
	ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
	ItemDefines_1 = require("../../Item/Data/ItemDefines"),
	CostItemGridComponent_1 = require("../../RoleUi/RoleBreach/CostItemGridComponent"),
	StarItem_1 = require("../../RoleUi/View/StarItem"),
	ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
	UiSceneManager_1 = require("../../UiComponent/UiSceneManager"),
	UiModelUtil_1 = require("../../UiModel/UiModelUtil"),
	GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	WeaponController_1 = require("../WeaponController");
class WeaponBreachView extends UiTabViewBase_1.UiTabViewBase {
	constructor() {
		super(...arguments),
			(this.AttributeLayout = void 0),
			(this.Olo = void 0),
			(this.StarLayout = void 0),
			(this.PNo = 0),
			(this.xNo = void 0),
			(this.ANo = 0),
			(this.Nki = void 0),
			(this.Oki = void 0),
			(this.pco = void 0),
			(this.wNo = () => {
				0 === this.PNo
					? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
							"WeaponBreachNoEnoughMaterialText",
						)
					: 1 === this.PNo
						? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
								"WeaponBreachNoEnoughMoneyText",
							)
						: ((this.Nki = UiSceneManager_1.UiSceneManager.GetWeaponObserver()),
							(this.Oki =
								UiSceneManager_1.UiSceneManager.GetWeaponScabbardObserver()),
							(this.pco =
								UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor()),
							WeaponController_1.WeaponController.SendPbWeaponBreachRequest(
								this.ANo,
								(e) => {
									var t = this.Nki.Model;
									UiModelUtil_1.UiModelUtil.PlayEffectAtRootComponent(
										t,
										"WeaponBreachEffect",
									),
										WeaponController_1.WeaponController.PlayWeaponRenderingMaterial(
											"WeaponBreachMaterialController",
											this.Nki,
											this.Oki,
										),
										(t =
											ConfigManager_1.ConfigManager.RoleConfig.GetWeaponBreachDaDelayTime());
									TimerSystem_1.TimerSystem.Delay(() => {
										this.Nki?.Model?.CheckGetComponent(
											19,
										)?.RefreshWeaponBreachDa(e),
											this.Oki?.Model?.CheckGetComponent(
												19,
											)?.RefreshWeaponBreachDa(e),
											this.pco?.Model?.CheckGetComponent(14)?.RefreshWeaponDa();
									}, t);
								},
							));
			}),
			(this.LevelUpLockTipClick = () => {
				var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(175);
				const t =
					ModelManager_1.ModelManager.QuestNewModel.GetCurWorldLevelBreakQuest();
				t < 0
					? e.InteractionMap.set(1, !1)
					: (e.FunctionMap.set(2, () => {
							UiManager_1.UiManager.OpenView("QuestView", t);
						}),
						e.InteractionMap.set(1, !0)),
					ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
						e,
					);
			}),
			(this.sAt = () => new StarItem_1.StarItem()),
			(this.Flo = () => new AttributeItem_1.AttributeItem());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UIHorizontalLayout],
			[3, UE.UIVerticalLayout],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UIText],
		];
	}
	OnStart() {
		(this.StarLayout = new GenericLayout_1.GenericLayout(
			this.GetHorizontalLayout(2),
			this.sAt,
		)),
			(this.Olo = new CostItemGridComponent_1.CostItemGridComponent(
				this.GetItem(4),
				this.wNo,
				this.LevelUpLockTipClick,
			)),
			this.Olo.SetMaxItemActive(!1),
			this.Olo.SetButtonItemLocalText("RoleBreakup"),
			(this.AttributeLayout = new GenericLayout_1.GenericLayout(
				this.GetVerticalLayout(3),
				this.Flo,
				this.GetItem(5).GetOwner(),
			));
	}
	OnBeforeShow() {
		(this.ANo = this.ExtraParams), this.qIt(), this.C4e();
	}
	qIt() {
		var e = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
				this.ANo,
			),
			t = e.GetBreachConfig(),
			o = e.GetWeaponConfig(),
			a = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponBreach(
				o.BreachId,
				e.GetBreachLevel() + 1,
			),
			r =
				((a = (this.GetText(0).SetText(a.LevelLimit.toString()), o.BreachId)),
				(o =
					ModelManager_1.ModelManager.WeaponModel.GetWeaponBreachMaxLevel(a)),
				this.kPt(e.GetBreachLevel(), o),
				(this.PNo =
					ModelManager_1.ModelManager.WeaponModel.GetWeaponBreachState(
						this.ANo,
					)),
				3 === this.PNo
					? ((a =
							LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(
								t.ConditionId,
							)),
						this.Olo.SetButtonItemActive(!1),
						this.Olo.SetLockItemActive(!0),
						this.Olo.SetLockLocalText(a ?? ""))
					: (this.Olo.SetButtonItemActive(!0), this.Olo.SetLockItemActive(!1)),
				[]);
		if ((o = t.Consume))
			for (var [i, n] of o)
				(i = {
					ItemId: i,
					IncId: 0,
					SelectedCount:
						ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
							i,
						),
					Count: n,
				}),
					r.push(i);
		(a = t.GoldConsume),
			this.Olo.Update(r, ItemDefines_1.EItemId.Gold, a),
			LguiUtil_1.LguiUtil.SetLocalText(
				this.GetText(1),
				"RoleBreakUpLevel",
				e.GetBreachLevel() + 1,
			),
			this.jlo();
	}
	kPt(e, t) {
		this.StarLayout ||
			(this.StarLayout = new GenericLayout_1.GenericLayout(
				this.GetHorizontalLayout(2),
				this.sAt,
			));
		var o = new Array(t);
		for (let r = 0; r < t; ++r) {
			var a = {
				StarOnActive: r < e,
				StarOffActive: r > e,
				StarNextActive: r === e,
				StarLoopActive: r === e,
				PlayLoopSequence: r === e,
				PlayActivateSequence: !1,
			};
			o[r] = a;
		}
		this.StarLayout.RefreshByData(o);
	}
	jlo() {
		var e = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
				this.ANo,
			),
			t = e.GetWeaponConfig(),
			o =
				((this.xNo =
					ModelManager_1.ModelManager.WeaponModel.GetWeaponAttributeParamList(
						t,
					)),
				e.GetBreachLevel()),
			a = o + 1,
			r = e.GetLevel(),
			i = [];
		for (const e of this.xNo) {
			var n = e.CurveId,
				l = e.PropId,
				s = l.Value,
				h = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(n, s, r, o);
			let t = 0;
			o < a &&
				(t = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(n, s, r, a)),
				(n = {
					Id: l.Id,
					IsRatio: l.IsRatio,
					CurValue: h,
					BgActive: !0,
					ShowNext: t > h,
					NextValue: t,
				}),
				i.push(n);
		}
		this.AttributeLayout.RefreshByData(i);
	}
	C4e() {
		var e = (t = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
				this.ANo,
			).GetWeaponConfig()).WeaponName,
			t = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(
				t.QualityId,
			);
		t = UE.Color.FromHex(t.DropColor);
		this.GetText(6).SetColor(t), this.GetText(6).ShowTextNew(e);
	}
	OnBeforeDestroy() {
		this.Olo.Destroy();
	}
}
exports.WeaponBreachView = WeaponBreachView;
