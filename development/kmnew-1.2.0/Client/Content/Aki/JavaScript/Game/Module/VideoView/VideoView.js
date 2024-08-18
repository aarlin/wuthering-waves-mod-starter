"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.VideoView = void 0;
const UE = require("ue"),
    Application_1 = require("../../../Core/Application/Application"),
    AudioController_1 = require("../../../Core/Audio/AudioController"),
    AudioDefine_1 = require("../../../Core/Audio/AudioDefine"),
    CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
    Info_1 = require("../../../Core/Common/Info"),
    LanguageSystem_1 = require("../../../Core/Common/LanguageSystem"),
    Log_1 = require("../../../Core/Common/Log"),
    ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
    TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
    IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
    EventDefine_1 = require("../../Common/Event/EventDefine"),
    EventSystem_1 = require("../../Common/Event/EventSystem"),
    TimeUtil_1 = require("../../Common/TimeUtil"),
    ConfigManager_1 = require("../../Manager/ConfigManager"),
    ControllerHolder_1 = require("../../Manager/ControllerHolder"),
    ModelManager_1 = require("../../Manager/ModelManager"),
    UiTickViewBase_1 = require("../../Ui/Base/UiTickViewBase"),
    UiLayer_1 = require("../../Ui/UiLayer"),
    PlotSkipComponent_1 = require("../Plot/PlotView/PlotSkipComponent"),
    VideoDefine_1 = require("./VideoDefine"),
    ModManager_1 = require("../../Manager/ModManager"),
    VideoLauncher_1 = require("./VideoLauncher"),
    USE_TICK = !0;
