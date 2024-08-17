"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NpcFlowLogic = exports.AudioDelegate = void 0);
const puerts_1 = require("puerts"),
	AudioController_1 = require("../../../../../Core/Audio/AudioController"),
	Log_1 = require("../../../../../Core/Common/Log"),
	ExternalSourceSettingById_1 = require("../../../../../Core/Define/ConfigQuery/ExternalSourceSettingById"),
	InterjectionByTimberIdAndUniversalToneId_1 = require("../../../../../Core/Define/ConfigQuery/InterjectionByTimberIdAndUniversalToneId"),
	PlotAudioById_1 = require("../../../../../Core/Define/ConfigQuery/PlotAudioById"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	IAction_1 = require("../../../../../UniverseEditor/Interface/IAction"),
	TimeUtil_1 = require("../../../../Common/TimeUtil"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	PlotAudioModel_1 = require("../../../../Module/Plot/PlotAudioModel"),
	CharacterFlowLogic_1 = require("../../Common/Component/Flow/CharacterFlowLogic"),
	NpcRedDotFlowLogic_1 = require("./NpcRedDotFlowLogic"),
	DEFAULT_WAIT_TIME = 3,
	LOAD_AUDIO_TIME = 1,
	PLAY_FLAG = 8,
	BREAK_TIME = 1;
class AudioDelegate {
	constructor() {
		(this.AudioDelegate = void 0),
			(this.AudioDelegateEnable = !1),
			(this.Callback = void 0),
			(this.Entity = void 0),
			(this.Config = void 0),
			(this.lzi = (e, t) => {
				this.AudioDelegateEnable
					? 3 === e && this.Callback(t.Duration, this.Entity, this.Config)
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error("Level", 27, "冒泡音频回调没移除成功");
			});
	}
	Init(e, t, o) {
		(this.Callback = e), (this.Entity = t), (this.Config = o);
	}
	Clear() {
		this.Disable(),
			(this.Callback = void 0),
			(this.Entity = void 0),
			(this.Config = void 0);
	}
	Enable() {
		this.AudioDelegateEnable ||
			((this.AudioDelegate = (0, puerts_1.toManualReleaseDelegate)(this.lzi)),
			(this.AudioDelegateEnable = !0));
	}
	Disable() {
		void 0 !== this.AudioDelegate &&
			((0, puerts_1.releaseManualReleaseDelegate)(this.lzi),
			(this.AudioDelegate = void 0)),
			(this.AudioDelegateEnable = !1);
	}
	ManualExec(e) {
		this.Callback(e, this.Entity, this.Config);
	}
}
exports.AudioDelegate = AudioDelegate;
class NpcFlowLogic extends CharacterFlowLogic_1.CharacterFlowLogic {
	constructor() {
		super(...arguments),
			(this.BZo = new AudioController_1.PlayResult()),
			(this.Yzt = new AudioDelegate()),
			(this.bZo = !1),
			(this.qZo = void 0),
			(this.lZt = (e, t, o) => {
				(this.bZo = !1),
					(this.WaitSecondsRemain =
						0 < e ? TimeUtil_1.TimeUtil.SetTimeSecond(e) : 3),
					(e = this.GetFlowText(o.TidTalk)),
					StringUtils_1.StringUtils.IsEmpty(e) ||
						((o =
							o.WaitTime && 0 < o.WaitTime
								? o.WaitTime + 0.05
								: this.WaitSecondsRemain + 0.05),
						t.GetComponent(70).SetDialogueText(e, o));
			});
	}
	get RedDotLogic() {
		return (
			this.qZo || (this.qZo = new NpcRedDotFlowLogic_1.NpcRedDotFlowLogic()),
			this.qZo
		);
	}
	ResetFlowState() {
		super.ResetFlowState(), this.RedDotLogic.ManualControlRedDotActive(!1, !1);
	}
	PlayTalk(e) {
		e < this.CurrentTalkItems.length &&
			this.DynamicFlowData &&
			void 0 !== this.DynamicFlowData.RedDot &&
			this.RedDotLogic.ManualControlRedDotActive(
				!0,
				this.DynamicFlowData.RedDot,
			),
			super.PlayTalk(e);
	}
	HandleTalkAction(e, t) {
		if (!e) return !1;
		if (
			(this.yzi(t?.TalkAkEvent),
			(this.bZo = !1),
			t.Montage &&
				e.GetComponent(167)?.TryPlayMontage(t.Montage.ActionMontage.Path),
			(o = t.PlayVoice
				? PlotAudioById_1.configPlotAudioById.GetConfig(t.TidTalk)
				: void 0))
		)
			this.GZo(o, t, e);
		else {
			if (t.UniversalTone) {
				var o = t.UniversalTone.UniversalToneId,
					i = t.UniversalTone.TimberId ?? e.GetComponent(167)?.GetTimberId();
				if (i && o) {
					var n =
						InterjectionByTimberIdAndUniversalToneId_1.configInterjectionByTimberIdAndUniversalToneId.GetConfig(
							i,
							o,
						);
					if (n) return this.NZo(n, t, e), !0;
				}
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Plot",
						27,
						"通用语气配置无法获取，策划检查配置捏",
						["entity", e.Id],
						["timberId", i],
						["universalToneId", o],
					);
			}
			(n = this.GetFlowText(t.TidTalk)),
				(this.WaitSecondsRemain = this.GetWaitSeconds(t)),
				(i = this.WaitSecondsRemain + 0.05),
				e
					.GetComponent(70)
					.SetDialogueText(n, i, this.RedDotLogic.GetRedDotActive());
		}
		return !0;
	}
	GZo(e, t, o) {
		(this.bZo = !0), (this.WaitSecondsRemain = 1);
		var i =
			ExternalSourceSettingById_1.configExternalSourceSettingById.GetConfig(
				e.ExternalSourceSetting,
			);
		(e = PlotAudioModel_1.PlotAudioModel.GetExternalSourcesMediaName([
			e.IsCheckSex,
			e.FileName,
		])),
			this.Yzt.Init(this.lZt, o, t),
			this.Yzt.Enable(),
			(t = o.GetComponent(3)?.Actor);
		AudioController_1.AudioController.PostEventByExternalSources(
			i.AudioEventPath,
			t,
			e,
			i.ExternalSrcName,
			this.BZo,
			void 0,
			8,
			this.Yzt.AudioDelegate,
		);
	}
	NZo(e, t, o) {
		(this.bZo = !0),
			(this.WaitSecondsRemain = 1),
			this.Yzt.Init(this.lZt, o, t),
			this.Yzt.Enable(),
			(t = o.GetComponent(3)?.Actor),
			AudioController_1.AudioController.PostEvent(
				e.AkEvent,
				t,
				this.BZo,
				8,
				this.Yzt.AudioDelegate,
			);
	}
	yzi(e) {
		var t, o, i;
		e &&
			(e.Type === IAction_1.EPostAkEvent.Global
				? ((t = e.AkEvent),
					AudioController_1.AudioController.PostEvent(t, void 0),
					Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("Event", 27, "[NpcFlowLogic][FlowAudio][Global]", [
							"AkEvent",
							e?.AkEvent,
						]))
				: e.Type === IAction_1.EPostAkEvent.Target &&
					((t = e.AkEvent),
					(o = e.EntityId),
					(i =
						ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(o)) ||
						(Log_1.Log.CheckError() &&
							Log_1.Log.Error("Event", 27, "实体不存在", ["entityId", o])),
					(i = i.Entity.GetComponent(1)?.Owner)?.IsValid()
						? (AudioController_1.AudioController.PostEvent(t, i),
							Log_1.Log.CheckDebug() &&
								Log_1.Log.Debug(
									"Event",
									27,
									"[NpcFlowLogic][FlowAudio][Entity]",
									["EntityID", o],
									["AkEvent", e?.AkEvent],
								))
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error("Event", 27, "未能获取到该实体对应的有效Actor", [
								"entityId",
								o,
							])));
	}
	Tick(e) {
		this.EnableUpdate &&
			((this.WaitSecondsRemain -= e), this.WaitSecondsRemain <= 0) &&
			(this.bZo
				? (Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn("Level", 27, "冒泡音频加载超时"),
					(this.bZo = !1),
					this.ClearAudio(),
					this.Yzt.ManualExec(0))
				: this.IsExecuteFlowEnd
					? this.IsPause
						? (this.EnableUpdate = !1)
						: this.StartFlow()
					: this.PlayTalk(this.CurrentTalkId + 1));
	}
	ClearAudio() {
		(this.bZo = !1),
			this.Yzt && this.Yzt.Disable(),
			this.BZo &&
				AudioController_1.AudioController.StopEvent(
					this.BZo,
					!0,
					1 * TimeUtil_1.TimeUtil.InverseMillisecond,
				);
	}
}
exports.NpcFlowLogic = NpcFlowLogic;
