"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PlotMontage = void 0);
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
	ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	CharacterNameDefines_1 = require("../../NewWorld/Character/Common/CharacterNameDefines"),
	MONTAGE_BLEND_OUT_TIME = 0.5;
class PlotMontage {
	constructor() {
		(this.tYi = new Map()), (this.iYi = new Map());
	}
	StartPlayMontage(e) {
		var t;
		e &&
			e.ActionMontage.Path &&
			"Empty" !== e.ActionMontage.Path &&
			(t =
				0 === e.EntityId
					? ModelManager_1.ModelManager.PlotModel.CurrentInteractEntity
					: ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
							e.EntityId,
						))?.IsInit &&
			this.oYi(t, e.ActionMontage.Path);
	}
	oYi(e, t, a = !1) {
		var i;
		e &&
			!StringUtils_1.StringUtils.IsEmpty(t) &&
			((i = this.tYi.get(t))
				? this.Fc(e, i, a)
				: ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.AnimMontage, (i) => {
						ObjectUtils_1.ObjectUtils.IsValid(i) ||
							(Log_1.Log.CheckError() &&
								Log_1.Log.Error("Plot", 27, "播放失败, 检查动画资产", [
									"path",
									t,
								])),
							this.tYi.set(t, i),
							this.Fc(e, i, a);
					}));
	}
	Fc(e, t, a) {
		var i,
			r,
			n = e.Entity.GetComponent(160)?.MainAnimInstance;
		ObjectUtils_1.ObjectUtils.IsValid(n) &&
			((r = this.iYi.get(e)),
			(i =
				ObjectUtils_1.ObjectUtils.IsValid(r) && n.Montage_IsPlaying(r)
					? n.Montage_GetCurrentSection(r)
					: CharacterNameDefines_1.CharacterNameDefines.NULL_SECTION),
			(r === t &&
				i !== CharacterNameDefines_1.CharacterNameDefines.END_SECTION) ||
				n.Montage_Play(t),
			(r = a
				? CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION
				: CharacterNameDefines_1.CharacterNameDefines.END_SECTION),
			n.Montage_SetNextSection(
				CharacterNameDefines_1.CharacterNameDefines.START_SECTION,
				CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
				t,
			),
			n.Montage_SetNextSection(
				CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
				r,
				t,
			),
			this.iYi.set(e, t),
			Log_1.Log.CheckDebug()) &&
			Log_1.Log.Debug(
				"Plot",
				27,
				"NPC播放蒙太奇",
				["Id", e.Id],
				["Montage", t.GetName()],
			);
	}
	StopAllMontage(e = !0) {
		for (var [t, a] of this.iYi) {
			var i = t?.Entity?.GetComponent(160)?.MainAnimInstance;
			ObjectUtils_1.ObjectUtils.IsValid(i) &&
			ObjectUtils_1.ObjectUtils.IsValid(a) &&
			i.Montage_IsPlaying(a)
				? e
					? i.Montage_Stop(0.5, a)
					: i.Montage_SetNextSection(
							CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
							CharacterNameDefines_1.CharacterNameDefines.END_SECTION,
							a,
						)
				: this.iYi.delete(t);
		}
		e && (this.iYi.clear(), this.tYi.clear());
	}
}
exports.PlotMontage = PlotMontage;
