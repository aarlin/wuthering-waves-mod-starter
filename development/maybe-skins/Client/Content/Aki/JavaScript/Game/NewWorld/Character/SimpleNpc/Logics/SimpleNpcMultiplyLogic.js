"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SimpleNpcMultiplyLogic = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
	MapUtils_1 = require("../../../../../Core/Utils/MapUtils"),
	ObjectUtils_1 = require("../../../../../Core/Utils/ObjectUtils"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	SimpleNpcFlowConditionChecker_1 = require("./SimpleNpcFlowConditionChecker"),
	DEFAULT_WAIT_TIME = 3,
	DEFAULT_LOOP_TIME = 10;
class SimpleNpcMultiplyLogic {
	constructor(i) {
		(this.air = void 0),
			(this.Sir = []),
			(this.Eir = []),
			(this.NUe = ++SimpleNpcMultiplyLogic.Me),
			(this.yir = void 0),
			(this.Iir = []),
			(this.Tir = 0),
			(this.Lir = 0),
			(this.Rir = !0),
			(this.IsPause = !0),
			(this.air = i),
			(this.Eir = new Array());
	}
	StartFlow() {
		(this.IsPause = !1), this.Uir(), this.Pir();
	}
	Pir() {
		let i = void (this.Eir.length = 0);
		var t,
			e = this.air.FlowList;
		for (let t = 0, o = e.Num(); t < o; t++) {
			var r = e.Get(t);
			if (this.Sir[t])
				if (9 === r.CheckType) {
					if (
						SimpleNpcFlowConditionChecker_1.SimpleNpcFlowConditionChecker.CheckFirstEnter(
							this.NUe,
						)
					) {
						this.Eir.push(r),
							(i = r),
							SimpleNpcFlowConditionChecker_1.SimpleNpcFlowConditionChecker.SetFirstEnter(
								this.NUe,
							);
						break;
					}
				} else
					SimpleNpcFlowConditionChecker_1.SimpleNpcFlowConditionChecker.CheckCondition(
						r,
					) && this.Eir.push(r);
		}
		i
			? this.xir(i)
			: (t = ObjectUtils_1.ObjectUtils.GetRandomArrayItem(this.Eir)) &&
				this.xir(t);
	}
	Uir() {
		(!this.Sir || this.Sir.length < this.air.FlowList.Num()) &&
			this.FilterFlowWorldState(
				ModelManager_1.ModelManager.WorldModel.WorldStateMap,
			);
	}
	FilterFlowWorldState(i) {
		var t = this.air.FlowList.Num();
		for (this.Sir || (this.Sir = new Array()); this.Sir.length < t; )
			this.Sir.push(!0);
		var e = new Map();
		for (let i = 0; i < t; i++) {
			var r = this.air.FlowList.Get(i);
			1 === r.WorldState.WorldStateMap.Num() &&
				void 0 !== (r = r.WorldState.WorldStateMap.GetKey(0)) &&
				(e.get(r) || e.set(r, new Array()), e.get(r).push(i));
		}
		var o = new Array();
		for (let e = 0; e < t; e++) o.push(this.wir(e, i));
		var s = new Map();
		for (const i of e) {
			var a = i[0],
				l = (s.set(a, -1), s.get(a));
			for (const t of i[1]) 0 <= o[t] && (l < 0 || l > o[t]) && s.set(a, o[t]);
		}
		for (let i = 0; i < t; i++) {
			var h,
				n = this.air.FlowList.Get(i);
			0 === n.WorldState.WorldStateMap.Num()
				? (this.Sir[i] = !0)
				: 1 === n.WorldState.WorldStateMap.Num()
					? ((n = n.WorldState.WorldStateMap.GetKey(0)),
						(n = s.get(n)),
						(h = o[i]),
						(this.Sir[i] = void 0 !== n && 0 <= n && h === n))
					: (this.Sir[i] = 0 === o[i]);
		}
	}
	wir(i, t) {
		var e = this.air.FlowList.Get(i);
		if (0 === e.WorldState.WorldStateMap.Num()) return 0;
		if (1 === e.WorldState.WorldStateMap.Num()) {
			const i = e.WorldState.WorldStateMap.GetKey(0);
			var r = this.GetWorldStateEnum(i);
			return void 0 === r || void 0 === (r = t.get(r))
				? -1
				: r - e.WorldState.WorldStateMap.Get(i);
		}
		const o = e.WorldState.MeetAllConditions;
		let s = !!o;
		return (
			MapUtils_1.MapUtils.ForEach(e.WorldState.WorldStateMap, (i, e) => {
				let r;
				void 0 !== (i = this.GetWorldStateEnum(i)) && (r = t.get(i)),
					(s = void 0 !== r ? (o ? s && r >= e : s || r >= e) : !o && s);
			}),
			s ? 0 : -1
		);
	}
	xir(i) {
		(this.yir = i),
			(i = ConfigManager_1.ConfigManager.FlowConfig.GetRandomFlow(
				i.FlowListName,
				Number(i.FlowSubTitle),
				this.air.GetOwner().ActorLabel,
			))
				? ((this.Iir = i.TalkItems), this.Bir(0))
				: this.bir();
	}
	Bir(i) {
		if (((this.Tir = i), (t = this.Iir).length > i)) {
			var t = t[i],
				e = this.air.NpcList;
			if (e.Num() < 2) {
				let e = !1;
				var r = this.air.GetOwner();
				(e = r instanceof UE.TsSimpleNpc_C ? this.qir(r, t) : e)
					? ((this.Rir = !1), (this.Lir = this.Gir(t)))
					: this.Bir(i + 1);
			} else {
				let o = -1;
				-1 ===
				(o =
					0 === this.yir.Pawn
						? SimpleNpcFlowConditionChecker_1.SimpleNpcFlowConditionChecker.GetFlowActorIndex(
								t.WhoId,
							)
						: this.yir.Pawn - 1)
					? (Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Level",
								30,
								"请选择指定的演出目标ID",
								["Id", t.WhoId],
								["Name", this.air.GetOwner().GetName()],
							),
						this.Bir(i + 1))
					: e.Num() <= o
						? (Log_1.Log.CheckError() &&
								Log_1.Log.Error(
									"Level",
									30,
									"找不到演出目标",
									["Index", o],
									["Name", this.air.GetOwner().GetName()],
								),
							this.Bir(i + 1))
						: ((r = e.Get(o)),
							this.qir(r, t)
								? ((this.Rir = !1), (this.Lir = this.Gir(t)))
								: this.Bir(i + 1));
			}
		} else this.bir();
	}
	qir(i, t) {
		let e = !1;
		var r,
			o = this.Nir(t.TidTalk);
		return (
			o && ((e = !0), (r = this.Gir(t, 0.05)), i.ShowDialog(o, r)),
			!(!t.Montage || !i.TryPlayMontage(t.Montage.ActionMontage.Path)) || e
		);
	}
	Nir(i) {
		if (!StringUtils_1.StringUtils.IsEmpty(i))
			return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i);
	}
	Gir(i, t = 0) {
		let e = i.WaitTime;
		return (e && 0 !== e) || (e = 3), e + t;
	}
	bir() {
		this.Rir = !0;
		let i = 10;
		this.yir && (i = this.yir.LoopTime), (this.Lir = i);
	}
	Tick(i) {
		0 < this.Lir &&
			((this.Lir -= i), this.Lir <= 0) &&
			(this.Rir ? this.IsPause || this.Pir() : this.Bir(this.Tir + 1));
	}
	StopFlow() {
		(this.Rir = !0), (this.Lir = 0);
		var i = this.air?.NpcList;
		if (i && 2 < i?.Num())
			for (let e = 0, r = i.Num(); e < r; e++) {
				var t = i.Get(e);
				t.HideDialog(), t.StopMontage();
			}
		else {
			var e = this.air.GetOwner();
			e instanceof UE.TsSimpleNpc_C && (e.HideDialog(), e.StopMontage());
		}
	}
	get IsPlaying() {
		return !this.Rir;
	}
	GetWorldStateEnum(i) {
		switch (i) {
			case 0:
				return "DefaultState";
			case 2:
			case 1:
				return "NpcWorldState";
			default:
				return;
		}
	}
}
(exports.SimpleNpcMultiplyLogic = SimpleNpcMultiplyLogic).Me = 0;
