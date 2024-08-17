"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleBreachView = void 0);
const UE = require("ue"),
	AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
	Log_1 = require("../../../../Core/Common/Log"),
	CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	LevelGeneralCommons_1 = require("../../../LevelGamePlay/LevelGeneralCommons"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
	UiManager_1 = require("../../../Ui/UiManager"),
	AttributeItem_1 = require("../../Common/AttributeItem"),
	ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
	ItemDefines_1 = require("../../Item/Data/ItemDefines"),
	ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
	UiRoleUtils_1 = require("../../UiComponent/UiRoleUtils"),
	UiSceneManager_1 = require("../../UiComponent/UiSceneManager"),
	GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	RoleController_1 = require("../RoleController"),
	StarItem_1 = require("../View/StarItem"),
	CostItemGridComponent_1 = require("./CostItemGridComponent");
class RoleBreachView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.zke = 0),
			(this.AttributeLayout = void 0),
			(this.StarLayout = void 0),
			(this.lqe = void 0),
			(this.Olo = void 0),
			(this.klo = void 0),
			(this.C5i = void 0),
			(this.CloseClick = () => {
				UiManager_1.UiManager.CloseView("RoleLevelUpView"), this.CloseMe();
			}),
			(this.LevelUpClick = () => {
				var e;
				0 === this.klo
					? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
							"RoleNoMaterial",
						)
					: 1 === this.klo
						? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
								"RoleNoMoney",
							)
						: ((e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
								this.zke,
							)),
							RoleController_1.RoleController.SendPbOverRoleRequest(
								e.GetRoleId(),
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
			(this.OnRoleBreachQuitSequenceFinish = () => {
				var e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
					this.zke,
				);
				RoleController_1.RoleController.SendRoleLevelUpViewRequestWithOpenView(
					e.GetRoleId(),
					this.Info.Name,
				);
			}),
			(this.Flo = () => new AttributeItem_1.AttributeItem()),
			(this.sAt = () => new StarItem_1.StarItem()),
			(this.Vlo = (e, t) => {
				this.GetItem(3).SetUIActive(!1),
					this.Olo.GetRootItem().SetUIActive(!1),
					this.lqe.GetRootItem().SetUIActive(!1),
					UiRoleUtils_1.UiRoleUtils.PlayRoleBreachFinishEffect(this.C5i);
				var o =
					ConfigManager_1.ConfigManager.RoleConfig.GetRoleBreachSuccessDelayTime();
				(o =
					(TimerSystem_1.TimerSystem.Delay(() => {
						RoleController_1.RoleController.PlayRoleMontage(3), this.Hlo();
					}, o),
					ConfigManager_1.ConfigManager.AudioConfig?.GetRoleConfig(e)
						?.BreakUpEventList[t])) &&
					(AudioSystem_1.AudioSystem.PostEvent(o), Log_1.Log.CheckInfo()) &&
					Log_1.Log.Info("Audio", 57, "[Game.RoleBreachView] PostEvent", [
						"Event",
						o,
					]);
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIItem],
			[2, UE.UITexture],
			[3, UE.UIItem],
			[4, UE.UIText],
			[5, UE.UIHorizontalLayout],
			[6, UE.UIVerticalLayout],
			[7, UE.UIItem],
			[8, UE.UIItem],
		];
	}
	OnStart() {
		(this.zke = this.OpenParam),
			(this.C5i = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor()),
			(this.StarLayout = new GenericLayout_1.GenericLayout(
				this.GetHorizontalLayout(5),
				this.sAt,
			)),
			(this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(7))),
			this.lqe.SetCurrencyItemList([ItemDefines_1.EItemId.Gold]),
			this.lqe.SetCloseCallBack(this.CloseClick),
			(this.Olo = new CostItemGridComponent_1.CostItemGridComponent(
				this.GetItem(8),
				this.LevelUpClick,
				this.LevelUpLockTipClick,
			)),
			this.Olo.SetMaxItemActive(!1),
			this.Olo.SetButtonItemLocalText("RoleBreakup"),
			(this.AttributeLayout = new GenericLayout_1.GenericLayout(
				this.GetVerticalLayout(6),
				this.Flo,
			)),
			this.UiViewSequence.AddSequenceFinishEvent(
				"Quit",
				this.OnRoleBreachQuitSequenceFinish,
			),
			RoleController_1.RoleController.PlayRoleMontage(12);
	}
	OnHandleLoadScene() {
		UiSceneManager_1.UiSceneManager.ShowRoleSystemRoleActor();
		var e = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor();
		e && e.Model?.CheckGetComponent(1)?.SetTransformByTag("RoleCase"),
			RoleController_1.RoleController.PlayRoleMontage(3, !0);
	}
	OnBeforeShow() {
		this.qIt();
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.RoleBreakUp,
			this.Vlo,
		);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.RoleBreakUp,
			this.Vlo,
		);
	}
	OnHandleReleaseScene() {
		UiSceneManager_1.UiSceneManager.HideRoleSystemRoleActor();
	}
	qIt() {
		var e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
				this.zke,
			).GetLevelData(),
			t = e.GetBreachLevel(),
			o =
				(LguiUtil_1.LguiUtil.SetLocalText(
					this.GetText(4),
					"RoleBreakUpLevel",
					t + 1,
				),
				e.GetBreachConfig(t + 1));
		this.GetText(0).SetText(o.MaxLevel.toString());
		let i = 0;
		var r = [],
			n = o.BreachConsume;
		if (n)
			for (var [l, a] of n)
				l === ItemDefines_1.EItemId.Gold
					? (i = a)
					: ((l = {
							ItemId: l,
							IncId: 0,
							SelectedCount:
								ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
									l,
								),
							Count: a,
						}),
						r.push(l));
		(this.klo = ModelManager_1.ModelManager.RoleModel.GetRoleBreachState(
			this.zke,
		)),
			4 === this.klo
				? ((n =
						LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(
							o.ConditionId,
						)),
					this.Olo.SetButtonItemActive(!1),
					this.Olo.SetLockItemActive(!0),
					this.Olo.SetLockLocalText(n))
				: (this.Olo.SetButtonItemActive(!0), this.Olo.SetLockItemActive(!1)),
			this.Olo.Update(r, ItemDefines_1.EItemId.Gold, i),
			(o =
				ModelManager_1.ModelManager.RoleModel.RoleBreachResponseData.GetUnLockSkillId()),
			this.GetItem(1).SetUIActive(0 !== o),
			0 !== o &&
				((n =
					ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillConfigById(o)),
				this.SetTextureByPath(n.Icon, this.GetTexture(2))),
			this.kPt(t, e.GetMaxBreachLevel()),
			this.jlo();
	}
	jlo() {
		var e = CommonParamById_1.configCommonParamById.GetIntArrayConfig(
				"RoleAttributeDisplay3",
			),
			t = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
				this.zke,
			).GetLevelData(),
			o = t.GetLevel(),
			i = t.GetBreachLevel(),
			r = t.GetMaxBreachLevel(),
			n = [];
		for (const t of e) {
			var l = ModelManager_1.ModelManager.RoleModel.GetAttributeByLevel(
				this.zke,
				t,
				o,
				i,
			);
			let e = 0;
			i < r &&
				0 <
					(a = ModelManager_1.ModelManager.RoleModel.GetAddAttrLevelUp(
						this.zke,
						o,
						i,
						o,
						i + 1,
						t,
					)) &&
				(e = l + a);
			var a = {
				Id: t,
				IsRatio: !1,
				CurValue: l,
				BgActive: !1,
				ShowNext: e > l,
				NextValue: e,
				UseAnotherName: !0,
			};
			n.push(a);
		}
		this.AttributeLayout.RefreshByData(n);
	}
	kPt(e, t) {
		var o = new Array(t);
		for (let r = 0; r < t; ++r) {
			var i = {
				StarOnActive: r < e,
				StarOffActive: r > e,
				StarNextActive: r === e,
				StarLoopActive: r === e,
				PlayLoopSequence: r === e,
				PlayActivateSequence: !1,
			};
			o[r] = i;
		}
		this.StarLayout.RefreshByData(o);
	}
	Hlo() {
		UiManager_1.UiManager.OpenView("RoleBreachSuccessView", this.zke);
	}
}
exports.RoleBreachView = RoleBreachView;
