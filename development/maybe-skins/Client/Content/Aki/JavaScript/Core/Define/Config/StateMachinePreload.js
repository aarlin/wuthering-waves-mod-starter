"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.StateMachinePreload = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class StateMachinePreload {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get FsmKey() {
		return this.fsmkey();
	}
	get ActorClass() {
		return GameUtils_1.GameUtils.ConvertToArray(this.actorclassLength(), (t) =>
			this.actorclass(t),
		);
	}
	get Animations() {
		return GameUtils_1.GameUtils.ConvertToArray(this.animationsLength(), (t) =>
			this.animations(t),
		);
	}
	get Effects() {
		return GameUtils_1.GameUtils.ConvertToArray(this.effectsLength(), (t) =>
			this.effects(t),
		);
	}
	get Audios() {
		return GameUtils_1.GameUtils.ConvertToArray(this.audiosLength(), (t) =>
			this.audios(t),
		);
	}
	get Meshes() {
		return GameUtils_1.GameUtils.ConvertToArray(this.meshesLength(), (t) =>
			this.meshes(t),
		);
	}
	get Materials() {
		return GameUtils_1.GameUtils.ConvertToArray(this.materialsLength(), (t) =>
			this.materials(t),
		);
	}
	get AnimationBlueprints() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.animationblueprintsLength(),
			(t) => this.animationblueprints(t),
		);
	}
	get Others() {
		return GameUtils_1.GameUtils.ConvertToArray(this.othersLength(), (t) =>
			this.others(t),
		);
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsStateMachinePreload(t, s) {
		return (s || new StateMachinePreload()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	fsmkey(t) {
		var s = this.J7.__offset(this.z7, 6);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	GetActorclassAt(t) {
		return this.actorclass(t);
	}
	actorclass(t, s) {
		var i = this.J7.__offset(this.z7, 8);
		return i
			? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, s)
			: null;
	}
	actorclassLength() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetAnimationsAt(t) {
		return this.animations(t);
	}
	animations(t, s) {
		var i = this.J7.__offset(this.z7, 10);
		return i
			? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, s)
			: null;
	}
	animationsLength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetEffectsAt(t) {
		return this.effects(t);
	}
	effects(t, s) {
		var i = this.J7.__offset(this.z7, 12);
		return i
			? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, s)
			: null;
	}
	effectsLength() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetAudiosAt(t) {
		return this.audios(t);
	}
	audios(t, s) {
		var i = this.J7.__offset(this.z7, 14);
		return i
			? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, s)
			: null;
	}
	audiosLength() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetMeshesAt(t) {
		return this.meshes(t);
	}
	meshes(t, s) {
		var i = this.J7.__offset(this.z7, 16);
		return i
			? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, s)
			: null;
	}
	meshesLength() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetMaterialsAt(t) {
		return this.materials(t);
	}
	materials(t, s) {
		var i = this.J7.__offset(this.z7, 18);
		return i
			? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, s)
			: null;
	}
	materialsLength() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetAnimationblueprintsAt(t) {
		return this.animationblueprints(t);
	}
	animationblueprints(t, s) {
		var i = this.J7.__offset(this.z7, 20);
		return i
			? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, s)
			: null;
	}
	animationblueprintsLength() {
		var t = this.J7.__offset(this.z7, 20);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetOthersAt(t) {
		return this.others(t);
	}
	others(t, s) {
		var i = this.J7.__offset(this.z7, 22);
		return i
			? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, s)
			: null;
	}
	othersLength() {
		var t = this.J7.__offset(this.z7, 22);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
}
exports.StateMachinePreload = StateMachinePreload;
//# sourceMappingURL=StateMachinePreload.js.map
