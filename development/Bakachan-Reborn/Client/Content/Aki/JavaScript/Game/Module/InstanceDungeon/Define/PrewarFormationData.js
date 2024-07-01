"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PrewarFormationData = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager");
class PrewarFormationData {
	constructor() {
		(this.j8 = 0),
			(this.Mne = 0),
			(this.B8 = 0),
			(this.Usi = !1),
			(this.Asi = -1),
			(this.Psi = 0),
			(this.xsi = 1),
			(this.Xy = 0);
	}
	GetPlayerId() {
		return this.j8;
	}
	SetPlayerId(e) {
		this.j8 = e;
	}
	GetConfigId() {
		return this.Mne;
	}
	SetConfigId(e) {
		this.Mne = e;
	}
	IsEmpty() {
		return 0 === this.Mne;
	}
	IsLeader() {
		return (
			this.j8 ===
			ModelManager_1.ModelManager.InstanceDungeonModel.GetMatchTeamInfo()?.Q4n
		);
	}
	IsSelf() {
		return this.j8 === ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
	}
	GetLevel() {
		return this.B8;
	}
	SetLevel(e) {
		this.B8 = e;
	}
	GetIsReady() {
		return this.Usi;
	}
	SetIsReady(e) {
		this.Usi = e;
	}
	GetPlayerName() {
		return (
			ModelManager_1.ModelManager.InstanceDungeonModel.GetMatchTeamName(
				this.j8,
			) ?? ""
		);
	}
	SetOnlineNumber(e) {
		this.Asi = e;
	}
	GetOnlineNumber() {
		return this.Asi;
	}
	GetLife() {
		return this.Psi;
	}
	SetLife(e) {
		this.Psi = e;
	}
	GetMaxLife() {
		return this.xsi;
	}
	SetMaxLife(e) {
		this.xsi = e;
	}
	GetIndex() {
		return this.Xy;
	}
	SetIndex(e) {
		this.Xy = e;
	}
}
exports.PrewarFormationData = PrewarFormationData;
