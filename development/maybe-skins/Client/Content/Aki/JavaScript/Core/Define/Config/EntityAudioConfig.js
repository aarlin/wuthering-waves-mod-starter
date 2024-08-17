"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EntityAudioConfig = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class EntityAudioConfig {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Name() {
		return this.name();
	}
	get EnableVb() {
		return this.enablevb();
	}
	get RtpcName() {
		return this.rtpcname();
	}
	get TriggerDistance() {
		return this.triggerdistance();
	}
	get BoneHiddenSwitch() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.bonehiddenswitchLength(),
			(t) => this.bonehiddenswitch(t),
		);
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsEntityAudioConfig(t, i) {
		return (i || new EntityAudioConfig()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id(t) {
		var i = this.J7.__offset(this.z7, 4);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	name(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	enablevb() {
		var t = this.J7.__offset(this.z7, 8);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	rtpcname(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	triggerdistance() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readFloat32(this.z7 + t) : 500;
	}
	GetBonehiddenswitchAt(t) {
		return this.bonehiddenswitch(t);
	}
	bonehiddenswitch(t, i) {
		var s = this.J7.__offset(this.z7, 14);
		return s
			? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i)
			: null;
	}
	bonehiddenswitchLength() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
}
exports.EntityAudioConfig = EntityAudioConfig;
//# sourceMappingURL=EntityAudioConfig.js.map
