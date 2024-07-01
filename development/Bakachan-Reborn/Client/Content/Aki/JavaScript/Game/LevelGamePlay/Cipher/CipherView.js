"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CipherView = void 0);
const UE = require("ue"),
	AudioSystem_1 = require("../../../Core/Audio/AudioSystem"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	GenericLayoutNew_1 = require("../../Module/Util/Layout/GenericLayoutNew"),
	UiTickViewBase_1 = require("../../Ui/Base/UiTickViewBase"),
	UiLayer_1 = require("../../Ui/UiLayer"),
	UiManager_1 = require("../../Ui/UiManager"),
	CipherController_1 = require("./CipherController"),
	CipherKey_1 = require("./CipherKey"),
	WRONG_COLOR = -1,
	RIGHT_COLOR = 1,
	NORMAL_COLOR = 0,
	WPO = "WPO",
	COLOR = "TargetTime",
	FLAG = "Flag",
	LEN = 4;
class CipherView extends UiTickViewBase_1.UiTickViewBase {
	constructor() {
		super(...arguments),
			(this.bye = void 0),
			(this.qye = void 0),
			(this.Gye = void 0),
			(this.CorrectTimerId = void 0),
			(this.Nye = void 0),
			(this.Oye = !1),
			(this.OnKeySelectedHandle = void 0),
			(this.kye = (e, i, t) => (
				(i = new CipherKey_1.CipherKey(i, t)).InitKey(this.OnKeySelectedHandle),
				this.qye.push(i),
				{ Key: t, Value: i }
			)),
			(this.OnCloseClick = () => {
				this.Oye ||
					UiLayer_1.UiLayer.SetShowMaskLayer("CipherConfirmClick", !1),
					UiManager_1.UiManager.CloseView("CipherView");
			}),
			(this.OnConfirmClick = () => {
				if (this.Oye) {
					var e = ModelManager_1.ModelManager.CipherModel.IsPasswordCorrect();
					let t = 0;
					UiLayer_1.UiLayer.SetShowMaskLayer("CipherConfirmClick", !0);
					for (const e of this.qye) {
						var i =
							ModelManager_1.ModelManager.CipherModel.GetCheckResultByIndex(t);
						e.HandleConfirm(i), this.Fye(t, i, !1), t++;
					}
					this.GetButton(1).SetEnable(!1),
						(this.Oye = !1),
						e
							? ((this.CorrectTimerId = TimerSystem_1.TimerSystem.Delay(() => {
									this.TriggerInteraction(),
										UiManager_1.UiManager.CloseView("CipherView"),
										UiLayer_1.UiLayer.SetShowMaskLayer(
											"CipherConfirmClick",
											!1,
										);
								}, 1500)),
								AudioSystem_1.AudioSystem.PostEvent(
									"ui_cipher_confirm_success",
								))
							: ((this.Nye = TimerSystem_1.TimerSystem.Delay(() => {
									this.GetButton(1).SetEnable(!0), (t = 0);
									for (const i of this.qye) {
										var e =
											ModelManager_1.ModelManager.CipherModel.GetCheckResultByIndex(
												t,
											);
										e || i.HandleRest(), this.Fye(t, e, !0), t++;
									}
									(this.Oye = !0),
										UiLayer_1.UiLayer.SetShowMaskLayer(
											"CipherConfirmClick",
											!1,
										);
								}, 1500)),
								AudioSystem_1.AudioSystem.PostEvent(
									"ui_cipher_confirm_failure",
								));
				}
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIButtonComponent],
			[2, UE.UIHorizontalLayout],
			[3, UE.UINiagara],
			[4, UE.UINiagara],
			[5, UE.UINiagara],
			[6, UE.UINiagara],
		]),
			this.Gye || (this.Gye = new Array());
		for (let e = (this.Gye.length = 0); e < 4; e++) this.Gye.push(e);
		this.qye || (this.qye = new Array()),
			(this.qye.length = 0),
			(this.Oye = !0);
	}
	OnStart() {
		(this.OnKeySelectedHandle = (e, i) => {
			this.Vye(e, i);
		}),
			(this.bye = new GenericLayoutNew_1.GenericLayoutNew(
				this.GetHorizontalLayout(2),
				this.kye,
			));
	}
	OnAfterShow() {
		this.bye.RebuildLayoutByDataNew(this.Gye);
		for (let e = 0; e < 4; e++) this.Vye(e, 0);
	}
	OnAfterHide() {
		this.bye.ClearChildren(),
			this.Oye || UiLayer_1.UiLayer.SetShowMaskLayer("CipherConfirmClick", !1);
	}
	OnBeforeDestroy() {
		TimerSystem_1.TimerSystem.Has(this.CorrectTimerId) &&
			TimerSystem_1.TimerSystem.Remove(this.CorrectTimerId),
			TimerSystem_1.TimerSystem.Has(this.Nye) &&
				TimerSystem_1.TimerSystem.Remove(this.Nye);
	}
	OnAddEventListener() {
		this.GetButton(0).OnClickCallBack.Bind(this.OnCloseClick),
			this.GetButton(1).OnClickCallBack.Bind(this.OnConfirmClick);
	}
	OnRemoveEventListener() {
		this.GetButton(0).OnClickCallBack.Unbind(),
			this.GetButton(1).OnClickCallBack.Unbind();
	}
	TriggerInteraction() {
		CipherController_1.CipherController.RequestCipherComplete();
	}
	Fye(e, i, t) {
		let a = -1,
			r = 0;
		if ((i && ((a = 1), (r = 1)), !i || !t))
			switch ((t && (a = 0), e)) {
				case 0:
					this.GetUiNiagara(3).SetNiagaraVarFloat(COLOR, a),
						this.GetUiNiagara(3).SetNiagaraVarFloat(FLAG, r);
					break;
				case 1:
					this.GetUiNiagara(4).SetNiagaraVarFloat(COLOR, a),
						this.GetUiNiagara(4).SetNiagaraVarFloat(FLAG, r);
					break;
				case 2:
					this.GetUiNiagara(5).SetNiagaraVarFloat(COLOR, a),
						this.GetUiNiagara(5).SetNiagaraVarFloat(FLAG, r);
					break;
				case 3:
					this.GetUiNiagara(6).SetNiagaraVarFloat(COLOR, a),
						this.GetUiNiagara(6).SetNiagaraVarFloat(FLAG, r);
			}
	}
	Vye(e, i) {
		var t = MathUtils_1.MathUtils.RangeClamp(i, 0, 9, 0.1, 1.5);
		switch (e) {
			case 0:
				this.GetUiNiagara(3).SetNiagaraVarFloat(WPO, t);
				break;
			case 1:
				this.GetUiNiagara(4).SetNiagaraVarFloat(WPO, t);
				break;
			case 2:
				this.GetUiNiagara(5).SetNiagaraVarFloat(WPO, t);
				break;
			case 3:
				this.GetUiNiagara(6).SetNiagaraVarFloat(WPO, t);
		}
		AudioSystem_1.AudioSystem.PostEvent("ui_cipher_picker_select");
	}
}
exports.CipherView = CipherView;
