"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleBuffView = void 0);
const UE = require("ue"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	BattleUiControl_1 = require("../BattleUiControl"),
	BattleUiDefine_1 = require("../BattleUiDefine"),
	BattleChildView_1 = require("./BattleChildView/BattleChildView"),
	BuffItem_1 = require("./BuffItem"),
	EnvironmentItem_1 = require("./EnvironmentItem");
class RoleBuffView extends BattleChildView_1.BattleChildView {
	constructor() {
		super(...arguments),
			(this.wnt = void 0),
			(this.E0 = void 0),
			(this.Jut = new Map()),
			(this.Jot = new Map()),
			(this.zot = []),
			(this.Zot = []);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
		];
	}
	Initialize(t) {
		super.Initialize(t), this.Ore();
	}
	OnBeforeDestroy() {
		this.Refresh(void 0), this.zut();
	}
	Reset() {
		this.kre(), super.Reset();
	}
	Refresh(t) {
		t
			? ((this.wnt = t), (this.E0 = t?.EntityHandle?.Id), this.Vrt())
			: ((this.wnt = void 0), (this.E0 = void 0), this.Wrt());
	}
	IsValid() {
		return void 0 !== this.wnt?.EntityHandle;
	}
	GetEntityId() {
		return this.E0;
	}
	Ore() {}
	kre() {}
	Tick(t) {
		for (const e of this.Jot.values()) e.Tick(t);
		for (const e of this.zot) e.TickHiding(t);
		for (let i = this.zot.length - 1; 0 <= i; i--) {
			var e = this.zot[i];
			e.TickHiding(t) || (this.zot.splice(i, 1), this.Zot.push(e));
		}
		this.Zut();
	}
	AddBuffItem(t, e, i = !1) {
		if (!this.Jot.has(e)) {
			let r = this.wnt?.BuffComponent?.GetBuffByHandle(e);
			var o;
			if (
				(r ||
					((o = this.wnt?.EntityHandle?.Entity?.CheckGetComponent(171)) &&
						(r = o.GetFormationBuffComp()?.GetBuffByHandle(e))),
				r)
			) {
				let o = this.zrt();
				(o = o || this.Zrt()), this.ent(o, t, r, e, i);
			}
		}
	}
	Zrt() {
		var t = this.GetItem(1);
		return new BuffItem_1.BuffItem(t);
	}
	ent(t, e, i, o = 0, r = !1) {
		var n = this.Jot.size;
		t.Activate(e, i, r),
			t.GetRootItem().SetHierarchyIndex(n),
			this.Jot.set(o, t);
	}
	DeactivateBuffItem(t, e = !1) {
		var i = this.tnt(t);
		i &&
			(this.Jot.delete(t),
			(e
				? (i.DeactivateWithCloseAnim(), this.zot)
				: (i.Deactivate(), this.Zot)
			).push(i));
	}
	zrt() {
		var t;
		if (!(this.Zot.length < 1))
			return (t = this.Zot[0]), this.Zot.splice(0, 1), t;
	}
	tnt(t) {
		return this.Jot.get(t);
	}
	Wrt() {
		for (const t of this.Jot.values()) t.DestroyCompatible();
		this.Jot.clear();
		for (const t of this.zot) t.Deactivate(), t.DestroyCompatible();
		this.zot.length = 0;
		for (const t of this.Zot) t.DestroyCompatible();
		this.Zot.length = 0;
	}
	Vrt() {
		if ((this.Wrt(), this.IsValid()))
			for (const e of this.wnt.EntityHandle.Entity.GetComponent(
				19,
			).GetAllCurrentCueRef()) {
				var t = e.CueConfig;
				t.CueType === BattleUiDefine_1.UI_EFFECT_CUE_TYPE &&
					this.AddBuffItem(t, e.ActiveHandleId);
			}
	}
	Zut() {
		let t = 0;
		for (const o of ModelManager_1.ModelManager.BattleUiModel.FormationData
			.EnvironmentPropertyList) {
			var e,
				i = ModelManager_1.ModelManager.FormationAttributeModel.GetValue(o);
			i > t && (t = i);
			let r = this.Jut.get(o);
			void 0 === r
				? i <= 0 ||
					((e = this.GetItem(0)),
					(e = BattleUiControl_1.BattleUiControl.Pool.GetEnvironmentItem(e)),
					(r = new EnvironmentItem_1.EnvironmentItem()).CreateThenShowByActor(
						e,
					),
					r.UpdatePropertyId(o),
					(e = ModelManager_1.ModelManager.FormationAttributeModel.GetMax(o)),
					r.SetPercent(i, e),
					this.Jut.set(o, r))
				: ((e = ModelManager_1.ModelManager.FormationAttributeModel.GetMax(o)),
					r.SetPercent(i, e));
		}
	}
	zut() {
		for (const t of this.Jut.values())
			BattleUiControl_1.BattleUiControl.Pool.RecycleEnvironmentItem(
				t.GetRootActor(),
			),
				t.Destroy();
		this.Jut.clear();
	}
}
exports.RoleBuffView = RoleBuffView;
