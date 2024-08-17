"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InputModel = void 0);
const ModelBase_1 = require("../../Core/Framework/ModelBase"),
	Switcher_1 = require("../Utils/Switcher");
class InputModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.jMe = new Map([
				[2, 0],
				[3, 0],
				[4, 0],
				[5, 0],
				[6, 0],
				[7, 0],
				[8, 0],
				[9, 0],
			])),
			(this.WMe = new Array()),
			(this.KMe = new Map()),
			(this.QMe = new Map()),
			(this.OnlyMoveForward = new Switcher_1.Switcher(!1)),
			(this.IsOpenInputAxisLog = !1);
	}
	GetHandlers() {
		return this.WMe;
	}
	GetPressTimes() {
		return this.KMe;
	}
	GetAxisValues() {
		return this.QMe;
	}
	QueryCommandPriority(e) {
		return this.jMe.get(e);
	}
	AddInputHandler(e) {
		this.WMe.includes(e) ||
			(this.WMe.push(e),
			this.WMe.sort((e, t) => t.GetPriority() - e.GetPriority()));
	}
	RemoveInputHandler(e) {
		-1 !== (e = this.WMe.indexOf(e)) && this.WMe.splice(e, 1);
	}
	OnClear() {
		return (
			this.WMe.splice(0, this.WMe.length),
			this.KMe.clear(),
			this.QMe.clear(),
			!0
		);
	}
}
exports.InputModel = InputModel;
