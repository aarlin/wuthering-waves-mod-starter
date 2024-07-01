"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CombatScriptHelperBase =
		exports.CombatScriptSet =
		exports.CombatScriptUnit =
			void 0);
const UE = require("ue");
class CombatScriptUnit {
	constructor(t, r, i, s) {
		(this.Cmd = t),
			(this.Body = r),
			(this.ViewName = i),
			(this.Introduction = s);
	}
	ToString() {
		return `-------------------------------------------------------------------------\n        -指令名称： ${this.ViewName}\n        -指令介绍： ${this.Introduction}\n        -指令详情： ${this.Cmd} \n        -指令具体内容： ${this.Body}\n`;
	}
}
exports.CombatScriptUnit = CombatScriptUnit;
class CombatScriptSet {
	constructor() {
		(this.Introduction = ""), (this.CombatScriptUnits = new Array());
	}
	OnFilterCmd() {
		return (
			"CombatScriptHelper.GetCombatScriptBaseByName('" +
			this.constructor.name +
			"').Introduction;"
		);
	}
}
exports.CombatScriptSet = CombatScriptSet;
class CombatScriptHelperBase {
	constructor() {
		(this.CombatScripts = new Array()),
			(this.CombatScriptNames = new Array()),
			(this.UeCombatScriptNames = UE.NewArray(UE.BuiltinString)),
			(this.IsInit = !1);
	}
	Init() {
		if (!this.IsInit) {
			this.ht(), this.OnInit();
			for (const t of this.CombatScripts)
				for (const r of t.CombatScriptUnits)
					this.CombatScriptNames.push(r.Cmd),
						this.UeCombatScriptNames.Add(r.Cmd);
			this.IsInit = !0;
		}
	}
	ht() {
		(this.CombatScripts.length = 0),
			(this.CombatScriptNames.length = 0),
			this.UeCombatScriptNames.Empty();
	}
	OnInit() {}
	FilterCmd(t) {
		let r = t;
		for (const i of this.CombatScripts) {
			if (t === i.constructor.name) return i.OnFilterCmd();
			for (const t of i.CombatScriptUnits) r = r.replace(t.Cmd, t.Body);
		}
		return r;
	}
	get CombatScriptIndexes() {
		return this.Init(), this.UeCombatScriptNames;
	}
	GetCombatScriptBaseByName(t) {
		for (const r of this.CombatScripts) if (r.constructor.name === t) return r;
	}
}
exports.CombatScriptHelperBase = CombatScriptHelperBase;
