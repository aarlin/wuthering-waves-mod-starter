"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivitySubViewRoleTrial = void 0);
const UE = require("ue"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
	RoleController_1 = require("../../../RoleUi/RoleController"),
	GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
	GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
	ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase"),
	ActivityRoleDescribeComponent_1 = require("../UniversalComponents/ActivityRoleDescribeComponent"),
	ActivitySmallItemGrid_1 = require("../UniversalComponents/ActivitySmallItemGrid"),
	ActivityDescriptionTypeB_1 = require("../UniversalComponents/Content/ActivityDescriptionTypeB"),
	ActivityRewardList_1 = require("../UniversalComponents/Content/ActivityRewardList"),
	ActivityFunctionalTypeA_1 = require("../UniversalComponents/Functional/ActivityFunctionalTypeA"),
	ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA"),
	ActivityRoleTrialController_1 = require("./ActivityRoleTrialController");
class ActivitySubViewRoleTrial extends ActivitySubViewBase_1.ActivitySubViewBase {
	constructor() {
		super(...arguments),
			(this.ActivityBaseData = void 0),
			(this.LNe = void 0),
			(this.DNe = void 0),
			(this.Dke = void 0),
			(this.UNe = void 0),
			(this.ANe = void 0),
			(this.Nke = void 0),
			(this.CurrentRoleId = 0),
			(this.Oke = void 0),
			(this.kke = (e) => {
				e === this.ActivityBaseData.Id &&
					((e = this.ActivityBaseData.RoleIdList),
					this.Nke.RefreshByData(e, () => {
						this.Fke(this.CurrentRoleId), this.Vke(this.CurrentRoleId);
					}));
			}),
			(this.Rke = () => new ActivitySmallItemGrid_1.ActivitySmallItemGrid()),
			(this.Hke = () => {
				var e = new RoleItem();
				return (e.ToggleCallBack = this.pqe), e;
			}),
			(this.pqe = (e, t) => {
				var i = this.ActivityBaseData.RoleIdList.indexOf(this.CurrentRoleId);
				this.Nke.GetLayoutItemByIndex(i)?.SetToggleState(!1),
					this.Vke(e),
					this.jke();
			}),
			(this.Pke = () => {
				var e =
						ConfigManager_1.ConfigManager.ActivityRoleTrialConfig.GetRoleTrialInfoConfigByRoleId(
							this.CurrentRoleId,
						),
					t =
						((e = e?.TrialRoleId ? e.TrialRoleId : 0),
						this.ActivityBaseData.RoleTrialIdList);
				RoleController_1.RoleController.OpenRoleMainView(
					1,
					e,
					t,
					void 0,
					() => {
						this.ActivityBaseData.SetRoleTrialState(2);
					},
				);
			}),
			(this.Wke = () => {
				ActivityRoleTrialController_1.ActivityRoleTrialController.RequestRoleInstanceReward(
					this.CurrentRoleId,
				);
			}),
			(this.Kke = () => {
				var e;
				RoleController_1.RoleController.IsInRoleTrial()
					? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
							"TrialRoleDungeonsLimit",
						)
					: void 0 !==
							(e = this.ActivityBaseData.GetInstanceIdByRoleId(
								this.CurrentRoleId,
							)) &&
						(this.ActivityBaseData.SetRoleTrialState(3),
						ActivityRoleTrialController_1.ActivityRoleTrialController.EnterRoleTrialDungeonDirectly(
							e,
						));
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UITexture],
			[1, UE.UITexture],
			[2, UE.UIHorizontalLayout],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UIButtonComponent],
			[7, UE.UIItem],
			[8, UE.UIItem],
			[9, UE.UIItem],
			[10, UE.UIItem],
			[11, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [
				[6, this.Pke],
				[11, this.Wke],
			]);
	}
	OnSetData() {}
	async OnBeforeStartAsync() {
		var e = this.GetItem(3);
		(this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA()),
			await this.LNe.CreateThenShowByActorAsync(e.GetOwner()),
			(e = this.GetItem(4)),
			(this.DNe = new ActivityDescriptionTypeB_1.ActivityDescriptionTypeB()),
			await this.DNe.CreateThenShowByActorAsync(e.GetOwner()),
			(e = this.GetItem(7)),
			(this.UNe = new ActivityRewardList_1.ActivityRewardList()),
			await this.UNe.CreateThenShowByActorAsync(e.GetOwner()),
			(e = this.GetItem(5)),
			(this.Dke =
				new ActivityRoleDescribeComponent_1.ActivityRoleDescribeComponent()),
			await this.Dke.CreateThenShowByActorAsync(e.GetOwner()),
			(e = this.GetItem(8));
		(this.ANe = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA()),
			await this.ANe.CreateThenShowByActorAsync(e.GetOwner()),
			(this.Nke = new GenericLayout_1.GenericLayout(
				this.GetHorizontalLayout(2),
				this.Hke,
			)),
			(this.Oke = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem));
	}
	OnStart() {
		var e = this.ActivityBaseData.LocalConfig;
		if (
			0 !==
			(e =
				(this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle()),
				this.FNe(),
				this.DNe.SetContentVisible(!StringUtils_1.StringUtils.IsEmpty(e?.Desc)),
				e?.Desc && this.DNe.SetContentByTextId(e.Desc),
				this.DNe.SetTitleVisible(
					!StringUtils_1.StringUtils.IsEmpty(e?.DescTheme),
				),
				e?.DescTheme && this.DNe.SetTitleByTextId(e.DescTheme),
				this.UNe.SetTitleByTextId("CollectActivity_reward"),
				this.UNe.InitGridLayout(this.Rke),
				this.ANe.FunctionButton?.BindCallback(this.Kke),
				this.ActivityBaseData.RoleIdList)).length
		) {
			const t =
				0 === this.ActivityBaseData.CurrentRoleId
					? e[0]
					: this.ActivityBaseData.CurrentRoleId;
			this.Nke.RefreshByData(e, () => {
				this.Fke(t);
			});
		}
	}
	OnBeforeShow() {}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.RefreshCommonActivityRedDot,
			this.kke,
		);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.RefreshCommonActivityRedDot,
			this.kke,
		);
	}
	OnBeforeHide() {
		this.ActivityBaseData.IsRoleInstanceOn() ||
			this.ActivityBaseData.SetRoleTrialState(0);
	}
	OnBeforeDestroy() {
		this.ActivityBaseData.IsRoleInstanceOn() ||
			(this.ActivityBaseData.SetRoleTrialState(0), this.Qke(0)),
			this.Oke?.Clear();
	}
	OnRefreshView() {
		this.Xke(),
			this.FNe(),
			this.ActivityBaseData.SetRoleTrialState(1),
			this.ActivityBaseData.CurrentRoleId !== this.CurrentRoleId
				? this.Fke(this.ActivityBaseData.CurrentRoleId)
				: this.jke();
	}
	Xke() {
		var e = this.ActivityBaseData.IsUnLock();
		this.ANe.SetPanelConditionVisible(!e),
			this.ANe.FunctionButton.SetUiActive(e),
			e ||
				((e = this.GetCurrentLockConditionText()),
				this.ANe.SetLockTextByTextId(e));
	}
	OnTimer(e) {
		this.FNe();
	}
	FNe() {
		var [e, t] = this.GetTimeVisibleAndRemainTime();
		this.LNe.SetTimeTextVisible(e), e && this.LNe.SetTimeTextByText(t);
	}
	Qke(e) {
		(this.CurrentRoleId = e), (this.ActivityBaseData.CurrentRoleId = e);
	}
	Vke(e) {
		this.Qke(e);
		var t =
			ConfigManager_1.ConfigManager.ActivityRoleTrialConfig.GetRoleTrialInfoConfigByRoleId(
				e,
			);
		this.Dke.Update(e);
		const i = this.GetTexture(1);
		var o;
		i.SetUIActive(!1),
			this.SetTextureByPath(t.RoleStand, i, void 0, () => {
				i.SetUIActive(!0);
			}),
			(t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e)) &&
				((t = t.PartyId),
				(t =
					ConfigManager_1.ConfigManager.InfluenceConfig.GetInfluenceConfig(t)),
				StringUtils_1.StringUtils.IsEmpty(t?.Logo) ||
					((o = this.GetTexture(0)), this.SetTextureByPath(t.Logo, o))),
			this.jqe(e);
	}
	jke() {
		"Switch" === this.Oke.GetCurrentSequence()
			? this.Oke.ReplaySequenceByKey("Switch")
			: this.Oke.PlayLevelSequenceByName("Switch", !1);
	}
	jqe(e) {
		var t = this.ActivityBaseData.GetRewardDataByRoleId(e);
		this.UNe.SetItemLayoutVisible(void 0 !== t && 0 < t.length),
			(e = this.ActivityBaseData.GetRewardStateByRoleId(e));
		t && 0 < t.length && this.UNe.RefreshItemLayout(t),
			this.GetItem(9).SetUIActive(2 === e),
			this.GetItem(10).SetUIActive(0 === e),
			this.GetButton(11).RootUIComp.SetUIActive(1 === e);
	}
	Fke(e) {
		0 <= (e = this.ActivityBaseData.RoleIdList.indexOf(e)) &&
			this.Nke.GetLayoutItemByIndex(e)?.SetToggleState(!0, !0);
	}
}
exports.ActivitySubViewRoleTrial = ActivitySubViewRoleTrial;
class RoleItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments),
			(this.RoleId = 0),
			(this.Toggle = void 0),
			(this.CanToggleExecuteChange = void 0),
			(this.ToggleCallBack = void 0),
			(this.$ke = () =>
				!this.CanToggleExecuteChange ||
				this.CanToggleExecuteChange(this.RoleId)),
			(this.Yke = () => {
				this.ToggleCallBack &&
					this.ToggleCallBack(this.RoleId, 1 === this.Toggle.GetToggleState());
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[1, UE.UISprite],
			[2, UE.UISprite],
			[3, UE.UITexture],
			[4, UE.UIItem],
		]),
			(this.BtnBindInfo = [[0, this.Yke]]);
	}
	OnStart() {
		(this.Toggle = this.GetExtendToggle(0)),
			this.Toggle &&
				(this.Toggle.CanExecuteChange.Unbind(),
				this.Toggle.CanExecuteChange.Bind(this.$ke));
	}
	Refresh(e) {
		var t;
		(this.RoleId = e),
			(e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(
				ActivityRoleTrialController_1.ActivityRoleTrialController
					.CurrentActivityId,
			)) &&
				((t =
					ConfigManager_1.ConfigManager.ActivityRoleTrialConfig.GetRoleTrialInfoConfigByRoleId(
						this.RoleId,
					)),
				(t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
					t.TrialRoleId,
				)),
				this.SetRoleIcon(
					t.GetRoleConfig().Card,
					this.GetTexture(3),
					t.GetRoleId(),
				),
				this.Jke(t.GetRoleConfig().QualityId),
				this.BNe(e));
	}
	Jke(e) {
		var t = this.GetSprite(1),
			i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
				"SP_RoleIconANormal" + e,
			);
		this.SetSpriteByPath(i, t, !1),
			(i = this.GetSprite(2)),
			(t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
				"SP_RoleIconAHold" + e,
			));
		this.SetSpriteByPath(t, i, !1);
	}
	BNe(e) {
		(e = e.GetRewardStateByRoleId(this.RoleId)),
			this.GetItem(4).SetUIActive(1 === e);
	}
	SetToggleState(e, t = !1) {
		this.Toggle?.SetToggleState(e ? 1 : 0, t);
	}
}
