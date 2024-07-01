"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GrapplingHookPoint = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	Global_1 = require("../../../../Global"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine"),
	UiLayer_1 = require("../../../../Ui/UiLayer"),
	LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
	CombineKeyItem_1 = require("../KeyItem/CombineKeyItem"),
	INTERRUPT_DELAY_TIME = 500,
	START_SEQUENCE_NAME = "Start",
	CLOST_SEQUENCE_NAME = "Close";
class GrapplingHookPoint extends UiPanelBase_1.UiPanelBase {
	constructor(e, t) {
		super(),
			(this.Due = new UE.Vector()),
			(this._Xe = (0, puerts_1.$ref)(void 0)),
			(this.gXe = void 0),
			(this.xat = !1),
			(this.wat = !1),
			(this.Bat = void 0),
			(this.bat = void 0),
			(this.EPe = void 0),
			(this.xet = void 0),
			(this.qat = (e) => {
				this.Gat();
			}),
			(this.Nat = (e) => {
				this.Oat();
			}),
			(this.kat = () => {
				TimerSystem_1.TimerSystem.Has(this.Bat) &&
					TimerSystem_1.TimerSystem.Remove(this.Bat),
					this.bat && this.bat();
			}),
			(this.gXe = Global_1.Global.CharacterController),
			(this.Due.X = e.X),
			(this.Due.Y = e.Y),
			(this.Due.Z = e.Z),
			this.CreateThenShowByResourceIdAsync("UiItem_Gousuo", t, !0);
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UINiagara],
		]),
			ModelManager_1.ModelManager.PlatformModel.IsMobile() ||
				this.ComponentRegisterInfos.push([4, UE.UIItem]);
	}
	async OnBeforeStartAsync() {
		var e;
		ModelManager_1.ModelManager.PlatformModel.IsMobile() ||
			((e = this.GetItem(4)).SetUIActive(!1),
			(this.xet = new CombineKeyItem_1.CombineKeyItem()),
			await this.xet.CreateByActorAsync(e.GetOwner()),
			this.xet.RefreshAction(InputMappingsDefine_1.actionMappings.幻象1));
	}
	OnStart() {
		(this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
			this.Oat(),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.PlotNetworkStart,
				this.qat,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.PlotNetworkEnd,
				this.Nat,
			);
	}
	Oat() {
		this.GetItem(0).SetUIActive(!1),
			this.GetItem(1).SetUIActive(!1),
			this.GetItem(2).SetUIActive(!1),
			this.xet?.GetRootItem().SetUIActive(!0),
			this.Fat("Start"),
			this.Fat("Close"),
			TimerSystem_1.TimerSystem.Has(this.Bat) &&
				TimerSystem_1.TimerSystem.Remove(this.Bat),
			(this.xat = !0),
			(this.wat = !1);
	}
	Gat() {
		this.GetItem(0).SetUIActive(!1),
			this.GetItem(1).SetUIActive(!1),
			this.GetItem(2).SetUIActive(!1),
			this.xet?.GetRootItem().SetUIActive(!1),
			this.Fat("Start"),
			this.Fat("Close"),
			TimerSystem_1.TimerSystem.Has(this.Bat) &&
				TimerSystem_1.TimerSystem.Remove(this.Bat),
			(this.xat = !1),
			(this.wat = !0);
	}
	Interrupt() {
		this.GetItem(0).SetUIActive(!1),
			this.GetItem(1).SetUIActive(!1),
			(this.wat = !0),
			(this.Bat = TimerSystem_1.TimerSystem.Delay(this.kat, 500));
	}
	BindOnInterruptCompleted(e) {
		this.bat = e;
	}
	GetIsActivateHook() {
		return this.xat;
	}
	GetIsInterrupting() {
		return this.wat;
	}
	OnBeforeDestroy() {
		this.EPe && (this.EPe.Clear(), (this.EPe = void 0)),
			(this.wat = !1),
			(this.xat = !1),
			TimerSystem_1.TimerSystem.Has(this.Bat) &&
				TimerSystem_1.TimerSystem.Remove(this.Bat),
			EventSystem_1.EventSystem.Has(
				EventDefine_1.EEventName.PlotNetworkStart,
				this.qat,
			) &&
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.PlotNetworkStart,
					this.qat,
				),
			EventSystem_1.EventSystem.Has(
				EventDefine_1.EEventName.PlotNetworkEnd,
				this.Nat,
			) &&
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.PlotNetworkEnd,
					this.Nat,
				);
	}
	AfterTick() {
		var e;
		this.xat && (e = this.Vat(this.Due)) && this.Ad(e);
	}
	Ad(e) {
		this.RootItem.SetAnchorOffset(e);
	}
	Vat(e) {
		if (UE.GameplayStatics.ProjectWorldToScreen(this.gXe, e, this._Xe))
			return (
				(e = (0, puerts_1.$unref)(this._Xe)),
				UiLayer_1.UiLayer.UiRootItem.GetCanvasScaler().ConvertPositionFromViewportToLGUICanvas(
					e,
				)
			);
	}
	Fat(e) {
		this.EPe.StopSequenceByKey(e);
	}
}
exports.GrapplingHookPoint = GrapplingHookPoint;
