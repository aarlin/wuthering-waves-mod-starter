"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BehaviorTreeExpressionComponent = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	MapDefine_1 = require("../../../Map/MapDefine"),
	TrackDefine_1 = require("../../../Track/TrackDefine"),
	ReachAreaBehaviorNode_1 = require("../../BehaviorNode/ChildQuestNode/ReachAreaBehaviorNode"),
	GeneralLogicTreeController_1 = require("../../GeneralLogicTreeController"),
	GeneralLogicTreeUtil_1 = require("../../GeneralLogicTreeUtil"),
	CheckPointEffectController_1 = require("./CheckPointEffectController"),
	TrackEffectExpressController_1 = require("./TrackEffectExpressController"),
	TrackMarkExpressController_1 = require("./TrackMarkExpressController"),
	TrackTextExpressController_1 = require("./TrackTextExpressController");
class BehaviorTreeExpressionComponent {
	constructor(e) {
		(this.Yre = void 0),
			(this.yKt = void 0),
			(this.IKt = void 0),
			(this.TKt = void 0),
			(this.LKt = void 0),
			(this.DKt = (e, t, r, n) => {
				6 === e.Type &&
					e.TreeIncId === this.Yre.TreeIncId &&
					(e = this.Yre.GetNode(e.NodeId)) &&
					(this.yKt.UpdateTrackTextData(e, r),
					this.TKt.UpdateTrackMarkExpression(this.Yre, e, r),
					this.IKt.UpdateTrackEffectExpression(e.NodeId, r),
					(e = this.RKt(e, r, n)),
					this.yKt.UpdateTextExpress(e));
			}),
			(this.REe = (e, t, r) => {
				if (6 === e.Type && e.TreeIncId === this.Yre.TreeIncId) {
					var n,
						s,
						i = this.Yre.GetNode(e.NodeId);
					if (i)
						switch (r) {
							case Protocol_1.Aki.Protocol.W2s.Proto_CQNS_Progress:
								i.ContainTag(0) &&
									(n = i.TrackTarget) &&
									((s = this.Yre.IsOccupied),
									i instanceof ReachAreaBehaviorNode_1.ReachAreaBehaviorNode &&
										i.EffectPathKey &&
										this.LKt.OnNodeStart(
											e.NodeId,
											i.EffectPathKey,
											i.GetTargetPosition(),
											s,
										),
									this.TKt.NodeTrackMarkStart(i.NodeId, this.Yre, n, s),
									(s = n.EffectOption)) &&
									this.IKt.NodeTrackEffectStart(
										i.NodeId,
										s,
										this.Yre.IsTracking,
									);
								break;
							case Protocol_1.Aki.Protocol.W2s.Proto_CQNS_Finished:
								this.TKt.NodeTrackMarkEnd(i.NodeId),
									this.IKt.NodeTrackEffectEnd(i.NodeId),
									i instanceof ReachAreaBehaviorNode_1.ReachAreaBehaviorNode &&
										this.LKt.OnNodeEnd(i.NodeId);
						}
				}
			}),
			(this.UKt = (e, t, r) => {
				this.Yre.TreeIncId === e &&
					(this.yKt.OnSuspend(t, r), this.TKt.OnSuspend(r));
			}),
			(this.AKt = (e) => {
				this.Yre.TreeIncId === e &&
					(this.yKt.OnCancelSuspend(), this.TKt.OnCancelSuspend());
			}),
			(this.PKt = () => {
				this.IKt.OnBattleViewActive();
			}),
			(this.xKt = () => {
				this.IKt.OnBattleViewHide();
			}),
			(this.wKt = (e, t) => {
				if (e && 6 === e.Type && t && e.TreeIncId === this.Yre.TreeIncId) {
					let r;
					switch (t.Gms) {
						case "Qfs":
							r = t.Qfs.tvs;
							break;
						case "Hfs":
							r = t.Hfs.Jfs;
							break;
						case "Wfs":
							r = [];
							for (const e of t.Wfs.ovs) r.concat(e.svs);
							break;
						case "Yfs":
							r = t.Yfs.rkn;
					}
					this.TKt.GetNodeTrackMarkCreator(e.NodeId)?.OnNodeProgressChanged(r);
				}
			}),
			(this.BKt = (e) => {
				(e = this.Yre.TreeIncId === e),
					this.yKt.OnBtApplyExpressionOccupation(e),
					this.TKt.OnBtApplyExpressionOccupation(e),
					this.IKt.OnBtApplyExpressionOccupation(e),
					this.LKt.OnBtApplyExpressionOccupation(e);
			}),
			(this.bKt = (e) => {
				(e = this.Yre.TreeIncId === e),
					this.yKt.OnBtReleaseExpressionOccupation(e),
					this.TKt.OnBtReleaseExpressionOccupation(e),
					this.IKt.OnBtReleaseExpressionOccupation(e),
					this.LKt.OnBtReleaseExpressionOccupation(e);
			}),
			(this.Yre = e),
			(this.yKt = new TrackTextExpressController_1.TrackTextExpressController(
				e,
			)),
			(this.TKt = new TrackMarkExpressController_1.TrackMarkExpressController(
				e,
			)),
			(this.IKt =
				new TrackEffectExpressController_1.TrackEffectExpressController(this)),
			(this.LKt =
				new CheckPointEffectController_1.CheckPointEffectController());
	}
	Init() {
		this.tKt();
	}
	Dispose() {
		this.yKt.Clear(), this.TKt.Clear(), this.IKt.Clear(), this.iKt();
	}
	tKt() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnLogicTreeChildQuestNodeStatusChange,
			this.REe,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ActiveBattleView,
				this.PKt,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.DisActiveBattleView,
				this.xKt,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnLogicTreeNodeProgressChange,
				this.wKt,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.GeneralLogicTreeApplyExpressionOccupation,
				this.BKt,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.GeneralLogicTreeReleaseExpressionOccupation,
				this.bKt,
			),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Yre,
				EventDefine_1.EEventName.OnLogicTreeNodeStatusChange,
				this.DKt,
			),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Yre,
				EventDefine_1.EEventName.GeneralLogicTreeSuspend,
				this.UKt,
			),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Yre,
				EventDefine_1.EEventName.GeneralLogicTreeCancelSuspend,
				this.AKt,
			);
	}
	iKt() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnLogicTreeChildQuestNodeStatusChange,
			this.REe,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ActiveBattleView,
				this.PKt,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.DisActiveBattleView,
				this.xKt,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnLogicTreeNodeProgressChange,
				this.wKt,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.GeneralLogicTreeApplyExpressionOccupation,
				this.BKt,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.GeneralLogicTreeReleaseExpressionOccupation,
				this.bKt,
			),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Yre,
				EventDefine_1.EEventName.OnLogicTreeNodeStatusChange,
				this.DKt,
			),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Yre,
				EventDefine_1.EEventName.GeneralLogicTreeSuspend,
				this.UKt,
			),
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.Yre,
				EventDefine_1.EEventName.GeneralLogicTreeCancelSuspend,
				this.AKt,
			);
	}
	EnableTrack(e, t = 0) {
		this.yKt.EnableTrack(e, t),
			this.TKt.EnableTrack(e),
			this.IKt.EnableTrack(e),
			this.LKt.EnableAllEffects(e);
	}
	StartTextExpress(e = 0) {
		this.yKt.StartTextExpress(e);
	}
	EndTextExpress(e = 0) {
		this.yKt.EndTextExpress(e);
	}
	GetNodeTrackPosition(e) {
		return this.TKt.GetNodeTrackMarkCreator(e)?.GetTrackPosition();
	}
	GetDefaultMark(e) {
		return this.TKt.GetNodeTrackMarkCreator(e)?.GetDefaultMark();
	}
	GetTrackDistance(e) {
		var t = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation();
		return t && (e = this.GetNodeTrackPosition(e))
			? Math.round(Vector_1.Vector.Distance(e, t) * MapDefine_1.FLOAT_0_01)
			: TrackDefine_1.INVALID_TRACKDISTANCE;
	}
	GetRangeMarkSize(e) {
		return (e = this.TKt.GetNodeTrackMarkCreator(e)) ? e.MarkRange : 0;
	}
	GetRangeMarkShowDis(e) {
		return this.TKt.GetNodeTrackMarkCreator(e).RangeMarkShowDis;
	}
	GetTrackEffectOption(e) {
		return this.TKt.GetNodeTrackMarkCreator(e).TrackEffectOption;
	}
	RKt(e, t, r) {
		return (
			0 === r &&
			t === Protocol_1.Aki.Protocol.N2s.Lkn &&
			this.Yre.BtType === Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest &&
			!(
				!e.ContainTag(0) ||
				e.ContainTag(3) ||
				((r =
					GeneralLogicTreeController_1.GeneralLogicTreeController.GetNodeTrackText(
						this.Yre.TreeIncId,
						e.NodeId,
					)),
				StringUtils_1.StringUtils.IsEmpty(r)) ||
				(ModelManager_1.ModelManager.GeneralLogicTreeModel.SaveUpdateInfo(
					this.Yre.TreeIncId,
					e.NodeId,
					this.Yre.CreateShowBridge(),
				),
				this.Yre.RemoveTag(8),
				0)
			)
		);
	}
	CheckCanShow() {
		var e;
		let t = 0,
			r = !1;
		for ([, e] of this.Yre.GetAllNodes())
			e.ContainTag(2) && (r = !0), e.ContainTag(0) && (t += 1);
		return 0 !== t || !r;
	}
	CreateMapMarks() {
		this.TKt.CreateMapMarks();
	}
}
exports.BehaviorTreeExpressionComponent = BehaviorTreeExpressionComponent;
