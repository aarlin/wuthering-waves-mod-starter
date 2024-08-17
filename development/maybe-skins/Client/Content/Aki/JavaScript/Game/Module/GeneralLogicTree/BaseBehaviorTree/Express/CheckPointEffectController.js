"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CheckPointEffectController = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	EffectSystem_1 = require("../../../../Effect/EffectSystem"),
	GlobalData_1 = require("../../../../GlobalData"),
	EffectUtil_1 = require("../../../../Utils/EffectUtil");
class CheckPointEffectInfo {
	constructor() {
		(this.EffectPathKey = ""),
			(this.EffectSpawnPosition = Vector_1.Vector.ZeroVectorProxy);
	}
}
class CheckPointEffectController {
	constructor() {
		(this.qKt = new Map()), (this.GKt = new Map());
	}
	EnableAllEffects(t) {
		if (this.GKt)
			for (var [e, o] of this.qKt) t ? this.NKt(e, o) : this.StopEffect(e);
	}
	OnNodeStart(t, e, o, r) {
		var f = this.qKt.get(t);
		f ||
			(((f = new CheckPointEffectInfo()).EffectPathKey = e),
			(f.EffectSpawnPosition = o),
			this.qKt.set(t, f),
			r) ||
			this.NKt(t, f);
	}
	OnNodeEnd(t) {
		this.qKt.delete(t), this.StopEffect(t);
	}
	OnBtApplyExpressionOccupation(t) {
		t || this.EnableAllEffects(!0);
	}
	OnBtReleaseExpressionOccupation(t) {
		t || this.EnableAllEffects(!1);
	}
	NKt(t, e) {
		var o = EffectUtil_1.EffectUtil.GetEffectPath(
			e.EffectPathKey ?? "DA_Fx_Group_Sl3_Cishi_10idle",
		);
		StringUtils_1.StringUtils.IsBlank(o) ||
			EffectSystem_1.EffectSystem.SpawnEffect(
				GlobalData_1.GlobalData.World,
				new UE.Transform(
					Rotator_1.Rotator.ZeroRotator,
					e.EffectSpawnPosition.ToUeVector(),
					Vector_1.Vector.OneVector,
				),
				o,
				"[CheckPointEffectController.CreateTrackEffect]",
				void 0,
				3,
				void 0,
				(e, o) => {
					5 !== e
						? Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"GeneralLogicTree",
								19,
								"GeneralLogicTree:CheckPointEffectController.SpawnEffect 错误",
								["result", e],
							)
						: o &&
							(this.GKt.has(t) && this.StopEffect(t),
							this.GKt.set(t, o),
							EffectSystem_1.EffectSystem.RegisterCustomCheckOwnerFunc(
								o,
								() => void 0 !== this.GKt.get(t),
							));
				},
			);
	}
	StopEffect(t) {
		var e = this.GKt.get(t) ?? 0;
		EffectSystem_1.EffectSystem.IsValid(e) &&
			EffectSystem_1.EffectSystem.StopEffectById(
				e,
				"[CheckPointEffectController.End]",
				!0,
			),
			this.GKt.delete(t);
	}
}
exports.CheckPointEffectController = CheckPointEffectController;
