"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PhantomCollectActivity = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	DicIntString_1 = require("./SubType/DicIntString");
class PhantomCollectActivity {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Phantoms() {
		return GameUtils_1.GameUtils.ConvertToArray(this.phantomsLength(), (t) =>
			this.phantoms(t),
		);
	}
	get PhantomReward() {
		return this.phantomreward();
	}
	get PhantomDesc() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.phantomdescLength(),
			(t) => this.phantomdesc(t)?.key(),
			(t) => this.phantomdesc(t)?.value(),
		);
	}
	get PhantomActivityImage() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.phantomactivityimageLength(),
			(t) => this.phantomactivityimage(t)?.key(),
			(t) => this.phantomactivityimage(t)?.value(),
		);
	}
	get DataDockLevel() {
		return this.datadocklevel();
	}
	get DataDockReward() {
		return this.datadockreward();
	}
	get PhantomSideQuest() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.phantomsidequestLength(),
			(t) => this.phantomsidequest(t),
		);
	}
	get PhantomSideQuestReward() {
		return this.phantomsidequestreward();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsPhantomCollectActivity(t, i) {
		return (i || new PhantomCollectActivity()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetPhantomsAt(t) {
		return this.phantoms(t);
	}
	phantoms(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	phantomsLength() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	phantomsArray() {
		var t = this.J7.__offset(this.z7, 6);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	phantomreward() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetPhantomdescAt(t, i) {
		return this.phantomdesc(t);
	}
	phantomdesc(t, i) {
		var s = this.J7.__offset(this.z7, 10);
		return s
			? (i || new DicIntString_1.DicIntString()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
					this.J7,
				)
			: null;
	}
	phantomdescLength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetPhantomactivityimageAt(t, i) {
		return this.phantomactivityimage(t);
	}
	phantomactivityimage(t, i) {
		var s = this.J7.__offset(this.z7, 12);
		return s
			? (i || new DicIntString_1.DicIntString()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
					this.J7,
				)
			: null;
	}
	phantomactivityimageLength() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	datadocklevel() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	datadockreward() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetPhantomsidequestAt(t) {
		return this.phantomsidequest(t);
	}
	phantomsidequest(t) {
		var i = this.J7.__offset(this.z7, 18);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	phantomsidequestLength() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	phantomsidequestArray() {
		var t = this.J7.__offset(this.z7, 18);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	phantomsidequestreward() {
		var t = this.J7.__offset(this.z7, 20);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.PhantomCollectActivity = PhantomCollectActivity;
//# sourceMappingURL=PhantomCollectActivity.js.map
