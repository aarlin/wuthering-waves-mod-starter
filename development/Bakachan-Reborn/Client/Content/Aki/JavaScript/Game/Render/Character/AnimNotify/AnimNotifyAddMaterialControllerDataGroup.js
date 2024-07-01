"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log");
class AnimNotifyAddMaterialControllerDataGroup extends UE.KuroAnimNotify {
	constructor() {
		super(...arguments), (this.MaterialAssetData = void 0);
	}
	IsAllValid(e, r) {
		if (!UE.KismetSystemLibrary.IsValid(this.MaterialAssetData))
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"RenderCharacter",
						14,
						"错误：特效DA不合法",
						["Actor", e?.GetOwner()?.GetName()],
						["动画", r?.GetName()],
					),
				!1
			);
		if (!e || !UE.KismetSystemLibrary.IsValid(e))
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"RenderCharacter",
						14,
						"错误：动画Mesh不合法",
						["Actor", e?.GetOwner()?.GetName()],
						["动画", r?.GetName()],
					),
				!1
			);
		if (!UE.KismetSystemLibrary.IsValid(e.GetOwner()))
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"RenderCharacter",
						14,
						"错误：动画Owner不合法",
						["Actor", e?.GetOwner()?.GetName()],
						["动画", r?.GetName()],
					),
				!1
			);
		for (let t = 0; t < this.MaterialAssetData.DataMap.Num(); t++)
			if (0 !== this.MaterialAssetData.DataMap.GetKey(t).DataType)
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"RenderCharacter",
							14,
							"错误：DAGroup的每一个子项不能是Runtime类型,Runtime类型请使用AnimNotifyStateAddMaterialControllerDataGroup",
							["Actor", e?.GetOwner()?.GetName()],
							["动画", r?.GetName()],
							["DAGroup", this.MaterialAssetData?.GetName()],
						),
					!1
				);
		return (
			e.GetOwner() instanceof UE.TsBaseCharacter_C ||
			(Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"RenderCharacter",
					14,
					"错误：必须是TsBaseCharacter及其派生类调用",
					["Actor", e?.GetOwner()?.GetName()],
					["动画", r?.GetName()],
				),
			!1)
		);
	}
	K2_Notify(e, r) {
		return (
			!!this.IsAllValid(e, r) &&
			(r = e.GetOwner()) instanceof UE.TsBaseCharacter_C &&
			(r.CharRenderingComponent.CheckInit() ||
				r.CharRenderingComponent.Init(r.RenderType),
			0 <=
				r.CharRenderingComponent.AddMaterialControllerDataGroup(
					this.MaterialAssetData,
				))
		);
	}
	GetNotifyName() {
		var e = this.MaterialAssetData.GetName();
		return e
			? "材质控制器组:" + UE.BlueprintPathsLibrary.GetBaseFilename(e, !0)
			: "材质控制器组";
	}
}
exports.default = AnimNotifyAddMaterialControllerDataGroup;
