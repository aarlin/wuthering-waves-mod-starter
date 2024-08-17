"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.HideActorController = void 0);
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
	Global_1 = require("../../Global"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	CampUtils_1 = require("../../NewWorld/Character/Common/Blueprint/Utils/CampUtils");
class HideActorController extends ControllerBase_1.ControllerBase {
	static OnInit() {
		return (
			(this.dei = !1), (this.Cei = !1), this._Rn.clear(), this.uRn.clear(), !0
		);
	}
	static OnTick(e) {
		if (this.Cei) for (const e of this._Rn) e.Valid && this.fei(e, !0);
	}
	static HideMesh() {
		this.dei || ((this.dei = !0), this.pei(!0, !1));
	}
	static HideEffect() {
		this.Cei || ((this.Cei = !0), this.pei(!1, !0));
	}
	static ShowMesh() {
		this.dei && ((this.dei = !1), this.vei(!0, !1));
	}
	static ShowEffect() {
		this.Cei && ((this.Cei = !1), this.vei(!1, !0));
	}
	static pei(e, t) {
		if (Global_1.Global.BaseCharacter)
			for (const o of ModelManager_1.ModelManager.CreatureModel.GetAllEntities()) {
				var i, r;
				o.IsInit &&
					o.Entity.Active &&
					(r = (i = o.Entity.GetComponent(3))?.Actor) &&
					r !== Global_1.Global.BaseCharacter &&
					1 !==
						CampUtils_1.CampUtils.GetCampRelationship(
							r.Camp,
							Global_1.Global.BaseCharacter.Camp,
						) &&
					(e &&
						((r = i.DisableActor("[HideActorController] 隐藏Mesh")),
						this.uRn.set(o, r)),
					t) &&
					(this.fei(o, !0), this._Rn.add(o));
			}
	}
	static vei(e, t) {
		if (e) {
			for (var [i, r] of this.uRn)
				i.Valid && i.Entity.GetComponent(3).EnableActor(r);
			this.uRn.clear();
		}
		if (t) {
			for (const e of this._Rn) e.Valid && this.fei(e, !1);
			this._Rn.clear();
		}
	}
	static fei(e, t) {
		e.Entity.GetComponent(33)?.CurrentSkill?.SetEffectHidden(t),
			e.Entity.GetComponent(19)?.SetHidden(t);
	}
	static OnClear() {
		return (this.dei = !1), (this.Cei = !1), this.vei(!0, !0), !0;
	}
}
((exports.HideActorController = HideActorController).dei = !1),
	(HideActorController.Cei = !1),
	(HideActorController._Rn = new Set()),
	(HideActorController.uRn = new Map());
