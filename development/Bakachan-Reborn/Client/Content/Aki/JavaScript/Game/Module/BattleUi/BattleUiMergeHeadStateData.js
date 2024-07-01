"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattleUiMergeHeadStateData =
		exports.MergeHeadStateMonsterInfo =
		exports.MergeHeadStateInfo =
			void 0);
const Log_1 = require("../../../Core/Common/Log"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	CharacterAttributeTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterAttributeTypes"),
	EMPTY_STR = "";
class MergeHeadStateInfo {
	constructor() {
		(this.Id = 0),
			(this.TreeId = void 0),
			(this.NodeId = 0),
			(this.MonsterGroupName = void 0),
			(this.IsVisible = !1),
			(this.TotalHp = 0),
			(this.TotalHpMax = 0),
			(this.MonsterInfos = new Map());
	}
}
exports.MergeHeadStateInfo = MergeHeadStateInfo;
class MergeHeadStateMonsterInfo {
	constructor() {
		(this.Id = 0),
			(this.PbDataId = 0),
			(this.EntityHandle = void 0),
			(this.IsDead = !1),
			(this.BaseLife = 0),
			(this.AttributeComponent = void 0),
			(this.FightTagListenTask = void 0),
			(this.HasFightTag = !1),
			(this.Hp = 0),
			(this.HpMax = 0),
			(this.$Ke = (e, t) => {
				this.HasFightTag !== t &&
					((this.HasFightTag = t),
					ModelManager_1.ModelManager.BattleUiModel.MergeHeadStateData.OnMonsterFightTagChange(
						this.Id,
						t,
					));
			}),
			(this.YKe = (e, t, i) => {
				var s = this.Hp;
				(this.Hp = t),
					this.HpMax <= 0 ||
						((t = ((this.Hp - s) / this.HpMax) * this.BaseLife),
						ModelManager_1.ModelManager.BattleUiModel.MergeHeadStateData.OnMonsterHealthChange(
							this.Id,
							t,
						));
			}),
			(this.JKe = (e, t, i) => {
				var s = this.HpMax;
				this.HpMax = t;
				let a = 0,
					o = (0 < s && (a = this.Hp / s), 0);
				(t =
					((o = 0 < this.HpMax ? this.Hp / this.HpMax : o) - a) *
					this.BaseLife),
					ModelManager_1.ModelManager.BattleUiModel.MergeHeadStateData.OnMonsterHealthChange(
						this.Id,
						t,
					);
			});
	}
	AddListener() {
		(this.FightTagListenTask || this.AttributeComponent) &&
			(Log_1.Log.CheckError() &&
				Log_1.Log.Error("Battle", 18, "[合并怪物血条]重复添加进战监听", [
					"entityId",
					this.EntityHandle.Id,
				]),
			this.RemoveListener());
		var e = this.EntityHandle.Entity.GetComponent(185);
		return e
			? ((this.AttributeComponent = this.EntityHandle.Entity.GetComponent(156)),
				this.AttributeComponent
					? ((this.FightTagListenTask = e.ListenForTagAddOrRemove(
							1996802261,
							this.$Ke,
						)),
						(this.HasFightTag = e.HasTag(1996802261)),
						(e = this.AttributeComponent).AddListener(
							CharacterAttributeTypes_1.EAttributeId.Proto_Life,
							this.YKe,
						),
						e.AddListener(CharacterAttributeTypes_1.EAttributeId.Tkn, this.JKe),
						!0)
					: (Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Battle",
								18,
								"[合并怪物血条]监听的实体不存在AttributeComponent",
								["entityId", this.EntityHandle.Id],
							),
						!1))
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Battle",
						18,
						"[合并怪物血条]监听的实体不存在tagComponent",
						["entityId", this.EntityHandle.Id],
					),
				!1);
	}
	RemoveListener() {
		var e;
		this.FightTagListenTask &&
			(this.FightTagListenTask.EndTask(), (this.FightTagListenTask = void 0)),
			this.AttributeComponent &&
				((e = this.AttributeComponent).RemoveListener(
					CharacterAttributeTypes_1.EAttributeId.Proto_Life,
					this.YKe,
				),
				e.RemoveListener(CharacterAttributeTypes_1.EAttributeId.Tkn, this.JKe),
				(this.AttributeComponent = void 0));
	}
}
exports.MergeHeadStateMonsterInfo = MergeHeadStateMonsterInfo;
class BattleUiMergeHeadStateData {
	constructor() {
		(this.zKe = 0),
			(this.InfoMap = new Map()),
			(this.ListenMonsterAddMap = new Map()),
			(this.ListenMonsterRemoveMap = new Map());
	}
	Init() {}
	OnLeaveLevel() {
		if (!(this.ListenMonsterRemoveMap.size <= 0)) {
			for (const t of this.ListenMonsterRemoveMap.values()) {
				(t.EntityHandle = void 0), this.ZKe(t);
				var e = this.InfoMap.get(t.Id);
				if (!e)
					return void (
						Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Battle",
							18,
							"[合并怪物血条]移除实体时InfoId错误",
							["id", t.Id],
						)
					);
				t.HasFightTag && ((t.HasFightTag = !1), (e.IsVisible = !1));
			}
			this.ListenMonsterRemoveMap.clear();
		}
	}
	Clear() {
		for (const e of this.InfoMap.values()) this.eQe(e);
		this.InfoMap.clear(),
			this.ListenMonsterAddMap.clear(),
			this.ListenMonsterRemoveMap.clear();
	}
	UpdateProgress(e, t, i, s) {
		if (i) {
			for (const s of this.InfoMap.values())
				if (s.TreeId === e && s.NodeId === t) return void this.tQe(s, i);
			this.iQe(e, t, i, s);
		}
	}
	RemoveTree(e) {
		for (const t of this.InfoMap.values()) t.TreeId === e && this.eQe(t);
	}
	RemoveNode(e, t) {
		for (const i of this.InfoMap.values())
			if (i.TreeId === e && i.NodeId === t) return void this.eQe(i);
	}
	OnAddEntity(e) {
		if (!(this.ListenMonsterAddMap.size <= 0)) {
			var t = ModelManager_1.ModelManager.CreatureModel.GetPbDataIdByEntity(e),
				i = this.ListenMonsterAddMap.get(t);
			if (i)
				if (
					(this.ListenMonsterAddMap.delete(t),
					(i.EntityHandle = e),
					this.oQe(i),
					(t = this.InfoMap.get(i.Id)))
				) {
					let a = !1;
					if (i.AttributeComponent) {
						e = i.AttributeComponent.GetCurrentValue(
							CharacterAttributeTypes_1.EAttributeId.Proto_Life,
						);
						var s = i.AttributeComponent.GetCurrentValue(
							CharacterAttributeTypes_1.EAttributeId.Tkn,
						);
						if (e !== i.Hp || s !== i.HpMax) {
							let o = 0,
								r = (0 < i.HpMax && (o = i.Hp / i.HpMax), 0);
							0 < s && (r = e / s),
								(t.TotalHp += (r - o) * i.BaseLife),
								(i.Hp = e),
								(i.HpMax = s),
								(a = !0);
						}
					}
					t.IsVisible
						? a && this.rQe(t)
						: i.HasFightTag && ((t.IsVisible = !0), this.nQe(t));
				} else
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Battle",
							18,
							"[合并怪物血条]添加实体时InfoId错误",
							["id", i.Id],
						);
		}
	}
	OnRemoveEntity(e) {
		var t;
		this.ListenMonsterRemoveMap.size <= 0 ||
			((t = this.ListenMonsterRemoveMap.get(e.Id)) &&
				(this.ListenMonsterRemoveMap.delete(e.Id),
				(t.EntityHandle = void 0),
				this.ZKe(t),
				(e = this.InfoMap.get(t.Id))
					? t.HasFightTag && ((t.HasFightTag = !1), this.UpdateVisible(e, !0))
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Battle",
							18,
							"[合并怪物血条]移除实体时InfoId错误",
							["id", t.Id],
						)));
	}
	iQe(e, t, i, s) {
		var a = new MergeHeadStateInfo();
		this.zKe++,
			(a.Id = this.zKe),
			(a.TreeId = e),
			(a.NodeId = t),
			(a.MonsterGroupName = s ?? "");
		for (const e of i.ovs)
			for (const t of e._vs) {
				var o = new MergeHeadStateMonsterInfo();
				(o.Id = a.Id),
					(o.PbDataId = t.jkn),
					(o.IsDead = 2 === t.ckn),
					(o.BaseLife = MathUtils_1.MathUtils.LongToNumber(t.rvs)),
					(o.EntityHandle =
						ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
							o.PbDataId,
						)),
					o.EntityHandle?.Valid
						? (this.oQe(o),
							o.AttributeComponent &&
								((o.Hp = o.AttributeComponent.GetCurrentValue(
									CharacterAttributeTypes_1.EAttributeId.Proto_Life,
								)),
								(o.HpMax = o.AttributeComponent.GetCurrentValue(
									CharacterAttributeTypes_1.EAttributeId.Tkn,
								))))
						: (o.IsDead
								? (o.Hp = 0)
								: (this.ListenMonsterAddMap.set(o.PbDataId, o),
									(o.Hp = o.BaseLife)),
							(o.HpMax = o.BaseLife)),
					a.MonsterInfos.set(o.PbDataId, o);
			}
		for (const e of a.MonsterInfos.values())
			0 < e.HpMax && (a.TotalHp += (e.Hp / e.HpMax) * e.BaseLife),
				(a.TotalHpMax += e.BaseLife);
		this.UpdateVisible(a, !1),
			this.InfoMap.set(a.Id, a),
			a.IsVisible && this.nQe(a);
	}
	tQe(e, t) {
		for (const s of t.ovs)
			for (const t of s._vs) {
				var i = e.MonsterInfos.get(t.jkn);
				i
					? i.IsDead ||
						((i.IsDead = 2 === t.ckn),
						i.IsDead &&
							(this.ZKe(i),
							(0 === i.Hp && i.HpMax === i.BaseLife) ||
								(0 < i.HpMax && (e.TotalHp -= (i.Hp / i.HpMax) * i.BaseLife),
								(i.Hp = 0),
								(i.HpMax = i.BaseLife),
								this.rQe(e))))
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Battle",
							18,
							"[合并怪物血条]更新怪物数据时与缓存对不上",
						);
			}
	}
	eQe(e) {
		for (const t of e.MonsterInfos.values())
			t.RemoveListener(),
				t.EntityHandle
					? this.ListenMonsterRemoveMap.delete(t.EntityHandle.Id)
					: this.ListenMonsterAddMap.delete(t.PbDataId);
		e.IsVisible && ((e.IsVisible = !1), this.nQe(e)), this.InfoMap.delete(e.Id);
	}
	oQe(e) {
		e.AddListener() && this.ListenMonsterRemoveMap.set(e.EntityHandle.Id, e);
	}
	ZKe(e) {
		e.RemoveListener(), e.IsDead || this.ListenMonsterAddMap.set(e.PbDataId, e);
	}
	OnMonsterFightTagChange(e, t) {
		var i = this.InfoMap.get(e);
		i
			? i.IsVisible !== t &&
				(t ? ((i.IsVisible = !0), this.nQe(i)) : this.UpdateVisible(i, !0))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("Battle", 18, "[合并怪物血条]更新进战时InfoId错误", [
					"id",
					e,
				]);
	}
	UpdateVisible(e, t) {
		let i = !1;
		for (const t of e.MonsterInfos.values())
			if (t.HasFightTag) {
				i = !0;
				break;
			}
		e.IsVisible !== i && ((e.IsVisible = i), t) && this.nQe(e);
	}
	nQe(e) {
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.BattleUiMergeHeadStateVisibleChanged,
			e,
		);
	}
	OnMonsterHealthChange(e, t) {
		var i = this.InfoMap.get(e);
		i
			? ((i.TotalHp += t), this.rQe(i))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("Battle", 18, "[合并怪物血条]更新血量时InfoId错误", [
					"id",
					e,
				]);
	}
	rQe(e) {
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.BattleUiMergeHeadStateHealthChanged,
			e,
		);
	}
}
exports.BattleUiMergeHeadStateData = BattleUiMergeHeadStateData;
