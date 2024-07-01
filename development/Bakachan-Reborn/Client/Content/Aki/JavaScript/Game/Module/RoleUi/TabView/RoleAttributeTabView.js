"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleAttributeTabView = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	FormationDataController_1 = require("../../Abilities/FormationDataController"),
	AttributeItem_1 = require("../../Common/AttributeItem"),
	ButtonItem_1 = require("../../Common/Button/ButtonItem"),
	ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
	InstanceDungeonController_1 = require("../../InstanceDungeon/InstanceDungeonController"),
	UiRoleUtils_1 = require("../../UiComponent/UiRoleUtils"),
	UiSceneManager_1 = require("../../UiComponent/UiSceneManager"),
	GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	MainRoleController_1 = require("../MainRoleController"),
	RoleController_1 = require("../RoleController"),
	RoleBreakPreviewViewModel_1 = require("../RoleLevel/RoleBreakPreviewViewModel"),
	RoleTagSmallIconItem_1 = require("../RoleTag/RoleTagSmallIconItem"),
	StarItem_1 = require("../View/StarItem");
class RoleAttributeTabView extends UiTabViewBase_1.UiTabViewBase {
	constructor() {
		super(...arguments),
			(this.Fmo = 0),
			(this.Vmo = void 0),
			(this.Hmo = void 0),
			(this.RoleViewAgent = void 0),
			(this.RoleInstance = void 0),
			(this.AttributeItemList = []),
			(this.RoleSystemUiParams = void 0),
			(this.$be = void 0),
			(this.Yho = void 0),
			(this.DetailClick = () => {
				this.jmo();
			}),
			(this.LevelUpClick = () => {
				RoleController_1.RoleController.SendRoleLevelUpViewRequestWithOpenView(
					this.RoleInstance.GetRoleId(),
				);
			}),
			(this.BreakthroughClick = () => {
				RoleController_1.RoleController.SendRoleBreakThroughViewRequest(
					this.RoleInstance.GetRoleId(),
				);
			}),
			(this.RoleChangeClick = () => {
				ModelManager_1.ModelManager.GameModeModel.IsMulti
					? ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsById(
							"InstanceDungeonShieldViewCantOpen",
						)
					: UiManager_1.UiManager.OpenView(
							"RoleElementView",
							this.RoleViewAgent,
						);
			}),
			(this.RoleTagClick = () => {
				var e = this.RoleInstance.GetRoleConfig();
				UiManager_1.UiManager.OpenView("RoleTagDetailView", e.Tag);
			}),
			(this.TeachClick = () => {
				if (
					ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()
				)
					ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
						"RoleGuideNotice01",
					);
				else if (
					FormationDataController_1.FormationDataController.GlobalIsInFight
				)
					ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
						"RoleGuideNotice06",
					);
				else if (ModelManager_1.ModelManager.GameModeModel.IsMulti)
					ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
						"RoleGuideNotice05",
					);
				else {
					var e = this.RoleViewAgent.GetCurSelectRoleId(),
						t =
							((e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e)),
							ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(e.Name));
					const o = e.RoleGuide;
					0 === o
						? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
								"RoleGuideNotice02",
								t,
							)
						: ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(94)).SetTextArgs(
								t,
							),
							e.FunctionMap.set(2, () => {
								var e =
									ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
										o,
									).FightFormationId;
								e =
									ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(
										e,
									)?.AutoRole;
								if (0 < (e?.length ?? 0)) {
									var t = new Array();
									for (const o of e)
										t.push(
											ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleIdConfigByGroupId(
												o,
											),
										);
									InstanceDungeonController_1.InstanceDungeonController.PrewarTeamFightRequest(
										o,
										t,
									);
								} else
									Log_1.Log.CheckError() &&
										Log_1.Log.Error("Role", 44, "未配置出战人物");
							}),
							ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
								e,
							));
				}
			}),
			(this.RoleBreakPreviewClick = () => {
				var e = new RoleBreakPreviewViewModel_1.RoleBreakPreviewViewModel();
				(e.CachedRoleInstance = this.RoleInstance),
					UiManager_1.UiManager.OpenView("RoleBreakPreviewView", e, this.AAn);
			}),
			(this.AAn = (e, t) => {
				e && this.AddChild(UiManager_1.UiManager.GetView(t));
			}),
			(this.C5i = void 0),
			(this.sAt = () => new StarItem_1.StarItem()),
			(this.Omo = () => new RoleTagSmallIconItem_1.RoleTagSmallIconItem()),
			(this.Wmo = (e) => {
				(this.RoleInstance =
					ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e)),
					this.PlayMontageStartWithReLoop(),
					this.Kmo(),
					this.Qmo();
			}),
			(this.Xmo = () => {
				this.Kmo();
			}),
			(this.$mo = () => {
				this.PlayModelEffect();
			}),
			(this.Ymo = () => {
				this.Jmo();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIItem],
			[2, UE.UIText],
			[3, UE.UISprite],
			[4, UE.UIText],
			[6, UE.UIText],
			[5, UE.UIItem],
			[7, UE.UIText],
			[8, UE.UIText],
			[9, UE.UITexture],
			[10, UE.UIHorizontalLayout],
			[11, UE.UIText],
			[12, UE.UIItem],
			[13, UE.UIItem],
			[14, UE.UIButtonComponent],
			[15, UE.UIItem],
			[16, UE.UIButtonComponent],
			[17, UE.UIHorizontalLayout],
			[18, UE.UIItem],
			[19, UE.UIButtonComponent],
			[20, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [
				[0, this.DetailClick],
				[14, this.TeachClick],
				[16, this.RoleChangeClick],
				[19, this.RoleTagClick],
				[20, this.RoleBreakPreviewClick],
			]);
	}
	OnStart() {
		(this.RoleViewAgent = this.ExtraParams),
			void 0 === this.RoleViewAgent
				? Log_1.Log.CheckError() &&
					Log_1.Log.Error("Role", 59, "RoleViewAgent为空", [
						"界面名称",
						"RoleAttributeTabView",
					])
				: ((this.RoleSystemUiParams =
						this.RoleViewAgent.GetRoleSystemUiParams()),
					(this.C5i = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor()),
					(this.Fmo = 0),
					(this.Vmo = new ButtonItem_1.ButtonItem(this.GetItem(1))),
					(this.Hmo = new ButtonItem_1.ButtonItem(this.GetItem(15))),
					this.Vmo.SetFunction(this.LevelUpClick),
					this.Hmo.SetFunction(this.BreakthroughClick),
					this.GetButton(20).GetRootComponent().SetUIActive(!0),
					this.wao(),
					(this.$be = new GenericLayout_1.GenericLayout(
						this.GetHorizontalLayout(10),
						this.sAt,
					)),
					(this.Yho = new GenericLayout_1.GenericLayout(
						this.GetHorizontalLayout(17),
						this.Omo,
					)));
	}
	wao() {
		var e = CommonParamById_1.configCommonParamById.GetIntArrayConfig(
				"RoleAttributeDisplay6",
			),
			t = this.GetItem(12),
			o = this.GetItem(5);
		let i;
		var n = e.length;
		for (let a = 0; a < n; ++a) {
			i = 0 === a ? o : LguiUtil_1.LguiUtil.CopyItem(o, t);
			var r = e[a],
				l = new AttributeItem_1.AttributeItem();
			l.CreateThenShowByActor(i.GetOwner()),
				l.UpdateParam(r, !1),
				2 < n && a % 2 == 0 ? l.SetBgActive(!0) : l.SetBgActive(!1),
				this.AttributeItemList.push(l);
		}
	}
	AddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.RoleInfoUpdate,
			this.Xmo,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.RoleSystemChangeRole,
				this.Wmo,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.RoleLevelUp,
				this.Xmo,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ActiveRole,
				this.$mo,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.RoleRefreshName,
				this.Ymo,
			);
	}
	RemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.RoleInfoUpdate,
			this.Xmo,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.RoleSystemChangeRole,
				this.Wmo,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.RoleLevelUp,
				this.Xmo,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ActiveRole,
				this.$mo,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.RoleRefreshName,
				this.Ymo,
			);
	}
	Qmo() {
		var e, t, o;
		this.Vmo.BindRedDot(
			"RoleAttributeTabLevelUp",
			this.RoleInstance.GetDataId(),
		),
			this.Hmo.BindRedDot(
				"RoleAttributeTabBreakUp",
				this.RoleInstance.GetDataId(),
			),
			this.RoleSystemUiParams.TeachBtn &&
			((e = this.RoleInstance.IsTrialRole()),
			(t = ModelManager_1.ModelManager.FunctionModel.IsShow(10043)),
			(o = ModelManager_1.ModelManager.FunctionModel.IsOpen(10043)),
			t) &&
			o
				? this.GetButton(14).GetRootComponent().SetUIActive(!e)
				: this.GetButton(14).GetRootComponent().SetUIActive(!1);
	}
	PlayModelEffect() {
		UiRoleUtils_1.UiRoleUtils.PlayRoleLevelUpEffect(this.C5i);
	}
	jmo() {
		UiManager_1.UiManager.OpenView(
			"RoleAttributeDetailView",
			this.RoleInstance.GetShowAttrList(),
		);
	}
	zmo() {
		this.SetRoleLevelUpState();
		var e = this.RoleInstance.GetLevelData(),
			t =
				(1 === this.Fmo || 0 === this.Fmo
					? this.GetText(2).SetText("")
					: LguiUtil_1.LguiUtil.SetLocalText(
							this.GetText(2),
							"RoleExp",
							e.GetExp(),
							e.GetCurrentMaxExp(),
						),
				1 === this.Fmo || 0 === this.Fmo ? 1 : e.GetExpPercentage());
		this.GetSprite(3).SetFillAmount(t), (t = this.GetText(6));
		LguiUtil_1.LguiUtil.SetLocalText(
			t,
			"RoleMaxLevel02",
			e.GetCurrentMaxLevel(),
		);
	}
	Zmo() {
		var e = this.RoleInstance.GetLevelData(),
			t = e.GetBreachLevel();
		let o =
			ConfigManager_1.ConfigManager.TextConfig.GetTextById("RoleBreakLevel");
		void 0 !== (o = o?.replace("%s", "[" + t + "]")) &&
			this.GetText(4).SetText(o);
		var i = e.GetMaxBreachLevel(),
			n = new Array(i);
		for (let e = 0; e < i; ++e) {
			var r = {
				StarOnActive: e < t,
				StarOffActive: e >= t,
				StarNextActive: !1,
				StarLoopActive: !1,
				PlayLoopSequence: !1,
				PlayActivateSequence: !1,
			};
			n[e] = r;
		}
		this.$be.RefreshByData(n),
			(e = 0 === this.Fmo ? e.GetRoleMaxLevel() : e.GetLevel()),
			LguiUtil_1.LguiUtil.SetLocalText(this.GetText(7), "CommonLevel", e),
			(e = this.RoleInstance.GetElementInfo()),
			this.SetElementIcon(
				e.Icon,
				this.GetTexture(9),
				this.RoleInstance.GetRoleConfig().ElementId,
				"RoleRootView",
			),
			(e =
				ConfigManager_1.ConfigManager.ElementInfoConfig.GetElementInfoLocalName(
					e.Name,
				)),
			this.GetText(8).SetText(e);
	}
	edo() {
		var e = this.RoleInstance.GetRoleConfig().Tag;
		this.Yho.RefreshByData(e);
	}
	Kmo() {
		this.zmo(),
			this.UpdateButtonState(),
			this.Zmo(),
			this.Jmo(),
			this.UpdateAttribute(),
			this.tdo(),
			this.ido(),
			this.edo();
	}
	ido() {
		var e = this.RoleViewAgent.GetCurSelectRoleId(),
			t = this.RoleViewAgent.GetCurSelectRoleData(),
			o =
				((e = MainRoleController_1.MainRoleController.IsMainRole(e)),
				(t = t.IsTrialRole()),
				ConfigManager_1.ConfigManager.RoleConfig.GetRoleElementTransferFunctionId()),
			i =
				((o = ModelManager_1.ModelManager.FunctionModel.IsOpen(o)),
				ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance());
		this.GetButton(16).RootUIComp.SetUIActive(e && o && !i && !t);
	}
	Jmo() {
		this.GetText(11).SetText(this.RoleInstance.GetName());
	}
	tdo() {
		var e = this.RoleInstance.IsTrialRole();
		this.GetItem(13).SetUIActive(e);
	}
	UpdateButtonState() {
		var e = this.GetButton(20).RootUIComp;
		if (this.RoleInstance.IsTrialRole())
			this.Vmo.SetActive(!1), this.Hmo.SetActive(!1), e.SetUIActive(!1);
		else {
			e.SetUIActive(0 !== this.Fmo);
			let t = "RoleMaxLevelPreview";
			this.Vmo.SetActive(0 !== this.Fmo && 3 !== this.Fmo),
				0 !== this.Fmo &&
					(1 === this.Fmo
						? (t = "RoleReachMaxLevel")
						: 3 === this.Fmo
							? (t = "RoleBreakup")
							: 2 === this.Fmo && (t = "RoleLevelUp"),
					(e = ConfigManager_1.ConfigManager.TextConfig.GetTextById(t)),
					this.Vmo.SetText(e),
					this.Vmo.SetEnableClick(1 !== this.Fmo)),
				this.Hmo.SetActive(0 !== this.Fmo && 3 === this.Fmo),
				(e =
					ConfigManager_1.ConfigManager.TextConfig.GetTextById("RoleBreakup")),
				this.Hmo.SetText(e);
		}
	}
	SetRoleLevelUpState() {
		var e = this.RoleInstance.GetLevelData();
		e.GetRoleIsMaxLevel()
			? (this.Fmo = 1)
			: e.GetRoleNeedBreakUp()
				? (this.Fmo = 3)
				: (this.Fmo = 2);
	}
	PlayMontageStart() {
		RoleController_1.RoleController.PlayRoleMontage(3);
	}
	PlayMontageStartWithReLoop() {
		RoleController_1.RoleController.PlayRoleMontage(3, !1, !0, !1);
	}
	UpdateAttribute() {
		var e = CommonParamById_1.configCommonParamById.GetIntArrayConfig(
			"RoleAttributeDisplay6",
		);
		for (let i = 0; i < this.AttributeItemList.length; ++i) {
			var t = this.AttributeItemList[i],
				o = e[i];
			o = this.RoleInstance.GetShowAttributeValueById(o);
			t.SetCurrentValue(o), t.SetActive(!0);
		}
	}
	OnBeforeShow() {
		(this.RoleInstance = this.RoleViewAgent.GetCurSelectRoleData()),
			this.PlayMontageStart(),
			this.Kmo(),
			this.Qmo(),
			this.Vmo.BindRedDot(
				"RoleAttributeTabLevelUp",
				this.RoleInstance.GetDataId(),
			);
	}
	OnBeforeHide() {
		this.Vmo.UnBindRedDot();
	}
	OnBeforeDestroy() {
		for (const e of this.AttributeItemList) e.Destroy();
		(this.AttributeItemList = []), (this.Vmo = void 0);
	}
}
exports.RoleAttributeTabView = RoleAttributeTabView;
