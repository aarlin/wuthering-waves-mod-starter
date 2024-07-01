"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.HandBookQuestPlotTalkAudioUtil = exports.HandBookQuestPlotList =
		void 0);
const UE = require("ue"),
	AudioController_1 = require("../../../Core/Audio/AudioController"),
	Log_1 = require("../../../Core/Common/Log"),
	ExternalSourceSettingById_1 = require("../../../Core/Define/ConfigQuery/ExternalSourceSettingById"),
	MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	PublicUtil_1 = require("../../Common/PublicUtil"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
	PlotAudioModel_1 = require("../Plot/PlotAudioModel"),
	PlotTextLogic_1 = require("../Plot/PlotView/PlotTextLogic"),
	HandBookDefine_1 = require("./HandBookDefine");
class HandBookQuestPlotList extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.NAn = void 0),
			(this.kAn = void 0),
			(this.oPn = void 0),
			(this.cFs = void 0),
			(this.FAn = void 0),
			(this.nPn = void 0),
			(this.OptionData = void 0);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIItem],
		];
	}
	async Init(t) {
		await super.CreateByActorAsync(t.GetOwner(), void 0, !0), await this.Wzt();
	}
	async Wzt() {
		(this.NAn = new HandBookQuestPlotTalkItem()),
			(this.kAn = new HandBookQuestPlotOption()),
			(this.oPn = new HandBookQuestPlotNode()),
			(this.cFs = new HandBookQuestPlotOptionTalker()),
			this.AddChild(this.NAn),
			this.AddChild(this.kAn);
		var t = this.GetItem(0),
			e = (t.SetUIActive(!1), this.GetItem(1)),
			i = (e.SetUIActive(!1), this.GetItem(2)),
			o = (i.SetUIActive(!1), this.GetItem(3));
		o.SetUIActive(!1),
			await Promise.all([
				this.NAn.CreateByActorAsync(t.GetOwner()),
				this.kAn.CreateByActorAsync(e.GetOwner()),
				this.oPn.CreateByActorAsync(i.GetOwner()),
				this.cFs.CreateByActorAsync(o.GetOwner()),
			]),
			this.kAn.BindClickToggleBack(this.FAn);
	}
	GetUsingItem(t) {
		return (
			t.TalkOption
				? this.GetItem(1)
				: t.OptionTalker
					? this.GetItem(3)
					: t.NodeText
						? this.GetItem(2)
						: this.GetItem(0)
		).GetOwner();
	}
	Update(t, e) {
		var i, o;
		(this.OptionData = t),
			this.NAn?.SetUiActive(!1),
			this.kAn?.SetUiActive(!1),
			this.oPn?.SetUiActive(!1),
			this.cFs?.SetUiActive(!1),
			t.NodeText
				? (this.oPn?.SetUiActive(!0), this.oPn?.RefreshByNodeText(t.NodeText))
				: t.TalkOption
					? (this.kAn?.SetUiActive(!0),
						this.kAn.RefreshByOption(
							t.TalkOption,
							t.PlotId,
							t.TalkItemId,
							t.OptionIndex ?? 0,
							t.IsChoseOption ?? !1,
						))
					: t.OptionTalker
						? (this.cFs?.SetUiActive(!0),
							(i = ModelManager_1.ModelManager.FunctionModel?.GetPlayerName()),
							(o =
								MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
									"ColonTag",
								) ?? ""),
							this.cFs?.RefreshByText("" !== i ? i + o + " " : ""))
						: (this.NAn?.SetUiActive(!0),
							this.NAn.Refresh(t.TalkOwnerName, t.TalkText, t.PlotAudio)),
			this.nPn && this.nPn(t.BelongToNode);
	}
	ClearItem() {
		this.Destroy();
	}
	BindClickOptionToggleBack(t) {
		this.FAn = t;
	}
	BindOnRefreshNode(t) {
		this.nPn = t;
	}
	GetOptionToggle() {
		return this.kAn?.Toggle;
	}
}
exports.HandBookQuestPlotList = HandBookQuestPlotList;
class HandBookQuestPlotTalkItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.VAn = !1),
			(this.HAn = void 0),
			(this.jAn = () => {
				this.HAn &&
					(this.VAn
						? HandBookQuestPlotTalkAudioUtil.ClearCurPlayAudio()
						: HandBookQuestPlotTalkAudioUtil.PlayAudio(this.HAn, this.WAn),
					(this.VAn = !this.VAn));
			}),
			(this.WAn = () => {
				this.GetExtendToggle(3)?.SetToggleState(0), (this.VAn = !1);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UIItem],
			[3, UE.UIExtendToggle],
		]),
			(this.BtnBindInfo = [[3, this.jAn]]);
	}
	Refresh(t, e, i) {
		(this.HAn = i),
			this.GetText(0)?.SetText(t ?? ""),
			(i = ModelManager_1.ModelManager.PlotModel.PlotTextReplacer.Replace(e)),
			this.GetText(1)?.SetText(i ?? "");
		const o = !!this.HAn;
		this.GetItem(2)?.SetUIActive(o),
			(t = this.GetExtendToggle(3)),
			t?.CanExecuteChange.Bind(() => o),
			(this.VAn =
				o && HandBookQuestPlotTalkAudioUtil.IsPlayingAudio(this.HAn?.Id)),
			this.VAn && HandBookQuestPlotTalkAudioUtil.ResetPlayEndCallBack(this.WAn),
			t?.SetToggleState(this.VAn ? 1 : 0);
	}
}
class HandBookQuestPlotOption extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.Toggle = void 0),
			(this.yJi = -1),
			(this.QAn = -1),
			(this.XAn = 0),
			(this.$An = void 0),
			(this.I6e = (t) => {
				this.$An &&
					1 === t &&
					this.$An(this.QAn, this.yJi, this.XAn, this.Toggle);
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIExtendToggle],
			[2, UE.UIItem],
			[3, UE.UIItem],
		];
	}
	OnStart() {
		(this.Toggle = this.GetExtendToggle(1)),
			this.Toggle?.OnStateChange.Add(this.I6e);
	}
	RefreshByOption(t, e, i, o, s) {
		(this.QAn = e),
			(this.yJi = i),
			(this.XAn = o),
			(e = PublicUtil_1.PublicUtil.GetFlowConfigLocalText(t.TidTalkOption)),
			(i = ModelManager_1.ModelManager.PlotModel.PlotTextReplacer.Replace(e)),
			this.GetText(0)?.SetText(i),
			this.SetToggleState(s ? 1 : 0),
			this.SelectShow(s);
	}
	SetToggleState(t) {
		this.Toggle?.SetToggleStateForce(t, !1, !1);
	}
	SelectShow(t) {
		t
			? (this.GetText(0)?.SetColor(HandBookDefine_1.selectColor),
				this.GetItem(2)?.SetAlpha(1),
				this.GetItem(3)?.SetAlpha(1))
			: (this.GetText(0)?.SetColor(HandBookDefine_1.noSelectColor),
				this.GetItem(2)?.SetAlpha(0),
				this.GetItem(3)?.SetAlpha(0));
	}
	BindClickToggleBack(t) {
		this.$An = t;
	}
}
class HandBookQuestPlotNode extends UiPanelBase_1.UiPanelBase {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UIText]];
	}
	RefreshByNodeText(t) {
		(t = PublicUtil_1.PublicUtil.GetConfigTextByKey(t)
			.replace("{q_count}", "0")
			.replace("{q_countMax}", "-")),
			this.GetText(0)?.SetText(t);
	}
}
class HandBookQuestPlotOptionTalker extends UiPanelBase_1.UiPanelBase {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UIText]];
	}
	RefreshByText(t) {
		this.GetText(0)?.SetText(t);
	}
}
const BREAK_TIME = 1e3,
	MAX_LOAD_AUDIO_TIME = 3e3;
