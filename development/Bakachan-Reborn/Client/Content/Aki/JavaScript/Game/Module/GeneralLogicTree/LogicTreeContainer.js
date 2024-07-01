"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LogicTreeContainer = void 0);
const EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem");
class LogicTreeContainer {
	constructor() {
		(this.BehaviorTree = void 0), (this.v$t = !1);
	}
	get Tree() {
		if (this.BehaviorTree) return this.BehaviorTree;
	}
	get TreeId() {
		return this.Tree?.TreeIncId;
	}
	get TreeConfigId() {
		return this.Tree?.TreeConfigId;
	}
	Destroy() {
		this.RemoveBehaviorTree();
	}
	get IsBelongPlayer() {
		return this.v$t;
	}
	SetUpBehaviorTree(e) {
		(this.BehaviorTree = e) && (this.v$t = !0);
	}
	RemoveBehaviorTree() {
		this.BehaviorTree &&
			(EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.GeneralLogicTreeRemove,
				this.TreeId,
				this.TreeConfigId,
			),
			(this.BehaviorTree = void 0));
	}
	GetNode(e) {
		return this.Tree?.GetNode(e);
	}
	GetCurrentActiveChildQuestNode() {
		return this.Tree?.GetCurrentActiveChildQuestNode();
	}
	GetActiveChildQuestNodesId() {
		return this.Tree?.GetActiveChildQuestNodesId();
	}
	GetCurrentCorrelativeEntities() {
		return this.Tree?.GetCurrentCorrelativeEntities();
	}
	SetTrack(e, t = 0) {
		this.Tree?.SetTrack(e, t);
	}
	GetNodeTrackPosition(e) {
		return this.Tree?.GetNodeTrackPosition(e);
	}
	GetTrackDistance(e) {
		return this.Tree?.GetTrackDistance(e);
	}
	GetDefaultMark(e) {
		return this.Tree?.GetDefaultMark(e);
	}
	GetGuideLineHideDistance(e) {
		return this.Tree?.GetGuideLineHideDistance(e);
	}
	IsInTrackRange() {
		return this.Tree.IsInTrackRange();
	}
	IsRangeTrack(e) {
		return this.Tree.IsRangeTrack(e);
	}
	CreateMapMarks() {
		this.Tree.CreateMapMarks();
	}
	GetUiPriority() {
		return 0;
	}
	CanShowInUiPanel() {
		return this.Tree?.CheckCanShow() ?? !1;
	}
	StartTextExpress(e = 0) {
		this.Tree?.StartTextExpress(e);
	}
	EndTextExpress(e = 0) {
		this.Tree?.EndTextExpress(e);
	}
	GetSilentAreaShowInfo() {
		return this.Tree?.GetSilentAreaShowInfo();
	}
	IsSuspend() {
		return this.Tree?.IsSuspend();
	}
	GetSuspendType() {
		return this.Tree?.GetSuspendType() ?? 0;
	}
	GetSuspendText() {
		return this.Tree?.GetSuspendText();
	}
	GetOccupations() {
		return this.Tree?.GetOccupations();
	}
	HasRefOccupiedEntity() {
		return this.Tree?.HasRefOccupiedEntity() ?? !1;
	}
	GetRefOccupiedEntityText() {
		return this.Tree?.GetRefOccupiedEntityText();
	}
	HasBehaviorTree() {
		return void 0 !== this.BehaviorTree;
	}
}
exports.LogicTreeContainer = LogicTreeContainer;
