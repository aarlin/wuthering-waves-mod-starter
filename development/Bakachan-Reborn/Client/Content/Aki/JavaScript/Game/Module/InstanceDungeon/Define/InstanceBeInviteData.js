"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InstanceBeInviteData = void 0);
const InstanceDungeonById_1 = require("../../../../Core/Define/ConfigQuery/InstanceDungeonById"),
	MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
class InstanceBeInviteData {
	constructor() {
		(this.j8 = 0), (this.NUe = 0), (this.he = ""), (this.Ssi = 0);
	}
	SetPlayerId(e) {
		this.j8 = e;
	}
	GetPlayerId() {
		return this.j8;
	}
	SetInstanceId(e) {
		this.NUe = e;
	}
	GetInstanceId() {
		return this.NUe;
	}
	SetName(e) {
		this.he = e;
	}
	GetName() {
		return this.he;
	}
	SetLimitTimestamp(e) {
		this.Ssi = e;
	}
	GetLimitTimestamp() {
		return this.Ssi;
	}
	GetInstanceName() {
		var e = InstanceDungeonById_1.configInstanceDungeonById.GetConfig(this.NUe);
		if (e)
			return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.MapName);
	}
}
exports.InstanceBeInviteData = InstanceBeInviteData;
