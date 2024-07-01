"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PlotFlow =
		exports.PlotCenterText =
		exports.PlotFlowStateItem =
		exports.PlotResultInfo =
		exports.PlotStateInfo =
		exports.PlotInfo =
			void 0);
const Pool_1 = require("../../../Core/Container/Pool"),
	SpeakerById_1 = require("../../../Core/Define/ConfigQuery/SpeakerById"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	CAPACITY = 20;
class PlotInfo {
	constructor() {
		(this.FlowListName = ""),
			(this.FlowId = 0),
			(this.StateId = 0),
			(this.StateActions = void 0),
			(this.KeepMusic = !1),
			(this.Context = void 0),
			(this.IsServerNotify = !1),
			(this.FlowIncId = void 0),
			(this.IsBackground = !1),
			(this.IsBreakdown = !1),
			(this.IsServerEnd = !1),
			(this.IsAsync = !1),
			(this.PlotLevel = "LevelC"),
			(this.IsWaitAnim = !1),
			(this.UiParam = void 0),
			(this.CanBeAbandoned = !1),
			(this.FadeBegin = void 0),
			(this.Pos = void 0);
	}
	Init(t, e, o, i, s, l, a, n, r, d = {}, h = !1, I = !1, c) {
		(this.FlowListName = o),
			(this.FlowId = i),
			(this.StateId = s),
			(this.StateActions = l),
			(this.KeepMusic = a),
			(this.IsServerNotify = t),
			(this.Context = n),
			(this.FlowIncId = e),
			(this.IsBackground = I),
			(this.IsBreakdown = !1),
			(this.IsAsync = r),
			(this.UiParam = d),
			(this.CanBeAbandoned = h),
			(this.Pos = c),
			PlotInfo.AnalyzeLevel(this, l);
	}
	static AnalyzeLevel(t, e) {
		let o,
			i = "LevelC",
			s = !1,
			l = !1;
		var a;
		!(o =
			0 < e.length &&
			"SetPlotMode" === (a = e[0]).Name &&
			((a = a.Params),
			(i = a.Mode),
			(s = a.WaitForPlayerMotionEnd ?? !1),
			(l = a.NoUiEnterAnimation ?? !1),
			a.FastFadeIn)
				? a.FastFadeIn.ScreenType ?? IAction_1.EFadeInScreenShowType.Black
				: o) &&
			1 < e.length &&
			"FadeInScreen" === (a = e[1]).Name &&
			(o = (a = a.Params).ScreenType ?? IAction_1.EFadeInScreenShowType.Black),
			(t.PlotLevel = i),
			(t.IsWaitAnim = s),
			(t.UiParam.DisableAnim = l),
			(t.FadeBegin = o),
			("LevelD" !== i && "Prompt" !== i) ||
				t.UiParam.ViewName ||
				(t.UiParam.ViewName = "BattleView"),
			"Prompt" === i && this.xPn(e, t);
	}
	static xPn(t, e) {
		var o,
			i,
			s = new Map();
		for (const l of t)
			if ("ShowTalk" === l.Name)
				for (const t of l.Params.TalkItems)
					t.WhoId &&
						((o = SpeakerById_1.configSpeakerById.GetConfig(t.WhoId)),
						StringUtils_1.StringUtils.IsEmpty(o?.HeadRoundIconAsset)
							? ((i = StringUtils_1.StringUtils.Format(
									"{0},{1},{2}",
									e.FlowListName,
									e.FlowId.toString(),
									e.StateId.toString(),
								)),
								ControllerHolder_1.ControllerHolder.FlowController.LogError(
									"[PlotTips]  没有头像路径，检查对话人配置",
									["id", t.WhoId],
									["flow", i],
								))
							: s.set(o.Id, o.HeadRoundIconAsset));
		e.UiParam.TipsTalkTexturePaths = s;
	}
	Clear() {
		(this.FlowListName = void 0),
			(this.StateId = void 0),
			(this.StateActions = void 0),
			(this.KeepMusic = !1),
			(this.FlowId = void 0),
			(this.Context = void 0),
			(this.IsServerNotify = void 0),
			(this.FlowIncId = void 0),
			(this.IsBackground = !1),
			(this.IsBreakdown = !1),
			(this.IsServerEnd = !1),
			(this.IsAsync = !1),
			(this.UiParam = void 0),
			(this.CanBeAbandoned = !1),
			(this.FadeBegin = void 0),
			(this.Pos = void 0);
	}
	static Create() {
		let t = PlotInfo.RUe.Get();
		return t || PlotInfo.RUe.Create();
	}
	Recycle() {
		this.Clear(), PlotInfo.RUe.Put(this);
	}
}
(exports.PlotInfo = PlotInfo).RUe = new Pool_1.Pool(20, () => new PlotInfo());
class PlotStateInfo {
	constructor() {
		this.StateMap = new Map();
	}
	Reset() {
		this.StateMap.clear();
	}
}
exports.PlotStateInfo = PlotStateInfo;
class PlotResultInfo {
	constructor() {
		(this.FlowListName = ""),
			(this.FlowId = 0),
			(this.FinalStateId = 0),
			(this.StateId = 0),
			(this.FlowIncId = 0),
			(this.ResultCode = 0);
	}
	Reset() {
		this.ResultCode = 0;
	}
	ChangeSelfState(t) {
		this.FinalStateId = t;
	}
}
exports.PlotResultInfo = PlotResultInfo;
class PlotFlowStateItem {
	constructor(t, e, o, i) {
		(this.PbDataId = t),
			(this.FlowListName = e),
			(this.FlowId = o),
			(this.StateId = i);
	}
}
exports.PlotFlowStateItem = PlotFlowStateItem;
class PlotCenterText {
	constructor() {
		(this.Text = ""),
			(this.AudioId = ""),
			(this.AutoClose = !1),
			(this.UniversalTone = void 0),
			(this.TalkAkEvent = void 0),
			(this.Config = void 0),
			(this.Callback = void 0);
	}
	Clear() {
		(this.Text = void 0),
			(this.AudioId = ""),
			(this.AutoClose = !1),
			(this.UniversalTone = void 0),
			(this.TalkAkEvent = void 0),
			(this.Config = void 0),
			(this.Callback = void 0);
	}
}
exports.PlotCenterText = PlotCenterText;
class PlotFlow {
	constructor(t, e, o) {
		(this.FlowListName = void 0),
			(this.FlowId = void 0),
			(this.StateId = void 0),
			(this.FlowListName = t),
			(this.FlowId = e),
			(this.StateId = o);
	}
}
exports.PlotFlow = PlotFlow;
