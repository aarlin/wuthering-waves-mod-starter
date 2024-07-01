"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WorldDebugController = void 0);
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	Global_1 = require("../../Global"),
	GlobalData_1 = require("../../GlobalData"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	WorldDebugModel_1 = require("../Model/WorldDebugModel");
class WorldDebugController extends ControllerBase_1.ControllerBase {
	static OnInit() {
		return (
			UE.KuroStaticLibrary.IsEditor(GlobalData_1.GlobalData.World) &&
				ModelManager_1.ModelManager.WorldDebugModel.EnableDebug &&
				(EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.AddEntity,
					WorldDebugController.GUe,
				),
				EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.RemoveEntity,
					WorldDebugController.zpe,
				)),
			!0
		);
	}
	static OnClear() {
		return (
			UE.KuroStaticLibrary.IsEditor(GlobalData_1.GlobalData.World) &&
				ModelManager_1.ModelManager.WorldDebugModel.EnableDebug &&
				(EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.AddEntity,
					WorldDebugController.GUe,
				),
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.RemoveEntity,
					WorldDebugController.zpe,
				)),
			!0
		);
	}
	static Yfr() {
		var e = ModelManager_1.ModelManager.WorldDebugModel.AoiNpcSet.size,
			o = ModelManager_1.ModelManager.WorldDebugModel.AoiMonsterSet.size,
			t = e + o,
			r =
				0 < (r = t - WorldDebugModel_1.FIGHTING_AOI_NPC_MONSTER_MAX_COUNT)
					? r
					: 0,
			l = ModelManager_1.ModelManager.WorldDebugModel.AoiVisionSet.size,
			a = 0 < (a = l - WorldDebugModel_1.FIGHTING_AOI_VISION_MAX_COUNT) ? a : 0;
		if (
			!(
				ModelManager_1.ModelManager.WorldDebugModel.AoiTotalSet.size <=
					WorldDebugModel_1.FIGHTING_TOTAL_MAX_COUINT && 0 == a
			)
		) {
			var n = Global_1.Global.BaseCharacter?.K2_GetActorLocation(),
				d =
					((n = `\n        主控玩家当前位置：X:${n?.X} Y:${n?.Y} Z:${n?.Z}\n\n        区域类型:战斗区域\n\n        幻像数量上限:${WorldDebugModel_1.FIGHTING_AOI_VISION_MAX_COUNT}    幻像数量:${l}    幻像超出数量:${a}\n\n        NPC+Monster数量上限:${WorldDebugModel_1.FIGHTING_AOI_NPC_MONSTER_MAX_COUNT}    NPC数量:${e}    Monster数量:${o}    NPC+Monster数量:${t}     NPC+Monster超出数量:${r}\n\n        `),
					new Array());
			for (const e of ModelManager_1.ModelManager.WorldDebugModel.AoiTotalSet) {
				var M = e.Entity.GetComponent(0),
					i = M.GetCreatureDataId(),
					_ = this.Jfr(M.GetEntityType()),
					g = M.GetBaseInfo()?.TidName;
				i = {
					CreatureDataId: i,
					EntityType: _ ?? "",
					PbDataId: M.GetPbDataId(),
					Name: M.GetPbEntityInitData()
						? M.GetPbEntityInitData().Name ?? ""
						: g ||
							(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
								M.GetRoleConfig().Name,
							) ??
								""),
				};
				d.push(i);
			}
			d.sort((e, o) => (e.EntityType > o.EntityType ? 1 : -1));
			let s = "实体数据如下:\n";
			for (let e = 0; e < d.length; ++e) {
				var u = d[e];
				s += `索引:${e}, 类型:${u.EntityType},CreatureDataId:${u.CreatureDataId}, PbDataId:${u.PbDataId}, Name:${u.Name}\n`;
			}
			(l =
				`战斗区域单位超出上限值${WorldDebugModel_1.FIGHTING_TOTAL_MAX_COUINT}    当前总数量:${ModelManager_1.ModelManager.WorldDebugModel.AoiTotalSet.size}    总数超出数量:${ModelManager_1.ModelManager.WorldDebugModel.AoiTotalSet.size - WorldDebugModel_1.FIGHTING_TOTAL_MAX_COUINT}\n${n}\n` +
				s),
				Log_1.Log.CheckError() && Log_1.Log.Error("World", 3, l);
		}
	}
	static Jfr(e) {
		switch (e) {
			case Protocol_1.Aki.Protocol.HBs.Proto_Player:
				return "角色";
			case Protocol_1.Aki.Protocol.HBs.Proto_Monster:
				return "怪物";
			case Protocol_1.Aki.Protocol.HBs.Proto_Npc:
				return "NPC";
			case Protocol_1.Aki.Protocol.HBs.Proto_Vision:
				return "幻像";
			default:
				return;
		}
	}
}
((exports.WorldDebugController = WorldDebugController).GUe = (e, o, t) => {
	var r;
	o &&
		((r = o.Entity.GetComponent(0)),
		ModelManager_1.ModelManager.WorldDebugModel.AddEntity(r.GetEntityType(), o),
		WorldDebugController.Yfr());
}),
	(WorldDebugController.zpe = (e, o) => {
		var t;
		o &&
			((t = o.Entity.GetComponent(0)),
			ModelManager_1.ModelManager.WorldDebugModel.RemoveEntity(
				t.GetEntityType(),
				o,
			));
	});
