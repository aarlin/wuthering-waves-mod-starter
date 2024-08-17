"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattleSkillUltraItem = void 0);
const UE = require("ue"),
	ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class BattleSkillUltraItem extends UiPanelBase_1.UiPanelBase {
	constructor(t) {
		super(),
			(this.Visible = !1),
			(this.mit = void 0),
			(this.dit = void 0),
			(this.Cit = ""),
			(this.git = void 0),
			(this.fit = ""),
			(this.pit = void 0),
			(this.vit = void 0),
			(this.Mit = -1),
			(this.nit = new Map()),
			this.CreateByResourceIdAsync("UiItem_BattleSkillUltraItem", t);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UINiagara],
			[2, UE.UINiagara],
			[3, UE.UINiagara],
		];
	}
	OnStart() {
		this.mit = this.GetSprite(0);
		for (const t of this.nit.values()) t();
	}
	OnBeforeDestroy() {
		(this.mit = void 0), this.nit.clear(), this.Eit(), this.yit();
	}
	SetComponentActive(t) {
		(this.Visible = t),
			(t = () => {
				this.SetActive(this.Visible);
			}),
			this.InAsyncLoading() ? this.nit.set("SetActive", t) : t();
	}
	SetBarPercent(t, i) {
		var e;
		this.Mit !== t &&
			((e = () => {
				this.mit.SetFillAmount(t), (this.Mit = t);
			}),
			this.InAsyncLoading() ? this.nit.set("SetBarPercent", e) : e());
	}
	SetBarVisible(t) {
		var i = () => {
			this.mit.bIsUIActive !== t && this.mit.SetUIActive(t);
		};
		this.InAsyncLoading() ? this.nit.set("SetBarVisible", i) : i();
	}
	SetFrameSprite(t) {
		var i;
		!t ||
			(this.dit && this.dit.op_Equality(t)) ||
			((i = () => {
				this.mit?.SetColor(t), (this.dit = t);
			}),
			this.InAsyncLoading() ? this.nit.set("SetFrameSprite", i) : i());
	}
	SetUltraEffectEnable(t) {
		var i = () => {
			var i = this.GetUiNiagara(1);
			i.bIsUIActive !== t &&
				(i.SetUIActive(t), t ? i.ActivateSystem(!0) : i.DeactivateSystem());
		};
		this.InAsyncLoading() ? this.nit.set("SetUltraEffectEnable", i) : i();
	}
	SetUltraTipsEffectEnable(t) {
		var i = () => {
			var i = this.GetUiNiagara(2);
			i.bIsUIActive !== t && i.SetUIActive(t),
				t ? i.ActivateSystem(!0) : i.DeactivateSystem();
		};
		this.InAsyncLoading() ? this.nit.set("SetUltraTipsEffectEnable", i) : i();
	}
	SetUltraUpEffectEnable(t) {
		var i = () => {
			var i = this.GetUiNiagara(3);
			i.bIsUIActive !== t && i.SetUIActive(t),
				t
					? (i.SetNiagaraVarFloat("Time", this.Mit), i.ActivateSystem(!0))
					: i.DeactivateSystem();
		};
		this.InAsyncLoading() ? this.nit.set("SetUltraUpEffectEnable", i) : i();
	}
	RefreshUltraEffect(t, i) {
		var e;
		StringUtils_1.StringUtils.IsEmpty(this.Cit) || this.Cit !== t
			? ((this.git = i),
				(e = () => {
					this.Eit(),
						(this.pit = ResourceSystem_1.ResourceSystem.LoadAsync(
							t,
							UE.NiagaraSystem,
							(t) => {
								var i;
								t?.IsValid() &&
									((i = this.GetUiNiagara(1))?.SetNiagaraSystem(t),
									i?.SetNiagaraVarLinearColor("Color", this.git));
							},
						)),
						(this.Cit = t);
				}),
				this.InAsyncLoading() ? this.nit.set("RefreshUltraEffect", e) : e())
			: this.git !== i &&
				((this.git = i),
				this.InAsyncLoading() ||
					this.GetUiNiagara(1)?.SetNiagaraVarLinearColor("Color", this.git));
	}
	Eit() {
		this.pit &&
			(ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.pit),
			(this.pit = void 0));
	}
	RefreshUltraTipsEffect(t) {
		var i;
		(!StringUtils_1.StringUtils.IsEmpty(this.fit) && this.fit === t) ||
			((i = () => {
				this.yit(),
					(this.vit = ResourceSystem_1.ResourceSystem.LoadAsync(
						t,
						UE.NiagaraSystem,
						(t) => {
							t?.IsValid() && this.GetUiNiagara(2)?.SetNiagaraSystem(t);
						},
					)),
					(this.fit = t);
			}),
			this.InAsyncLoading() ? this.nit.set("RefreshUltraTipsEffect", i) : i());
	}
	yit() {
		this.vit &&
			(ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.vit),
			(this.vit = void 0));
	}
}
exports.BattleSkillUltraItem = BattleSkillUltraItem;
