"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, o, n) {
		var i,
			r = arguments.length,
			s =
				r < 3
					? t
					: null === n
						? (n = Object.getOwnPropertyDescriptor(t, o))
						: n;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			s = Reflect.decorate(e, t, o, n);
		else
			for (var c = e.length - 1; 0 <= c; c--)
				(i = e[c]) && (s = (r < 3 ? i(s) : 3 < r ? i(t, o, s) : i(t, o)) || s);
		return 3 < r && s && Object.defineProperty(t, o, s), s;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NpcFlowComponent = void 0);
const UE = require("ue"),
	ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
	ObjectUtils_1 = require("../../../../../Core/Utils/ObjectUtils"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	CharacterFlowComponent_1 = require("../../Common/Component/Flow/CharacterFlowComponent"),
	NpcFlowLogic_1 = require("../Logics/NpcFlowLogic"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	STOP_MONTAGE_BLEND_OUT_TIME = 0.3;
let NpcFlowComponent = class extends CharacterFlowComponent_1.CharacterFlowComponent {
	constructor() {
		super(...arguments), (this.Htn = void 0), (this.hin = !1);
	}
	OnStart() {
		return (this.Htn = this.Entity.GetComponent(106)), super.OnStart(), !0;
	}
	InitFlowLogic(e) {
		e &&
			((this.FlowLogic = new NpcFlowLogic_1.NpcFlowLogic(this.ActorComp, e)),
			this.InitFlowLogicRange(
				this.FlowData?.EnterRange,
				this.FlowData?.LeaveRange,
			),
			(this.IsEnter = !1),
			(this.IsInit = !0));
	}
	InitFlowLogicRange(e, t) {
		return (
			!!super.InitFlowLogicRange(e, t) &&
			(this.Htn?.SetLogicRange(
				t ?? CharacterFlowComponent_1.DEFAULT_BUBBLE_LEAVE_RANGE,
			),
			!0)
		);
	}
	CheckCondition() {
		return (
			!!super.CheckCondition() &&
			!!this.Htn &&
			((this.Htn.IsInLogicRange &&
				ModelManager_1.ModelManager.InteractionModel.CurrentInteractEntityId !==
					this.Entity.Id) ||
				(this.ForceStopFlow(), !1))
		);
	}
	TryPlayMontage(e) {
		const t = this.Entity.GetComponent(35);
		return (
			t &&
				e?.includes("/") &&
				ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.AnimMontage, (e) => {
					ObjectUtils_1.ObjectUtils.IsValid(e) &&
						t?.MainAnimInstance &&
						((this.hin = !0),
						t.PlayOnce(e, () => {
							this.hin = !1;
						}));
				}),
			!1
		);
	}
	lin() {
		var e;
		this.ActorComp &&
			this.ActorComp.SkeletalMesh &&
			(e = this.Entity.GetComponent(35)) &&
			(this.hin && e.IsMontagePlaying() && e.StopMontage(0.3), (this.hin = !1));
	}
	RemoveFlowActions() {
		this.Entity.GetComponent(70).HideDialogueText(),
			this.FlowLogic?.ClearAudio(),
			this.lin();
	}
	GetTimberId() {
		return this.FlowData?.TimberId;
	}
};
(NpcFlowComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(167)],
	NpcFlowComponent,
)),
	(exports.NpcFlowComponent = NpcFlowComponent);
