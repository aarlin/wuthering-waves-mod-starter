"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FlowContext = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	Pool_1 = require("../../../../Core/Container/Pool"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	CAPACITY = 20;
class FlowContext {
	constructor() {
		(this.IsServerNotify = !1),
			(this.FlowListName = ""),
			(this.FlowId = 0),
			(this.FlowStateId = 0),
			(this.Context = void 0),
			(this.CurActionId = 0),
			(this.IsWaitRenderData = !0),
			(this.CurSubActionId = 0),
			(this.CurShowTalk = void 0),
			(this.CurShowTalkActionId = 0),
			(this.CurTalkId = -1),
			(this.CurOptionId = -1),
			(this.IsBackground = !1),
			(this.IsFadeSkip = !1),
			(this.IsBreakdown = !1),
			(this.IsServerEnd = !1),
			(this.IsAsync = !1),
			(this.FlowIncId = 0),
			(this.HasAdjustCamera = !1),
			(this.CanSkip = !1),
			(this.OptionsHistory = new Map()),
			(this.OptionsCollection = []),
			(this.UiParam = void 0),
			(this.FormatIdInner = void 0),
			(this.Pos = void 0);
	}
	Init(t, i, o, s, r, h, e, n, I = !1, d = void 0, l) {
		this.ht(),
			(this.IsServerNotify = t),
			(this.FlowIncId = o),
			(this.FlowListName = i),
			(this.FlowId = s),
			(this.IsBackground = h),
			(this.IsBreakdown = e),
			(this.Context = n),
			(this.IsAsync = I),
			(this.UiParam = d),
			(this.FlowStateId = r),
			(this.Pos = l);
	}
	ht() {
		(this.FlowIncId = -1),
			(this.Context = void 0),
			(this.CurActionId = 0),
			(this.CurSubActionId = 0),
			(this.IsAsync = !1),
			(this.CurShowTalk = void 0),
			(this.CurTalkId = -1),
			(this.CurOptionId = -1),
			(this.IsBackground = !1),
			(this.IsBreakdown = !1),
			(this.IsServerEnd = !1),
			(this.HasAdjustCamera = !1),
			this.OptionsHistory.clear(),
			(this.OptionsCollection.length = 0),
			(this.UiParam = void 0),
			(this.FlowListName = ""),
			(this.FlowId = 0),
			(this.FlowStateId = 0),
			(this.FormatIdInner = void 0),
			(this.CanSkip = !1),
			(this.CurShowTalkActionId = 0),
			(this.IsFadeSkip = !1),
			(this.Pos = void 0);
	}
	static Create() {
		let t = FlowContext.Pool.Get();
		return t || FlowContext.Pool.Create();
	}
	Recycle() {
		this.ht(), FlowContext.Pool.Put(this);
	}
	get FormatId() {
		return (
			this.FormatIdInner ||
				(this.FormatIdInner = StringUtils_1.StringUtils.Format(
					"{0},{1},{2}",
					this.FlowListName,
					this.FlowId.toString(),
					this.FlowStateId.toString(),
				)),
			this.FormatIdInner
		);
	}
	LogError(t, ...i) {
		Log_1.Log.CheckError() &&
			Log_1.Log.Error(
				"Plot",
				27,
				StringUtils_1.StringUtils.Format("[Flow] {0}", t),
				...i,
				["IncId", this.FlowIncId],
				["Id", this.FormatId],
				["ActionId", this.CurActionId],
				["SubActionId", this.CurSubActionId],
				["TalkId", this.CurTalkId],
			);
	}
}
(exports.FlowContext = FlowContext).Pool = new Pool_1.Pool(
	20,
	() => new FlowContext(),
);
