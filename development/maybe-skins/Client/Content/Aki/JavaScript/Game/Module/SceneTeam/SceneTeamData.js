"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneTeamGroup =
		exports.SceneTeamPlayer =
		exports.SceneTeamRole =
			void 0);
const Log_1 = require("../../../Core/Common/Log"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	WaitEntityTask_1 = require("../../World/Define/WaitEntityTask");
class SceneTeamRole {
	constructor() {
		(this.CreatureDataId = 0), (this.RoleId = 0);
	}
}
exports.SceneTeamRole = SceneTeamRole;
class SceneTeamPlayer {
	constructor() {
		(this.j8 = 0), (this.Wyn = void 0), (this.Ffo = new Map());
	}
	static Create(e) {
		var t = new SceneTeamPlayer();
		return (t.j8 = e), t;
	}
	Clear() {
		this.Wyn = void 0;
		for (const e of this.Ffo.values()) e.Clear();
		this.Ffo.clear();
	}
	ResetServerGroupData() {
		var e = [];
		for (const t of this.Ffo.keys()) 0 <= t && e.push(t);
		for (const t of e) this.Ffo.get(t)?.Clear(), this.Ffo.delete(t);
	}
	GetCurrentGroupType() {
		return this.Wyn;
	}
	GetCurrentGroup() {
		if (this.Wyn) return this.Ffo.get(this.Wyn);
	}
	GetGroupList() {
		var e = [];
		for (const t of this.Ffo.values()) e.push(t);
		return e;
	}
	SwitchGroup(e) {
		this.Wyn = e;
	}
	UpdateGroup(e, t, o, r = !1) {
		let a = this.Ffo.get(e);
		a || ((a = SceneTeamGroup.Create(this.j8, e)), this.Ffo.set(e, a)),
			a.Update(t, o, r);
	}
}
exports.SceneTeamPlayer = SceneTeamPlayer;
class SceneTeamGroup {
	constructor() {
		(this.j8 = 0),
			(this.Vfo = 0),
			(this.Kho = new Array()),
			(this.Hfo = void 0),
			(this.IsRetain = !1),
			(this.Wfo = void 0);
	}
	static Create(e, t) {
		var o = new SceneTeamGroup();
		return (o.j8 = e), (o.Vfo = t), o;
	}
	Clear() {
		(this.Vfo = 0),
			this.Kho.splice(0, this.Kho.length),
			(this.IsRetain = !1),
			(this.Hfo = void 0),
			(this.Wfo = void 0);
	}
	GetGroupType() {
		return this.Vfo;
	}
	GetRoleList() {
		var e = [];
		for (const t of this.Kho) e.push(t);
		return e;
	}
	GetCurrentRole() {
		return this.Hfo;
	}
	SetCurrentRole(e) {
		for (const t of this.Kho) t.CreatureDataId === e && (this.Hfo = t);
	}
	Update(e, t, o = !1) {
		if (
			(this.Kho.splice(0, this.Kho.length),
			(this.Hfo = void 0),
			this.Wfo?.Cancel(),
			(this.Wfo = void 0),
			!(e.length <= 0))
		) {
			this.IsRetain = o;
			var r = [];
			const n = new Map();
			for (const o of e) {
				var a = o.CreatureDataId;
				this.Kho.push(o),
					o.RoleId === t && (this.Hfo = o),
					0 < a && (r.push(a), n.set(a, o));
			}
			r.length <= 0 ||
				(this.Wfo = WaitEntityTask_1.WaitEntityTask.Create(
					r,
					() => {
						for (var [e, t] of n) {
							var r,
								a =
									ModelManager_1.ModelManager.CreatureModel.GetEntity(
										e,
									)?.Entity;
							a
								? ((r = this.Kfo(t, a, o)),
									ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
										a,
										r,
										"Formation UpdateGroup",
									),
									t === this.Hfo || r || a.CheckGetComponent(81)?.SetTeamTag(2))
								: Log_1.Log.CheckWarn() &&
									Log_1.Log.Warn(
										"Formation",
										49,
										"更新编队实体显隐时无法获取",
										["CreatureDataId", e],
									);
						}
						var s;
						o &&
							(s = this.Hfo?.CreatureDataId) &&
							ModelManager_1.ModelManager.CreatureModel.GetEntity(s)
								?.Entity?.GetComponent(81)
								?.OutOfControl();
					},
					!0,
					-1,
				));
		}
	}
	Kfo(e, t, o) {
		return !(
			ModelManager_1.ModelManager.PlotModel.InSeamlessFormation ||
			!(t = t.GetComponent(15)) ||
			t.IsDead() ||
			(this.j8 !== ModelManager_1.ModelManager.PlayerInfoModel.GetId()
				? ((t = ModelManager_1.ModelManager.CreatureModel.GetScenePlayerData(
						this.j8,
					)?.IsRemoteSceneLoading()),
					e !== this.Hfo || t)
				: !(
						(this.Vfo ===
							ModelManager_1.ModelManager.SceneTeamModel?.GetTeamPlayerData(
								this.j8,
							)?.GetCurrentGroupType() &&
							e === this.Hfo) ||
						e.CreatureDataId ===
							ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentTeamItem?.GetCreatureDataId() ||
						(o && e === this.Hfo)
					))
		);
	}
}
exports.SceneTeamGroup = SceneTeamGroup;
