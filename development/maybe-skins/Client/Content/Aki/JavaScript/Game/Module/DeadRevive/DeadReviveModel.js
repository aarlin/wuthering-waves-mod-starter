"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DeadReviveModel = void 0);
const ReviveById_1 = require("../../../Core/Define/ConfigQuery/ReviveById"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase");
class DeadReviveModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.B2t = new Map()),
			(this.AllDead = !1),
			(this.CanRevive = !1),
			(this.DelayRevive = !1),
			(this.ReviveLimitTime = 0),
			(this.RevivePosition = void 0),
			(this.ReviveRotator = void 0),
			(this.RevivePositionType = 0),
			(this.ReviveTeleportId = 0),
			(this.ReviveHpMap = new Map()),
			(this.NeedOpenRevive = !1),
			(this.ReviveConfig = void 0),
			(this.ReviveId = 0),
			(this.SkipFallInjure = !1),
			(this.SkipDeathAnim = !1),
			(this.ReviveFlowIncId = 0);
	}
	InitReviveConfig(e) {
		(this.ReviveConfig && this.ReviveId === e) ||
			((this.ReviveId = e),
			(this.ReviveConfig = ReviveById_1.configReviveById.GetConfig(
				this.ReviveId,
			)));
	}
	OnClear() {
		return this.b2t(), !0;
	}
	OnLeaveLevel() {
		return this.b2t(), !0;
	}
	OnChangeMode() {
		return this.b2t(), !0;
	}
	b2t() {
		this.B2t.clear(), this.ClearReviveData(), (this.ReviveFlowIncId = 0);
	}
	ClearReviveData() {
		(this.AllDead = !1),
			(this.CanRevive = !1),
			(this.DelayRevive = !1),
			(this.ReviveLimitTime = 0),
			(this.NeedOpenRevive = !1),
			this.ReviveHpMap.clear();
	}
	SetPlayerIsDead(e, i) {
		this.B2t.set(e, i);
	}
	IsPlayerDead(e) {
		return !!this.B2t.has(e) && (this.B2t.get(e) ?? !1);
	}
	SetReviveMap(e, i) {
		this.ReviveHpMap.set(e, i);
	}
	GetReviveHp(e) {
		return this.ReviveHpMap.get(e);
	}
	ClearReviveMap() {
		this.ReviveHpMap.clear();
	}
}
exports.DeadReviveModel = DeadReviveModel;
