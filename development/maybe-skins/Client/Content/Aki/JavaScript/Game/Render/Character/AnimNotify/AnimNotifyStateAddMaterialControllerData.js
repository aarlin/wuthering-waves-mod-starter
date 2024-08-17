"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	TsUiSceneRoleActor_1 = require("../../../Module/UiComponent/TsUiSceneRoleActor"),
	materialControllerStateHandleMap = new Map();
class AnimNotifyStateAddMaterialControllerData extends UE.KuroAnimNotifyState {
	constructor() {
		super(...arguments), (this.MaterialAssetData = void 0);
	}
	K2_NotifyBegin(e, t, r) {
		let a = -1;
		if (
			(this.IsAllValid(e, t) &&
				((t = e.GetOwner()) instanceof UE.TsBaseCharacter_C
					? (t.CharRenderingComponent.CheckInit() ||
							t.CharRenderingComponent.Init(t.RenderType),
						(a = t.CharRenderingComponent.AddMaterialControllerData(
							this.MaterialAssetData,
						)))
					: t instanceof TsUiSceneRoleActor_1.default &&
						(a = t.Model.CheckGetComponent(5).AddRenderingMaterialByData(
							this.MaterialAssetData,
						))),
			0 <= a)
		) {
			let t = materialControllerStateHandleMap.get(e);
			return (
				t || ((t = new Map()), materialControllerStateHandleMap.set(e, t)),
				t.set(this, a),
				!0
			);
		}
		return !1;
	}
	K2_NotifyEnd(e, t) {
		var r = materialControllerStateHandleMap.get(e);
		if (!r) return !0;
		var a = r.get(this);
		if (!a) return !0;
		if (
			(r.delete(this),
			r.size || materialControllerStateHandleMap.delete(e),
			0 <= a)
		) {
			if ((r = e.GetOwner()) instanceof UE.TsBaseCharacter_C)
				return (
					r.CharRenderingComponent.RemoveMaterialControllerDataWithEnding(a), !0
				);
			if (r instanceof TsUiSceneRoleActor_1.default)
				return (
					r.Model.CheckGetComponent(5).RemoveRenderingMaterialWithEnding(a), !0
				);
		}
		return !1;
	}
	IsAllValid(e, t) {
		var r;
		return UE.KismetSystemLibrary.IsValid(this.MaterialAssetData)
			? e && UE.KismetSystemLibrary.IsValid(e)
				? UE.KismetSystemLibrary.IsValid(e.GetOwner())
					? (r = e.GetOwner()) instanceof UE.TsBaseCharacter_C ||
						r instanceof TsUiSceneRoleActor_1.default ||
						(Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn(
								"RenderCharacter",
								14,
								"错误：必须是TsBaseCharacter或者TsUiSceneRoleActor及其派生类调用",
								["Actor", e?.GetOwner()?.GetName()],
								["动画", t?.GetName()],
							),
						!1)
					: (Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"RenderCharacter",
								14,
								"错误：动画Owner不合法",
								["Actor", e?.GetOwner()?.GetName()],
								["动画", t?.GetName()],
							),
						!1)
				: (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"RenderCharacter",
							14,
							"错误：动画Mesh不合法",
							["Actor", e?.GetOwner()?.GetName()],
							["动画", t?.GetName()],
						),
					!1)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"RenderCharacter",
						14,
						"错误：特效DA不合法",
						["Actor", e?.GetOwner()?.GetName()],
						["动画", t?.GetName()],
					),
				!1);
	}
	GetNotifyName() {
		var e = this.MaterialAssetData.GetName();
		return e && "" !== e
			? "材质控制器:" + UE.BlueprintPathsLibrary.GetBaseFilename(e, !0)
			: "材质控制器";
	}
}
exports.default = AnimNotifyStateAddMaterialControllerData;
