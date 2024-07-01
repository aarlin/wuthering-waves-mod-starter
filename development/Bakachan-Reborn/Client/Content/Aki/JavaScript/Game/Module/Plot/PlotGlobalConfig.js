"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PlotGlobalConfig = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	CommonDefine_1 = require("../../../Core/Define/CommonDefine"),
	GlobalConfigFromCsvByName_1 = require("../../../Core/Define/ConfigQuery/GlobalConfigFromCsvByName"),
	Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	TimeUtil_1 = require("../../Common/TimeUtil");
class PlotGlobalConfig {
	constructor() {
		(this.EndWaitTimeLevelC = 0),
			(this.EndWaitTimeLevelD = 0),
			(this.EndWaitTimeInteraction = 0),
			(this.EndWaitTimeCenterText = 0),
			(this.TextAnimSpeedSeq = 0),
			(this.TextAnimSpeedLevelC = 0),
			(this.TextAnimSpeedLevelD = 0),
			(this.TextAnimSpeedInteraction = 0),
			(this.TextAnimSpeedCenterText = 0),
			(this.JumpWaitTime = 0),
			(this.GuardTime = 0),
			(this.AudioDelay = 0),
			(this.AudioTransitionDuration = 0),
			(this.CenterTextFontSizeSmall = 0),
			(this.CenterTextFontSizeMiddle = 0),
			(this.CenterTextFontSizeBig = 0),
			(this.TemplateCameraShakePath = ""),
			(this.PlotGoBattleMaterialPath = ""),
			(this.PlotTemplateCameraExitRotation = new Rotator_1.Rotator()),
			(this.PlotTemplateLookAtDelay = [300, 1e3]),
			(this.CallShowAudioEvent = ""),
			(this.CallHideAudioEvent = ""),
			(this.SequenceEndLeastTime = 0),
			(this.DoubleClickInterval = 0),
			(this.TipsDuration = 0),
			(this.SkipPressingTime = 0),
			(this.ClickBufferTime = 0),
			(this.DisableFlow = !1),
			(this.WaitCalmTime = 4e3),
			(this.DragDist = 100),
			(this.SkipTipsOpenTime = 3),
			(this.AudioEndWaitTimePrompt = 0),
			(this.DefaultDurationPrompt = 0),
			(this.gU = !1);
	}
	Init() {
		this.gU ||
			((this.EndWaitTimeLevelC = this.B$i("LevelC.EndWaitTime")),
			(this.EndWaitTimeLevelD = this.B$i("LevelD.EndWaitTime")),
			(this.EndWaitTimeInteraction = this.B$i("Interaction.EndWaitTime")),
			(this.EndWaitTimeCenterText = this.B$i("CenterText.EndWaitTime")),
			(this.TextAnimSpeedSeq =
				this.B$i("Seq.CharPerSec") / TimeUtil_1.TimeUtil.Minute),
			(this.TextAnimSpeedLevelC =
				this.B$i("LevelC.CharPerSec") / TimeUtil_1.TimeUtil.Minute),
			(this.TextAnimSpeedLevelD =
				this.B$i("LevelD.CharPerSec") / TimeUtil_1.TimeUtil.Minute),
			(this.TextAnimSpeedInteraction =
				this.B$i("Interaction.CharPerSec") / TimeUtil_1.TimeUtil.Minute),
			(this.TextAnimSpeedCenterText = this.B$i("CenterText.CharPerSec")),
			(this.JumpWaitTime = this.B$i("Talk.JumpWaitTime")),
			(this.GuardTime = this.B$i("Talk.GuardTime")),
			(this.AudioDelay = this.B$i("Talk.AudioDelay")),
			(this.AudioTransitionDuration = this.B$i("Talk.AudioTransitionDuration")),
			(this.CenterTextFontSizeSmall = this.B$i("CenterText.FontSizeSmall")),
			(this.CenterTextFontSizeMiddle = this.B$i("CenterText.FontSizeMiddle")),
			(this.CenterTextFontSizeBig = this.B$i("CenterText.FontSizeBig")),
			(this.TemplateCameraShakePath =
				this.b$i("PlotTemplate.CameraShake") ?? ""),
			(this.PlotGoBattleMaterialPath =
				this.b$i("Plot.GoBattleMaterialPath") ?? ""),
			this.q$i(),
			this.G$i(),
			(this.CallShowAudioEvent =
				this.b$i("PhoneCall.CallShowAudioEvent") ?? ""),
			(this.CallHideAudioEvent =
				this.b$i("PhoneCall.CallHideAudioEvent") ?? ""),
			(this.SequenceEndLeastTime = this.B$i("Sequence.SequenceEndLeastTime")),
			(this.TipsDuration = this.B$i("Plot.TipsDuration")),
			(this.SkipPressingTime = this.B$i("Plot.SkipPressingTime")),
			(this.DoubleClickInterval = this.B$i("Plot.DoubleClickInterval")),
			(this.ClickBufferTime = this.B$i("Plot.ClickBufferTime")),
			(this.DisableFlow = 1 <= this.B$i("Plot.DisableFlow")),
			(this.WaitCalmTime =
				this.B$i("Plot.WaitCalmTime") * TimeUtil_1.TimeUtil.InverseMillisecond),
			(this.DragDist = this.B$i("Plot.DragDist")),
			(this.AudioEndWaitTimePrompt = this.B$i("Plot.AudioEndWaitTimePrompt")),
			(this.DefaultDurationPrompt = this.B$i("Plot.DefaultDurationPrompt")),
			(this.gU = !0));
	}
	q$i() {
		var i = this.b$i("PlotTemplate.LookAtDelay");
		StringUtils_1.StringUtils.IsEmpty(i) ||
			(2 === (i = i.split(",")).length &&
				(this.PlotTemplateLookAtDelay = [
					parseFloat(i[0]) * CommonDefine_1.MILLIONSECOND_PER_SECOND,
					parseFloat(i[1]) * CommonDefine_1.MILLIONSECOND_PER_SECOND,
				]));
	}
	G$i() {
		var i = this.b$i("PlotTemplate.CameraExitRotation");
		StringUtils_1.StringUtils.IsEmpty(i) ||
			(3 === (i = i.split(",")).length &&
				(this.PlotTemplateCameraExitRotation = Rotator_1.Rotator.Create(
					parseFloat(i[0]),
					parseFloat(i[1]),
					parseFloat(i[2]),
				)));
	}
	b$i(i) {
		var t =
			GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig(i);
		if (t) return t.Value;
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("Plot", 18, "已经使用的全局配置字段不能乱删！！！", [
				"被删掉的全局配置字段",
				i,
			]);
	}
	B$i(i) {
		return (i = this.b$i(i)) ? parseFloat(i) : 0;
	}
}
exports.PlotGlobalConfig = PlotGlobalConfig;
