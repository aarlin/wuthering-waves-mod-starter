"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InputKeyDisplayData = void 0);
class InputKeyDisplayData {
	constructor() {
		(this.ActionOrAxisName = void 0),
			(this.KeyNameList = []),
			(this.KeyNameMap = new Map()),
			(this.IsCombination = !1);
	}
	RefreshInput(t, i) {
		(this.ActionOrAxisName = t),
			(this.KeyNameList = i),
			(this.IsCombination = !1);
	}
	RefreshCombinationInput(t, i) {
		(this.ActionOrAxisName = t),
			(this.KeyNameMap = i),
			(this.IsCombination = !0);
	}
	GetDisplayKeyNameList(t = 0) {
		if (0 < this.KeyNameMap.size)
			for (var [i, e] of this.KeyNameMap) return [i, e];
		if (0 < this.KeyNameList.length) return [this.KeyNameList[t]];
	}
	IsValid() {
		return void 0 !== this.ActionOrAxisName;
	}
	Reset() {
		(this.ActionOrAxisName = void 0),
			(this.KeyNameList = []),
			this.KeyNameMap.clear();
	}
}
exports.InputKeyDisplayData = InputKeyDisplayData;
