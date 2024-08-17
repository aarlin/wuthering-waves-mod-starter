"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventSetActorVisible = void 0);
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
	GlobalData_1 = require("../../GlobalData"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase"),
	PATH_LENGTH = 3;
class LevelEventSetActorVisible extends LevelGeneralBase_1.LevelEventBase {
	ExecuteNew(e, o) {
		var t = e;
		if (t)
			if ((e = o)) {
				var n = EntitySystem_1.EntitySystem.Get(e.EntityId);
				if (n?.Valid)
					if (t.Targets && 0 !== t.Targets.length)
						if (n.GetComponent(182)?.Owner) {
							var r = n.GetComponent(147);
							if (r) {
								var a = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(
										GlobalData_1.GlobalData.World,
										UE.KuroActorSubsystem.StaticClass(),
									),
									l = t.SyncChildActor || !1;
								for (const e of t.Targets) {
									var i = e.PathName;
									if ((c = i.split(".")).length < 3)
										Log_1.Log.CheckError() &&
											Log_1.Log.Error(
												"LevelEvent",
												7,
												"[SetActorVisible]actor路径错误",
												["RefPath", i],
											);
									else if (
										((c = c[1] + "." + c[2]), r.IsValidPlatFormPath(c))
									) {
										var c = new UE.FName(c),
											s = a.GetActor(c);
										if (s?.IsValid())
											switch (
												((c = n.GetComponent(0).GetPbDataId()),
												ModelManager_1.ModelManager.SundryModel?.IsEnableDebugDetail(
													"SceneItemReferenceComponent_" + c,
												) &&
													Log_1.Log.CheckInfo() &&
													Log_1.Log.Info(
														"LevelEvent",
														40,
														"[SetActorVisible] [疑难杂症] 行为开关Actor",
														[
															"RefEntityPbDataId",
															n.GetComponent(0)?.GetPbDataId(),
														],
														["TargetPath", i],
														["ActorType", t.ActorType],
														["Enable", t.Enable],
														["ActionGuid", this.ActionGuid],
														["Context", o],
													),
												s.SetActorEnableCollision(t.Enable),
												t.ActorType)
											) {
												case "MeshActor":
													s.SetActorHiddenInGame(!t.Enable);
													var E = t.Enable ? 3 : 0;
													s instanceof UE.StaticMeshActor &&
														(t.Enable
															? s.SetLogicallyShow(3)
															: s.SetLogicallyHidden()),
														s instanceof UE.BP_KuroISMGroup_C &&
															(t.Enable
																? s.SeyLogicallyShowForAllChildren()
																: s.SeyLogicallyHiddenForAllChildren()),
														s.RootComponent?.IsValid() &&
															s.RootComponent instanceof
																UE.PrimitiveComponent &&
															(s.RootComponent.SetCollisionEnabled(E),
															s.RootComponent.SetHiddenInGame(!t.Enable, l));
													break;
												case "SoundActor":
													s instanceof UE.KuroAmbientSoundActor &&
														s.RootComponent instanceof
															UE.KuroAmbientSoundComponent &&
														(t.Enable
															? s.RootComponent.PlaySound()
															: s.RootComponent.StopSound());
													break;
												case "EffectActor":
													s instanceof UE.BP_EffectActor_C &&
														(t.Enable
															? s.Play("[SetActorVisible]SceneEffectPlay")
															: s.Stop("[SetActorVisible]SceneEffectStop", !1));
													break;
												case "LightsGroup":
													s instanceof UE.BP_LightsGroup_C &&
														s.ToggleLights(t.Enable);
													break;
												case "PPVolume":
													s instanceof UE.KuroPostProcessVolume &&
														(s.bEnabled = t.Enable);
													break;
												case "CullDistanceVolume":
													s instanceof UE.CullDistanceVolume &&
														(s.bEnabled = t.Enable);
													break;
												case "Skybox":
													s instanceof UE.BP_CloudFuBen_C &&
														s.ChangeSky(t.Enable);
											}
										else
											Log_1.Log.CheckError() &&
												Log_1.Log.Error(
													"LevelEvent",
													7,
													"[SetActorVisible]目标actor不存在",
													["RefPath", i],
												);
									}
								}
							} else
								Log_1.Log.CheckError() &&
									Log_1.Log.Error("LevelEvent", 7, "状态控制组件不存在");
						} else
							Log_1.Log.CheckError() &&
								Log_1.Log.Error("LevelEvent", 7, "状态控制actor不存在");
					else
						Log_1.Log.CheckError() &&
							Log_1.Log.Error("LevelEvent", 7, "目标actor未配置", [
								"PbDataId",
								n.GetComponent(0)?.GetPbDataId(),
							]);
				else
					Log_1.Log.CheckError() &&
						Log_1.Log.Error("LevelEvent", 7, "状态控制entity不存在");
			} else
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"LevelEvent",
						7,
						"此LevelEvent只能配置在SceneActorRefComponent中",
					);
		else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("LevelEvent", 7, "参数类型错误");
	}
}
exports.LevelEventSetActorVisible = LevelEventSetActorVisible;
