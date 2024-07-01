"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DynamicFlowController = exports.CharacterDynamicFlowData = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
	ControllerBase_1 = require("../../../../../../Core/Framework/ControllerBase"),
	Net_1 = require("../../../../../../Core/Net/Net"),
	ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../../Manager/ModelManager"),
	DEFAULT_TYPE_PRIORITY = 1;
class CharacterDynamicFlowData {
	constructor() {
		(this.BubbleData = void 0), (this.Type = void 0), (this.Callback = void 0);
	}
}
exports.CharacterDynamicFlowData = CharacterDynamicFlowData;
class DynamicFlowController extends ControllerBase_1.ControllerBase {
	static OnInit() {
		return (
			this.Q$o(),
			Net_1.Net.Register(24376, DynamicFlowController.X$o),
			Net_1.Net.Register(12700, DynamicFlowController.$$o),
			!0
		);
	}
	static OnClear() {
		return Net_1.Net.UnRegister(24376), Net_1.Net.UnRegister(12700), !0;
	}
	static Q$o() {
		this.Y$o.set(1, 5),
			this.Y$o.set(2, 20),
			this.Y$o.set(3, 20),
			this.Y$o.set(4, 20);
	}
	static CreateCharacterFlowData(t) {
		var e = new CharacterDynamicFlowData();
		return (e.BubbleData = t), (e.Type = 3), e;
	}
	static AddDynamicFlow(t) {
		if (!t?.BubbleData?.EntityIds.length) return !1;
		var e = this.GetDynamicFlowPriority(t.Type);
		for (const a of t.BubbleData.EntityIds)
			if (this.J$o.has(a)) {
				var o = this.GetDynamicFlowByActor(a);
				if (e <= this.GetDynamicFlowPriority(o.Type))
					return (
						Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn(
								"NPC",
								51,
								"添加动态冒泡失败，演员已被占用",
								["PbDataId", a],
								["NewType", t.Type],
								["NewFlowName", t.BubbleData.Flow.FlowListName],
								["OldType", o.Type],
								["OldFlowName", o.BubbleData.Flow.FlowListName],
							),
						!1
					);
			}
		var a = t.BubbleData.EntityIds[0],
			r = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(a);
		r?.Entity?.IsInit && r.Entity?.GetComponent(28)?.PlayDynamicFlowBegin(t),
			this.z$o.set(a, t);
		for (const e of t.BubbleData.EntityIds) this.J$o.set(e, a);
		return (
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"NPC",
					51,
					"添加动态冒泡",
					["PbDataId", a],
					["Type", t.Type],
					["FlowName", t.BubbleData.Flow.FlowListName],
				),
			!0
		);
	}
	static RemoveDynamicFlow(t) {
		if (!(t = this.J$o.get(t))) return !1;
		var e = this.z$o.get(t);
		if (!e) return !1;
		var o = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(t);
		o?.Entity?.IsInit && o.Entity?.GetComponent(28)?.PlayDynamicFlowEnd();
		for (const t of e.BubbleData.EntityIds) this.J$o.delete(t);
		return (
			this.z$o.delete(t),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"NPC",
					51,
					"移除动态冒泡",
					["PbDataId", t],
					["Type", e.Type],
					["FlowName", e.BubbleData.Flow.FlowListName],
				),
			!0
		);
	}
	static GetDynamicFlowByActor(t) {
		if ((t = this.J$o.get(t))) return this.z$o.get(t);
	}
	static GetDynamicFlowByMasterActor(t) {
		if (t) return this.z$o.get(t);
	}
	static GetDynamicFlowPriority(t) {
		return t && this.Y$o.has(t) ? this.Y$o.get(t) : 1;
	}
}
((exports.DynamicFlowController = DynamicFlowController).z$o = new Map()),
	(DynamicFlowController.J$o = new Map()),
	(DynamicFlowController.Y$o = new Map()),
	(DynamicFlowController.X$o = (t) => {
		(t = ConfigManager_1.ConfigManager.BubbleConfig.GetBubbleData(t.rMs)) &&
			t.EntityIds.length &&
			((t = DynamicFlowController.CreateCharacterFlowData(t)),
			DynamicFlowController.AddDynamicFlow(t));
	}),
	(DynamicFlowController.$$o = (t) => {
		(t = ConfigManager_1.ConfigManager.BubbleConfig.GetBubbleData(t.rMs)) &&
			t.EntityIds.length &&
			((t = t.EntityIds[0]), DynamicFlowController.RemoveDynamicFlow(t));
	});
