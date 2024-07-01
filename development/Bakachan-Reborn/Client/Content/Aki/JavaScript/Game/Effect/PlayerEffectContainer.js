"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PlayerEffectContainer = void 0);
const EventDefine_1 = require("../Common/Event/EventDefine"),
	EventSystem_1 = require("../Common/Event/EventSystem"),
	ModelManager_1 = require("../Manager/ModelManager"),
	SceneTeamDefine_1 = require("../Module/SceneTeam/SceneTeamDefine"),
	EffectSystem_1 = require("./EffectSystem"),
	PLAYER_EFFECT_LRU_CAPACITY = 200;
class PlayerEffectContainer {
	constructor() {
		(this.Bpe = new Array(SceneTeamDefine_1.SCENE_TEAM_MAX_NUM)),
			(this.bpe = new Array(SceneTeamDefine_1.SCENE_TEAM_MAX_NUM)),
			(this.qpe = new Array(SceneTeamDefine_1.SCENE_TEAM_MAX_NUM)),
			(this.Gpe = new Array(SceneTeamDefine_1.SCENE_TEAM_MAX_NUM)),
			(this.Npe = new Array(SceneTeamDefine_1.SCENE_TEAM_MAX_NUM)),
			(this.Ope = new Array(SceneTeamDefine_1.SCENE_TEAM_MAX_NUM)),
			(this.xwn = new Array(SceneTeamDefine_1.SCENE_TEAM_MAX_NUM)),
			(this.kpe = () => {
				for (let e = 0; e < SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++)
					this.Ope[e] = this.Npe[e];
				var e,
					t = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems();
				for (let e = 0; e < SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++) {
					var n = t[e],
						i = n?.EntityHandle;
					n?.IsMyRole() && i ? (this.Npe[e] = i.Id) : (this.Npe[e] = 0);
				}
				for (let e = 0; e < SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++)
					(this.Gpe[e] = -1), (this.xwn[e] = !1);
				for (let t = 0; t < SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; t++)
					(this.qpe[t] = t),
						0 < this.Ope[t] &&
							-1 < (e = this.Fpe(this.Ope[t])) &&
							((this.Gpe[e] = t), (this.xwn[t] = !0));
				for (let e = 0; e < SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++)
					this.xwn[e] || this.Bpe[e].Clear();
				for (let e = 0; e < SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++) {
					var r,
						E = this.Gpe[e];
					if (-1 < E) {
						let t = -1;
						for (let e = 0; e < SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++)
							if (this.qpe[e] === E) {
								t = e;
								break;
							}
						e !== t &&
							-1 < t &&
							((r = this.Bpe[t]),
							(this.Bpe[t] = this.Bpe[e]),
							(this.Bpe[e] = r),
							(r = this.qpe[t]),
							(this.qpe[t] = this.qpe[e]),
							(this.qpe[e] = r),
							(r = this.bpe[t]),
							(this.bpe[t] = this.bpe[e]),
							(this.bpe[e] = r));
					}
				}
			});
	}
	Initialize() {
		for (let e = 0; e < SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++)
			(this.Bpe[e] = EffectSystem_1.EffectSystem.CreateEffectLru(200)),
				(this.bpe[e] = e);
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnUpdateSceneTeam,
			this.kpe,
		);
	}
	Clear() {
		for (let e = SceneTeamDefine_1.SCENE_TEAM_MAX_NUM - 1; -1 < e; e--)
			this.Bpe[e].Clear();
		(this.Bpe.length = 0),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnUpdateSceneTeam,
				this.kpe,
			);
	}
	ClearPool() {
		for (let e = SceneTeamDefine_1.SCENE_TEAM_MAX_NUM - 1; -1 < e; e--)
			this.Bpe[e].Clear();
	}
	CheckGetCondition(e) {
		return -1 < this.Vpe(e);
	}
	GetLruHitRate(e) {
		return (e = this.Vpe(e)) < 0 ? 0 : this.Bpe[e].HitRate;
	}
	GetPlayerEffectPoolSize(e) {
		return this.Bpe[e].Size;
	}
	Fpe(e) {
		if (ModelManager_1.ModelManager.CharacterModel.IsValid(e))
			for (let t = 0; t < this.Npe.length; t++) if (e === this.Npe[t]) return t;
		return -1;
	}
	Vpe(e) {
		return !e?.EntityId ||
			(e = this.Fpe(e.EntityId)) < 0 ||
			e >= this.Bpe.length
			? -1
			: e;
	}
	CreateEffectHandleFromPool(e, t) {
		var n = this.Vpe(t);
		if (!(n < 0))
			return (
				(e = this.Bpe[n].Create(e)),
				(n = this.bpe[n]),
				e && ((e.CreateSource = 2 + n), (e.SourceEntityId = t.EntityId)),
				e
			);
	}
	GetEffectHandleFromPool(e, t) {
		var n = this.Vpe(t);
		if (!(n < 0))
			return (n = this.Bpe[n].Get(e)) && (n.SourceEntityId = t.EntityId), n;
	}
	PutEffectHandleToPool(e) {
		var t = e.SourceEntityId;
		if ((t = this.Fpe(t)) < 0) {
			if (0 < SceneTeamDefine_1.SCENE_TEAM_MAX_NUM) {
				var n = e.CreateSource - 2;
				let t = 0;
				for (let e = 0; e < SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++)
					if (this.bpe[e] === n) {
						t = e;
						break;
					}
				this.Bpe[t].RemoveExternal(e);
			}
			return !1;
		}
		return (
			(e.SourceEntityId = -1),
			this.Bpe[t].Put(e.GetEffectSpec().GetProxyHandle())
		);
	}
	LruRemoveExternal(e) {
		var t = e.SourceEntityId;
		if ((t = this.Fpe(t)) < 0) {
			if (0 < SceneTeamDefine_1.SCENE_TEAM_MAX_NUM) {
				var n = e.CreateSource - 2;
				let t = 0;
				for (let e = 0; e < SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++)
					if (this.bpe[e] === n) {
						t = e;
						break;
					}
				return this.Bpe[t].RemoveExternal(e);
			}
			return !1;
		}
		return (e.SourceEntityId = -1), this.Bpe[t].RemoveExternal(e);
	}
}
exports.PlayerEffectContainer = PlayerEffectContainer;
