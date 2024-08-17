"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WeaponMeshVisibleHelper = void 0);
const WeaponVisibleTagHelper_1 = require("./WeaponVisibleTagHelper");
class WeaponVisibleState {
	constructor(e = !1, i = !0, s = 0) {
		(this.IsHidden = e), (this.Active = i), (this.Priority = s);
	}
}
class WeaponMeshVisibleHelper {
	constructor(e) {
		(this.Owner = e),
			(this.WeaponVisibleTable = new Map()),
			(this.DefaultVisibleType = 0),
			(this.DefaultVisibleState = new WeaponVisibleState()),
			(this.WeaponHiddenTag =
				new WeaponVisibleTagHelper_1.WeaponVisibleTagHelper()),
			(this.WeaponVisibleTag =
				new WeaponVisibleTagHelper_1.WeaponVisibleTagHelper());
	}
	InitBaseTable(e) {
		(this.DefaultVisibleType = e),
			(e = new WeaponVisibleState(!1, !1, 0)),
			this.WeaponVisibleTable.set(0, e),
			(e = new WeaponVisibleState(!1, !1, 1)),
			this.WeaponVisibleTable.set(1, e),
			(e = new WeaponVisibleState(!1, !1, 2)),
			this.WeaponVisibleTable.set(2, e);
	}
	InitTagHelper(e, i, s, t, a) {
		this.WeaponVisibleTag.Init(this.Owner, e, i?.split("#"), s),
			this.WeaponHiddenTag.Init(this.Owner, e, t?.split("#"), a);
	}
	ClearTagHelper() {
		this.WeaponVisibleTag.Clear(), this.WeaponHiddenTag.Clear();
	}
	RequestAndUpdateHiddenInGame(e, i = !0, s = 0) {
		let t = !1;
		switch (this.DefaultVisibleType) {
			case 0:
				(t = e), i && (this.DefaultVisibleState.IsHidden = e);
				break;
			case 1:
				(t = !0), i && (this.DefaultVisibleState.IsHidden = !0);
		}
		return (
			i || ((s = this.WeaponVisibleTable.get(s)) && (s.IsHidden = e)),
			(s = this.dZo()) &&
				(0 === s.Priority && i && s.Active
					? (s.Active = !1)
					: (t = s.IsHidden)),
			t
		);
	}
	EnableHiddenInGameByExtraVisibleType(e, i) {
		(e = this.WeaponVisibleTable.get(e)) && (e.Active = i);
	}
	dZo() {
		let e,
			i = -1;
		for (var [, s] of this.WeaponVisibleTable)
			s.Active && s.Priority > i && ((i = s.Priority), (e = s));
		return e;
	}
}
exports.WeaponMeshVisibleHelper = WeaponMeshVisibleHelper;
