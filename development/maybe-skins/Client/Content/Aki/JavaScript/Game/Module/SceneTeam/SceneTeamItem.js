"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneTeamItem = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
	SceneTeamDefine_1 = require("./SceneTeamDefine");
class SceneTeamItem {
	constructor() {
		(this.Qfo = !1),
			(this.Vfo = 0),
			(this.j8 = 0),
			(this.Mne = 0),
			(this.Xfo = 0),
			(this.$fo = void 0),
			(this.Yfo = !1);
	}
	static Create(e, t, n, a) {
		var i = new SceneTeamItem();
		return (
			(i.Vfo = e),
			(i.Qfo = t === ModelManager_1.ModelManager.CreatureModel.GetPlayerId()),
			(i.j8 = t),
			(i.Mne = n),
			(i.Xfo = a),
			i
		);
	}
	Reset() {
		(this.Xfo = 0), (this.$fo = void 0);
	}
	GetGroupType() {
		return this.Vfo;
	}
	GetPlayerId() {
		return this.j8;
	}
	IsMyRole() {
		return this.Qfo;
	}
	IsControl() {
		var e;
		return this.Qfo
			? !(
					!(e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity) ||
					!this.EntityHandle
				) && e.Id === this.EntityHandle.Id
			: this.Yfo;
	}
	get GetConfigId() {
		return this.Mne;
	}
	GetCreatureDataId() {
		return this.Xfo;
	}
	UpdateEntityHandle() {
		this.$fo = ModelManager_1.ModelManager.CreatureModel.GetEntity(this.Xfo);
	}
	get EntityHandle() {
		if (!this.$fo || !this.$fo.Valid) {
			var e = ModelManager_1.ModelManager.CreatureModel.GetEntity(this.Xfo);
			if (!e || !e.Valid) return;
			this.$fo = e;
		}
		if (this.$fo.IsInit) return this.$fo;
	}
	IsDead() {
		var e = this.EntityHandle?.Entity;
		return !e || !(e = e.GetComponent(15)) || e.IsDead();
	}
	CanGoBattle() {
		return this.EntityHandle
			? this.IsDead()
				? 4
				: this.EntityHandle.Entity.CheckGetComponent(185).HasTag(-2100129479)
					? 2
					: 0
			: 1;
	}
	CanGoDown(e) {
		var t;
		return this.EntityHandle
			? (t = this.EntityHandle.Entity.CheckGetComponent(185)).HasTag(
					-1697149502,
				)
				? 6
				: e
					? 0
					: t.HasTag(-2044964178) && t.HasAnyTag(SceneTeamDefine_1.beHitTagList)
						? 5
						: t.HasTag(191377386)
							? 4
							: t.HasTag(1008164187)
								? 3
								: 0
			: 1;
	}
	SetRemoteIsControl(e) {
		this.Yfo = e;
	}
}
exports.SceneTeamItem = SceneTeamItem;
