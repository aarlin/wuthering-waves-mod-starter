"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ResonanceChainView = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	RenderModuleController_1 = require("../../../Render/Manager/RenderModuleController"),
	UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase"),
	LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
	UiSceneManager_1 = require("../../UiComponent/UiSceneManager"),
	RoleController_1 = require("../RoleController"),
	RoleDefine_1 = require("../RoleDefine"),
	ResonanceChainInfoItem_1 = require("./ResonanceChainInfoItem"),
	ResonanceChainItem_1 = require("./ResonanceChainItem"),
	RESONANCE_FIRST_ITEM_ANGLE = -60,
	RESONANCE_PER_ITEM_ANGLE = 30,
	RESONANCE_ITEM_COUNT = 6;
class ResonanceChainView extends UiTabViewBase_1.UiTabViewBase {
	constructor() {
		super(...arguments),
			(this.plo = void 0),
			(this.Vuo = void 0),
			(this.Huo = void 0),
			(this.juo = void 0),
			(this.Wuo = void 0),
			(this.xWt = void 0),
			(this.Gft = void 0),
			(this.Kuo = -1),
			(this.ZPt = (e) => {
				var t;
				("CamLef" !== e && "CamRig" !== e) ||
					((t = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor()),
					this.Gft.SetActorTag(e, RoleDefine_1.UI_SCENE_ROLE_TAG, t),
					this.Gft.SetRelativeTransform(
						e,
						RenderModuleController_1.RenderModuleController.GetKuroCurrentUiSceneTransform(),
					));
			}),
			(this.Quo = () => {
				this.Xuo();
				var e,
					t,
					o = this.plo.GetCurRoleResonanceGroupIndex() - 1;
				const i = this.juo[o];
				i &&
					(i.PlayActivateSequence(() => {
						i.SetActive(!1);
					}),
					(e = this.$uo(o)),
					(t = this.plo.GetCurSelectRoleId()),
					e.SetSelectState(!0),
					e.Update(t, i.GetResonanceId()),
					e.SetActive(!0),
					(this.juo[o] = e).PlayActivateSequence(),
					(t = 1 + o) < this.juo.length) &&
					this.juo[t].RefreshRedDot();
			}),
			(this.Yuo = (e) => {
				this.PlayMontageStart(),
					this.Gft.StopSequenceByKey("Start"),
					this.Gft.PlayLevelSequenceByName("Start"),
					this.bl(),
					this.ShowItems();
			}),
			(this.Juo = () => {
				this.zuo(),
					this.Gft.StopSequenceByKey("CamLef"),
					this.Gft.PlayLevelSequenceByName("CamLef"),
					this.Zuo();
			}),
			(this.eco = (e) => {
				var t = this.Kuo;
				let o, i;
				0 <= t && (o = this.tco(t)),
					0 <= (t = e) && ((this.Kuo = t), (i = this.tco(t))),
					o?.RefreshToggleState(!1),
					i?.RefreshToggleState(!0),
					0 === this.plo.RoleViewState && this.ico(),
					this.Xuo();
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UIItem],
		];
	}
	OnStart() {
		(this.plo = this.ExtraParams),
			void 0 === this.plo
				? Log_1.Log.CheckError() &&
					Log_1.Log.Error("Role", 59, "RoleViewAgent为空", [
						"界面名称",
						"ResonanceChainView",
					])
				: (this.Fq(), this.oco());
	}
	Fq() {
		(this.Wuo = new Array(6)),
			(this.Vuo = new Array(6)),
			(this.Huo = new Array(6)),
			(this.juo = new Array(6)),
			(this.Wuo[0] = this.GetItem(0)),
			(this.Wuo[1] = this.GetItem(1)),
			(this.Wuo[2] = this.GetItem(2)),
			(this.Wuo[3] = this.GetItem(3)),
			(this.Wuo[4] = this.GetItem(4)),
			(this.Wuo[5] = this.GetItem(5)),
			(this.Gft = new LevelSequencePlayer_1.LevelSequencePlayer(
				this.GetRootItem(),
			)),
			this.Gft.BindSequenceStartEvent(this.ZPt);
	}
	oco() {
		this.Kuo = -1;
	}
	AddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.UpdateRoleResonanceDetailView,
			this.Quo,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.RoleSystemChangeRole,
				this.Yuo,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnRoleInternalViewQuit,
				this.Juo,
			);
	}
	RemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.UpdateRoleResonanceDetailView,
			this.Quo,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.RoleSystemChangeRole,
				this.Yuo,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnRoleInternalViewQuit,
				this.Juo,
			);
	}
	OnBeforeShow() {
		this.PlayMontageStart(),
			this.bl(),
			this.ShowItems().then(() => {
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.FinishGuideStepByEvent,
					"ResonanceChainGuide",
				);
			});
	}
	async ShowItems() {
		const e = [];
		this.juo.forEach((t) => {
			e.push(t.ShowItem());
		}),
			await Promise.all(e);
	}
	ico() {
		this.rco(),
			this.Gft.StopSequenceByKey("CamRig"),
			this.Gft.PlayLevelSequenceByName("CamRig"),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnRoleInternalViewEnter,
			);
	}
	PlayMontageStart() {
		RoleController_1.RoleController.PlayRoleMontage(7);
	}
	rco() {
		0 <= this.Kuo &&
			!this.xWt &&
			(this.xWt = new ResonanceChainInfoItem_1.ResonanceChainInfoItem(
				this.RootItem,
			)),
			this.xWt.ShowItem().then(() => this.xWt?.SetUiActive(!0));
	}
	zuo() {
		this.xWt.HideItem().then(() => this.xWt?.SetUiActive(!1));
	}
	nco(e) {
		if (!(e < 0 || e >= 6)) return 30 * e - 60;
	}
	sco(e) {
		if (!(e < 0 || e >= 6)) {
			let t = this.Huo[e];
			return (
				t ||
					((t = new ResonanceChainItem_1.ResonanceChainLockedItem(this.Wuo[e])),
					(this.Huo[e] = t).BindToggleCallBack(this.eco),
					t.SetIconRotation(this.nco(e))),
				t
			);
		}
	}
	$uo(e) {
		if (!(e < 0 || e >= 6)) {
			let t = this.Vuo[e];
			return (
				t ||
					((t = new ResonanceChainItem_1.ResonanceChainActivatedItem(
						this.Wuo[e],
					)),
					(this.Vuo[e] = t).BindToggleCallBack(this.eco),
					t.SetIconRotation(this.nco(e))),
				t
			);
		}
	}
	tco(e) {
		if (
			(e =
				ConfigManager_1.ConfigManager.RoleResonanceConfig.GetRoleResonanceById(
					e,
				)) &&
			0 <= (e = e.GroupIndex - 1) &&
			e < 6
		)
			return this.juo[e];
	}
	bl() {
		const e = this.plo.GetCurRoleResonanceGroupIndex();
		var t = this.plo.GetCurRoleResonanceConfigList();
		const o = this.plo.GetCurSelectRoleId();
		this.juo.forEach((e) => {
			e?.SetActive(!1);
		}),
			t &&
				0 < t.length &&
				t.forEach((t) => {
					let i;
					var n = t.GroupIndex,
						s = n - 1;
					s < 6 &&
						((i = n <= e ? this.$uo(s) : this.sco(s)).SetActive(!0),
						i.Update(o, t.Id),
						(this.juo[s] = i));
				});
	}
	Zuo() {
		var e = this.Kuo;
		let t;
		0 <= e && (t = this.tco(e)), (this.Kuo = -1), t?.RefreshToggleState(!1, !0);
	}
	Xuo() {
		this.xWt ||
			(this.xWt = new ResonanceChainInfoItem_1.ResonanceChainInfoItem(
				this.RootItem,
			));
		var e = this.plo.GetCurSelectRoleData();
		this.xWt.Update(e.GetDataId(), this.Kuo, e.IsTrialRole());
	}
	OnBeforeDestroy() {
		this.Vuo.forEach((e) => {
			e?.Destroy();
		}),
			this.Huo.forEach((e) => {
				e?.Destroy();
			}),
			(this.Vuo = void 0),
			(this.Huo = void 0),
			(this.juo = void 0),
			(this.Wuo = void 0),
			(this.Gft = void 0),
			this.oco();
	}
	GetGuideUiItemAndUiItemForShowEx(e) {
		if (0 === e.length)
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("Guide", 17, "共鸣链聚焦引导extraParam字段配置错误", [
					"configParams",
					e,
				]);
		else {
			var t = this.aco(e[0]);
			if (t) return [t, t];
			Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"Guide",
					17,
					"共鸣链聚焦引导extraParam字段配置错误, 找不到对应的共鸣链界面UI节点",
					["configParams", e],
				);
		}
	}
	aco(e) {
		let t;
		var o = Number(e);
		return (
			o
				? (t = this.sco(--o)?.GetUiItemForGuide())
				: "btn" === e && (t = this.xWt?.GetUiItemForGuide()),
			t
		);
	}
}
exports.ResonanceChainView = ResonanceChainView;
