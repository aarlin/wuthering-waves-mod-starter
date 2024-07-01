"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, n, i) {
		var o,
			r = arguments.length,
			a =
				r < 3
					? t
					: null === i
						? (i = Object.getOwnPropertyDescriptor(t, n))
						: i;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			a = Reflect.decorate(e, t, n, i);
		else
			for (var s = e.length - 1; 0 <= s; s--)
				(o = e[s]) && (a = (r < 3 ? o(a) : 3 < r ? o(t, n, a) : o(t, n)) || a);
		return 3 < r && a && Object.defineProperty(t, n, a), a;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiModelAnimationComponent = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
	FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	CharacterNameDefines_1 = require("../../../../NewWorld/Character/Common/CharacterNameDefines"),
	UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine"),
	UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiModelAnimationComponent = class extends UiModelComponentBase_1.UiModelComponentBase {
	constructor() {
		super(...arguments),
			(this.Qwr = void 0),
			(this.nXt = void 0),
			(this.sBr = void 0),
			(this.aBr = void 0),
			(this.hBr = void 0),
			(this.lBr = !0),
			(this._Br = void 0),
			(this.uBr = () => {
				this.UpdateAnimInstance(),
					this.aBr && (this.PlayMontage(this.aBr), (this.aBr = void 0)),
					this.hBr &&
						(this.PlayAnimation(this.hBr, this.lBr), (this.hBr = void 0)),
					this._Br && (this.SetAnimationMode(this._Br), (this._Br = void 0));
			});
	}
	OnInit() {
		(this.nXt = this.Owner.CheckGetComponent(1)),
			(this.Qwr = this.Owner.CheckGetComponent(0));
	}
	OnStart() {
		EventSystem_1.EventSystem.AddWithTarget(
			this.Owner,
			EventDefine_1.EEventName.OnUiModelLoadComplete,
			this.uBr,
		);
	}
	OnEnd() {
		EventSystem_1.EventSystem.RemoveWithTarget(
			this.Owner,
			EventDefine_1.EEventName.OnUiModelLoadComplete,
			this.uBr,
		);
	}
	cBr() {
		var e = this.nXt?.MainMeshComponent;
		e?.GetLinkedAnimGraphInstanceByTag(FNameUtil_1.FNameUtil.NONE) &&
			Log_1.Log.CheckError() &&
			Log_1.Log.Error(
				"Character",
				44,
				"检测出该Actor有空的动画LinkGraph节点,将会影响同步,GAS等功能,请找对应策划修复",
				["Actor", this.nXt?.Actor?.GetName()],
				["AnimInstance", e?.GetAnimInstance()?.GetName()],
			);
	}
	UpdateAnimInstance() {
		var e = this.nXt?.MainMeshComponent;
		e &&
			(this.cBr(),
			(this.sBr = e.GetLinkedAnimGraphInstanceByTag(
				CharacterNameDefines_1.CharacterNameDefines.ABP_BASE,
			)),
			this.sBr || (this.sBr = e.GetAnimInstance()));
	}
	IsMontagePlaying() {
		return this.sBr?.IsAnyMontagePlaying() ?? !1;
	}
	PlayMontage(e) {
		2 !== this.Qwr?.GetModelLoadState()
			? (this.aBr = e)
			: this.sBr.Montage_Play(e);
	}
	StopMontage(e = 0) {
		2 !== this.Qwr?.GetModelLoadState()
			? (this.aBr = void 0)
			: this.sBr.Montage_Stop(e);
	}
	GetCurrentSection() {
		return this.sBr?.Montage_GetCurrentSection();
	}
	IsAnimationPlaying() {
		return this.nXt?.MainMeshComponent?.IsPlaying() ?? !1;
	}
	PlayAnimation(e, t = !0) {
		2 !== this.Qwr?.GetModelLoadState()
			? ((this.hBr = e), (this.lBr = t))
			: this.nXt.MainMeshComponent.PlayAnimation(e, t);
	}
	StopAnimation() {
		2 !== this.Qwr?.GetModelLoadState()
			? (this.hBr = void 0)
			: this.nXt.MainMeshComponent.Stop();
	}
	SetAnimationMode(e) {
		2 !== this.Qwr?.GetModelLoadState()
			? (this._Br = e)
			: this.nXt.MainMeshComponent.SetAnimationMode(e);
	}
};
(UiModelAnimationComponent = __decorate(
	[(0, UiModelComponentDefine_1.RegisterUiModelComponent)(10)],
	UiModelAnimationComponent,
)),
	(exports.UiModelAnimationComponent = UiModelAnimationComponent);
