"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PerceptionRange = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Info_1 = require("../../../Core/Common/Info"),
	Log_1 = require("../../../Core/Common/Log"),
	EntityManager_1 = require("./EntityManager"),
	Range = 500,
	EntityManager = EntityManager_1.EntityManager;
class PerceptionRange extends EntityManager {
	static SetCollection(e) {
		this.isCollection(e) && PerceptionRange.SetInteractRange(e, 5e4);
	}
	static SetTeleport(e) {
		this.isTeleport(e) && PerceptionRange.SetInteractRange(e, 5e4);
	}
	static SetTreasure(e) {
		this.isTreasure(e) && PerceptionRange.SetInteractRange(e, 5e4);
	}
	static SetVision(e) {
		this.isVision(e) && PerceptionRange.SetInteractRange(e, 5e4);
	}
	static SetSonanceCasket(e) {
		this.isSonanceCasket(e) && PerceptionRange.SetInteractRange(e, 5e4);
	}
	static SetAll(e) {
		(this.isCollection(e) ||
			this.isTeleport(e) ||
			this.isTreasure(e) ||
			this.isVision(e) ||
			this.isSonanceCasket(e)) &&
			PerceptionRange.SetInteractRange(e, 5e4);
	}
	static SetInteractRange(e, t) {
		let n = e.Entity.GetComponent(104);
		try {
			n.SetInteractRange(t, 0);
		} catch (e) {}
	}
}
exports.PerceptionRange = PerceptionRange;
