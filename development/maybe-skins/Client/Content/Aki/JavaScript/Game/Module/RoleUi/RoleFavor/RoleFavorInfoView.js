"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleFavorInfoView = exports.initClassifyItem = void 0);
const UE = require("ue"),
	AudioController_1 = require("../../../../Core/Audio/AudioController"),
	Log_1 = require("../../../../Core/Common/Log"),
	MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	CharacterNameDefines_1 = require("../../../NewWorld/Character/Common/CharacterNameDefines"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	MenuController_1 = require("../../Menu/MenuController"),
	MotionController_1 = require("../../Motion/MotionController"),
	ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
	UiSceneManager_1 = require("../../UiComponent/UiSceneManager"),
	UiModelUtil_1 = require("../../UiModel/UiModelUtil"),
	GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	RoleController_1 = require("../RoleController"),
	RoleFavorBaseInfoComponent_1 = require("./RoleFavorBaseInfoComponent"),
	RoleFavorClassifyItem_1 = require("./RoleFavorClassifyItem"),
	RoleFavorDefine_1 = require("./RoleFavorDefine"),
	RoleFavorDescComponent_1 = require("./RoleFavorDescComponent"),
	RoleFavorLockComponent_1 = require("./RoleFavorLockComponent"),
	RoleFavorPowerInfoComponent_1 = require("./RoleFavorPowerInfoComponent"),
	RoleFavorPreciousItemComponent_1 = require("./RoleFavorPreciousItemComponent"),
	RoleFavorUtil_1 = require("./RoleFavorUtil"),
	initClassifyItem = (e, o, t) => ({
		Key: t,
		Value: new RoleFavorClassifyItem_1.RoleFavorClassifyItem(e, o),
	});
exports.initClassifyItem = initClassifyItem;
class RoleFavorInfoView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.j1o = void 0),
			(this.p1o = []),
			(this.W1o = []),
			(this.K1o = void 0),
			(this.Q1o = void 0),
			(this.X1o = void 0),
			(this.$1o = void 0),
			(this.$zt = 1),
			(this.Y1o = void 0),
			(this.J1o = void 0),
			(this.z1o = void 0),
			(this.Z1o = void 0),
			(this.e_o = void 0),
			(this.t_o = new AudioController_1.PlayResult()),
			(this.i_o = () => {
				this.GetItem(5).SetUIActive(!1),
					this.GetItem(6).SetUIActive(!1),
					this.GetItem(7).SetUIActive(!1),
					this.GetItem(8).SetUIActive(!1),
					this.GetItem(9).SetUIActive(!1);
			}),
			(this.o_o = () => {
				var e = this.W1o.length;
				for (let t = 0; t < e; t++) {
					var o = this.W1o[t];
					RoleFavorUtil_1.RoleFavorUtil.IsSameContentItemData(
						this.K1o,
						o.ContentItemData,
					)
						? (o.SetToggleState(1), o.SetButtonActive(!0), (this.Q1o = o))
						: (o.SetToggleState(0), o.SetButtonActive(!1));
				}
			}),
			(this.I4t = () => {
				this.CloseMe();
			}),
			(this.bl = () => {
				this.ILt(),
					this.r_o(),
					this.ClearVerticalLayout(),
					(this.j1o = new GenericLayoutNew_1.GenericLayoutNew(
						this.GetVerticalLayout(1),
						exports.initClassifyItem,
					)),
					this.j1o.RebuildLayoutByDataNew(this.p1o),
					this.n_o(),
					this.i_o(),
					this.o_o(),
					this.K1o ? this.ShowItemByData(this.K1o) : this.ShowDefaultItem();
			}),
			(this.ILt = () => {
				let e;
				var o = this.GetText(3);
				switch (this.K1o.FavorTabType) {
					case 2:
						e = "FavorAction";
						break;
					case 1:
						e = "FavorExperience";
						break;
					case 3:
						e = "FavorPreciousItem";
						break;
					case 0:
						e = "FavorVoice";
				}
				LguiUtil_1.LguiUtil.SetLocalText(o, e);
			}),
			(this.r_o = () => {
				switch (this.K1o.FavorTabType) {
					case 2:
						this.p1o = this.s_o();
						break;
					case 1:
						this.p1o = this.a_o();
						break;
					case 3:
						this.p1o = this.h_o();
						break;
					case 0:
						this.p1o = this.l_o();
				}
			}),
			(this.s_o = () => {
				var e = [],
					o = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
						this.K1o.RoleId,
					).GetRoleId(),
					t = ConfigManager_1.ConfigManager.MotionConfig.GetRoleMotionByType(
						o,
						1,
					),
					i = ConfigManager_1.ConfigManager.MotionConfig.GetRoleMotionByType(
						o,
						2,
					);
				return (
					t &&
						0 < t.length &&
						((t = new RoleFavorDefine_1.ClassifyItemData(
							"FavorIdleAction",
							2,
							o,
							1,
						)),
						e.push(t)),
					i &&
						0 < i.length &&
						((t = new RoleFavorDefine_1.ClassifyItemData(
							"FavorFightAction",
							2,
							o,
							2,
						)),
						e.push(t)),
					e
				);
			}),
			(this.a_o = () => {
				var e = [],
					o = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
						this.K1o.RoleId,
					).GetRoleId(),
					t = new RoleFavorDefine_1.ClassifyItemData("FavorRoleInfo", 1, o, 1);
				o = new RoleFavorDefine_1.ClassifyItemData("FavorRoleStory", 1, o, 3);
				return e.push(t, o), e;
			}),
			(this.h_o = () => {
				var e = [],
					o = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
						this.K1o.RoleId,
					).GetRoleId();
				o = new RoleFavorDefine_1.ClassifyItemData(
					"FavorPreciousItem",
					3,
					o,
					void 0,
				);
				return e.push(o), e;
			}),
			(this.l_o = () => {
				var e = [],
					o = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
						this.K1o.RoleId,
					).GetRoleId(),
					t = ConfigManager_1.ConfigManager.RoleFavorConfig.GetFavorWordConfig(
						o,
						1,
					),
					i = ConfigManager_1.ConfigManager.RoleFavorConfig.GetFavorWordConfig(
						o,
						2,
					);
				return (
					t &&
						0 < t.length &&
						((t = new RoleFavorDefine_1.ClassifyItemData(
							"FavorNatureVoice",
							0,
							o,
							1,
						)),
						e.push(t)),
					i &&
						0 < i.length &&
						((t = new RoleFavorDefine_1.ClassifyItemData(
							"FavorFightVoice",
							0,
							o,
							2,
						)),
						e.push(t)),
					e
				);
			}),
			(this.n_o = () => {
				for (const e of this.j1o.GetLayoutItemList())
					for (const o of e.ContentGenericLayout.GetLayoutItemList())
						o.SetToggleFunction(this.U4e),
							o.SetButtonFunction(this.Qyt),
							this.W1o.push(o);
			}),
			(this.U4e = (e, o, t) => {
				e &&
					(this.i_o(),
					(this.K1o = o),
					(this.X1o = this.Q1o),
					this.o_o(),
					this.OnToggleClick(t, this.K1o));
			}),
			(this.Qyt = (e, o) => {
				var t = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
						this.K1o.RoleId,
					),
					i = t.GetFavorData();
				let n = 0;
				(n =
					2 === e.FavorTabType
						? ((t = ModelManager_1.ModelManager.MotionModel.GetRoleMotionState(
								t.GetRoleId(),
								e.Config.Id,
							)),
							Number(t))
						: i.GetFavorItemState(e.Config.Id, e.FavorTabType)),
					(!RoleFavorUtil_1.RoleFavorUtil.IsRoleInfo(e) && 2 !== n) ||
						(0 === e.FavorTabType
							? this.PlayVoice(o)
							: 2 === e.FavorTabType && this.__o(o));
			}),
			(this.u_o = (e, o) => {
				if (e === this.K1o.RoleId) {
					for (const e of this.W1o)
						e.ContentItemData.Config.Id === o &&
							(e.Refresh(), this.U4e(!0, e.ContentItemData, e));
					ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
						"30001",
					);
				}
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIVerticalLayout],
			[2, UE.UIItem],
			[3, UE.UIText],
			[4, UE.UIText],
			[5, UE.UIItem],
			[6, UE.UIItem],
			[7, UE.UIItem],
			[8, UE.UIItem],
			[9, UE.UIItem],
			[10, UE.UIDraggableComponent],
			[11, UE.UIText],
		]),
			(this.BtnBindInfo = [[0, this.I4t]]);
	}
	OnStart() {
		(this.K1o = this.OpenParam), this.bl();
	}
	OnHandleLoadScene() {
		UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor()
			?.Model?.CheckGetComponent(1)
			?.SetTransformByTag("RoleCase");
	}
	OnBeforeShow() {
		this.K1o &&
			3 === this.K1o.FavorTabType &&
			UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor()?.SetActorHiddenInGame(
				!0,
			);
	}
	OnAfterHide() {
		this.K1o &&
			3 === this.K1o.FavorTabType &&
			UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor()?.SetActorHiddenInGame(
				!1,
			);
	}
	ClearVerticalLayout() {
		this.j1o && (this.j1o.ClearChildren(), (this.j1o = void 0));
	}
	OnBeforeDestroy() {
		this.Y1o && (this.Y1o.Destroy(), (this.Y1o = void 0)),
			this.J1o && (this.J1o.Destroy(), (this.J1o = void 0)),
			this.z1o && (this.z1o.Destroy(), (this.z1o = void 0)),
			this.Z1o && (this.Z1o.Destroy(), (this.Z1o = void 0)),
			this.e_o && (this.e_o.Destroy(), (this.e_o = void 0)),
			this.ClearVerticalLayout(),
			(this.p1o = []),
			(this.K1o = void 0),
			AudioController_1.AudioController.StopEvent(this.t_o);
	}
	OnToggleClick(e, o) {
		var t = this.GetItemState(o);
		if (RoleFavorUtil_1.RoleFavorUtil.IsRoleInfo(o) || 2 === t)
			switch (o.FavorTabType) {
				case 2:
					this.ShowActionItem(), this.__o(e);
					break;
				case 1:
					this.ShowExperienceItem();
					break;
				case 3:
					this.ShowPreciousItem();
					break;
				case 0:
					this.ShowVoiceItem(), this.PlayVoice(e);
			}
		else this.HandleLockItemData();
	}
	HandleLockItemData() {
		var e = this.K1o.Config.Id,
			o = this.K1o.FavorTabType;
		let t;
		var i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
				this.K1o.RoleId,
			),
			n = i.GetFavorData();
		if (1 === o) t = Protocol_1.Aki.Protocol.dks.Proto_Story;
		else {
			if (2 === o)
				return (
					this.X1o && this.ClearRoleMontage(this.X1o),
					(a = ModelManager_1.ModelManager.MotionModel.GetRoleMotionState(
						i.GetRoleId(),
						e,
					)),
					void (1 === (a = Number(a))
						? MotionController_1.MotionController.RequestUnlockMotion(
								i.GetRoleId(),
								e,
							)
						: 0 === a && this.ShowLockItem())
				);
			3 === o
				? (t = Protocol_1.Aki.Protocol.dks.Proto_Goods)
				: 0 === o &&
					((t = Protocol_1.Aki.Protocol.dks.I3n), this.X1o) &&
					this.ClearAudio(this.X1o);
		}
		var a = n.GetFavorItemState(this.K1o.Config.Id, o);
		1 === a
			? RoleController_1.RoleController.SendRoleFavorUnLockRequest(
					t,
					i.GetRoleId(),
					e,
				)
			: 0 === a && this.ShowLockItem();
	}
	ClearAudio(e) {
		AudioController_1.AudioController.StopEvent(this.t_o), e.EndPlay();
	}
	ClearRoleMontage(e) {
		var o = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor();
		o &&
			((o = o.Model),
			UiModelUtil_1.UiModelUtil.SetVisible(o, !0),
			(o = o.CheckGetComponent(1)?.MainMeshComponent)) &&
			((o = o
				.GetAnimInstance()
				.GetLinkedAnimGraphInstanceByTag(
					CharacterNameDefines_1.CharacterNameDefines.ABP_BASE,
				)).StopSlotAnimation(),
			e.OnMontageCompleted && o.OnMontageEnded.Remove(e.OnMontageCompleted),
			e.EndPlay());
	}
	ShowDefaultItem() {
		var e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
				this.K1o.RoleId,
			).GetRoleId(),
			o =
				ConfigManager_1.ConfigManager.RoleFavorConfig.GetFavorRoleInfoConfig(e);
		e = new RoleFavorDefine_1.ContentItemData(1, e, o, 1);
		this.ShowItemByData(e);
	}
	GetItemState(e) {
		var o = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
				this.K1o.RoleId,
			),
			t = o.GetFavorData();
		return 2 === e.FavorTabType
			? ((o = ModelManager_1.ModelManager.MotionModel.GetRoleMotionState(
					o.GetRoleId(),
					e.Config.Id,
				)),
				Number(o))
			: t.GetFavorItemState(e.Config.Id, e.FavorTabType);
	}
	ShowItemByData(e) {
		this.i_o();
		var o = this.GetItemState(e);
		if (RoleFavorUtil_1.RoleFavorUtil.IsRoleInfo(e) || 2 === o)
			switch (e.FavorTabType) {
				case 2:
					this.ShowActionItem();
					break;
				case 1:
					this.ShowExperienceItem();
					break;
				case 3:
					this.ShowPreciousItem();
					break;
				case 0:
					this.ShowVoiceItem();
			}
		else this.HandleLockItemData();
	}
	ShowActionItem() {
		var e = this.GetItem(6),
			o =
				(e.SetUIActive(!0), this.GetText(11)?.SetUIActive(!1), this.K1o.Config),
			t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(o.Title);
		let i = StringUtils_1.EMPTY_STRING;
		o.Content !== StringUtils_1.EMPTY_STRING &&
			(i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(o.Content)),
			(o = new RoleFavorDefine_1.RoleFavorDescComponentData(t, i)),
			(this.Y1o = new RoleFavorDescComponent_1.RoleFavorDescComponent(e, o));
	}
	ShowExperienceItem() {
		this.GetText(11)?.SetUIActive(!1);
		var e = this.K1o.TypeParam;
		1 === e
			? this.ShowBaseInfoItem()
			: 2 === e
				? this.ShowRolePowerFileItem()
				: 3 === e && this.ShowRoleExperienceItem();
	}
	ShowBaseInfoItem() {
		var e = this.GetItem(7);
		e.SetUIActive(!0),
			(this.J1o = new RoleFavorBaseInfoComponent_1.RoleFavorBaseInfoComponent(
				e,
				this.K1o.RoleId,
			));
	}
	ShowRolePowerFileItem() {
		var e = this.GetItem(8);
		e.SetUIActive(!0),
			(this.z1o = new RoleFavorPowerInfoComponent_1.RoleFavorPowerInfoComponent(
				e,
				this.K1o.Config,
			));
	}
	ShowRoleExperienceItem() {
		var e = this.GetItem(6),
			o = (e.SetUIActive(!0), this.K1o.Config),
			t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(o.Title);
		(o = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(o.Content)),
			(t = new RoleFavorDefine_1.RoleFavorDescComponentData(t, o));
		this.Y1o = new RoleFavorDescComponent_1.RoleFavorDescComponent(e, t);
	}
	ShowPreciousItem() {
		this.GetText(11)?.SetUIActive(!1);
		var e = this.GetItem(9),
			o = (e.SetUIActive(!0), this.GetItem(6)),
			t = (o.SetUIActive(!0), this.K1o.Config),
			i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Title),
			n = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Content);
		i = new RoleFavorDefine_1.RoleFavorDescComponentData(i, n);
		(this.Y1o = new RoleFavorDescComponent_1.RoleFavorDescComponent(o, i)),
			(this.Z1o =
				new RoleFavorPreciousItemComponent_1.RoleFavorPreciousItemComponent(
					e,
					t,
					!1,
				));
	}
	ShowVoiceItem() {
		var e = this.GetItem(6),
			o = (e.SetUIActive(!0), this.K1o.Config),
			t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(o.Title),
			i =
				((o = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(o.Content)),
				RoleFavorUtil_1.RoleFavorUtil.GetCurLanguageCvName(this.K1o.RoleId)),
			n = this.GetText(11);
		i === StringUtils_1.EMPTY_STRING
			? n?.SetUIActive(!1)
			: (n?.SetUIActive(!0), LguiUtil_1.LguiUtil.SetLocalTextNew(n, i)),
			(n = new RoleFavorDefine_1.RoleFavorDescComponentData(t, o));
		this.Y1o = new RoleFavorDescComponent_1.RoleFavorDescComponent(e, n);
	}
	ShowLockItem() {
		this.i_o();
		var e,
			o = this.GetItem(5);
		o.SetUIActive(!0),
			this.e_o
				? this.e_o.Refresh(this.K1o)
				: (this.e_o = new RoleFavorLockComponent_1.RoleFavorLockComponent(
						o,
						this.K1o,
					)),
			3 === this.K1o.FavorTabType &&
				((o = this.K1o.Config),
				(e = this.GetItem(9)).SetUIActive(!0),
				this.Z1o
					? this.Z1o.Refresh(o, !0)
					: (this.Z1o =
							new RoleFavorPreciousItemComponent_1.RoleFavorPreciousItemComponent(
								e,
								o,
								!0,
							)));
	}
	PlayVoice(e) {
		if (0 === e.GetCurVoiceState())
			this.ClearAudio(e),
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Role", 44, "关闭当前选项正在播放的语音");
		else {
			this.X1o &&
				0 === this.X1o.GetCurVoiceState() &&
				(this.ClearAudio(this.X1o), Log_1.Log.CheckDebug()) &&
				Log_1.Log.Debug("Role", 44, "关闭上个选项播放的语音");
			var o = MenuController_1.MenuController.GetTargetConfig(1),
				t = MenuController_1.MenuController.GetTargetConfig(2);
			if (0 === o || 0 === t)
				ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
					"FavorVolume",
				);
			else if (
				((o = this.K1o.Config),
				(this.$1o = o.Voice),
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Role", 44, "播放当前点击的语音", [
						"this.VoicePath",
						this.$1o,
					]),
				"" === this.$1o)
			)
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("Role", 44, "配置的语音路径为空", [
						"this.VoicePath",
						this.$1o,
					]);
			else {
				const o = this.$1o,
					t = this.t_o,
					i = this.$zt;
				AudioController_1.AudioController.LoadAndAddCallback(
					this.$1o,
					function () {
						e.StartPlay(),
							AudioController_1.AudioController.PostEventByUi(
								o,
								t,
								i,
								e.CloseAudioDelegate,
							);
					},
					this.t_o,
				);
			}
		}
	}
	__o(e) {
		var o = this.K1o.Config;
		0 === e.GetCurVoiceState()
			? this.ClearRoleMontage(e)
			: (this.X1o &&
					0 === this.X1o.GetCurVoiceState() &&
					this.ClearRoleMontage(this.X1o),
				ResourceSystem_1.ResourceSystem.LoadAsync(
					o.AniMontage,
					UE.AnimMontage,
					(o) => {
						var t;
						o?.IsValid() &&
							(t = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor()) &&
							((t = t.Model),
							UiModelUtil_1.UiModelUtil.SetVisible(t, !0),
							(t = t.CheckGetComponent(1)?.MainMeshComponent)) &&
							(e.StartPlay(),
							(t = t
								.GetAnimInstance()
								.GetLinkedAnimGraphInstanceByTag(
									CharacterNameDefines_1.CharacterNameDefines.ABP_BASE,
								)).Montage_Play(o),
							t.OnMontageEnded.Add(e.OnMontageCompleted));
					},
				));
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.UnLockRoleFavorItem,
			this.u_o,
		);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.UnLockRoleFavorItem,
			this.u_o,
		);
	}
}
exports.RoleFavorInfoView = RoleFavorInfoView;
