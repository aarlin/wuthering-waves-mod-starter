"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CollectionDataInfo = void 0);
const Log_1 = require("../../../../Core/Common/Log");
class CollectionDataInfo {
	constructor() {
		(this.p3i = 0), (this.v3i = 0), (this.M3i = 0), (this.S3i = 0);
	}
	get MaxValue() {
		return (
			0 === this.M3i &&
				Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Performance", 31, "尚未有数据，MaxValue无效"),
			this.p3i
		);
	}
	get LastValue() {
		return (
			0 === this.M3i &&
				Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Performance", 31, "尚未有数据，LastValue无效"),
			this.S3i
		);
	}
	get Count() {
		return this.M3i;
	}
	AddValue(i) {
		0 === this.M3i
			? ((this.M3i = 1), (this.v3i = i), (this.p3i = i))
			: ((this.M3i += 1), (this.v3i += i), (this.p3i = Math.max(this.p3i, i))),
			(this.S3i = i);
	}
	GetAvg(i) {
		return 0 === this.M3i
			? (Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Performance", 31, "尚未有数据，平均值无效"),
				i)
			: this.v3i / this.M3i;
	}
	Clear() {
		(this.p3i = 0), (this.v3i = 0), (this.M3i = 0), (this.S3i = 0);
	}
}
exports.CollectionDataInfo = CollectionDataInfo;
