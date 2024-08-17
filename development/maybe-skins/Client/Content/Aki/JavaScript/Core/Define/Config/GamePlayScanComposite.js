"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GamePlayScanComposite = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class GamePlayScanComposite {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get UId() {
		return this.uid();
	}
	get ScanInfos() {
		return GameUtils_1.GameUtils.ConvertToArray(this.scaninfosLength(), (t) =>
			this.scaninfos(t),
		);
	}
	get ItemMaterialDataPath() {
		return this.itemmaterialdatapath();
	}
	get NearVoiceEffectPath() {
		return this.nearvoiceeffectpath();
	}
	get FarVoiceEffectPath() {
		return this.farvoiceeffectpath();
	}
	get ScanConcealEffectPath() {
		return this.scanconcealeffectpath();
	}
	get InteractionEffectInterval() {
		return this.interactioneffectinterval();
	}
	get ShowDistance() {
		return this.showdistance();
	}
	get ShowInteractionEffect() {
		return this.showinteractioneffect();
	}
	get ScanAudioEvent() {
		return this.scanaudioevent();
	}
	get TriggerRoleAudio() {
		return this.triggerroleaudio();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsGamePlayScanComposite(t, i) {
		return (i || new GamePlayScanComposite()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	uid() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetScaninfosAt(t) {
		return this.scaninfos(t);
	}
	scaninfos(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	scaninfosLength() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	scaninfosArray() {
		var t = this.J7.__offset(this.z7, 6);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	itemmaterialdatapath(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	nearvoiceeffectpath(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	farvoiceeffectpath(t) {
		var i = this.J7.__offset(this.z7, 12);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	scanconcealeffectpath(t) {
		var i = this.J7.__offset(this.z7, 14);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	interactioneffectinterval() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readFloat32(this.z7 + t) : 8;
	}
	showdistance() {
		var t = this.J7.__offset(this.z7, 18);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	showinteractioneffect() {
		var t = this.J7.__offset(this.z7, 20);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	scanaudioevent(t) {
		var i = this.J7.__offset(this.z7, 22);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	triggerroleaudio() {
		var t = this.J7.__offset(this.z7, 24);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
}
exports.GamePlayScanComposite = GamePlayScanComposite;
//# sourceMappingURL=GamePlayScanComposite.js.map
