"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SpecialEnergyBarMorph = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	Time_1 = require("../../../../../Core/Common/Time"),
	SpecialEnergyBaIconHandle_1 = require("./SpecialEnergyBaIconHandle"),
	SpecialEnergyBarBase_1 = require("./SpecialEnergyBarBase"),
	SpecialEnergyBarPoint_1 = require("./SpecialEnergyBarPoint"),
	SpecialEnergyBarPointGraduate_1 = require("./SpecialEnergyBarPointGraduate"),
	SpecialEnergyBarSlot_1 = require("./SpecialEnergyBarSlot"),
	specialEnergyBarClassList = [
		void 0,
		void 0,
		void 0,
		SpecialEnergyBarPoint_1.SpecialEnergyBarPoint,
		SpecialEnergyBarSlot_1.SpecialEnergyBarSlot,
		void 0,
		void 0,
		void 0,
		void 0,
		SpecialEnergyBarPointGraduate_1.SpecialEnergyBarPointGraduate,
	],
	EFFECT_DURATION = 500;
class SpecialEnergyBarMorph extends SpecialEnergyBarBase_1.SpecialEnergyBarBase {
	constructor() {
		super(...arguments),
			(this.Cmt = new SpecialEnergyBaIconHandle_1.SpecialEnergyBaIconHandle()),
			(this.BarItem = void 0),
			(this.fmt = 0),
			(this.Ent = void 0),
			(this.gGn = !1),
			(this.fGn = !1),
			(this.NeedExtraEffectOnKeyEnable = !1),
			(this.KeyEnableNiagaraIndex = 0);
	}
	async InitByPathAsync(e, t) {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("Battle", 18, "加载特殊能量条 - 变身组件"),
			(this.NeedOverrideDestroy = !1),
			await this.CreateByResourceIdAsync("UiItem_BarPointMorp", e, !0),
			this.AddEvents(),
			this.RefreshVisible();
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UIItem],
			[2, UE.UINiagara],
			[3, UE.UINiagara],
		];
	}
	async OnBeforeStartAsync() {
		var e = [];
		e.push(this.InitBarItem()),
			e.push(this.LoadEffects()),
			e.push(this.InitKeyItem(this.GetItem(1))),
			await Promise.all(e);
	}
	OnStart() {
		var e = [this.GetSprite(0)];
		this.Cmt.Init(e),
			this.Config?.EnableIconPath
				? (this.gGn = !0)
				: ((this.gGn = !1),
					this.Config?.IconPath && this.Cmt.SetIcon(this.Config.IconPath)),
			0 === this.fmt && this.GetUiNiagara(2).SetUIActive(!1),
			this.Config?.BuffId &&
				(this.Ent = this.RoleData?.BuffComponent?.GetBuffById(
					this.Config.BuffId,
				)),
			(this.KeyEnableNiagaraIndex = this.Config?.KeyEnableNiagaraIndex ?? -1),
			(this.NeedExtraEffectOnKeyEnable = 0 <= this.KeyEnableNiagaraIndex),
			this.NeedExtraEffectOnKeyEnable &&
				((e = this.NiagaraList[this.KeyEnableNiagaraIndex]) &&
					this.GetUiNiagara(3).SetNiagaraSystem(e),
				this.GetUiNiagara(3).SetUIActive(!1)),
			this.RefreshBarPercent(!0);
	}
	OnChangeVisibleByTagChange(e) {
		e
			? (this.Config?.BuffId &&
					(this.Ent = this.RoleData?.BuffComponent?.GetBuffById(
						this.Config.BuffId,
					)),
				this.IsShowOrShowing &&
					(this.GetUiNiagara(2).SetUIActive(!0),
					(this.fmt = 500 + Time_1.Time.Now)))
			: ((this.Ent = void 0), this.Cmt.PlayEndAnim(!1));
	}
	async InitBarItem() {
		var e = this.GetSpecialEnergyBarClass();
		e &&
			((this.BarItem = new e()),
			this.BarItem.InitData(this.RoleData, this.Config, !1),
			(e !== SpecialEnergyBarSlot_1.SpecialEnergyBarSlot &&
				e !== SpecialEnergyBarPoint_1.SpecialEnergyBarPoint &&
				e !== SpecialEnergyBarPointGraduate_1.SpecialEnergyBarPointGraduate) ||
				(this.BarItem.IsMorph = !0),
			await this.BarItem.InitByPathAsync(
				this.RootItem,
				this.Config.PrefabPath,
			));
	}
	GetSpecialEnergyBarClass() {
		return specialEnergyBarClassList[this.Config.PrefabType];
	}
	OnBeforeDestroy() {
		super.OnBeforeDestroy(), this.Cmt.OnBeforeDestroy();
	}
	RefreshBarPercent(e = !1) {
		var t = this.GetKeyEnable();
		this.RefreshIcon(t),
			this.RefreshExtraEffectOnKeyEnable(t),
			this.KeyItem?.RefreshKeyEnable(t, e);
	}
	RefreshIcon(e) {
		if (this.gGn) {
			let t = this.Config.IconPath;
			e && this.Config.EnableIconPath && (t = this.Config.EnableIconPath),
				this.Cmt.SetIcon(t);
		}
	}
	RefreshExtraEffectOnKeyEnable(e) {
		this.NeedExtraEffectOnKeyEnable &&
			this.fGn !== e &&
			((this.fGn = e), this.GetUiNiagara(3).SetUIActive(e));
	}
	OnBarPercentChanged() {
		this.RefreshBarPercent();
	}
	OnKeyEnableChanged() {
		this.RefreshBarPercent();
	}
	Tick(e) {
		super.Tick(e),
			this.BarItem?.Tick(e),
			0 < this.fmt &&
				this.fmt <= Time_1.Time.Now &&
				(this.GetUiNiagara(2).SetUIActive(!1), (this.fmt = 0)),
			this.Ent &&
				this.Ent.GetRemainDuration() < this.Config.ExtraFloatParams[0] &&
				this.Cmt.PlayEndAnim(!0);
	}
}
exports.SpecialEnergyBarMorph = SpecialEnergyBarMorph;
