"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GuideModel = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	ModelBase_1 = require("../../../../Core/Framework/ModelBase"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiLayer_1 = require("../../../Ui/UiLayer"),
	UiManager_1 = require("../../../Ui/UiManager"),
	GuideController_1 = require("../GuideController"),
	GuideGroupInfo_1 = require("./GuideGroupInfo");
class GuideModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.IsGmInvoke = !1),
			(this.BYt = void 0),
			(this.bYt = void 0),
			(this.CurrentGroupMap = void 0),
			(this.qYt = void 0),
			(this.GYt = void 0),
			(this.NYt = void 0),
			(this.OYt = !1),
			(this.kYt = void 0),
			(this.FYt = 0),
			(this.VYt = (e) => {
				for (let e = 0; e < this.qYt.length; e++)
					this.qYt[e].Tick(TimerSystem_1.MIN_TIME) &&
						(this.qYt.splice(e, 1), this.TryPauseTimer(), e--);
			});
	}
	get IsGuideLockingInput() {
		return 0 < this.FYt;
	}
	AddGuideLockInput() {
		this.FYt++ || this.HYt();
	}
	RemoveGuideLockInput() {
		--this.FYt || this.HYt();
	}
	HYt() {
		UiLayer_1.UiLayer.SetShowNormalMaskLayer(this.IsGuideLockingInput, "Guide"),
			ModelManager_1.ModelManager.InputDistributeModel?.RefreshInputDistributeTag();
	}
	OnInit() {
		(this.bYt = new Set()), (this.BYt = new Set());
		for (const e of ConfigManager_1.ConfigManager.GuideConfig.GetAllGroup())
			e.ResetInDungeon && this.BYt.add(e.Id);
		return (
			(this.CurrentGroupMap = new Map()),
			(this.kYt = new Map([
				[4, void 0],
				[1, void 0],
			])),
			(this.FYt = 0),
			!(this.IsGmInvoke = !1)
		);
	}
	CheckGuideInfoExist(e) {
		return this.CurrentGroupMap.has(e);
	}
	static IsLocked() {
		return GuideModel.IsGmLock || GuideModel.IsLock;
	}
	SetLock(e) {
		e !== GuideModel.IsLock &&
			(e && this.ClearAllGroup(), (GuideModel.IsLock = e));
	}
	SetGmLock(e) {
		e !== GuideModel.IsGmLock &&
			(e && this.ClearAllGroup(), (GuideModel.IsGmLock = e));
	}
	AddTutorialInfo(e) {
		this.qYt || (this.qYt = []),
			this.qYt.push(e),
			this.GYt ||
				(this.GYt = TimerSystem_1.TimerSystem.Forever(
					this.VYt,
					TimerSystem_1.MIN_TIME,
				)),
			this.TryShowTutorial();
	}
	TryShowTutorial() {
		var e;
		this.qYt.length <= 0 ||
			((e = this.qYt[this.qYt.length - 1]),
			this.NYt &&
				(2 === this.NYt.TipState ||
					(e.TutorialTip && 1 !== this.NYt.TipState))) ||
			this.jYt(e);
	}
	jYt(e) {
		(this.NYt = e),
			UiManager_1.UiManager.IsViewOpen("GuideTutorialTipsView") &&
				UiManager_1.UiManager.CloseView("GuideTutorialTipsView"),
			this.NYt.TutorialTip
				? (this.WYt(),
					UiManager_1.UiManager.OpenView("GuideTutorialTipsView", this.NYt))
				: (this.TryPauseTimer(), this.TryShowGuideTutorialView());
	}
	TryShowGuideTutorialView() {
		UiManager_1.UiManager.OpenView("GuideTutorialView", this.NYt, (e) => {
			this.OYt = !e && !UiManager_1.UiManager.IsViewOpen("GuideTutorialView");
		});
	}
	ShowFailedOpenTutorialView() {
		this.OYt && this.TryShowGuideTutorialView();
	}
	ClipTipState() {
		for (const e of this.qYt) 0 === e.TipState && (e.TipState = 1);
	}
	RemoveCurrentTutorialInfo() {
		var e = this.qYt.indexOf(this.NYt);
		(this.NYt = void 0),
			0 <= e &&
				(this.qYt[e].StopGuide(), this.qYt.splice(e, 1), this.TryPauseTimer());
	}
	HaveCurrentTutorial() {
		return void 0 !== this.NYt;
	}
	TryPauseTimer() {
		this.GYt &&
			!this.GYt.IsPause() &&
			(0 === this.qYt.length || (this.NYt && 2 === this.NYt.TipState)) &&
			TimerSystem_1.TimerSystem.Pause(this.GYt);
	}
	WYt() {
		this.GYt &&
			this.GYt.IsPause() &&
			this.qYt.length &&
			(!this.NYt || 2 !== this.NYt.TipState) &&
			(TimerSystem_1.TimerSystem.Has(this.GYt)
				? TimerSystem_1.TimerSystem.Resume(this.GYt)
				: (this.GYt = TimerSystem_1.TimerSystem.Forever(
						this.VYt,
						TimerSystem_1.MIN_TIME,
					)));
	}
	BreakTypeViewStep(e) {
		this.kYt.get(e)?.SwitchState(3), this.kYt.set(e, void 0);
	}
	OpenGuideView(e) {
		var t = e.Config.ContentType;
		this.kYt.set(t, e),
			4 === t
				? UiManager_1.UiManager.OpenView("GuideFocusView", e)
				: UiManager_1.UiManager.OpenView("GuideTipsView", e);
	}
	RemoveStepViewSingletonMap(e) {
		var t = e.Config.ContentType;
		this.kYt.get(t) === e && this.kYt.set(t, void 0);
	}
	EnsureCurrentDungeonId() {
		const e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
		for (var [t, i] of this.CurrentGroupMap)
			ConfigManager_1.ConfigManager.GuideConfig.GetGroup(t)?.DungeonId.find(
				(t) => t === e,
			) ||
				(i.Reset(),
				this.CurrentGroupMap.delete(t),
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"Guide",
						17,
						"进入副本时清除不属于当前副本的引导数据",
						["groupId", t],
					));
		for (const t of this.BYt)
			ConfigManager_1.ConfigManager.GuideConfig.GetGroup(t)?.DungeonId.find(
				(t) => t === e,
			) && GuideController_1.GuideController.ResetFinishedGuide(t);
	}
	GmResetAllGuideGroup() {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug(
				"Guide",
				17,
				"通过GM命令清除了本地缓存的所有已完成引导数据, 同时所有执行中引导状态被重置, 重登后恢复",
			),
			this.bYt.clear(),
			this.ClearAllGroup();
	}
	ClearAllGroup() {
		this.CurrentGroupMap.forEach((e) => {
			e.Reset();
		}),
			this.CurrentGroupMap.clear();
	}
	FinishGroup(e) {
		var t = this.CurrentGroupMap.get(e);
		t && (t.Reset(), this.CurrentGroupMap.delete(e)), this.bYt.add(e);
	}
	ResetFinishedGuide(e) {
		this.bYt.delete(e);
	}
	IsGroupFinished(e) {
		return this.bYt?.has(e);
	}
	CanGroupInvoke(e) {
		return !this.IsGroupFinished(e) || this.IsGroupCanRepeat(e);
	}
	IsGroupCanRepeat(e) {
		var t =
			ConfigManager_1.ConfigManager.GuideConfig.GetLimitRepeatStepSetOfGroup(e);
		return (
			0 === t.size ||
			!(
				t.has(-1) ||
				(this.CheckGuideInfoExist(e) &&
					this.CurrentGroupMap.get(e).HasAnyFinishedStep(t))
			)
		);
	}
	TryGetGuideGroup(e) {
		if (this.CheckGuideInfoExist(e)) return this.CurrentGroupMap.get(e);
		if (GuideModel.IsLocked())
			Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("Guide", 17, "引导当前处于屏蔽状态, 无法创建");
		else {
			var t = ConfigManager_1.ConfigManager.GuideConfig.GetGroup(e);
			if (t)
				if (this.CanGroupInvoke(e)) {
					var i,
						r = t.OpenLimitCondition;
					if (
						!r ||
						this.IsGmInvoke ||
						ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(
							r.toString(),
							void 0,
						)
					) {
						const r = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
						if (t.DungeonId.find((e) => e === r))
							return (
								(i = new GuideGroupInfo_1.GuideGroupInfo(e)),
								this.CurrentGroupMap.set(i.Id, i),
								Log_1.Log.CheckDebug() &&
									Log_1.Log.Debug("Guide", 17, "创建引导组数据成功", [
										"组Id",
										e,
									]),
								i
							);
						Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn(
								"Guide",
								17,
								"引导组的副本Id与当前所在副本不匹配",
								["组Id", e],
								["当前所在副本Id", r],
								["配置副本Id", t.DungeonId],
							);
					} else
						Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn(
								"Guide",
								17,
								"引导组的入队条件组不通过",
								["组Id", e],
								["conditionGroupId", r],
							);
				} else
					Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"Guide",
							17,
							"引导组服务端已记录完成且未配置为可重复完成, 不能重复执行",
							["组Id", e],
						);
			else
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("Guide", 17, "引导组的客户端配置不存在, 无法创建", [
						"组Id",
						e,
					]);
		}
	}
	SwitchGroupState(e, t) {
		var i = this.CurrentGroupMap.get(e);
		i
			? i.SwitchState(t)
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("Guide", 17, "引导组数据未创建", ["组Id", e]);
	}
	CheckGroupStatus(e, t, i) {
		if (!this.bYt)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Guide",
						17,
						"无法判定引导组状态, 引导数据尚未初始化",
						["groupId", e],
						["status", t],
						["operator", i],
					),
				!1
			);
		if (!ConfigManager_1.ConfigManager.GuideConfig.GetGroup(e))
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Guide",
						17,
						"不存在ID的引导组数据, 请策划检查配置是否有误！",
						["组Id", e],
					),
				!1
			);
		let r = 0;
		return (
			this.bYt.has(e)
				? (r = 4)
				: (e = this.CurrentGroupMap.get(e)) &&
					(r = e.StateMachine.CurrentState),
			GuideModel.KYt(r, t, i)
		);
	}
	static KYt(e, t, i) {
		return "" === i
			? e === t
			: "!=" === i
				? e !== t
				: ">" === i
					? t < e
					: ">=" === i
						? t <= e
						: "<" === i
							? e < t
							: "<=" === i && e <= t;
	}
	OnClear() {
		return (
			this.bYt.clear(),
			this.CurrentGroupMap.clear(),
			this.BYt.clear(),
			this.qYt && (this.qYt.length = 0),
			this.GYt && TimerSystem_1.TimerSystem.Remove(this.GYt),
			(this.bYt = void 0),
			(this.CurrentGroupMap = void 0),
			(this.BYt = void 0),
			(this.qYt = void 0),
			(this.NYt = void 0),
			(this.GYt = void 0),
			!(this.OYt = !1)
		);
	}
}
((exports.GuideModel = GuideModel).IsLock = !1), (GuideModel.IsGmLock = !1);
