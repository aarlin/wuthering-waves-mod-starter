"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiInteractionItemQueryManager =
		exports.ItemQueryResult =
		exports.AiInteractionSearchFilter =
			void 0);
const Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	AiContollerLibrary_1 = require("../../../AI/Controller/AiContollerLibrary"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	SceneItemUtility_1 = require("../Util/SceneItemUtility");
class AiInteractionSearchFilter {
	constructor() {
		(this.IsSearchedMarkByAi = void 0),
			(this.Tag = void 0),
			(this.Entity = void 0);
	}
}
exports.AiInteractionSearchFilter = AiInteractionSearchFilter;
class ItemQueryResult {
	constructor() {
		(this.Entity = void 0), (this.Length = -0);
	}
}
exports.ItemQueryResult = ItemQueryResult;
class AiInteractionItemQueryManager {
	constructor() {
		(this.orr = void 0), (this.cz = void 0);
	}
	AU() {
		(this.orr = new Set()), (this.cz = Vector_1.Vector.Create(0, 0, 0));
	}
	static Get() {
		return (
			this.za ||
				((this.za = new AiInteractionItemQueryManager()), this.za.AU()),
			this.za
		);
	}
	RegisterItem(r) {
		return void 0 !== r && !this.orr.has(r) && (this.orr.add(r), !0);
	}
	UnRegisterItem(r) {
		return !!this.orr.has(r) && (this.orr.delete(r), !0);
	}
	GetCloseActor(r, t = 0, e = void 0, i = void 0) {
		if (0 !== this.orr.size)
			switch (t) {
				case 0:
					return this.rrr(r, e);
				case 1:
					return this.nrr(r, i, e);
			}
	}
	GetCloseActorsByRange(r, t, e = 0, i = void 0, o = void 0) {
		if (0 !== t && 0 !== this.orr.size)
			switch (e) {
				case 0:
					return this.srr(r, t, i);
				case 1:
					return this.arr(r, t, o, i);
			}
		return [];
	}
	srr(r, t, e) {
		var i,
			o,
			n = new Array(),
			a = t * t;
		for (const t of this.orr)
			this.hrr(t, e) ||
				((i = this.lrr(r, t)) <= a &&
					(((o = new ItemQueryResult()).Entity = t),
					(o.Length = Math.sqrt(i)),
					n.push(o)));
		return n;
	}
	arr(r, t, e, i) {
		var o,
			n,
			a = new Array();
		for (const s of this.orr)
			this.hrr(s, i) ||
				((o = this._rr(r, s, e))[1] &&
					(o = o[0]) <= t &&
					(((n = new ItemQueryResult()).Entity = s),
					(n.Length = o),
					a.push(n)));
		return a;
	}
	rrr(r, t) {
		var e,
			i = new ItemQueryResult();
		i.Length = MathUtils_1.MathUtils.MaxFloat;
		let o = i.Length;
		for (const n of this.orr)
			this.hrr(n, t) ||
				((e = this.lrr(r, n)) <= o && ((o = e), (i.Entity = n)));
		return (i.Length = Math.sqrt(o)), i;
	}
	nrr(r, t, e) {
		var i,
			o = new ItemQueryResult();
		o.Length = MathUtils_1.MathUtils.MaxFloat;
		for (const n of this.orr)
			this.hrr(n, e) ||
				((i = this._rr(r, n, t))[1] &&
					(i = i[0]) <= o.Length &&
					((o.Entity = n), (o.Length = i)));
		return o;
	}
	lrr(r, t) {
		var e = this.cz;
		e.FromUeVector(r), (r = t.GetComponent(182).ActorLocation);
		return (t = (e.Subtraction(Vector_1.Vector.Create(r), e), e.SizeSquared()));
	}
	_rr(r, t, e) {
		var i = new Array();
		t = t.GetComponent(182).ActorLocation;
		return AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(
			e,
			r,
			t,
			i,
		)
			? [AiContollerLibrary_1.AiControllerLibrary.GetPathLength(r, i), !0]
			: [-1, !1];
	}
	hrr(r, t) {
		var e = r.GetComponent(128);
		if (!SceneItemUtility_1.SceneItemUtility.GetBaseItemActor(r) || !r.Active)
			return !0;
		if (t) {
			if (!e.CanBeUsed()) return !0;
			if (e.IsSearchByAi !== t.IsSearchedMarkByAi) return !0;
			if (t) {
				let e = !1;
				for (const i of t.Tag)
					("Weapon" !== i ||
						ModelManager_1.ModelManager.AiWeaponModel.HasWeaponConfig(
							r,
							t.Entity,
						)) &&
						(e = !0);
				if (!e) return !0;
			}
		}
		return !1;
	}
}
(exports.AiInteractionItemQueryManager = AiInteractionItemQueryManager).za =
	void 0;
