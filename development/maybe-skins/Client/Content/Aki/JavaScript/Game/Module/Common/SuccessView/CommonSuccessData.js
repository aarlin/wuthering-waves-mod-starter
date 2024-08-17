"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CommonSuccessData = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager");
class CommonSuccessData {
	constructor() {
		(this.HGe = ""),
			(this.MBt = ""),
			(this.SBt = ""),
			(this.EBt = void 0),
			(this.Jmt = ""),
			(this.yBt = !0);
	}
	SetTitleText(t) {
		this.HGe = t;
	}
	SetSubTitleText(t) {
		this.MBt = t;
	}
	SetClickText(t) {
		this.SBt = t;
	}
	GetTitleText() {
		return this.HGe;
	}
	GetSubTitleText() {
		return this.MBt;
	}
	GetClickText() {
		return this.SBt;
	}
	SetClickFunction(t) {
		this.EBt = t;
	}
	GetClickFunction() {
		return this.EBt;
	}
	SetAudioId(t) {
		(t = ConfigManager_1.ConfigManager.AudioConfig.GetAudioPath(t)),
			(this.Jmt = t.Path);
	}
	GetAudioPath() {
		return this.Jmt;
	}
	SetNeedDelay(t) {
		this.yBt = t;
	}
	GetNeedDelay() {
		return this.yBt;
	}
}
exports.CommonSuccessData = CommonSuccessData;
