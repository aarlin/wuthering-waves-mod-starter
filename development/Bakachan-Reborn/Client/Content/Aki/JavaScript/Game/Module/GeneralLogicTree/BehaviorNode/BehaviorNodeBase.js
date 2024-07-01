"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BehaviorNodeBase = void 0);
const Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	LevelGeneralContextDefine_1 = require("../../../LevelGamePlay/LevelGeneralContextDefine"),
	BehaviorTreeTagComponent_1 = require("../BaseBehaviorTree/BehaviorTreeTagComponent");
class BehaviorNodeBase extends BehaviorTreeTagComponent_1.BehaviorTreeTagContainer {
	constructor(e) {
		super(),
			(this.BtType = void 0),
			(this.Context = void 0),
			(this.InnerTreeIncId = void 0),
			(this.InnerTreeConfigId = 0),
			(this.InnerNodeId = 0),
			(this.InnerStatus = void 0),
			(this.NodeType = void 0),
			(this.Blackboard = void 0),
			(this.TrackTarget = void 0),
			(this.TrackTextConfig = ""),
			(this.TrackTextRuleInner = 0),
			(this.CreateContext = (e, t) =>
				LevelGeneralContextDefine_1.GeneralLogicTreeContext.Create(
					this.BtType,
					this.TreeIncId,
					this.TreeConfigId,
					t,
					e,
				)),
			(this.InnerNodeId = e);
	}
	get TrackTextRule() {
		return this.TrackTextRuleInner;
	}
	get TreeIncId() {
		return this.InnerTreeIncId;
	}
	get TreeConfigId() {
		return this.InnerTreeConfigId;
	}
	get NodeId() {
		return this.InnerNodeId;
	}
	get Status() {
		return this.InnerStatus;
	}
	get IsProcessing() {
		return (
			this.Status === Protocol_1.Aki.Protocol.N2s.Lkn ||
			this.Status === Protocol_1.Aki.Protocol.N2s.Proto_Completing
		);
	}
	get IsSuccess() {
		return this.Status === Protocol_1.Aki.Protocol.N2s.Proto_CompletedSuccess;
	}
	get IsFailure() {
		return (
			this.Status === Protocol_1.Aki.Protocol.N2s.Proto_CompletedFailed ||
			this.Status === Protocol_1.Aki.Protocol.N2s.Proto_Destroy
		);
	}
	Init(e, t, o, r, s) {
		(this.Blackboard = e),
			(this.InnerTreeIncId = e.TreeIncId),
			(this.InnerTreeConfigId = e.TreeConfigId),
			(this.InnerStatus = Protocol_1.Aki.Protocol.N2s.Proto_NotActive),
			(this.BtType = s),
			(this.Context = this.CreateContext(void 0, this.InnerNodeId)),
			this.OnCreate(r) && this.UpdateStatus(t, o.n3n);
	}
	Destroy() {
		this.OnDestroy(),
			this.Context?.Release(),
			(this.Context = void 0),
			(this.Blackboard = void 0);
	}
	UpdateStatus(e, t) {
		var o = this.InnerStatus;
		if (((this.InnerStatus = t), o !== this.InnerStatus)) {
			switch (this.InnerStatus) {
				case Protocol_1.Aki.Protocol.N2s.Lkn:
					this.OnNodeActive();
					break;
				case Protocol_1.Aki.Protocol.N2s.Proto_CompletedSuccess:
					this.OnNodeDeActive(!0);
					break;
				case Protocol_1.Aki.Protocol.N2s.Proto_CompletedFailed:
				case Protocol_1.Aki.Protocol.N2s.Proto_Destroy:
					this.OnNodeDeActive(!1);
			}
			switch (e) {
				case 0:
				case 1:
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnLogicTreeNodeStatusChange,
						this.Context,
						o,
						this.InnerStatus,
						e,
					),
						EventSystem_1.EventSystem.EmitWithTarget(
							this.Blackboard,
							EventDefine_1.EEventName.OnLogicTreeNodeStatusChange,
							this.Context,
							o,
							this.InnerStatus,
							e,
						);
			}
		}
	}
	UpdateProgress(e) {
		e &&
			this.OnUpdateProgress(e) &&
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnLogicTreeNodeProgressChange,
				this.Context,
				e,
			);
	}
	OnUpdateProgress(e) {
		return !1;
	}
	GetProgress() {
		return "";
	}
	GetProgressMax() {
		return "";
	}
	GetCustomTrackText(e) {}
	OnCreate(e) {
		return !0;
	}
	OnNodeActive() {}
	OnNodeDeActive(e) {}
	OnDestroy() {
		this.IsProcessing &&
			this.UpdateStatus(2, Protocol_1.Aki.Protocol.N2s.Proto_Destroy);
	}
}
exports.BehaviorNodeBase = BehaviorNodeBase;
