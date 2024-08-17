"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AudioStateData = void 0);
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
class AudioStateData {
	constructor() {
		(this.U1r = 0), (this.jqi = 0);
	}
	set Alpha(t) {
		this.U1r = t;
	}
	set Level(t) {
		this.jqi = t;
	}
	get Alpha() {
		return MathUtils_1.MathUtils.Clamp(this.U1r, 0, 1);
	}
	get Level() {
		return MathUtils_1.MathUtils.Clamp(this.jqi, 0, 1);
	}
}
exports.AudioStateData = AudioStateData;
