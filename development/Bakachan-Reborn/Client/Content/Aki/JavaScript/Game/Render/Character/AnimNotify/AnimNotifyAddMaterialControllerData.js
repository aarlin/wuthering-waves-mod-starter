"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
	TsUiSceneRoleActor_1 = require("../../../Module/UiComponent/TsUiSceneRoleActor");
class AnimNotifyAddMaterialControllerData extends UE.KuroAnimNotify {
	constructor() {
		super(...arguments),
			(this.MaterialAssetData = void 0),
			(this.RemoveWhenRevive = !1);
	}
	IsAllValid(e, t) {
		var r;
		return UE.KismetSystemLibrary.IsValid(this.MaterialAssetData)
			? e && UE.KismetSystemLibrary.IsValid(e)
				? UE.KismetSystemLibrary.IsValid(e.GetOwner())
					? 0 !== this.MaterialAssetData.DataType
						? (Log_1.Log.CheckError() &&
								Log_1.Log.Error(
									"RenderCharacter",
									14,
									"错误：特效DA不能是Runtime类型,Runtime类型请使用AnimNotifyStateAddMaterialControllerData",
									["Actor", e?.GetOwner()?.GetName()],
									["动画", t?.GetName()],
									["DA", this.MaterialAssetData?.GetName()],
								),
							!1)
						: (r = e.GetOwner()) instanceof UE.TsBaseCharacter_C ||
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
	K2_Notify(e, t) {
		if (this.IsAllValid(e, t)) {
			var r;
			if ((t = e.GetOwner()) instanceof UE.TsBaseCharacter_C)
				return (
					t.CharRenderingComponent.CheckInit() ||
						t.CharRenderingComponent.Init(t.RenderType),
					(r =
						0 <=
						(e = t.CharRenderingComponent.AddMaterialControllerData(
							this.MaterialAssetData,
						))) &&
						this.RemoveWhenRevive &&
						EntitySystem_1.EntitySystem.GetComponent(
							t.EntityId,
							172,
						)?.AddMaterialHandle(e),
					r
				);
			if (t instanceof TsUiSceneRoleActor_1.default)
				return (
					0 <=
					t.Model.CheckGetComponent(5).AddRenderingMaterialByData(
						this.MaterialAssetData,
					)
				);
		}
		return !1;
	}
	GetNotifyName() {
		var e = this.MaterialAssetData.GetName();
		return e
			? "材质控制器:" + UE.BlueprintPathsLibrary.GetBaseFilename(e, !0)
			: "材质控制器";
	}
}
exports.default = AnimNotifyAddMaterialControllerData;
