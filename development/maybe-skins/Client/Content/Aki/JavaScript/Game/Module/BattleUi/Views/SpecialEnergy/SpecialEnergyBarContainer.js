"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SpecialEnergyBarContainer = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	BattleChildView_1 = require("../BattleChildView/BattleChildView"),
	RoleSpecialEnergyBar_1 = require("./RoleSpecialEnergyBar");
class SpecialEnergyBarContainer extends BattleChildView_1.BattleChildView {
	constructor() {
		super(...arguments),
			(this.hmt = void 0),
			(this.E0 = 0),
			(this.lmt = void 0),
			(this._mt = new Map()),
			(this.kpe = () => {
				this.umt(), this.cmt();
			});
	}
	Initialize(e) {
		super.Initialize(e),
			(this.hmt = e),
			(this.E0 =
				ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Id ?? 0),
			this.umt(),
			this.cmt(),
			this.Ore();
	}
	OnBeforeDestroy() {
		this.lmt = void 0;
		for (const e of this._mt.values()) e.Destroy();
	}
	Reset() {
		this.kre(), super.Reset();
	}
	Tick(e) {
		for (const t of this._mt.values()) t.Tick(e);
	}
	OnChangeRole(e) {
		var t;
		(this.E0 = e?.EntityHandle?.Id ?? 0),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Battle", 18, "开始切换特殊能量条", [
					"entityId",
					this.E0,
				]),
			this.E0 &&
				(ModelManager_1.ModelManager.BattleUiModel.SpecialEnergyBarData
					.IsSpecialEnergyBarEditorModeOpen &&
					(t = this._mt.get(this.E0)) &&
					(t.Destroy(), this._mt.delete(this.E0)),
				this.mmt(e)),
			this.cmt();
	}
	OnRemoveEntity(e) {
		var t = this._mt.get(e);
		t &&
			(t.Destroy(), this._mt.delete(e), this.lmt === t) &&
			(this.lmt = void 0);
	}
	Ore() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.BattleUiAllRoleDataChanged,
			this.kpe,
		);
	}
	kre() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.BattleUiAllRoleDataChanged,
			this.kpe,
		);
	}
	umt() {
		for (const t of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(
			!0,
		)) {
			var e = t.EntityHandle?.Id;
			e &&
				(e = ModelManager_1.ModelManager.BattleUiModel.GetRoleData(e)) &&
				this.mmt(e);
		}
	}
	async mmt(e) {
		var t = e.EntityHandle?.Id;
		if (t && !this._mt.has(t)) {
			var i = new RoleSpecialEnergyBar_1.RoleSpecialEnergyBar();
			this._mt.set(t, i);
			let a = this.RootItem;
			e.IsPhantom() && (a = this.hmt), await i.InitAsync(a, e);
		}
	}
	cmt() {
		for (var [e, t] of this._mt)
			e === this.E0 ? (t.SetVisible(!0), (this.lmt = t)) : t.SetVisible(!1);
	}
}
exports.SpecialEnergyBarContainer = SpecialEnergyBarContainer;
