"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	materialControllerStateHandleMap = new Map();
class AnimNotifyStateAddMaterialControllerDataGroup extends UE.KuroAnimNotifyState {
	constructor() {
		super(...arguments), (this.MaterialAssetData = void 0);
	}
	K2_NotifyBegin(e, t, r) {
		let a = -1;
		if (
			(this.IsAllValid(e, t) &&
				(t = e.GetOwner()) instanceof UE.TsBaseCharacter_C &&
				(t.CharRenderingComponent.CheckInit() ||
					t.CharRenderingComponent.Init(t.RenderType),
				(a = t.CharRenderingComponent.AddMaterialControllerDataGroup(
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
		return (
			!a ||
			(r.delete(this),
			r.size || materialControllerStateHandleMap.delete(e),
			0 <= a &&
				(r = e.GetOwner()) instanceof UE.TsBaseCharacter_C &&
				(r.CharRenderingComponent.RemoveMaterialControllerDataGroupWithEnding(
					a,
				),
				!0))
		);
	}
	IsAllValid(e, t) {
		return UE.KismetSystemLibrary.IsValid(this.MaterialAssetData)
			? e && UE.KismetSystemLibrary.IsValid(e)
				? UE.KismetSystemLibrary.IsValid(e.GetOwner())
					? e.GetOwner() instanceof UE.TsBaseCharacter_C ||
						(Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn(
								"RenderCharacter",
								14,
								"错误：必须是TsBaseCharacter及其派生类调用",
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
		return e
			? "材质控制器组:" + UE.BlueprintPathsLibrary.GetBaseFilename(e, !0)
			: "材质控制器组";
	}
}
exports.default = AnimNotifyStateAddMaterialControllerDataGroup;