class VideoView extends UiTickViewBase_1.UiTickViewBase {
    constructor() {
        super(...arguments), this.xNo = void 0, this.wNo = void 0, this.BNo = void 0, this.bNo = void 0, this.GNo = 0, this.NNo = 0, this.ONo = void 0, this.kNo = void 0, this.deo = void 0, this.MUe = ResourceSystem_1.ResourceSystem.InvalidId, this.RTn = !1, this.FNo = !1, this.VNo = !0, this.Ebn = void 0, this.ybn = !0, this.HNo = () => {
            ControllerHolder_1.ControllerHolder.FlowController.BackgroundFlow("UI点击跳过(VideoView)")
        }, this.Cta = i => {
            this.OpenParam = i, this.OnStart(), this.ybn = !1, this.XNo()
        }, this.jNo = () => {
            Log_1.Log.CheckDebug() && Log_1.Log.Debug("Video", 28, "UE.EApplicationDelegate.ApplicationHasReactivatedDelegate", ["this.VideoPauseTime", this.kNo]), this.VNo = !0, this.kNo && (2 !== Info_1.Info.PlatformType && 8 !== Info_1.Info.PlatformType && this.wNo?.Seek(this.kNo), this.wNo?.Play(), this.kNo = void 0), this.ONo && this.kNo && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Audio", 56, "[VideoView] ResumeVideo 当前只绑定返回应用，全部音频已在CPP的返回应用时处理，跳过此处的音频 Resume"), void 0 !== this.bNo) && TimerSystem_1.TimerSystem.IsPause(this.bNo) && TimerSystem_1.TimerSystem.Resume(this.bNo)
        }, this.WNo = () => {
            this.kNo = this.wNo?.GetTime(), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Video", 28, "UE.EApplicationDelegate.ApplicationWillDeactivateDelegate", ["this.VideoPauseTime", this.kNo]), this.VNo = !1, 2 !== Info_1.Info.PlatformType && 8 !== Info_1.Info.PlatformType && this.wNo?.Pause(), this.ONo && 0 !== VideoLauncher_1.VideoLauncher.AudioEventResult.PlayingIds.length && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Audio", 56, "[VideoView] PauseVideo 当前只绑定切换后台，全部音频已在CPP的切换后台时处理，跳过此处的音频 Pause"), void 0 === this.bNo || TimerSystem_1.TimerSystem.IsPause(this.bNo) || TimerSystem_1.TimerSystem.Pause(this.bNo))
        }, this.Ibn = () => {
            var i = this.OpenParam.RemainViewWhenEnd;
            Log_1.Log.CheckInfo() && Log_1.Log.Info("Video", 39, "开始关闭VideoView", ["bRemain", i]), this.Ebn && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Video", 39, "MediaPlayer还在倒计时检查状态中,提前移除timer"), this.Ebn.Remove(), this.Ebn = void 0, this.nVs()), i?(this.gta(), (0, this.OpenParam?.VideoCloseCb)?.(), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Video", 17, "VideoView callback done")) : (this.ybn || this.CloseMe(), this.ybn = !0)
        }, this.KNo = () => {
            this.FNo = !0, this.Ibn(), Log_1.Log.CheckInfo() && Log_1.Log.Info("Video", 28, "视频播放结束", ["视频名称", this.ONo])
        }, this.QNo = () => {
            Log_1.Log.CheckError() && Log_1.Log.Error("Video", 39, "视频文件打开失败,可能需要修复修复系统文件"), this.Ibn()
        }, this.XNo = () => {
            if (this.ONo) Log_1.Log.CheckError() && Log_1.Log.Error("Video", 39, "必须等上个视频放完才能放下一个"), this.Ibn();
            else {
                const t = this.OpenParam.VideoDataConf;
                if (o && ModManager_1.ModManager.Settings.PlotSkip) {
                    o.CanSkip = 1;
                }
                t?(this.MUe = ResourceSystem_1.ResourceSystem.LoadAsync(t.CgFile, UE.MediaSource, i => {
                    if (i)
                        if (this.MUe = ResourceSystem_1.ResourceSystem.InvalidId, this.wNo.OpenSource(i)) {
                            AudioController_1.AudioController.SetState(AudioDefine_1.PLOT_VIDEO_GROUP, AudioDefine_1.PLOT_VIDEO), this.ONo = t.CgName, this.RTn = !1;
                            i = !ModelManager_1.ModelManager.GameModeModel.PlayTravelMp4 &&
                            // here
                            // (ModelManager_1.ModelManager.PlotModel.IsGmCanSkip || t.CanSkip),
                            (ModManager_1.ModManager.Settings.PlotSkip ||
                                t.CanSkip),
                            i = (ControllerHolder_1.ControllerHolder.FlowController.EnableSkip(i), this.BNo = [...ConfigManager_1.ConfigManager.VideoConfig.GetVideoCaptions(this.ONo, LanguageSystem_1.LanguageSystem.PackageAudio)], this.BNo.sort((i, e) => e.ShowMoment - i.ShowMoment), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Video", 27, "字幕语言", ["", LanguageSystem_1.LanguageSystem.PackageAudio]), this.$No(), ConfigManager_1.ConfigManager.VideoConfig.GetVideoSounds(this.ONo));
                            for (const o of i) {
                                var e = o.EventPath;
                                AudioController_1.AudioController.PostEventByUi(e, VideoLauncher_1.VideoLauncher.AudioEventResult)
                            }
                            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.VideoStart, this.ONo), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Video", 39, "MediaPlayer开始5秒倒计时检查"), this.Ebn = TimerSystem_1.TimerSystem.Delay(() => {
                                this.Ebn = void 0, this.wNo?this.wNo.IsPlaying() || this.wNo.IsPaused()?(Log_1.Log.CheckDebug() && Log_1.Log.Debug("Video", 39, "MediaPlayer状态检查通过"), this.nVs()) : (Log_1.Log.CheckWarn() && Log_1.Log.Warn("Video", 39, "MediaPlayer加载了5秒超时，强制关闭CG界面", ["配置名称", t.CgName], ["视频路径", t.CgFile]), this.Ibn()) : Log_1.Log.CheckDebug() && Log_1.Log.Debug("Video", 39, "MediaPlayer已经没有了")
                            }, 5e3)
                        } else Log_1.Log.CheckError() && Log_1.Log.Error("Video", 39, "打开视频失败", ["配置名称", t.CgName], ["视频路径", t.CgFile]), this.Ibn();
                    else Log_1.Log.CheckError() && Log_1.Log.Error("Video", 39, "mediaSource加载失败", ["配置名称", t.CgName], ["视频路径", t.CgFile]), this.Ibn()
                }), this.MUe < 0 && (Log_1.Log.CheckError() && Log_1.Log.Error("Video", 39, "mediaSource加载失败", ["配置名称", t.CgName], ["视频路径", t.CgFile]), this.Ibn())) : (Log_1.Log.CheckError() && Log_1.Log.Error("Video", 39, "事件被错误触发了", ["名称", EventDefine_1.EEventName.ShowVideo]), this.Ibn())
            }
        }, this.YNo = () => {
            var i, e = this.wNo.GetVideoTrackAspectRatio(0, 0),
                o = UiLayer_1.UiLayer.UiRootItem.GetWidth() / UiLayer_1.UiLayer.UiRootItem.GetHeight();
            e < o?(i = UiLayer_1.UiLayer.UiRootItem.GetWidth() / e, this.xNo.SetHeight(i), this.xNo.SetWidth(UiLayer_1.UiLayer.UiRootItem.GetWidth())) : o < e && (i = UiLayer_1.UiLayer.UiRootItem.GetHeight() * e, this.xNo.SetWidth(i), this.xNo.SetHeight(UiLayer_1.UiLayer.UiRootItem.GetHeight()))
        }
    }
    OnRegisterComponent() {
        this.ComponentRegisterInfos = [
            [0, UE.UIButtonComponent],
            [1, UE.UIButtonComponent],
            [2, UE.UIText],
            [3, UE.UIItem],
            [4, UE.UIButtonComponent]
        ]
    }
    OnStart() {
        if (this.GetButton(1).RootUIComp.SetUIActive(!1), this.deo = new PlotSkipComponent_1.PlotSkipComponent(this.GetButton(1), this.HNo, void 0, this), this.deo.AddEventListener(), this.deo.EnableSkipButton(!1), this.xNo = this.GetButton(0).GetOwner().GetComponentByClass(UE.UITexture.StaticClass()), this.xNo) {
            var e = this.xNo.GetTexture(),
                o = (this.wNo = e?.GetMediaPlayer(), this.wNo || Log_1.Log.CheckError() && Log_1.Log.Error("Video", 39, "获取MediaPlayer异常！！"), this.wNo.OnEndReached.Add(this.KNo), this.wNo.OnMediaOpened.Add(this.YNo), this.wNo.OnMediaOpenFailed.Add(this.QNo), this.GetText(2).SetUIActive(!1), this.OpenParam?.BackgroundColor?.FadeInBackgroundType ?? IAction_1.EMovieBackgroundType.Black);
            let i = void 0;
            i = o === IAction_1.EMovieBackgroundType.White?new UE.LinearColor(1, 1, 1, 1) : (IAction_1.EMovieBackgroundType.Black, new UE.LinearColor(0, 0, 0, 1)), e.ClearColor = i, Log_1.Log.CheckDebug() && Log_1.Log.Debug("Video", 27, "改变CG界面底色", ["color", o])
        } else Log_1.Log.CheckError() && Log_1.Log.Error("Video", 39, "获取CgTexture异常！！")
    }
    async OnPlayingStartSequenceAsync() {
        const i = new CustomPromise_1.CustomPromise;
        Log_1.Log.CheckDebug() && Log_1.Log.Debug("Video", 27, "VideoView界面隐藏"), this.SetUiActive(!1), TimerSystem_1.TimerSystem.Delay(() => {
            Log_1.Log.CheckDebug() && Log_1.Log.Debug("Video", 27, "VideoView界面显示"), this.SetUiActive(!0), i.SetResult()
        }, 100), await i.Promise
    }
    OnAfterShow() {
        Log_1.Log.CheckDebug() && Log_1.Log.Debug("Video", 28, "VideoView OnShow"), this.ybn = !1, this.XNo()
    }
    gta() {
        void 0 !== this.bNo && (TimerSystem_1.TimerSystem.Remove(this.bNo), this.bNo = void 0), this.MUe !== ResourceSystem_1.ResourceSystem.InvalidId && (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.MUe), this.MUe = ResourceSystem_1.ResourceSystem.InvalidId), this.ONo = void 0, this.wNo?.OnEndReached.Remove(this.KNo), this.wNo?.OnMediaOpened.Remove(this.YNo), this.wNo?.OnMediaOpenFailed.Remove(this.QNo), this.wNo?.Close(), this.wNo = void 0, this.BNo = void 0, this.kNo = void 0, AudioController_1.AudioController.StopEvent(VideoLauncher_1.VideoLauncher.AudioEventResult, !this.FNo), AudioController_1.AudioController.SetState(AudioDefine_1.PLOT_VIDEO_GROUP, AudioDefine_1.PLOT_NOT_VIDEO), this.RTn = !1, this.deo?.OnClear(), this.deo?.RemoveEventListener(), this.deo = void 0
    }
    OnBeforeHide() {
        Log_1.Log.CheckDebug() && Log_1.Log.Debug("Video", 17, "VideoView OnBeforeHide"), this.deo.EnableSkipButton(!1)
    }
    OnBeforeDestroy() {
        this.gta(), (0, this.OpenParam?.VideoCloseCb)?.(), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Video", 17, "VideoView callback done")
    }
    OnAddEventListener() {
        Application_1.Application.AddApplicationHandler(1, this.jNo), Application_1.Application.AddApplicationHandler(0, this.WNo), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlayVideo, this.Cta)
    }
    OnRemoveEventListener() {
        Application_1.Application.RemoveApplicationHandler(1, this.jNo), Application_1.Application.RemoveApplicationHandler(0, this.WNo), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlayVideo, this.Cta)
    }
    $No() {
        if (!this.BNo?.length || USE_TICK) this.bNo = void 0;
        else {
            const t = this.BNo.pop();
            var i = (t.ShowMoment - this.GNo - this.NNo) / VideoDefine_1.VideoUtils.FramePerSecond * TimeUtil_1.TimeUtil.InverseMillisecond;
            this.bNo = TimerSystem_1.TimerSystem.Delay(i => {
                var e = ConfigManager_1.ConfigManager.VideoConfig.GetVideoCaptionText(t);
                const o = this.GetText(2);
                o.SetUIActive(!0), o.SetText(e);
                e = t.Duration / VideoDefine_1.VideoUtils.FramePerSecond * TimeUtil_1.TimeUtil.InverseMillisecond;
                this.bNo = TimerSystem_1.TimerSystem.Delay(i => {
                    o.SetUIActive(!1), this.GNo = t.ShowMoment, this.NNo = t.Duration, this.$No()
                }, e)
            }, i)
        }
    }
    JNo(i) {
        if (this.BNo?.length && USE_TICK && this.VNo) {
            var e, o, t = UE.KismetMathLibrary.GetTotalMilliseconds(this.wNo.GetTime());
            let i = void 0;
            for (; 0 < this.BNo.length;) {
                if (!(((i = this.BNo[this.BNo.length - 1]).ShowMoment + i.Duration) * VideoDefine_1.VideoUtils.MillisecondPerFrame < t)) break;
                this.BNo.pop(), this.RTn?(this.RTn = !1, this.GetText(2).SetUIActive(!1), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Video", 27, "CG字幕关闭", ["id", i.CaptionId], ["frame", t * VideoDefine_1.VideoUtils.FramePerMillisecond], ["config frame", i.ShowMoment + i.Duration])) : Log_1.Log.CheckDebug() && Log_1.Log.Debug("Video", 27, "CG字幕废弃", ["id", i.CaptionId]), i = void 0
            }!i || this.RTn || t < i.ShowMoment * VideoDefine_1.VideoUtils.MillisecondPerFrame || (this.RTn = !0, e = this.GetText(2), o = ConfigManager_1.ConfigManager.VideoConfig.GetVideoCaptionText(i), e.SetUIActive(!0), e.SetText(o), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Video", 27, "CG字幕", ["text", o], ["frame", t * VideoDefine_1.VideoUtils.FramePerMillisecond], ["config frame", i.ShowMoment], ["id", i.CaptionId]))
        }
    }
    nVs() {
        var i = this.OpenParam?.BackgroundColor?.FadeOutBackgroundType;
        let e = void 0,
            o = !0;
        switch (i) {
            case IAction_1.EMovieBackgroundType.White:
                e = new UE.LinearColor(1, 1, 1, 1), o = ControllerHolder_1.ControllerHolder.LevelLoadingController.CameraFade.SetColor(IAction_1.EFadeInScreenShowType.White);
                break;
            case IAction_1.EMovieBackgroundType.Black:
                e = new UE.LinearColor(0, 0, 0, 1), o = ControllerHolder_1.ControllerHolder.LevelLoadingController.CameraFade.SetColor(IAction_1.EFadeInScreenShowType.Black);
                break;
            default:
                e = new UE.LinearColor(0, 0, 0, 1)
        }
        o || Log_1.Log.CheckWarn() && Log_1.Log.Warn("Video", 27, "[VideoView] 当前未开启黑幕界面，继承颜色失败"), this.xNo.GetTexture().ClearColor = e, Log_1.Log.CheckDebug() && Log_1.Log.Debug("Video", 27, "改变CG界面底色", ["color", i])
    }
    OnTick(i) {
        this.JNo(i)
    }
}
exports.VideoView = VideoView;
//# sourceMappingURL=VideoView.js.map