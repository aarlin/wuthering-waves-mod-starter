"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.VideoData = void 0);
class VideoData {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get CgId() {
		return this.cgid();
	}
	get CgName() {
		return this.cgname();
	}
	get GirlOrBoy() {
		return this.girlorboy();
	}
	get CgFile() {
		return this.cgfile();
	}
	get CanSkip() {
		return this.canskip();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsVideoData(t, i) {
		return (i || new VideoData()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	cgid() {
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
	cgfile(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	canskip() {
		var t = this.J7.__offset(this.z7, 12);
		return !t || !!this.J7.readInt8(this.z7 + t);
	}
}
exports.VideoData = VideoData;
//# sourceMappingURL=VideoData.js.map
