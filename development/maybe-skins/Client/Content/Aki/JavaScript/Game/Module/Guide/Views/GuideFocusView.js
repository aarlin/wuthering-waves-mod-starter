"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GuideFocusView = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	InputManager_1 = require("../../../Ui/Input/InputManager"),
	UiManager_1 = require("../../../Ui/UiManager"),
	GuideBaseView_1 = require("./GuideBaseView"),
	GuideFocusItem_1 = require("./GuideFocusItem");
class GuideFocusView extends GuideBaseView_1.GuideBaseView {
	constructor() {
		super(...arguments),
			(this.Config = void 0),
			(this.IsAttachItemsReady = !1),
			(this.ozt = !1),
			(this.ReadyToShow = !1),
			(this.rzt = 4e3),
			(this.nzt = void 0),
			(this.szt = void 0),
			(this.azt = () => {
				var e;
				!this.hzt ||
					((e = UiManager_1.UiManager.GetViewByName(
						"BattleView",
					)?.GetGuideUiItemAndUiItemForShowEx(this.Config.ExtraParam)) &&
						e[0] === this.GuideStepInfo?.ViewData?.GetAttachedUiItem()) ||
					this.GuideStepInfo.SwitchState(3);
			}),
			(this.lzt = () => {
				var e = this._zt();
				this.SetActive(e),
					this.IsAttachItemsReady !== e &&
						(this.IsAttachItemsReady = e) &&
						(this.GetRootItem().SetAlpha(0),
						Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug(
								"Guide",
								17,
								"[聚焦引导界面:CheckAttachedItemVisible 附着UI对象可见性检查通过]",
								["引导步骤", this.GuideStepInfo.Id],
							),
						this.uzt());
			}),
			(this.czt = () => {
				this.UiViewSequence.PlaySequence("AutoLoopManual");
			}),
			(this.mzt = (e, t) => {
				(this.RootItem && !this.RootItem.bIsUIActive) ||
					(e &&
						(this.CombineInputMap.set(e, t), !this.IsAllCombineInputPass())) ||
					((t = this.Config.InputEnums),
					this.UnbindInput(this.Config.InputEnums, t),
					Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("Guide", 54, "聚焦监听按键完成引导", [
							"最后按键",
							e,
						]),
					this.DoCloseByFinished());
			});
	}
	OnBeforeGuideBaseViewCreate() {
		(this.Config = this.GuideStepInfo.ViewData.ViewConf),
			this.BindInputAfterSequence();
	}
	OnGuideBaseViewStart() {
		switch (
			(this.GetRootItem().SetAlpha(0),
			(this.rzt = 4e3),
			this.Config.ContentDirection)
		) {
			case "D":
				this.szt = "StartManualUp";
				break;
			case "U":
				this.szt = "StartManualDown";
				break;
			case "L":
				this.szt = "StartManualRight";
				break;
			case "R":
				this.szt = "StartManualLeft";
		}
		this.szt && this.UiViewSequence.AddSequenceFinishEvent(this.szt, this.czt);
	}
	OnGuideBaseViewAddEvent() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnSkillButtonIndexRefresh,
			this.azt,
		);
	}
	OnGuideBaseViewRemoveEvent() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnSkillButtonIndexRefresh,
			this.azt,
		);
	}
	OnGuideViewAfterShow() {
		this.RootItem.SetRaycastTarget(!1),
			this.lzt(),
			this.BindInputAfterSequence(),
			InputManager_1.InputManager.SetShowCursor(this.Config.ShowMouse);
	}
	OnGuideBaseViewAfterHide() {
		EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCursor);
		var e = this.Config.InputEnums;
		this.UnbindInput(this.Config.InputEnums, e),
			EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCursor);
	}
	OnGuideBaseViewDestroy() {
		this.nzt && (this.nzt.Destroy(), (this.nzt = void 0));
	}
	get hzt() {
		return (
			"BattleView" === this.Config?.ViewName &&
			this.Config.ExtraParam &&
			"Skill" === this.Config.ExtraParam[0]
		);
	}
	OnGuideBaseViewTick(e) {
		this.lzt(),
			this.IsShow &&
				this.Config.ShowMouse &&
				InputManager_1.InputManager.SetShowCursor(!0),
			this.nzt?.OnTick(e),
			this.dzt(),
			this.ozt &&
				!this.IsAttachItemsReady &&
				((this.rzt -= e), this.rzt < 0) &&
				(Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"Guide",
						54,
						"[Guide][引导界面打开后5秒后目标没有显示出来,触发保底]",
						["步骤Id", this.GuideStepInfo.Id],
					),
				this.CloseMe());
	}
	OnDurationChange(e) {
		this.nzt?.OnDurationChange(e);
	}
	_zt() {
		var e = this.GuideStepInfo.ViewData.GetAttachedView();
		return e &&
			e.GetRootActor() &&
			e.IsUiActiveInHierarchy() &&
			e.IsShow &&
			!this.HasConflictView()
			? ((this.ozt = !0),
				(e = this.GuideStepInfo.ViewData.GetAttachedUiItemForShow()),
				!(!ObjectUtils_1.ObjectUtils.IsValid(e) || !e.IsUIActiveInHierarchy()))
			: (this.ozt = !1);
	}
	uzt() {
		var e,
			t = this.GuideStepInfo.ViewData.GetAttachedUiItem();
		t?.IsValid() &&
			((e = this.GuideStepInfo.ViewData.GetAttachedUiItemForShow()),
			(this.nzt = this.Czt(t, e)),
			Log_1.Log.CheckDebug()) &&
			Log_1.Log.Debug(
				"Guide",
				17,
				"[聚焦引导界面:InitFocusItem 初始化附着UI对象管理类成功]",
				["引导步骤", this.GuideStepInfo.Id],
				["框住的按钮名称", t.GetDisplayName()],
				["框住的显示节点名称", e.GetDisplayName()],
			);
	}
	dzt() {
		this.GetActive() &&
			this.ReadyToShow &&
			((this.ReadyToShow = !1),
			this.GetRootItem().SetAlpha(1),
			this.szt ? this.UiViewSequence.PlaySequence(this.szt) : this.czt(),
			Log_1.Log.CheckDebug()) &&
			Log_1.Log.Debug("Guide", 17, "[聚焦引导界面:ShowInner 真正显示]", [
				"引导步骤",
				this.GuideStepInfo.Id,
			]);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UIItem]];
	}
	GetGuideStepInfo() {
		return this.GuideStepInfo;
	}
	GetFocusViewConf() {
		return this.Config;
	}
	BindInputAfterSequence() {
		var e = this.Config.InputEnums;
		this.BindInput(this.Config.InputEnums, e, this.mzt);
	}
	OnGuideViewCloseWhenFinish() {
		this.UiViewSequence?.HasSequenceNameInPlaying("Start") &&
			this.UiViewSequence.StopPrevSequence(!1, !0),
			this.nzt?.OnBaseViewCloseWhenFinish();
	}
	Czt(e, t) {
		var i = this.GetItem(0);
		return (
			(e =
				(i.SetActive(!1),
				new GuideFocusItem_1.GuideFocusItem(e, t, this))).Init(i),
			e
		);
	}
}
exports.GuideFocusView = GuideFocusView;
