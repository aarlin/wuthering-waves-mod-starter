"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GuideLineAssistant = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	ActorSystem_1 = require("../../../../Core/Actor/ActorSystem"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	GlobalData_1 = require("../../../GlobalData"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	ControllerAssistantBase_1 = require("../../GeneralLogicTree/ControllerAssistant/ControllerAssistantBase"),
	GeneralLogicTreeUtil_1 = require("../../GeneralLogicTree/GeneralLogicTreeUtil"),
	QUERY_VALUE = 500,
	SPLIT_Z_LIMIT = 2e3;
class PendingProcess {
	constructor(e) {
		(this.ProcessType = e),
			(this.ProcessId = 0),
			(this.Finished = !1),
			(this.ProcessId = ++PendingProcess.Id);
	}
}
PendingProcess.Id = 0;
class StartShowProcess extends PendingProcess {
	constructor() {
		super(0);
	}
}
class EndShowProcess extends PendingProcess {
	constructor() {
		super(1);
	}
}
class GuideLineAssistant extends ControllerAssistantBase_1.ControllerAssistantBase {
	constructor() {
		super(...arguments),
			(this.moo = void 0),
			(this.doo = void 0),
			(this.U$t = []),
			(this.bze = void 0),
			(this.Coo = 0),
			(this.goo = UE.NewArray(UE.Vector)),
			(this.foo = Vector_1.Vector.Create()),
			(this.poo = Vector_1.Vector.Create(500, 500, 500)),
			(this.voo = 0),
			(this.Moo = 0),
			(this.Soo = -0),
			(this.Eoo = 0),
			(this.yoo = -0),
			(this.Ioo = !1),
			(this.Too = !1),
			(this.Loo = () => {
				(this.bze = void 0),
					(this.U$t.length = 0) < this.Eoo &&
						this.U$t.push(new EndShowProcess()),
					this.U$t.push(new StartShowProcess());
			}),
			(this.ooo = (e, t) => {
				210004 === t &&
					ModelManager_1.ModelManager.QuestNewModel.UpdateGuideLineStartShowTime();
			}),
			(this.Gdt = (e) => {
				e === Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest &&
					(ModelManager_1.ModelManager.QuestNewModel.UpdateGuideLineStartShowTime(),
					this.Loo());
			}),
			(this.DKt = (e, t, o) => {
				var i;
				6 === e.Type &&
					(i =
						ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest()) &&
					i.Id === e.TreeConfigId &&
					o === Protocol_1.Aki.Protocol.N2s.Lkn &&
					this.Gdt(Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest);
			}),
			(this.Doo = () => {
				(this.bze.Finished = !0), this.U$t.shift(), (this.bze = void 0);
			});
	}
	OnInit() {}
	OnDestroy() {
		(this.U$t.length = 0), this.Roo(), this.goo.Empty();
	}
	OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.CharUseSkill,
			this.ooo,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnLogicTreeTrackUpdate,
				this.Gdt,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnLogicTreeNodeStatusChange,
				this.DKt,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.TeleportComplete,
				this.Loo,
			);
	}
	OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.CharUseSkill,
			this.ooo,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnLogicTreeTrackUpdate,
				this.Gdt,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnLogicTreeNodeStatusChange,
				this.DKt,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.TeleportComplete,
				this.Loo,
			);
	}
	SpawnQuestGuideLine() {
		this.Roo(),
			(this.moo = ActorSystem_1.ActorSystem.Get(
				UE.BP_Fx_WayFinding_C.StaticClass(),
				MathUtils_1.MathUtils.DefaultTransform,
			)),
			this.Uoo(),
			(this.doo = UE.NewArray(UE.Vector));
	}
	Roo() {
		ObjectUtils_1.ObjectUtils.IsValid(this.moo) &&
			(ActorSystem_1.ActorSystem.Put(this.moo), (this.moo = void 0));
	}
	Tick(e) {
		this.Aoo(e),
			this.sti(),
			this.CheckCanShowGuideLine()
				? ((e = this.Poo()),
					(this.Too && (!e || this.Ioo)) || ((this.Too = !0), this.Loo()))
				: (0 < this.Eoo && this.Too && this.Uoo(), (this.Too = !1));
	}
	sti() {
		if (0 !== this.U$t?.length && !this.bze)
			switch (((this.bze = this.U$t[0]), this.bze.ProcessType)) {
				case 0:
					this.xoo();
					break;
				case 1:
					this.woo(2);
			}
	}
	Uoo() {
		this.U$t.push(new EndShowProcess());
	}
	CheckCanShowGuideLine() {
		var e;
		return !(
			ModelManager_1.ModelManager.PlotModel.IsInPlot ||
			((e =
				ModelManager_1.ModelManager.QuestNewModel.GetGuideLineStartShowTime()),
			this.Coo ||
				(this.Coo = parseInt(
					ConfigManager_1.ConfigManager.QuestNewConfig.GetGlobalConfig(
						"GuideLineShowTime",
					),
				)),
			TimeUtil_1.TimeUtil.GetServerTime() - e > this.Coo)
		);
	}
	Poo() {
		var e =
			ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(
				36,
			);
		return e ? this.Boo(e.IsMoving) : (this.Boo(!1), !1);
	}
	Aoo(e) {
		this.bze &&
			((this.yoo = MathUtils_1.MathUtils.Clamp(this.yoo + e / 500, 0, 1)),
			(this.Eoo = MathUtils_1.MathUtils.Lerp(this.voo, this.Moo, this.yoo)),
			this.moo.NS_Fx_WayFinding.SetNiagaraVariableFloat("Spawn", this.Eoo),
			1 <= this.yoo && this.Soo < 1 && this.Doo(),
			(this.Soo = this.yoo));
	}
	xoo() {
		var e = ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest();
		if (e && e.CanShowGuideLine()) {
			var t = e.GetCurrentActiveChildQuestNode();
			if (t) {
				var o = e.GetNodeTrackPosition(t.NodeId),
					i = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation();
				if (o && i) {
					this.foo.Set(i.X, i.Y, i.Z);
					var s =
						UE.RoadNetNavigationSystem.RoadNet_FindPathToLocationSynchronously(
							GlobalData_1.GlobalData.World,
							this.foo.ToUeVector(),
							o.ToUeVector(),
						);
					if (s && s.PathPoints.Num())
						if (s.Length <= 100 * e.GetGuideLineHideDistance(t.NodeId))
							this.Uoo();
						else {
							this.doo.Empty();
							for (let e = 0; e < s.PathPoints.Num(); e++) {
								var n = s.PathPoints.Get(e);
								this.doo.Add(n);
							}
							this.boo(this.moo.Spline, this.doo, 4),
								this.moo.NS_Fx_WayFinding.ReinitializeSystem();
						}
					else this.Uoo();
				} else this.Uoo();
			} else this.Uoo();
		} else this.Uoo();
	}
	boo(e, t, o) {
		e.ClearSplinePoints();
		var i = UE.NewArray(UE.Vector);
		for (let e = 0; e < t.Num() - 1; ++e) {
			var s = t.Get(e),
				n = t.Get(e + 1);
			if ((i.Add(s), Math.abs(n.Z - s.Z) > 2e3)) break;
			e + 1 === t.Num() - 1 && i.Add(n);
		}
		e.SetSplinePoints(i, 1, !0), this.goo.Empty();
		var r = e.GetSplineLength();
		for (let t = 0; t < e.GetNumberOfSplinePoints() - 1; ++t) {
			var a = e.GetDistanceAlongSplineAtSplinePoint(t),
				h = e.GetDistanceAlongSplineAtSplinePoint(t + 1),
				l = (h - a) / o;
			for (let t = a; t <= h && t <= r; t += l) {
				var d = e.GetWorldLocationAtDistanceAlongSpline(t),
					c = (0, puerts_1.$ref)(void 0);
				let o = d;
				UE.NavigationSystemV1.K2_ProjectPointToNavigation(
					GlobalData_1.GlobalData.World,
					d,
					c,
					void 0,
					void 0,
					this.poo.ToUeVector(),
				) && (o = (0, puerts_1.$unref)(c)),
					this.goo.Add(o);
			}
		}
		e.SetSplinePoints(this.goo, 1, !0), this.woo(1);
	}
	woo(e) {
		switch (((this.voo = this.Eoo), (this.yoo = 0), e)) {
			case 1:
				this.Moo = 2;
				break;
			case 2:
				this.Moo = 0;
		}
	}
	Boo(e) {
		return this.Ioo !== e && ((this.Ioo = e), !0);
	}
}
exports.GuideLineAssistant = GuideLineAssistant;