class HandBookQuestPlotTalkAudioUtil {
	static PlayAudio(t, e) {
		this.Yzt.Init((t) => {
			this._zi(),
				this.YAn && this.JAn(),
				(this.zAn = e),
				(this.YAn = TimerSystem_1.TimerSystem.Delay(() => {
					this.JAn();
				}, t));
		}),
			this.Yzt.Enable();
		var i =
				ExternalSourceSettingById_1.configExternalSourceSettingById.GetConfig(
					t.ExternalSourceSetting,
				),
			o = PlotAudioModel_1.PlotAudioModel.GetExternalSourcesMediaName([
				t.IsCheckSex,
				t.FileName,
			]);
		AudioController_1.AudioController.PostEventByExternalSourcesByUi(
			i.AudioEventPath,
			o,
			i.ExternalSrcName,
			this.czi,
			void 0,
			PlotTextLogic_1.PLAY_FLAG,
			this.Yzt.AudioDelegate,
		),
			(this.sPn = t.Id),
			(this.mzi = TimerSystem_1.TimerSystem.Delay(() => {
				Log_1.Log.CheckWarn() && Log_1.Log.Warn("Plot", 5, "加载剧情音频超时"),
					this.ClearCurPlayAudio();
			}, 3e3));
	}
	static ClearCurPlayAudio() {
		(this.sPn = ""),
			this.Yzt.Disable(),
			AudioController_1.AudioController.StopEvent(this.czi, !0, 1e3),
			this._zi(),
			this.JAn(!1);
	}
	static _zi() {
		TimerSystem_1.TimerSystem.Has(this.mzi) &&
			TimerSystem_1.TimerSystem.Remove(this.mzi),
			(this.mzi = void 0);
	}
	static JAn(t = !0) {
		this.zAn && t && (this.zAn(), (this.zAn = void 0)),
			TimerSystem_1.TimerSystem.Has(this.YAn) &&
				TimerSystem_1.TimerSystem.Remove(this.YAn),
			(this.sPn = ""),
			(this.YAn = void 0);
	}
	static IsPlayingAudio(t) {
		return this.sPn === t;
	}
	static ResetPlayEndCallBack(t) {
		this.zAn = t;
	}
}
((exports.HandBookQuestPlotTalkAudioUtil = HandBookQuestPlotTalkAudioUtil).czi =
	new AudioController_1.PlayResult()),
	(HandBookQuestPlotTalkAudioUtil.Yzt =
		new PlotTextLogic_1.PlotAudioDelegate()),
	(HandBookQuestPlotTalkAudioUtil.mzi = void 0),
	(HandBookQuestPlotTalkAudioUtil.YAn = void 0),
	(HandBookQuestPlotTalkAudioUtil.sPn = ""),
	(HandBookQuestPlotTalkAudioUtil.zAn = void 0);
