"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivitySign = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	OneItemConfig_1 = require("./SubType/OneItemConfig");
class ActivitySign {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Type() {
		return this.type();
	}
	get PrefabResource() {
		return this.prefabresource();
	}
	get SignRewards() {
		return GameUtils_1.GameUtils.ConvertToArray(this.signrewardsLength(), (t) =>
			this.signrewards(t),
		);
	}
	get ImportantRewardIndex() {
		return this.importantrewardindex();
	}
	get ImportantRewardIcon() {
		return this.importantrewardicon();
	}
	get ImportantRewardType() {
		return this.importantrewardtype();
	}
	get PreviewList() {
		return GameUtils_1.GameUtils.ConvertToArray(this.previewlistLength(), (t) =>
			this.previewlist(t),
		);
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsActivitySign(t, i) {
		return (i || new ActivitySign()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	type() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	prefabresource(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	GetSignrewardsAt(t, i) {
		return this.signrewards(t);
	}
	signrewards(t, i) {
		var r = this.J7.__offset(this.z7, 10);
		return r
			? (i || new OneItemConfig_1.OneItemConfig()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
					this.J7,
				)
			: null;
	}
	signrewardsLength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	importantrewardindex() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : -1;
	}
	importantrewardicon(t) {
		var i = this.J7.__offset(this.z7, 14);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	importantrewardtype() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetPreviewlistAt(t) {
		return this.previewlist(t);
	}
	previewlist(t) {
		var i = this.J7.__offset(this.z7, 18);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	previewlistLength() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	previewlistArray() {
		var t = this.J7.__offset(this.z7, 18);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
}
exports.ActivitySign = ActivitySign;
//# sourceMappingURL=ActivitySign.js.map
