"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleAudioRules = void 0);
class RoleAudioRules {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get TeamColdTime() {
		return this.teamcoldtime();
	}
	get CharacterColdTime() {
		return this.charactercoldtime();
	}
	get PostProbability() {
		return this.postprobability();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsRoleAudioRules(t, i) {
		return (i || new RoleAudioRules()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	teamcoldtime() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	charactercoldtime() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	postprobability() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.RoleAudioRules = RoleAudioRules;
//# sourceMappingURL=RoleAudioRules.js.map
