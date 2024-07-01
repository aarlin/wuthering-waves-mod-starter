"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InfoDisplayAudioPlayer = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	AudioController_1 = require("../../../../Core/Audio/AudioController"),
	AudioDefine_1 = require("../../../../Core/Audio/AudioDefine"),
	AudioModel_1 = require("../../../../Core/Audio/AudioModel"),
	Log_1 = require("../../../../Core/Common/Log"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	InfoDisplayModel_1 = require("../Data/InfoDisplayModel");
class InfoDisplayAudioPlayer extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.Uqe = 0),
			(this.Hni = void 0),
			(this.Yzt = void 0),
			(this.$zt = 1),
			(this.Td = !1),
			(this.Y6 = void 0),
			(this.jni = -0),
			(this.Wni = ""),
			(this.Kni = ""),
			(this.tKe = !1),
			(this.Qni = void 0),
			(this.Xni = () => {
				var i, t;
				this.Td
					? this.tKe
						? this.$ni()
						: this.Yni()
					: ((i = this.Kni),
						(t = AudioController_1.AudioController.GetAudioEvent(i, !1)),
						this.Yzt ||
							(this.Yzt = (0, puerts_1.toManualReleaseDelegate)(this.Jni)),
						t
							? (this.zni(i), (this.Td = !0), (this.tKe = !1))
							: AudioController_1.AudioController.LoadAndAddCallback(i, () => {
									this.Zni();
								}));
			}),
			(this.esi = 0),
			(this.tsi = (i) => {
				(this.esi += i),
					1e3 <= this.esi &&
						(this.Uqe++,
						this.Uqe >= this.jni && (this.Uqe = this.jni),
						(this.esi = 0)),
					this.Y6 &&
						this.Y6.OutputArray &&
						0 < this.Y6.OutputArray.Num() &&
						void 0 !== this.Qni &&
						this.Qni(this.Y6.OutputArray, i),
					this.XMt();
			}),
			(this.Jni = (i, t) => {
				0 === i &&
					this.Td &&
					(Log_1.Log.CheckDebug() && Log_1.Log.Debug("InfoDisplay", 28, "End"),
					AudioController_1.AudioController.StopAudio(this.RootActor),
					(i = this.Kni),
					AudioController_1.AudioController.GetAudioEvent(i, !1) && this.zni(i),
					(this.Uqe = 0));
			});
	}
	Initialize(i) {
		this.CreateThenShowByActor(i);
	}
	SetShowTextComponent(i) {
		this.Hni = i;
	}
	SetSpectrumCallBack(i) {
		this.Qni = i;
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [[0, UE.UIExtendToggle]]),
			(this.BtnBindInfo = [[0, this.Xni]]);
	}
	Zni() {
		"" !== this.Kni && this.Xni();
		var i = this.GetExtendToggle(0);
		this.tKe ? i.SetToggleState(0) : i.SetToggleState(1);
	}
	Yni() {
		this.tKe = !0;
		var i = AudioController_1.AudioController.GetAudioEvent(this.Kni, !1);
		AudioController_1.AudioController.ExecuteActionOnEvent(
			i,
			1,
			this.RootActor,
		);
	}
	$ni() {
		this.tKe = !1;
		var i = AudioController_1.AudioController.GetAudioEvent(this.Kni, !1);
		AudioController_1.AudioController.ExecuteActionOnEvent(
			i,
			2,
			this.RootActor,
		);
	}
	isi() {
		AudioController_1.AudioController.StopAudio(this.RootActor),
			AudioModel_1.AudioModel.DestroySpectrumActor(),
			(this.Y6 = void 0),
			(this.Uqe = 0),
			(this.esi = 0),
			this.XMt(),
			(this.Td = !1);
	}
	zni(i) {
		AudioController_1.AudioController.PlayAudioByEventPath(
			i,
			this.GetRootActor(),
			this.$zt,
			this.Yzt,
		),
			(this.Y6 = AudioModel_1.AudioModel.GetSpectrumActor());
		var t = this.RootActor.GetComponentByClass(UE.AkComponent.StaticClass());
		(this.Y6.Ak = t),
			this.Y6.AkCall(
				this.Y6.Ak,
				AudioController_1.AudioController.GetAudioEvent(i, !1),
			),
			(this.jni = AudioController_1.AudioController.GetAudioEvent(
				i,
				!1,
			).MaximumDuration),
			(this.Wni = InfoDisplayModel_1.InfoDisplayModel.ConvertToHourMinuteString(
				this.jni,
			));
	}
	OnTick(i) {
		this.Td && !this.tKe && this.tsi(i);
	}
	XMt() {
		var i = InfoDisplayModel_1.InfoDisplayModel.ConvertToHourMinuteString(
			this.Uqe,
		);
		this.Hni.SetText(i + "/" + this.Wni);
	}
	Refresh(i) {
		(this.Kni = i),
			this.Zni(),
			AudioController_1.AudioController.SetState(
				AudioDefine_1.STATEGROUP,
				AudioDefine_1.STATEBACKGROUND,
			);
	}
	OnBeforeDestroy() {
		this.isi(),
			this.Yzt &&
				((0, puerts_1.releaseManualReleaseDelegate)(this.Jni),
				(this.Yzt = void 0)),
			AudioController_1.AudioController.SetState(
				AudioDefine_1.STATEGROUP,
				AudioDefine_1.STATENORMAL,
			);
	}
}
exports.InfoDisplayAudioPlayer = InfoDisplayAudioPlayer;
