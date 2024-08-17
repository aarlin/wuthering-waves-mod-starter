"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.VideoCaption = void 0);
class VideoCaption {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get CaptionId() {
		return this.captionid();
	}
	get CgName() {
		return this.cgname();
	}
	get ShowMoment() {
		return this.showmoment();
	}
	get Duration() {
		return this.duration();
	}
	get CaptionText() {
		return this.captiontext();
	}
	get ShowMomentEn() {
		return this.showmomenten();
	}
	get DurationEn() {
		return this.durationen();
	}
	get ShowMomentKo() {
		return this.showmomentko();
	}
	get DurationKo() {
		return this.durationko();
	}
	get ShowMomentJa() {
		return this.showmomentja();
	}
	get DurationJa() {
		return this.durationja();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsVideoCaption(t, i) {
		return (i || new VideoCaption()).__init(
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
	showmoment() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	duration() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	captiontext(t) {
		var i = this.J7.__offset(this.z7, 12);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	showmomenten() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	durationen() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	showmomentko() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	durationko() {
		var t = this.J7.__offset(this.z7, 20);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	showmomentja() {
		var t = this.J7.__offset(this.z7, 22);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	durationja() {
		var t = this.J7.__offset(this.z7, 24);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.VideoCaption = VideoCaption;
//# sourceMappingURL=VideoCaption.js.map
