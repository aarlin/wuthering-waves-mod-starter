"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.HudEntityData = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	ObjectSystem_1 = require("../../../../Core/Object/ObjectSystem"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	CharacterController_1 = require("../../../NewWorld/Character/CharacterController");
class HudEntityData {
	constructor() {
		(this.Jh = void 0),
			(this._At = new Map()),
			(this.L$e = []),
			(this.eii = void 0),
			(this.tii = (t, e) => {
				this.eii && this.eii(this, e);
			});
	}
	Initialize(t) {
		this.Jh = t;
	}
	Destroy() {
		(this.Jh = void 0),
			this._At.clear(),
			(this.eii = void 0),
			this.ClearAllTagCountChangedCallback();
	}
	SetComponent(t) {
		var e = this.Jh.GetComponent(t);
		this._At.set(t, e);
	}
	GetComponent(t) {
		return (
			(t = this._At.get(t)) ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"HudUnit",
						8,
						"获取Hud实体数据时，找不到实体对应组件，请在初始化时调用SetComponent记录对应组件",
					)),
			t
		);
	}
	IsValid() {
		return (
			!!ObjectSystem_1.ObjectSystem.IsValid(this.Jh) &&
			!!CharacterController_1.CharacterController.GetCharacter(this.Jh)
		);
	}
	GetId() {
		return this.Jh.Id;
	}
	ListenForTagCountChanged(t, e) {
		var r = this.GetComponent(185);
		r &&
			((this.eii = e),
			(e = r.ListenForTagAddOrRemove(t, this.tii)),
			this.L$e.push(e));
	}
	ClearAllTagCountChangedCallback() {
		if (this.L$e) {
			for (const t of this.L$e) t.EndTask();
			this.L$e.length = 0;
		}
	}
	ContainsTagById(t) {
		return this.GetComponent(185).HasTag(t);
	}
	GetLocationProxy() {
		return this.GetComponent(1).ActorLocationProxy;
	}
	GetLocation() {
		return this.GetComponent(1).ActorLocation;
	}
	GetMonsterMatchType() {
		return this.GetComponent(0).GetMonsterMatchType();
	}
	GetMonsterMatchTypeNumber() {
		return this.GetMonsterMatchType() || 0;
	}
	GetDistanceSquaredTo(t) {
		var e = this.GetLocationProxy();
		return Vector_1.Vector.DistSquared(t, e);
	}
}
exports.HudEntityData = HudEntityData;
