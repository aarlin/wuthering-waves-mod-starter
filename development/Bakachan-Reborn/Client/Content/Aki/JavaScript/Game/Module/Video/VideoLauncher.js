"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.VideoLauncher = void 0);
const AudioController_1 = require("../../../Core/Audio/AudioController"),
	Log_1 = require("../../../Core/Common/Log"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	UiManager_1 = require("../../Ui/UiManager");
class VideoLauncher {
	static ShowVideoCg(e, o, i, n) {
		e ? VideoLauncher.ShowVideoCgAsync(e, o, i, n) : o();
	}
	static async ShowVideoCgAsync(e, o, i, n) {
		this.BGo = o;
		var a = ConfigManager_1.ConfigManager.VideoConfig.GetVideoData(e);
		a
			? ((this.pDe = {
					VideoDataConf: a,
					VideoCloseCb: this.Neo,
					BackgroundColor: i,
					RemainViewWhenEnd: n,
				}),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Video", 39, "打开视频播放界面", ["视频配置", e]),
				UiManager_1.UiManager.IsViewShow("VideoView")
					? EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.PlayVideo,
							this.pDe,
						)
					: await UiManager_1.UiManager.OpenViewAsync("VideoView", this.pDe))
			: o?.();
	}
	static CloseVideoCg(e) {
		(this.BGo = void 0), UiManager_1.UiManager.CloseView("VideoView", e);
	}
}
(exports.VideoLauncher = VideoLauncher),
	((_a = VideoLauncher).BGo = void 0),
	(VideoLauncher.pDe = void 0),
	(VideoLauncher.Neo = () => {
		var e;
		_a.BGo && ((e = _a.BGo), (_a.BGo = void 0), e());
	}),
	(VideoLauncher.AudioEventResult = new AudioController_1.PlayResult());
