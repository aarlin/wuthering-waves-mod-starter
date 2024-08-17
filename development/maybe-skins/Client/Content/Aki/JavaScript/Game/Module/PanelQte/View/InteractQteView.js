"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InteractQteView = void 0);
const UE = require("ue"),
	AudioDefine_1 = require("../../../../Core/Audio/AudioDefine"),
	AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
	Log_1 = require("../../../../Core/Common/Log"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
	InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
	UiManager_1 = require("../../../Ui/UiManager"),
	CombineKeyItem_1 = require("../../BattleUi/Views/KeyItem/CombineKeyItem"),
	LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
	PanelQteController_1 = require("../PanelQteController"),
	PanelQteView_1 = require("./PanelQteView"),
	STOP_ANIM_TIME = 500;
class InteractQteView extends PanelQteView_1.PanelQteView {
	constructor() {
		super(...arguments),
			(this.xet = void 0),
			(this.xNi = void 0),
			(this.ONi = void 0),
			(this.EPe = void 0),
			(this.NTe = 0),
			(this.kNi = () => {
				this.IsQteEnd ||
					(this.ONi?.SetUIActive(!0),
					this.EPe?.PlayLevelSequenceByName("Start"));
			}),
			(this.WPt = (e) => {
				"Start" !== e ||
					this.IsQteEnd ||
					(this.EPe?.PlayLevelSequenceByName("Loop"),
					0 < this.NTe && this.FNi("Loop", 1 / this.NTe),
					(e = this.OpenParam),
					ModelManager_1.ModelManager.PanelQteModel.ResetLeftTime(e),
					this.IsMobile || (this.GetItem(1)?.SetUIActive(!0), this.xet?.Show()),
					(this.IsQteStart = !0));
			}),
			(this.BNi = (e, t) => {
				!this.IsQteEnd && this.IsQteStart && 0 === t && this.bNi();
			});
	}
	OnRegisterComponent() {
		super.OnRegisterComponent(),
			this.IsMobile
				? (this.ComponentRegisterInfos = [
						[0, UE.UIItem],
						[1, UE.UIButtonComponent],
					])
				: (this.ComponentRegisterInfos = [
						[0, UE.UIItem],
						[1, UE.UIItem],
						[2, UE.UIItem],
					]);
	}
	async OnBeforeStartAsync() {
		var e;
		this.IsMobile ||
			((e = this.GetItem(2)) &&
				((this.xet = new CombineKeyItem_1.CombineKeyItem()),
				await this.xet.CreateByActorAsync(e.GetOwner()),
				this.xet.RefreshAction(InputMappingsDefine_1.actionMappings.QTE交互))),
			(this.IsQteStart = !1);
	}
	OnStart() {
		this.IsMobile
			? ((this.ONi = this.GetItem(0)),
				this.GetButton(1).OnPointDownCallBack.Bind(() => {
					this.qNi();
				}))
			: ((this.ONi = this.GetItem(0)), this.GetItem(1).SetUIActive(!1)),
			(this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.ONi)),
			this.EPe.BindSequenceCloseEvent(this.WPt),
			this.GNi(),
			this.ONi?.SetUIActive(!1),
			this.UiViewSequence.AddSequenceFinishEvent("Start", this.kNi);
	}
	OnBeforeDestroyImplement() {
		this.EPe?.Clear();
	}
	OnBeforeShow() {
		super.OnBeforeShow(),
			ModelManager_1.ModelManager.PanelQteModel.IsInQte ||
				(Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("PanelQte", 18, "界面打开时qte已经结束了"),
				UiManager_1.UiManager.CloseView("InteractQteView"));
	}
	OnBeforeDestroy() {
		super.OnBeforeDestroy(),
			this.IsMobile && this.GetButton(1).OnPointDownCallBack.Unbind(),
			this.NNi();
	}
	RefreshVisible() {}
	NNi() {
		this.xNi &&
			(TimerSystem_1.TimerSystem.Remove(this.xNi), (this.xNi = void 0));
	}
	GNi() {
		var e = this.OpenParam;
		ModelManager_1.ModelManager.PanelQteModel.IsInQte
			? e !==
				(e = ModelManager_1.ModelManager.PanelQteModel.GetContext()).QteHandleId
				? (Log_1.Log.CheckError() &&
						Log_1.Log.Error("PanelQte", 18, "qte handleId 不匹配"),
					UiManager_1.UiManager.CloseView("InteractQteView"))
				: ((this.NTe = e.Config.Duration),
					(this.IsQteStart = !1),
					Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("PanelQte", 18, "触发交互Qte"))
			: (Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("PanelQte", 18, "界面打开时qte已经结束了"),
				UiManager_1.UiManager.CloseView("InteractQteView"));
	}
	OnAddEventListener() {
		super.OnAddEventListener(),
			this.IsMobile ||
				InputDistributeController_1.InputDistributeController.BindAction(
					InputMappingsDefine_1.actionMappings.QTE交互,
					this.BNi,
				);
	}
	OnRemoveEventListener() {
		super.OnRemoveEventListener(),
			this.IsMobile ||
				InputDistributeController_1.InputDistributeController.UnBindAction(
					InputMappingsDefine_1.actionMappings.QTE交互,
					this.BNi,
				);
	}
	qNi() {
		!this.IsQteEnd && this.IsQteStart && this.bNi();
	}
	bNi() {
		var e = this.OpenParam;
		ModelManager_1.ModelManager.PanelQteModel.SetQteResult(e, !0),
			PanelQteController_1.PanelQteController.StopQte(e);
	}
	HandleQteEnd() {
		this.xNi ||
			(AudioSystem_1.AudioSystem.SetState(
				AudioDefine_1.STATEGROUP,
				AudioDefine_1.STATENORMAL,
			),
			this.IsMobile || this.GetItem(1).SetUIActive(!1),
			this.EPe?.StopCurrentSequence(),
			ModelManager_1.ModelManager.PanelQteModel.IsQteSuccess()
				? this.EPe?.PlayLevelSequenceByName("Success")
				: this.EPe?.PlayLevelSequenceByName("Fail"),
			(this.xNi = TimerSystem_1.TimerSystem.Delay(() => {
				(this.xNi = void 0), UiManager_1.UiManager.CloseView("InteractQteView");
			}, 500)));
	}
	FNi(e, t) {
		this.ONi.GetOwner()
			.GetSequencePlayerByKey(e)
			?.SequencePlayer?.SetPlayRate(t);
	}
}
exports.InteractQteView = InteractQteView;
