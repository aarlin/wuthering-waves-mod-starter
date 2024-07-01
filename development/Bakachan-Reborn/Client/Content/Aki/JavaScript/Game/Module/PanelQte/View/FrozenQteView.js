"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FrozenQteView = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
	InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
	PanelQteController_1 = require("../PanelQteController"),
	PanelQteView_1 = require("./PanelQteView"),
	QteAnimItem_1 = require("./QteAnimItem"),
	QteTipItem_1 = require("./QteTipItem"),
	STOP_ANIM_TIME = 100,
	LOOP_ANIM_TIME = 230;
class FrozenQteView extends PanelQteView_1.PanelQteView {
	constructor() {
		super(...arguments),
			(this.ANi = 0),
			(this.$Qt = 0),
			(this.$G = [!1, !1]),
			(this.PNi = []),
			(this.xNi = void 0),
			(this.wNi = void 0),
			(this.BNi = (e, t) => {
				this.IsQteEnd ||
					(0 < t
						? (this.PNi[0].PressAnim(), this.bNi(1))
						: t < 0 && (this.PNi[0].PressAnim(), this.bNi(0)));
			});
	}
	OnRegisterComponent() {
		super.OnRegisterComponent(),
			this.IsMobile
				? (this.ComponentRegisterInfos = [
						[0, UE.UIButtonComponent],
						[1, UE.UIButtonComponent],
						[2, UE.UIItem],
						[3, UE.UIItem],
					])
				: (this.ComponentRegisterInfos = [
						[0, UE.UIItem],
						[1, UE.UIItem],
						[2, UE.UIItem],
					]);
	}
	OnStart() {
		var e, t;
		super.OnStart(),
			this.IsMobile
				? ((t = this.GetButton(0)),
					(e = this.GetButton(1)),
					t.OnPointDownCallBack.Bind(() => {
						this.qNi(0);
					}),
					e.OnPointDownCallBack.Bind(() => {
						this.qNi(1);
					}),
					(t = new QteAnimItem_1.QteAnimItem()).Init(this.GetItem(2)),
					t.StartAnim(),
					(e = new QteAnimItem_1.QteAnimItem()).Init(this.GetItem(3)),
					e.StartAnim(230),
					this.PNi.push(t, e))
				: ((t = new QteAnimItem_1.QteAnimItem()).Init(this.GetItem(2)),
					t.StartAnim(0),
					this.PNi.push(t),
					this.OnPlatformChangedInner()),
			(this.wNi = new QteTipItem_1.QteTipItem()),
			this.wNi.Init(this.RootItem),
			this.wNi.Refresh("Text_FrozenQteTip_Text"),
			this.GNi();
	}
	OnBeforeShow() {
		super.OnBeforeShow(),
			ModelManager_1.ModelManager.PanelQteModel.IsInQte ||
				(Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("PanelQte", 18, "界面打开时qte已经结束了"),
				this.CloseMe());
	}
	OnBeforeDestroy() {
		var e, t;
		super.OnBeforeDestroy(),
			this.IsMobile &&
				((e = this.GetButton(0)),
				(t = this.GetButton(1)),
				e.OnPointDownCallBack.Unbind(),
				t.OnPointDownCallBack.Unbind());
		for (const e of this.PNi) e.Clear();
		this.NNi(), this.wNi.Destroy(), (this.wNi = void 0);
	}
	NNi() {
		this.xNi &&
			(TimerSystem_1.TimerSystem.Remove(this.xNi), (this.xNi = void 0));
	}
	GNi() {
		this.ANi = 0;
		var e,
			t,
			i = this.OpenParam;
		ModelManager_1.ModelManager.PanelQteModel.IsInQte
			? i !==
				(i = ModelManager_1.ModelManager.PanelQteModel.GetContext()).QteHandleId
				? (Log_1.Log.CheckError() &&
						Log_1.Log.Error("PanelQte", 18, "qte handleId 不匹配"),
					this.CloseMe())
				: ((e = i.Config.MaxSuccessCount),
					(t = i.Config.MinSuccessCount),
					(this.$Qt = Math.floor(
						MathUtils_1.MathUtils.GetRandomFloatNumber(t, e + 1),
					)),
					this.InitCameraShake(i.Config),
					this.InitBuff(i.Config),
					Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("PanelQte", 18, "触发冰冻Qte", [
							"需按次数",
							this.$Qt,
						]))
			: (Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("PanelQte", 18, "界面打开时qte已经结束了"),
				this.CloseMe());
	}
	OnAddEventListener() {
		super.OnAddEventListener(),
			this.IsMobile ||
				InputDistributeController_1.InputDistributeController.BindAxis(
					InputMappingsDefine_1.axisMappings.UiMoveRight,
					this.BNi,
				);
	}
	OnRemoveEventListener() {
		super.OnRemoveEventListener(),
			this.IsMobile ||
				InputDistributeController_1.InputDistributeController.UnBindAxis(
					InputMappingsDefine_1.axisMappings.UiMoveRight,
					this.BNi,
				);
	}
	OnPlatformChangedInner() {
		var e = ModelManager_1.ModelManager.PlatformModel.IsGamepad(),
			t = this.GetItem(0),
			i = this.GetItem(1);
		t.SetUIActive(!e), i.SetUIActive(e);
	}
	qNi(e) {
		this.IsQteEnd || (this.PNi[e].PressAnim(), this.bNi(e));
	}
	bNi(e) {
		(this.$G[e] = !0),
			this.$G[0] &&
				this.$G[1] &&
				((this.$G[0] = !1),
				(this.$G[1] = !1),
				this.ANi++,
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("PanelQte", 18, "冰冻Qte中", ["已按次数", this.ANi]),
				this.ANi === this.$Qt) &&
				((e = this.OpenParam),
				ModelManager_1.ModelManager.PanelQteModel.SetQteResult(e, !0),
				PanelQteController_1.PanelQteController.StopQte(e)),
			this.PlayCameraShake(),
			this.AddBuff();
	}
	HandleQteEnd() {
		if (!this.xNi) {
			for (const e of this.PNi) e.StopAnim();
			this.xNi = TimerSystem_1.TimerSystem.Delay(() => {
				(this.xNi = void 0), this.CloseMe();
			}, 100);
		}
	}
}
exports.FrozenQteView = FrozenQteView;
