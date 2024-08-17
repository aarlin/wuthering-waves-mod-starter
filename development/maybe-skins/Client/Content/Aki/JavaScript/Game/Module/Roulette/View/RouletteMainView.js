"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RouletteMainView = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
	InputManager_1 = require("../../../Ui/Input/InputManager"),
	InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
	InputDistributeDefine_1 = require("../../../Ui/InputDistribute/InputDistributeDefine"),
	InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
	RouletteComponentMain_1 = require("../RouletteComponent/RouletteComponentMain"),
	RouletteInputManager_1 = require("../RouletteInputManager");
class RouletteMainView extends UiTickViewBase_1.UiTickViewBase {
	constructor() {
		super(...arguments),
			(this.oPi = 0),
			(this.M0o = 0),
			(this.v0o = 0),
			(this.gfo = !1),
			(this.E0o = void 0),
			(this.ffo = void 0),
			(this.pfo = void 0),
			(this.vfo = void 0),
			(this.X0o = () => {
				this.CloseMe();
			}),
			(this.Mfo = (e, t) => {
				var o;
				1 === this.oPi &&
					1 === t &&
					this.gfo &&
					(([t, o] = this.S0o.GetCurrentIndexAndAngle()),
					this.Sfo(),
					this.Efo(),
					this.S0o.Refresh(t, o),
					this.yfo());
			}),
			(this.dKe = (e, t, o) => {
				var i = this.B0o();
				this.oPi !== i &&
					(Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Phantom", 38, "检测到轮盘输入变化,关闭自身", [
							"新输入类型",
							i,
						]),
					this.X0o());
			}),
			(this.Ifo = (e) => {
				ModelManager_1.ModelManager.InputDistributeModel.IsTagMatchAnyCurrentInputTag(
					InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot
						.ShortcutKeyTag,
				) || this.X0o();
			});
	}
	get S0o() {
		switch (this.M0o) {
			case 0:
				return (
					this.pfo ||
						((this.pfo =
							new RouletteComponentMain_1.RouletteComponentMainExplore()),
						this.pfo.SetRootActor(this.ffo.GetOwner(), !0)),
					this.pfo
				);
			case 1:
				return (
					this.vfo ||
						((this.vfo =
							new RouletteComponentMain_1.RouletteComponentMainFunction()),
						this.vfo.SetRootActor(this.ffo.GetOwner(), !0)),
					this.vfo
				);
		}
	}
	OnRegisterComponent() {
		switch (
			((this.v0o = ModelManager_1.ModelManager.PlatformModel.OperationType),
			this.v0o)
		) {
			case 2:
				this.ComponentRegisterInfos = [
					[0, UE.UIItem],
					[1, UE.UIItem],
					[2, UE.UIExtendToggle],
					[3, UE.UIExtendToggle],
					[4, UE.UIItem],
				];
				break;
			case 1:
				this.ComponentRegisterInfos = [[0, UE.UIItem]];
		}
	}
	OnStart() {
		(this.oPi = this.B0o()),
			(this.M0o =
				ModelManager_1.ModelManager.RouletteModel.CurrentRouletteType);
		var e = ModelManager_1.ModelManager.RouletteModel.IsExploreRouletteOpen(),
			t = ModelManager_1.ModelManager.RouletteModel.IsFunctionRouletteOpen();
		switch (((this.gfo = e && t), (this.ffo = this.GetItem(0)), this.oPi)) {
			case 1:
				((1 === this.M0o && !t && e) || (0 === this.M0o && t && !e)) &&
					this.Sfo();
				break;
			case 0:
			case 2:
				1 === this.M0o && this.Sfo();
		}
		if (2 === this.v0o) {
			const e = 1 === this.oPi;
			var o = this.gfo;
			this.GetItem(1).SetUIActive(e && o), e && o && this.yfo();
		}
		this.Efo(),
			(this.E0o = new RouletteInputManager_1.rouletteInputManager[this.oPi](
				void 0,
				void 0,
				this.OpenParam,
			)),
			this.E0o.BindEvent(),
			this.E0o.OnInit(),
			(this.E0o.RouletteViewType = 1),
			this.E0o.SetEndInputEvent(this.X0o),
			this.Tfo(),
			this.E0o.ActivateInput(!0);
		const i = 1 === this.oPi;
		InputManager_1.InputManager.SetShowCursor(!i, !1);
	}
	Tfo() {
		ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildrenVisible(
			10,
			[19],
			!1,
		),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnRouletteViewVisibleChanged,
				!0,
			);
	}
	OnBeforeDestroy() {
		(this.ffo = void 0),
			this.S0o && (this.Lfo(!1), this.S0o.Destroy()),
			(this.pfo = void 0),
			(this.vfo = void 0),
			this.E0o && (this.E0o.Destroy(), (this.E0o = void 0));
	}
	OnAfterDestroy() {
		this.Dfo();
	}
	Dfo() {
		ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildrenVisible(
			10,
			[19],
			!0,
		),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnRouletteViewVisibleChanged,
				!1,
			);
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnPlatformChanged,
			this.dKe,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnInputDistributeTagChanged,
				this.Ifo,
			),
			InputDistributeController_1.InputDistributeController.BindAction(
				InputMappingsDefine_1.actionMappings.UI键盘E手柄RB,
				this.Mfo,
			);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnPlatformChanged,
			this.dKe,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnInputDistributeTagChanged,
				this.Ifo,
			),
			InputDistributeController_1.InputDistributeController.UnBindAction(
				InputMappingsDefine_1.actionMappings.UI键盘E手柄RB,
				this.Mfo,
			);
	}
	OnTick(e) {
		var t;
		super.OnTick(e),
			this.IsHideOrHiding ||
				(([e, t] = this.E0o.Tick(e)), this.S0o.Refresh(e, t));
	}
	Lfo(e) {
		this.S0o.EmitCurrentGridSelectOn(e);
	}
	yfo() {
		var e = 0 === this.M0o;
		this.GetExtendToggle(2).SetToggleState(e ? 1 : 0),
			this.GetExtendToggle(3).SetToggleState(e ? 0 : 1);
	}
	Efo() {
		this.tfo(),
			this.ifo(),
			this.ofo(),
			this.S0o.SetAllGridToggleSelfInteractive(!1);
	}
	ofo() {
		this.S0o.RefreshRouletteType();
	}
	ifo() {
		this.S0o.RefreshRoulettePlatformType(this.v0o);
	}
	tfo() {
		this.S0o.RefreshRouletteInputType(this.oPi);
	}
	Sfo() {
		var e,
			t = 0 === this.M0o;
		t &&
			(e = this.S0o.GetCurrentGrid()?.Data) &&
			0 !== e.Id &&
			void 0 !== e.Id &&
			this.Lfo(!0),
			(this.M0o = t ? 1 : 0),
			(ModelManager_1.ModelManager.RouletteModel.CurrentRouletteType =
				this.M0o);
	}
	B0o() {
		let e;
		return (
			ModelManager_1.ModelManager.PlatformModel.IsGamepad()
				? (e = 1)
				: ModelManager_1.ModelManager.PlatformModel.IsPc()
					? (e = 0)
					: ModelManager_1.ModelManager.PlatformModel.IsMobile() && (e = 2),
			e
		);
	}
}
exports.RouletteMainView = RouletteMainView;
