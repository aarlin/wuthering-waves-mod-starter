"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	TsEffectActor_1 = require("../../../Effect/TsEffectActor"),
	GlobalData_1 = require("../../../GlobalData");
class MaterialControllerData {
	constructor() {
		(this.HandleId = -1),
			(this.RenderActor = void 0),
			(this.CharRenderingComponent = void 0);
	}
}
const materialControllerStateHandleMap = new Map();
class AnimNotifyAddMeshMaterialControllerData extends UE.KuroAnimNotifyState {
	constructor() {
		super(...arguments),
			(this.MaterialAssetData = void 0),
			(this.HideMeshAfterPlay = !1);
	}
	K2_NotifyBegin(e, t, r) {
		if (GlobalData_1.GlobalData.World)
			if (UE.KismetSystemLibrary.IsValid(e)) {
				if ((e.SetHiddenInGame(!1), this.IsAllValid(e, t))) {
					var a = e.GetOwner(),
						n =
							(a instanceof UE.TsBaseCharacter_C &&
								Log_1.Log.CheckWarn() &&
								Log_1.Log.Warn(
									"RenderCharacter",
									41,
									"除特殊情况外，TsBaseCharacter及其派生类应该使用AnimNotifyStateAddMaterialControllerData通知",
									["Actor", e?.GetOwner()?.GetName()],
									["动画", t?.GetName()],
								),
							new MaterialControllerData());
					a instanceof TsEffectActor_1.default &&
						((n.CharRenderingComponent = a.GetComponentByClass(
							UE.CharRenderingComponent_C.StaticClass(),
						)),
						n.CharRenderingComponent ||
							((n.CharRenderingComponent = a.AddComponentByClass(
								UE.CharRenderingComponent_C.StaticClass(),
								!1,
								new UE.Transform(),
								!1,
							)),
							n.CharRenderingComponent.Init(7))),
						n.CharRenderingComponent ||
							((n.RenderActor =
								UE.KuroRenderingRuntimeBPPluginBPLibrary.SpawnActorFromClass(
									e,
									UE.BP_MaterialControllerRenderActor_C.StaticClass(),
									a.GetTransform(),
								)),
							(n.CharRenderingComponent = n.RenderActor.CharRenderingComponent),
							n.CharRenderingComponent.Init(7)),
						GlobalData_1.GlobalData.IsUiSceneOpen &&
							++n.CharRenderingComponent.IsUiUpdate,
						n.CharRenderingComponent.SetLogicOwner(a),
						n.CharRenderingComponent.AddComponentByCase(0, e),
						(n.HandleId = n.CharRenderingComponent.AddMaterialControllerData(
							this.MaterialAssetData,
						));
					let r = materialControllerStateHandleMap.get(e);
					return (
						r || ((r = new Map()), materialControllerStateHandleMap.set(e, r)),
						r.set(this, n),
						!0
					);
				}
			} else
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"RenderCharacter",
						14,
						"错误：动画Mesh不合法",
						["Actor", e?.GetOwner()],
						["动画", t?.GetName()],
					);
		return !1;
	}
	IsAllValid(e, t) {
		return UE.KismetSystemLibrary.IsValid(this.MaterialAssetData)
			? !(!e || !UE.KismetSystemLibrary.IsValid(e)) ||
					(Log_1.Log.CheckError() &&
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
	K2_NotifyEnd(e, t) {
		var r, a;
		return (
			!!GlobalData_1.GlobalData.World &&
			((r = materialControllerStateHandleMap.get(e)) &&
				(a = r.get(this)) &&
				(r.delete(this),
				r.size || materialControllerStateHandleMap.delete(e),
				a.CharRenderingComponent &&
					(0 <= a.HandleId &&
						a.CharRenderingComponent.RemoveMaterialControllerData(a.HandleId),
					GlobalData_1.GlobalData.IsUiSceneOpen) &&
					--a.CharRenderingComponent.IsUiUpdate,
				a.RenderActor &&
					(a.CharRenderingComponent.ResetAllRenderingState(),
					a.RenderActor.K2_DestroyActor()),
				this.HideMeshAfterPlay) &&
				e.SetHiddenInGame(!0),
			!0)
		);
	}
	GetNotifyName() {
		var e = this.MaterialAssetData.GetName();
		return e
			? "召唤物/NPC材质控制器:" +
					UE.BlueprintPathsLibrary.GetBaseFilename(e, !0)
			: "召唤物/NPC材质控制器";
	}
}
exports.default = AnimNotifyAddMeshMaterialControllerData;
