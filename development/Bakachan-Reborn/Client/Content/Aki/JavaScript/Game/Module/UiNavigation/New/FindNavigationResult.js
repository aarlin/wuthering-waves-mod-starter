"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FindNavigationResult = void 0);
class FindNavigationResult {
	constructor() {
		(this.Result = 0), (this.Listener = void 0);
	}
	IsFindNavigation() {
		return 1 === this.Result;
	}
	IsInLoopingProcess() {
		return 4 === this.Result;
	}
	IsNotFindNavigation() {
		return 2 === this.Result;
	}
}
exports.FindNavigationResult = FindNavigationResult;
