"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.VideoSound = void 0);
class VideoSound {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get CaptionId() {
		return this.captionid();
	}
	get CgName() {
		return this.cgname();
	}
	get GirlOrBoy() {
		return this.girlorboy();
	}
	get EventPath() {
		return this.eventpath();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsVideoSound(t, i) {
		return (i || new VideoSound()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	captionid() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	cgname(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	girlorboy() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 2;
	}
	eventpath(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
}
exports.VideoSound = VideoSound;
//# sourceMappingURL=VideoSound.js.map
