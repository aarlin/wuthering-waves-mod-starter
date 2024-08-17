"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FullScreenNiagaraItem = void 0);
const UE = require("ue"),
	CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
	ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	BattleChildView_1 = require("./BattleChildView/BattleChildView");
class FullScreenNiagaraItem extends BattleChildView_1.BattleChildView {
	constructor() {
		super(...arguments), (this.cat = void 0), (this.mat = void 0);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UINiagara]];
	}
	Reset() {
		this.mat?.SetNiagaraSystem(void 0),
			(this.cat = void 0),
			(this.mat = void 0),
			super.Reset();
	}
	async LoadNiagara(t) {
		if (StringUtils_1.StringUtils.IsEmpty(t)) return !1;
		if (this.cat === t) return !1;
		this.cat = t;
		const e = new CustomPromise_1.CustomPromise();
		return (
			ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.NiagaraSystem, (t) => {
				t && this.RootItem && ((this.mat = this.GetUiNiagara(0)), this.mat)
					? (this.mat.SetNiagaraSystem(void 0),
						this.mat.SetNiagaraSystem(t),
						e.SetResult(!0))
					: e.SetResult(!1);
			}),
			await e.Promise,
			!0
		);
	}
	SetNiagaraFloatValue(t, e) {
		this.mat && this.mat.SetNiagaraVarFloat(t, e);
	}
	SetVisible(t) {
		var e = this.GetUiNiagara(0);
		t
			? e.ActivateSystem(!0)
			: (this.mat.SetNiagaraSystem(void 0), this.mat.DeactivateSystem()),
			this.SetActive(t);
	}
}
exports.FullScreenNiagaraItem = FullScreenNiagaraItem;
