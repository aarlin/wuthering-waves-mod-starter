"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiModelComponentBase = void 0);
class UiModelComponentBase {
	constructor() {
		(this.NeedTick = !1), (this.qPo = void 0);
	}
	get Owner() {
		return this.qPo;
	}
	Create(e) {
		(this.qPo = e), this.OnCreate();
	}
	Init() {
		this.OnInit();
	}
	Start() {
		this.OnStart();
	}
	Tick(e) {
		this.OnTick(e);
	}
	End() {
		this.OnEnd();
	}
	Clear() {
		this.OnClear();
	}
	OnCreate() {}
	OnInit() {}
	OnStart() {}
	OnTick(e) {}
	OnEnd() {}
	OnClear() {}
}
(exports.UiModelComponentBase = UiModelComponentBase).Id = -1;
