"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FaceExpressionData = void 0);
class FaceExpressionData {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get FaceExpression() {
		return this.faceexpression();
	}
	get MaleVariant() {
		return this.malevariant();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsFaceExpressionData(t, s) {
		return (s || new FaceExpressionData()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	faceexpression(t) {
		var s = this.J7.__offset(this.z7, 6);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	malevariant(t) {
		var s = this.J7.__offset(this.z7, 8);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
}
exports.FaceExpressionData = FaceExpressionData;
//# sourceMappingURL=FaceExpressionData.js.map
