"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SimpleNpcFlowLogic = void 0);
const UE = require("ue"),
	ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
	ObjectUtils_1 = require("../../../../../Core/Utils/ObjectUtils"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	Global_1 = require("../../../../Global"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	NpcIconComponent_1 = require("../../../../Module/NPC/NpcIconComponent"),
	SimpleNpcMultiplyLogic_1 = require("./SimpleNpcMultiplyLogic"),
	STOP_MONTAGE_BLEND_OUT_TIME = 0.3;
class SimpleNpcFlowLogic {
	constructor(i) {
		(this.sir = void 0),
			(this.air = void 0),
			(this.hir = void 0),
			(this.lir = void 0),
			(this._ir = 0),
			(this.hBe = !1),
			(this.uir = void 0),
			(this.cir = void 0),
			(this.mir = void 0),
			(this.Cir = void 0),
			(this.sir = i),
			(this.Cir = i.K2_GetActorLocation());
	}
	StartFlowLogic() {
		(this.air = this.sir.GetComponentByClass(
			UE.SimpleNpcFlowComponent_C.StaticClass(),
		)),
			this.air &&
				0 < this.air.FlowList?.Num() &&
				((this.lir = new SimpleNpcMultiplyLogic_1.SimpleNpcMultiplyLogic(
					this.air,
				)),
				this.gir(),
				this.fir());
	}
	gir() {
		var i = this.air.CheckRange;
		(this.cir = i.LowerBound.Value * i.LowerBound.Value),
			(this.mir = i.UpperBound.Value * i.UpperBound.Value);
	}
	async AddHeadView() {
		if (
			!this.hir &&
			ConfigManager_1.ConfigManager.NpcIconConfig &&
			this.sir?.Mesh
		) {
			let t = 1500;
			var i = (t = this.air ? this.air.CheckRange.UpperBound.Value : t) + 500;
			(this.hir = new NpcIconComponent_1.NpcIconComponent(this)),
				this.hir.SetupCheckRange(i * i),
				await this.hir.AddNpcIconAsync(void 0),
				this.hir.SetCharacterIconLocation(),
				this.hir.SetHeadInfoNameState(!1),
				this.hir.HideDialogueText();
		}
	}
	ShowDialog(i, t) {
		this.hir?.SetDialogueText(i, t);
	}
	HideDialog() {
		this.hir?.HideDialogueText();
	}
	TryPlayMontage(i) {
		if (this.sir.Mesh && 1 !== this.sir.Mesh.AnimationMode) {
			const t = this.sir.Mesh.AnimScriptInstance;
			t &&
				(i = this.pir(i)) &&
				ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.AnimMontage, (i) => {
					ObjectUtils_1.ObjectUtils.IsValid(i) &&
						t &&
						((this._ir = i.SequenceLength), t.Montage_Play(i));
				});
		}
		return !1;
	}
	vir() {
		if (!this.uir) {
			var i = this.sir.Mesh.AnimScriptInstance;
			if (i && (i = UE.KismetSystemLibrary.GetPathName(i))) {
				let t = i.substr(0, i.lastIndexOf(StringUtils_1.SLASH_STRING));
				(t = t.substr(0, t.lastIndexOf(StringUtils_1.SLASH_STRING))),
					(i = new Array()).push(t),
					i.push("/Montage"),
					(this.uir = i.join(StringUtils_1.EMPTY_STRING));
			}
		}
	}
	pir(i) {
		return !i || i.includes("/")
			? i
			: (this.vir(), this.uir ? this.uir + `/${i}.` + i : void 0);
	}
	Tick(i) {
		0 < this._ir && ((this._ir -= i), this._ir < 0) && this.StopMontage(),
			this.lir && (this.fir(), this.lir.Tick(i));
	}
	StopMontage() {
		var i;
		(this._ir = 0),
			this.sir &&
				this.sir.Mesh &&
				1 !== this.sir.Mesh.AnimationMode &&
				(i = this.sir.Mesh.AnimScriptInstance) &&
				i.IsAnyMontagePlaying() &&
				i.Montage_Stop(0.3);
	}
	fir() {
		var i = Global_1.Global.BaseCharacter;
		i &&
			((i = i.CharacterActorComponent.ActorLocation),
			(i = UE.Vector.DistSquared2D(i, this.Cir)) < this.cir
				? (this.hBe ||
						(this.lir.IsPlaying || this.sir.IsHiding
							? (this.lir.IsPause = !1)
							: this.lir.StartFlow()),
					(this.hBe = !0))
				: i < this.mir
					? ((this.hBe = !1), (this.lir.IsPause = !0))
					: ((this.hBe = !1),
						(this.lir.IsPause = !0),
						this.lir.IsPlaying && this.lir.StopFlow()));
	}
	FilterFlowWorldState(i) {
		this.lir?.FilterFlowWorldState(i);
	}
	ForceStopFlow() {
		(this.hBe = !1), this.lir?.IsPlaying && this.lir.StopFlow();
	}
	Dispose() {
		(this.sir = void 0),
			(this.air = void 0),
			(this.lir = void 0),
			this.hir?.Destroy();
	}
	GetSelfLocation() {
		return this.sir.SelfLocationProxy;
	}
	GetAttachToMeshComponent() {
		return this.sir.Mesh;
	}
	GetAttachToSocketName() {
		return ConfigManager_1.ConfigManager.NpcIconConfig.GetNpcIconSocketName();
	}
	GetAttachToLocation(i) {
		var t = this.sir.CapsuleCollision.CapsuleHalfHeight,
			e = this.sir.SelfLocationProxy;
		i.Set(e.X, e.Y, e.Z + t);
	}
	GetAddOffsetZ() {
		return 0;
	}
	IsShowNameInfo() {
		return !1;
	}
	IsShowQuestInfo() {
		return !1;
	}
	CanTick(i) {
		return !0;
	}
	IsInHeadItemShowRange(i, t, e) {
		return i < t && e < i;
	}
}
exports.SimpleNpcFlowLogic = SimpleNpcFlowLogic;
