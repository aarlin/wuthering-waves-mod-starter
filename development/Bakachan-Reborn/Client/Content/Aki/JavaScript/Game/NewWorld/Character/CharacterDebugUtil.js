"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharacterDebugUtil = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
	DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	PreloadDefine_1 = require("../../Preload/PreloadDefine"),
	PreloadController_1 = require("../../World/Controller/PreloadController"),
	PreloadControllerNew_1 = require("../../World/Controller/PreloadControllerNew"),
	GameModePromise_1 = require("../../World/Define/GameModePromise");
class CharacterDebugUtil {
	static LoadFightDtDebug(e) {
		for (const t of ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(
			!0,
		))
			t.IsInit &&
				(PreloadDefine_1.PreloadSetting.UseNewPreload
					? this.LoadCharacterFightDtNewPreload(t.Entity, e).then(
							() => {
								Log_1.Log.CheckDebug() &&
									Log_1.Log.Debug("Temp", 1, "测试加载战斗DT完成", [
										"entityId",
										t.Entity.Id,
									]);
							},
							(e) => {},
						)
					: this.LoadCharacterFightDtOldPreload(t.Entity, e).then(
							() => {
								Log_1.Log.CheckDebug() &&
									Log_1.Log.Debug("Temp", 1, "测试加载战斗DT完成", [
										"entityId",
										t.Entity.Id,
									]);
							},
							(e) => {},
						));
	}
	static async LoadCharacterFightDtOldPreload(e, t) {
		var a = e.GetComponent(0),
			o = e.GetComponent(33),
			r =
				((e = e.GetComponent(1)),
				ModelManager_1.ModelManager.PreloadModel.AllEntityAssetMap.get(
					a.GetCreatureDataId(),
				));
		if (r)
			if (
				((a = UE.KismetSystemLibrary.Conv_ClassToSoftClassReference(
					e.Actor.GetClass(),
				)),
				(e = UE.KismetSystemLibrary.Conv_SoftClassReferenceToString(a)),
				(a =
					ConfigManager_1.ConfigManager.WorldConfig.GetCharacterFightInfo(e)))
			) {
				var l = a?.SkillDataTableMap.Get(t)?.ToAssetPathName();
				let e;
				if (
					((l =
						((l =
							(l &&
								0 < l.length &&
								"None" !== l &&
								((l = ResourceSystem_1.ResourceSystem.SyncLoad(
									l,
									UE.DataTable,
								)),
								(o.DtSkillInfoExtra = l)),
							a?.BulletDataTableMap.Get(t)?.ToAssetPathName())) &&
							0 < l.length &&
							"None" !== l &&
							((l = ResourceSystem_1.ResourceSystem.SyncLoad(l, UE.DataTable)),
							(o.DtBulletInfoExtra = l)),
						a?.HitEffectTableMap.Get(t)?.ToAssetPathName())) &&
						0 < l.length &&
						"None" !== l &&
						((a = ResourceSystem_1.ResourceSystem.SyncLoad(l, UE.DataTable)),
						(o.DtHitEffectExtra = a)),
					o.DtSkillInfoExtra)
				) {
					t = (0, puerts_1.$ref)(void 0);
					var n =
						(UE.DataTableFunctionLibrary.GetDataTableRowNames(
							o.DtSkillInfoExtra,
							t,
						),
						new Array());
					if ((e = (0, puerts_1.$unref)(t))?.Num())
						for (let t = 0; t < e.Num(); t++) {
							var i = e.Get(t).toString(),
								s = DataTableUtil_1.DataTableUtil.GetDataTableRow(
									o.DtSkillInfoExtra,
									i,
								);
							if (s) {
								PreloadController_1.PreloadController.CollectEntityAbility(
									r,
									s,
								),
									PreloadController_1.PreloadController.CollectEntitySkillMontage(
										r,
										i,
										s,
									);
								var u = s.SkillStartBuff;
								if (u?.Num())
									for (let e = 0; e < u.Num(); ++e) {
										var d = u.Get(e);
										d && n.push(d);
									}
								var g = s.SkillEndBuff;
								if (g?.Num())
									for (let e = 0; e < g.Num(); ++e) {
										var f = g.Get(e);
										f && n.push(f);
									}
							}
						}
					PreloadController_1.PreloadController.CollectAssetByBuffIdList(r, n);
				}
				o.DtBulletInfoExtra &&
					PreloadController_1.PreloadController.CollectAssetByBulletDt(
						o.DtBulletInfoExtra,
						r,
					);
				const c = new GameModePromise_1.GameModePromise();
				if (
					(PreloadController_1.PreloadController.CheckPreloadByAssetElement(
						r,
						void 0,
						(e) => {
							c.SetResult(e);
						},
					),
					await c.Promise,
					e?.Num())
				)
					for (let t = 0; t < e.Num(); t++) {
						var C = Number(e.Get(t).toString()),
							m = o.GetSkillInfo(C);
						m && 0 === m.SkillLoadType && o.GiveSkillDebug(C);
					}
			} else
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Character", 18, "找不到当前角色的FightInfo配置", [
						"actorPath",
						e,
					]);
	}
	static async LoadCharacterFightDtNewPreload(e, t) {
		var a = e.GetComponent(0),
			o = e.GetComponent(33),
			r =
				((e = e.GetComponent(1)),
				ModelManager_1.ModelManager.PreloadModelNew.GetEntityAssetElement(
					a.GetCreatureDataId(),
				));
		if (r)
			if (
				((a = UE.KismetSystemLibrary.Conv_ClassToSoftClassReference(
					e.Actor.GetClass(),
				)),
				(e = UE.KismetSystemLibrary.Conv_SoftClassReferenceToString(a)),
				(a =
					ConfigManager_1.ConfigManager.WorldConfig.GetCharacterFightInfo(e)))
			) {
				var l = a?.SkillDataTableMap.Get(t)?.ToAssetPathName(),
					n =
						((l =
							((l =
								(l &&
									0 < l.length &&
									"None" !== l &&
									((l = ResourceSystem_1.ResourceSystem.SyncLoad(
										l,
										UE.DataTable,
									)),
									(o.DtSkillInfoExtra = l)),
								a?.BulletDataTableMap.Get(t)?.ToAssetPathName())) &&
								0 < l.length &&
								"None" !== l &&
								((l = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
									l,
									UE.DataTable,
								)),
								(o.DtBulletInfoExtra = l)),
							(0, puerts_1.$ref)(void 0))),
						UE.DataTableFunctionLibrary.GetDataTableRowNames(
							o.DtBulletInfoExtra,
							l,
						),
						(0, puerts_1.$unref)(l));
				for (let e = 0; e < n.Num(); e++) {
					var i = BigInt(n.Get(e).toString());
					PreloadControllerNew_1.PreloadControllerNew.CollectAssetByBulletId(
						r,
						i,
					);
				}
				(l = a?.HitEffectTableMap.Get(t)?.ToAssetPathName()),
					(t =
						(l &&
							0 < l.length &&
							"None" !== l &&
							((a = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
								l,
								UE.DataTable,
							)),
							(o.DtHitEffectExtra = a)),
						new GameModePromise_1.GameModePromise())),
					(l =
						(PreloadControllerNew_1.PreloadControllerNew.LoadAssetAsync(
							r.MainAsset,
							r.LoadPriority,
							!1,
							t,
						),
						await t.Promise,
						(0, puerts_1.$ref)(void 0)));
				var s =
					(UE.DataTableFunctionLibrary.GetDataTableRowNames(
						o.DtSkillInfoExtra,
						l,
					),
					(0, puerts_1.$unref)(l));
				if (s?.Num())
					for (let e = 0; e < s.Num(); e++) {
						var u = Number(s.Get(e).toString()),
							d = o.GetSkillInfo(u);
						d && 0 === d.SkillLoadType && o.GiveSkillDebug(u);
					}
			} else
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Character", 18, "找不到当前角色的FightInfo配置", [
						"actorPath",
						e,
					]);
	}
}
exports.CharacterDebugUtil = CharacterDebugUtil;
