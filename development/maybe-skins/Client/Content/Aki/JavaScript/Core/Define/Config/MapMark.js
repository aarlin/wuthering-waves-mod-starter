"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MapMark = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	IntVector_1 = require("./SubType/IntVector");
class MapMark {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get MarkId() {
		return this.markid();
	}
	get MapId() {
		return this.mapid();
	}
	get RelativeType() {
		return this.relativetype();
	}
	get RelativeSubType() {
		return this.relativesubtype();
	}
	get EntityConfigId() {
		return this.entityconfigid();
	}
	get FogHide() {
		return this.foghide();
	}
	get RelativeId() {
		return this.relativeid();
	}
	get MarkVector() {
		return this.markvector();
	}
	get ObjectType() {
		return this.objecttype();
	}
	get MarkTitle() {
		return this.marktitle();
	}
	get MarkDesc() {
		return this.markdesc();
	}
	get ToBeDiscovered() {
		return this.tobediscovered();
	}
	get IsMonster() {
		return this.ismonster();
	}
	get ShowPriority() {
		return this.showpriority();
	}
	get ShowRange() {
		return GameUtils_1.GameUtils.ConvertToArray(this.showrangeLength(), (t) =>
			this.showrange(t),
		);
	}
	get LockMarkPic() {
		return this.lockmarkpic();
	}
	get UnlockMarkPic() {
		return this.unlockmarkpic();
	}
	get ShowCondition() {
		return this.showcondition();
	}
	get FogShow() {
		return this.fogshow();
	}
	get MapShow() {
		return this.mapshow();
	}
	get Scale() {
		return this.scale();
	}
	get FirstReward() {
		return this.firstreward();
	}
	get Reward() {
		return this.reward();
	}
	get MultiMapFloorId() {
		return this.multimapfloorid();
	}
	__init(t, r) {
		return (this.z7 = t), (this.J7 = r), this;
	}
	static getRootAsMapMark(t, r) {
		return (r || new MapMark()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	markid() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	mapid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 8;
	}
	relativetype() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	relativesubtype() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	entityconfigid() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	foghide() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	relativeid() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	markvector(t) {
		var r = this.J7.__offset(this.z7, 18);
		return r
			? (t || new IntVector_1.IntVector()).__init(
					this.J7.__indirect(this.z7 + r),
					this.J7,
				)
			: null;
	}
	objecttype() {
		var t = this.J7.__offset(this.z7, 20);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	marktitle(t) {
		var r = this.J7.__offset(this.z7, 22);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	markdesc(t) {
		var r = this.J7.__offset(this.z7, 24);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	tobediscovered() {
		var t = this.J7.__offset(this.z7, 26);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	ismonster() {
		var t = this.J7.__offset(this.z7, 28);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	showpriority() {
		var t = this.J7.__offset(this.z7, 30);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetShowrangeAt(t) {
		return this.showrange(t);
	}
	showrange(t) {
		var r = this.J7.__offset(this.z7, 32);
		return r ? this.J7.readInt32(this.J7.__vector(this.z7 + r) + 4 * t) : 0;
	}
	showrangeLength() {
		var t = this.J7.__offset(this.z7, 32);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	showrangeArray() {
		var t = this.J7.__offset(this.z7, 32);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	lockmarkpic(t) {
		var r = this.J7.__offset(this.z7, 34);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	unlockmarkpic(t) {
		var r = this.J7.__offset(this.z7, 36);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	showcondition() {
		var t = this.J7.__offset(this.z7, 38);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	fogshow() {
		var t = this.J7.__offset(this.z7, 40);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	mapshow() {
		var t = this.J7.__offset(this.z7, 42);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	scale() {
		var t = this.J7.__offset(this.z7, 44);
		return t ? this.J7.readFloat32(this.z7 + t) : 1;
	}
	firstreward() {
		var t = this.J7.__offset(this.z7, 46);
		return t ? this.J7.readFloat32(this.z7 + t) : 0;
	}
	reward() {
		var t = this.J7.__offset(this.z7, 48);
		return t ? this.J7.readFloat32(this.z7 + t) : 0;
	}
	multimapfloorid() {
		var t = this.J7.__offset(this.z7, 50);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.MapMark = MapMark;
//# sourceMappingURL=MapMark.js.map
