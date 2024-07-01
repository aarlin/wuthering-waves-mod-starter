"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ExecutionPanel = void 0);
const UE = require("ue"),
	CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
	Log_1 = require("../../../../../Core/Common/Log"),
	TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	InputDistributeController_1 = require("../../../../Ui/InputDistribute/InputDistributeController"),
	InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine"),
	ExecutionItem_1 = require("./ExecutionItem"),
	CLOSE_ANIM_TIME = 300,
	childType = 17;
class ExecutionPanel extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.Art = void 0),
			(this.sDe = void 0),
			(this.Jnt = void 0),
			(this.znt = void 0),
			(this.Znt = void 0),
			(this.est = void 0),
			(this.tst = !0),
			(this.ist = () => {
				(this.znt = void 0), this.Znt.SetResult(), (this.Znt = void 0);
			}),
			(this.bMe = (t, e) => {
				1 === e && this.ost();
			}),
			(this.ost = () => {
				var t;
				this.sDe?.Valid
					? (this.Jnt?.OnInputAction(),
						(t = this.sDe.Entity.GetComponent(103))?.IsPawnInteractive() &&
							t.InteractPawn())
					: (this.tXe(), (this.sDe = void 0), this.Hide());
			}),
			(this.rst = () => {
				(this.tst = this.est.GetChildVisible(17)),
					this.tst
						? this.sDe?.Valid && !this.IsShowOrShowing && this.Show()
						: this.IsHideOrHiding || this.Hide();
			}),
			(this.zpe = () => {
				this.nst();
			});
	}
	Init(t) {
		(this.est = ModelManager_1.ModelManager.BattleUiModel.ChildViewData),
			(this.tst = this.est.GetChildVisible(17)),
			this.Initialize(t);
	}
	async Initialize(t) {
		await this.CreateByResourceIdAsync("UiItem_FightSkillDeath", t, !0),
			this.sDe?.Valid && this.tst && this.Show();
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIItem],
		];
	}
	GetExecutionItem() {
		return this.IsShowOrShowing ? this.GetItem(0) : void 0;
	}
	async OnBeforeStartAsync() {
		await this.oZe(), this.Ore();
	}
	async oZe() {
		var t = new ExecutionItem_1.ExecutionItem(),
			e = this.GetItem(0).GetOwner();
		return (
			await t.NewByRootActorAsync(e),
			(this.Jnt = t).Init(this.ost),
			t.RefreshKeyByActionName(InputMappingsDefine_1.actionMappings.通用交互),
			t.RefreshSkillIconByResId("SP_IconPutDeath"),
			!0
		);
	}
	OnStart() {
		this.hnt(1), this.hnt(2);
	}
	OnAfterShow() {
		this.Irt(2), this.Ert(1);
	}
	async OnBeforeHideAsync() {
		this.Irt(1),
			this.Znt &&
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Battle", 18, "重复调用隐藏"),
				this.Znt.SetResult()),
			(this.Znt = new CustomPromise_1.CustomPromise()),
			(this.znt = TimerSystem_1.TimerSystem.Delay(this.ist, 300)),
			this.Ert(2),
			await this.Znt.Promise;
	}
	OnBeforeDestroy() {
		this.znt &&
			(TimerSystem_1.TimerSystem.Remove(this.znt),
			(this.znt = void 0),
			this.Znt.SetResult()),
			this.Jnt?.Destroy(),
			(this.Jnt = void 0),
			this.kre();
	}
	Ore() {
		ModelManager_1.ModelManager.PlatformModel.IsMobile() ||
			InputDistributeController_1.InputDistributeController.BindAction(
				InputMappingsDefine_1.actionMappings.通用交互,
				this.bMe,
			),
			this.est.AddCallback(17, this.rst);
	}
	kre() {
		ModelManager_1.ModelManager.PlatformModel.IsMobile() ||
			InputDistributeController_1.InputDistributeController.UnBindAction(
				InputMappingsDefine_1.actionMappings.通用交互,
				this.bMe,
			),
			this.est.RemoveCallback(17, this.rst);
	}
	hnt(t) {
		var e = [],
			i = this.GetItem(t)
				.GetOwner()
				.K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass()),
			s = i.Num();
		for (let t = 0; t < s; t++) e.push(i.Get(t));
		this.Art || (this.Art = new Map()), this.Art.set(t, e);
	}
	Ert(t) {
		if ((t = this.Art.get(t))) for (const e of t) e.Play();
	}
	Irt(t) {
		if ((t = this.Art.get(t))) for (const e of t) e.Stop();
	}
	ShowByEntity(t) {
		this.sDe?.Id !== t &&
			((t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(t))
				? (this.tXe(), (this.sDe = t), this._o())
				: this.nst());
	}
	HideByEntity(t) {
		this.sDe?.Id === t && this.nst();
	}
	_o() {
		this.eXe(),
			!this.IsShowOrShowing && this.tst && this.Show(),
			ModelManager_1.ModelManager.BattleUiModel.SetExecutionInteractEnable(!0),
			ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildVisible(
				7,
				19,
				!1,
				!0,
			);
	}
	nst() {
		this.tXe(),
			(this.sDe = void 0),
			this.IsHideOrHiding || this.Hide(),
			ModelManager_1.ModelManager.BattleUiModel.SetExecutionInteractEnable(!1),
			ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildVisible(
				7,
				19,
				!0,
				!0,
			);
	}
	eXe() {
		this.sDe &&
			EventSystem_1.EventSystem.AddWithTarget(
				this.sDe,
				EventDefine_1.EEventName.RemoveEntity,
				this.zpe,
			);
	}
	tXe() {
		this.sDe &&
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.sDe,
				EventDefine_1.EEventName.RemoveEntity,
				this.zpe,
			);
	}
}
exports.ExecutionPanel = ExecutionPanel;
