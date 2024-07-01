"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MonsterCursorUnit = void 0);
const UE = require("ue"),
	HudUnitBase_1 = require("../HudUnitBase"),
	RAD_2_DEG = 180 / Math.PI,
	CURSOR_NUM = 3;
class MonsterCursorUnit extends HudUnitBase_1.HudUnitBase {
	constructor() {
		super(...arguments),
			(this.lti = void 0),
			(this.zei = new UE.Rotator()),
			(this.wit = new UE.Vector2D()),
			(this._ti = 0),
			(this.uti = 1),
			(this.cti = (t, i) => {
				this._Oe();
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UINiagara],
			[4, UE.UINiagara],
			[5, UE.UINiagara],
		];
	}
	Activate(t) {
		(this.lti = t),
			(this.wit.X = 0),
			(this.wit.Y = 0),
			this.AddEntityEvents(),
			this._Oe(),
			this.GetActive() && this.SetActive(!1);
	}
	Deactivate() {
		this.lti &&
			(this.lti.ClearAllTagCountChangedCallback(), (this.lti = void 0));
	}
	AddEntityEvents() {
		this.lti.ListenForTagCountChanged(1996624497, this.cti),
			this.lti.ListenForTagCountChanged(704115290, this.cti),
			this.lti.ListenForTagCountChanged(1922078392, this.cti);
	}
	GetEntityId() {
		return this.lti?.GetId();
	}
	IsValid() {
		return void 0 !== this.lti;
	}
	GetHudEntityData() {
		return this.lti;
	}
	Refresh(t, i) {
		t !== this.uti &&
			((this.uti = t),
			this.GetUiNiagara(3 + this._ti).SetNiagaraVarFloat("Scale", t)),
			(this.zei.Yaw = Math.atan2(i.Y, i.X) * RAD_2_DEG - 90),
			(this.zei.Roll = 0),
			(this.zei.Pitch = 0),
			this.RootItem.SetUIRelativeRotation(this.zei),
			this.RootItem.SetAnchorOffsetX(i.X),
			this.RootItem.SetAnchorOffsetY(i.Y);
	}
	_Oe() {
		let t = 0;
		if (
			((t = this.lti.ContainsTagById(1922078392)
				? 2
				: this.lti.ContainsTagById(-1371021686)
					? 1
					: 0),
			this._ti !== t)
		) {
			this._ti = t;
			for (let i = 0; i < 3; i++) this.GetItem(0 + i).SetUIActive(i === t);
			this.GetUiNiagara(3 + t).SetNiagaraVarFloat("Scale", this.uti);
		}
	}
}
exports.MonsterCursorUnit = MonsterCursorUnit;
