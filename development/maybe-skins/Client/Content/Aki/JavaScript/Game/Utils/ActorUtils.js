"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActorUtils = void 0);
const UE = require("ue"),
	ActorSystem_1 = require("../../Core/Actor/ActorSystem"),
	Log_1 = require("../../Core/Common/Log"),
	ResourceSystem_1 = require("../../Core/Resource/ResourceSystem"),
	TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
	ModelManager_1 = require("../Manager/ModelManager");
class ActorUtils {
	static LoadActorByModelConfig(e, t) {
		var r = e.蓝图?.ToAssetPathName();
		if (r && r.length && "None" !== r) {
			if (
				((r = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
					e.蓝图.ToAssetPathName(),
					UE.Class,
				)),
				r?.IsValid())
			) {
				let e;
				return (
					(e = r.IsChildOf(UE.TsBaseItem_C.StaticClass())
						? ActorSystem_1.ActorSystem.Get(r, t, void 0)
						: ActorSystem_1.ActorSystem.Spawn(r, t, void 0)) instanceof
						TsBaseCharacter_1.default && e.CreateAttribute(),
					e?.IsValid() &&
						(e.SetActorHiddenInGame(!0),
						e.SetActorTickEnabled(!1),
						e.SetActorEnableCollision(!1)),
					e
				);
			}
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"World",
					3,
					"[ActorUtils.LoadActorByModelConfig] 加载Actor失败，因为模型的蓝图没有设置。",
					["ModelId", e.ID],
				);
	}
	static LoadActorByPath(e, t, r) {
		if (e && e.length && "None" !== e) {
			var o = ResourceSystem_1.ResourceSystem.GetLoadedAsset(e, UE.Class);
			if (o?.IsValid()) {
				let e;
				return (
					(e = o.IsChildOf(UE.TsBaseItem_C.StaticClass())
						? ActorSystem_1.ActorSystem.Get(o, t, void 0)
						: ActorSystem_1.ActorSystem.Spawn(o, t, void 0)) instanceof
						TsBaseCharacter_1.default && e.CreateAttribute(),
					e?.IsValid() &&
						(e.SetActorHiddenInGame(!0),
						e.SetActorTickEnabled(!1),
						e.SetActorEnableCollision(!1)),
					e
				);
			}
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"World",
					7,
					"[ActorUtils.LoadActorByPath] 加载Actor失败，因为模型的蓝图没有设置。",
					["Path", e],
					["EntityConfigId", r],
				);
	}
	static LoadAndChangeMeshAnim(e, t, r) {
		(t = t.ToAssetPathName()),
			t?.length &&
				"None" !== t &&
				(t = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
					t,
					UE.SkeletalMesh,
				)) &&
				e.SkeletalMesh !== t &&
				e.SetSkeletalMesh(t),
			(t = r.ToAssetPathName());
		t?.length &&
			"None" !== t &&
			(r = ResourceSystem_1.ResourceSystem.GetLoadedAsset(t, UE.Class)) &&
			e.AnimClass !== r &&
			e.SetAnimClass(r);
	}
	static GetEntityByActor(e, t = !0) {
		if (
			UE.KuroStaticLibrary.IsImplementInterface(
				e?.GetClass(),
				UE.BPI_CreatureInterface_C.StaticClass(),
			)
		)
			return ModelManager_1.ModelManager.CreatureModel?.GetEntityById(
				e.GetEntityId(),
			);
		t &&
			Log_1.Log.CheckError() &&
			Log_1.Log.Error(
				"World",
				4,
				"[WorldBridge.GetEntityByActor] Actor未实现接口CreatureInterface",
			);
	}
}
exports.ActorUtils = ActorUtils;
