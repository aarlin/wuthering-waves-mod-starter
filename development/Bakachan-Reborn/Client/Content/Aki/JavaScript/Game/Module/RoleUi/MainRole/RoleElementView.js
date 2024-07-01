"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleElementView = void 0);
const UE = require("ue"),
	CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
	Log_1 = require("../../../../Core/Common/Log"),
	CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
	ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	EffectContext_1 = require("../../../Effect/EffectContext/EffectContext"),
	EffectSystem_1 = require("../../../Effect/EffectSystem"),
	Global_1 = require("../../../Global"),
	GlobalData_1 = require("../../../GlobalData"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	CharacterNameDefines_1 = require("../../../NewWorld/Character/Common/CharacterNameDefines"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	UiLayer_1 = require("../../../Ui/UiLayer"),
	EffectUtil_1 = require("../../../Utils/EffectUtil"),
	ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
	LoadAsyncPromise_1 = require("../../UiComponent/LoadAsyncPromise"),
	UiSceneManager_1 = require("../../UiComponent/UiSceneManager"),
	GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
	MainRoleController_1 = require("../MainRoleController"),
	RoleController_1 = require("../RoleController"),
	RoleElementItem_1 = require("./RoleElementItem");
class RoleElementView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.kGe = void 0),
			(this.uft = void 0),
			(this.s5i = 0),
			(this.plo = void 0),
			(this.Mlo = 0),
			(this.Slo = 0),
			(this.Elo = !1),
			(this.C5i = void 0),
			(this.sGe = () => {
				var e = new RoleElementItem_1.RoleElementItem();
				return (
					e.SetRoleViewAgent(this.plo),
					(e.OnToggleCallback = this.OnToggleClick),
					(e.CanToggleChange = this.Eft),
					e
				);
			}),
			(this.OnToggleClick = (e) => {
				this.ylo(e),
					RoleController_1.RoleController.PlayRoleMontage(19),
					this.Mlo && this.Ilo();
			}),
			(this.Eft = (e) =>
				e !== this.kGe.GetGenericLayout().GetSelectedGridIndex()),
			(this.OnClickClose = () => {
				this.CloseMe();
			}),
			(this.OnClickSwitch = () => {
				var e;
				Global_1.Global.BaseCharacter?.CharacterActorComponent.Entity.GetComponent(
					185,
				)?.HasTag(1996802261)
					? ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
							ConfigManager_1.ConfigManager.TextConfig.GetTextById(
								"CanNotTransferInFight",
							),
						)
					: this.s5i &&
						(e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
							this.s5i,
						)) &&
						MainRoleController_1.MainRoleController.SendRoleElementChangeRequest(
							e.ElementId,
						);
			}),
			(this.wke = (e) => {
				(this.Elo = !0),
					UiLayer_1.UiLayer.SetShowMaskLayer("RoleElementView", !0),
					this.plo.SetCurSelectRoleId(e),
					this.C5i?.Model?.CheckGetComponent(11)?.SetRoleDataId(e),
					this.Tlo(e);
				for (const e of this.kGe.GetScrollItemList()) e.RefreshState();
				this._pt();
			}),
			(this.Llo = (e) => {
				e ? this.Ilo() : this.HideElementPreviewEffect();
			}),
			(this.Dlo = () => {
				UiLayer_1.UiLayer.SetShowMaskLayer("RoleElementView", !1),
					(this.Elo = !1),
					ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
						"ElementTransferSuccess",
					);
			}),
			(this.Ilo = () => {
				var e;
				this.Elo ||
					((e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
						this.s5i,
					)),
					this.ShowElementPreviewEffectById(e.ElementId));
			}),
			(this.Rlo = () => {});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIScrollViewWithScrollbarComponent],
			[2, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [
				[0, this.OnClickClose],
				[2, this.OnClickSwitch],
			]);
	}
	async OnBeforeStartAsync() {
		(this.plo = this.OpenParam),
			void 0 === this.plo
				? Log_1.Log.CheckError() &&
					Log_1.Log.Error("Role", 59, "RoleViewAgent为空", [
						"界面名称",
						"RoleElementView",
					])
				: ((this.C5i =
						UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor()),
					(this.kGe = new GenericScrollViewNew_1.GenericScrollViewNew(
						this.GetScrollViewWithScrollbar(1),
						this.sGe,
					)),
					await this.RefreshAsync(),
					RoleController_1.RoleController.PlayRoleMontage(20));
	}
	async RefreshAsync() {
		var e = ModelManager_1.ModelManager.WorldLevelModel.Sex,
			t = ConfigManager_1.ConfigManager.RoleConfig.GetMainRoleByGender(e),
			o = t.length,
			i = [];
		for (let e = 0; e < o; e++) {
			var n = t[e];
			MainRoleController_1.MainRoleController.IsCanChangeRole(n.Id) &&
				i.push(n);
		}
		(this.uft = i), await this.kGe.RefreshByDataAsync(i);
		const r = this.plo.GetCurSelectRoleId();
		(e = i.findIndex((e) => e.Id === r)), this.ylo(e);
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.ShowRoleElementChangePreviewEffect,
			this.Llo,
		);
	}
	OnAfterShow() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.RoleSystemChangeRole,
			this.wke,
		);
	}
	ylo(e) {
		var t = this.uft[e];
		(this.s5i = t.Id),
			this.kGe.GetGenericLayout().SelectGridProxy(e),
			this._pt();
	}
	_pt() {
		var e = this.plo.GetCurSelectRoleId() === this.s5i;
		this.GetButton(2)?.SetSelfInteractive(!e);
	}
	OnBeforeHide() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.RoleSystemChangeRole,
			this.wke,
		),
			this.HideElementPreviewEffect();
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.ShowRoleElementChangePreviewEffect,
			this.Llo,
		);
	}
	Tlo(e) {
		e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
		var t =
			(RoleController_1.RoleController.PlayRoleMontage(21),
			ConfigManager_1.ConfigManager.RoleConfig.GetRoleElementSwitchDelayTime());
		this.ShowElementSuccessEffectById(e.ElementId),
			TimerSystem_1.TimerSystem.Delay(() => {
				this.Dlo();
			}, t);
	}
	async Ulo(e, t, o, i, n, r) {
		let l,
			s = !1;
		const a = new CustomPromise_1.CustomPromise();
		return (
			r &&
				((r = new LoadAsyncPromise_1.LoadAsyncPromise(r, UE.Texture)),
				(l = await r.Promise),
				(s = !0)),
			(r = EffectUtil_1.EffectUtil.GetEffectPath(e)),
			EffectSystem_1.EffectSystem.SpawnEffect(
				GlobalData_1.GlobalData.World,
				i ?? MathUtils_1.MathUtils.DefaultTransform,
				r,
				"[RoleAnimStateEffectManager.PlayEffect]",
				new EffectContext_1.EffectContext(void 0, t),
				1,
				void 0,
				(e, i) => {
					0 !== e &&
						(n &&
							((e = UE.LinearColor.FromSRGBColor(UE.Color.FromHex(n))),
							this.Alo(i, e, s, l)),
						t &&
							o &&
							EffectSystem_1.EffectSystem.GetEffectActor(
								i,
							)?.K2_AttachToComponent(t, o, 0, 0, 0, !1),
						a.SetResult(i));
				},
				void 0,
				!1,
				!0,
			),
			a.Promise
		);
	}
	Alo(e, t, o, i) {
		var n = (e = EffectSystem_1.EffectSystem.GetSureEffectActor(
			e,
		).GetComponentByClass(UE.NiagaraComponent.StaticClass())).Asset;
		e.SetAsset(void 0),
			e.SetAsset(n),
			e.SetNiagaraVariableLinearColor("Color", t),
			o && e.SetKuroNiagaraEmitterCustomTexture("Icon", "Mask", i);
	}
	ShowElementSuccessEffectById(e) {
		var t, o;
		(e = ConfigManager_1.ConfigManager.ElementInfoConfig.GetElementInfo(e)) &&
			(o = (t = this.C5i).Model?.CheckGetComponent(1)?.MainMeshComponent) &&
			(this.Ulo(
				"AttributeSwitchBodyEffect",
				t.K2_GetRootComponent(),
				CharacterNameDefines_1.CharacterNameDefines.ROOT,
				void 0,
				e.ElementEffectColor,
			).catch(this.Rlo),
			this.Ulo(
				"AttributeSwitchHandEffect",
				o,
				CharacterNameDefines_1.CharacterNameDefines.ELEMENT_EFFECT_SOCKET_NAME,
				void 0,
				e.ElementEffectColor,
				e.Icon3,
			).catch(this.Rlo));
	}
	ShowElementPreviewEffectById(e) {
		if (
			(e = ConfigManager_1.ConfigManager.ElementInfoConfig.GetElementInfo(e))
		) {
			if (this.Mlo) {
				const t = UE.LinearColor.FromSRGBColor(
					UE.Color.FromHex(e.ElementEffectColor),
				);
				ResourceSystem_1.ResourceSystem.LoadAsync(e.Icon3, UE.Texture, (e) => {
					this.Alo(this.Mlo, t, !0, e);
				});
			} else {
				var t = this.C5i,
					o = new UE.Transform(
						new UE.Rotator(0, 0, 0),
						new UE.Vector(0, 0, 0),
						new UE.Vector(1, 1, 1),
					);
				t = t.Model?.CheckGetComponent(1);
				this.Ulo(
					"AttributePreviewHandEffect",
					t?.MainMeshComponent,
					CharacterNameDefines_1.CharacterNameDefines
						.ELEMENT_EFFECT_SOCKET_NAME,
					o,
					e.ElementEffectColor,
					e.Icon3,
				).then((e) => {
					this.Mlo = e;
				}, this.Rlo);
			}
			try {
				var i = UiSceneManager_1.UiSceneManager.GetActorByTag(
					CommonParamById_1.configCommonParamById.GetStringConfig(
						"RoleElementPreviewEffectCase",
					),
				);
				this.Slo ||
					this.Ulo(
						"AttributePreviewBodyEffect",
						void 0,
						void 0,
						i.GetTransform(),
					).then((e) => {
						this.Slo = e;
					}, this.Rlo);
			} catch (e) {
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Role",
						50,
						"给角色属性切换预览特效寻找坐标参考case点失败，中断后续流程",
					);
			}
		}
	}
	HideElementPreviewEffect() {
		EffectSystem_1.EffectSystem.IsValid(this.Mlo) &&
			(EffectSystem_1.EffectSystem.StopEffectById(
				this.Mlo,
				"HideElementPreviewEffect",
				!0,
				!0,
			),
			(this.Mlo = 0)),
			this.Slo &&
				(EffectSystem_1.EffectSystem.StopEffectById(
					this.Slo,
					"HideElementPreviewEffect",
					!0,
					!0,
				),
				(this.Slo = 0));
	}
}
exports.RoleElementView = RoleElementView;
