"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EntrustFinishDialog = void 0);
class EntrustFinishDialog {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get EntrustId() {
		return this.entrustid();
	}
	get Level() {
		return this.level();
	}
	get UpDialog() {
		return this.updialog();
	}
	get UnchangedDialog() {
		return this.unchangeddialog();
	}
	get UpDialogGirl() {
		return this.updialoggirl();
	}
	get UnchangedDialogGirl() {
		return this.unchangeddialoggirl();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsEntrustFinishDialog(t, i) {
		return (i || new EntrustFinishDialog()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	entrustid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	level() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	updialog(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	unchangeddialog(t) {
		var i = this.J7.__offset(this.z7, 12);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	updialoggirl(t) {
		var i = this.J7.__offset(this.z7, 14);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	unchangeddialoggirl(t) {
		var i = this.J7.__offset(this.z7, 16);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
}
exports.EntrustFinishDialog = EntrustFinishDialog;
//# sourceMappingURL=EntrustFinishDialog.js.map
