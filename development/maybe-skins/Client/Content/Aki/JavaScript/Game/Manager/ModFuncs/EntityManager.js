"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EntityManager = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Info_1 = require("../../../Core/Common/Info"),
	Log_1 = require("../../../Core/Common/Log"),
	Global_1 = require("../../Global"),
	ModelManager_1 = require("../ModelManager"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	PublicUtil_1 = require("../../Common/PublicUtil"),
	EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
class EntityManager {
	static PlayerEntity = null;
	static AllEntityInfo = [];
	static EntitiesSortedList = [];
	static ModsEntitys = { EntityList: null, EntityCount: 0 };
	EntityInfo = {
		ConfigType: 0,
		CreatureDataId: 0,
		Id: 0,
		Index: 0,
		PbDataId: 0,
		Priority: 0,
		IsInit: !1,
		Valid: !1,
		Entity: this.Entity,
	};
	Entity = {};
	EntityData = {
		AreaId: 0,
		BlueprintType: "",
		Id: 0,
		InSleep: !1,
		Transform: this.Transform,
	};
	Transform = { Pos: this.Pos, Rot: this.Rot };
	Pos = { X: 0, Y: 0, Z: 0 };
	Rot = { X: 0, Y: 0, Z: 0 };
	static GetEntitybyId(t) {
		return EntitySystem_1.EntitySystem.Get(t);
	}
	static GetPlayerEntity() {
		return (
			(this.PlayerEntity =
				Global_1.Global.BaseCharacter?.CharacterActorComponent.Entity),
			this.PlayerEntity
		);
	}
	static GetPlayerPos() {
		let t = Global_1.Global.BaseCharacter?.CharacterActorComponent.Actor,
			e = t?.K2_GetActorLocation();
		return e;
	}
	static GetEntitySortedList() {
		return (
			(this.EntitiesSortedList =
				ModelManager_1.ModelManager.CreatureModel.EntitiesSortedList),
			this.EntitiesSortedList
		);
	}
	static GetEntityType(t) {
		let e = t.Entity.GetComponent(0).GetEntityType();
		return e == Protocol_1.Aki.Protocol.wks.Proto_Player
			? "Player"
			: e == Protocol_1.Aki.Protocol.wks.Proto_Npc
				? "Npc"
				: e == Protocol_1.Aki.Protocol.wks.Proto_Monster
					? "Monster"
					: e == Protocol_1.Aki.Protocol.wks.Proto_SceneItem
						? "SceneItem"
						: e == Protocol_1.Aki.Protocol.wks.Proto_Vision
							? "Vision"
							: e == Protocol_1.Aki.Protocol.wks.Proto_Animal
								? "Animal"
								: e == Protocol_1.Aki.Protocol.wks.Proto_Custom
									? "Custom"
									: void 0;
	}
	static GetEntityCount() {
		return (
			(this.ModsEntitys.EntityCount = this.EntitiesSortedList.length),
			this.ModsEntitys.EntityCount
		);
	}
	static GetEntityId(t) {
		return t.Id;
	}
	static GetPosition(t) {
		return t.GetComponent(1).ActorInternal.K2_GetActorLocation();
	}
	static GetName(t) {
		let e = t.Entity.GetComponent(0);
		return PublicUtil_1.PublicUtil.GetConfigTextByKey(
			e.GetBaseInfo()?.TidName ?? "",
		);
	}
	static GetBlueprintType(t) {
		try {
			return this.GetEntityData(t.PbDataId).BlueprintType;
		} catch (t) {
			return "unknownBlueprintType";
		}
	}
	static GetBlueprintType2(t) {
		try {
			return t.Entity.Components[0].qXr;
		} catch (t) {
			return "unknownBlueprintType";
		}
	}
	static GetBlueprintType3(t) {
		try {
			return t.Components[0].qXr;
		} catch (t) {
			return "unknownBlueprintType";
		}
	}
	static GetEntityData(t) {
		try {
			return ModelManager_1.ModelManager.CreatureModel.GetEntityData(t);
		} catch (t) {
			return null;
		}
	}
	static PushEntityInfo(t) {
		(this.AllEntityInfo = []), this.GetEntitySortedList();
		for (let t = 0; t < this.EntitiesSortedList.length; t++) {
			let e = this.EntitiesSortedList[t],
				i = this.GetEntityData(e.PbDataId);
			this.AllEntityInfo.push({ ...e, EntityData: i });
		}
		return (
			puerts_1.logger.warn("[KUNMODDEBUG]:PushEntityInfo", this.AllEntityInfo),
			this.AllEntityInfo
		);
	}
	static isCollection(t) {
		return this.GetBlueprintType2(t).startsWith("Collect");
	}
	static isAnimal(t) {
		return this.GetBlueprintType2(t).startsWith("Animal");
	}
	static isTreasure(t) {
		return this.GetBlueprintType2(t).startsWith("Treasure");
	}
	static isMonster(t) {
		return this.GetBlueprintType2(t).startsWith("Monster");
	}
	static isGameplay(t) {
		return this.GetBlueprintType2(t).startsWith("Gameplay");
	}
	static isNpc(t) {
		let e = this.GetBlueprintType2(t);
		return (
			e.startsWith("Npc") ||
			e.startsWith("SimpleNPC") ||
			e.startsWith("PasserbyNPC")
		);
	}
	static isQuest(t) {
		return this.GetBlueprintType2(t).startsWith("Quest");
	}
	static isVision(t) {
		return t.Entity.Components[0].qXr.startsWith("VisionItem");
	}
	static isWeapon(t) {
		return this.GetBlueprintType(t).startsWith("Weapon");
	}
	static isPlayer(t) {
		return this.GetBlueprintType(t).startsWith("Player");
	}
	static isSceneObj(t) {
		return this.GetBlueprintType(t).startsWith("SceneObj");
	}
	static isTeleport(t) {
		return t.Entity.Components[0].qXr.startsWith("Teleport");
	}
	static isSonanceCasket(t) {
		return "Gameplay021" == t.Entity.Components[0].qXr;
	}
	static isMutterfly(t) {
		return "Gameplay111" == t.Entity.Components[0].qXr;
	}
	static SetPlayerSpeed(t) {
		this.GetPlayerEntity().SetTimeDilation(t);
	}
	static GetCurrRoleId() {
		return this.GetPlayerEntity().Components[0].zke;
	}
}
exports.EntityManager = EntityManager;
