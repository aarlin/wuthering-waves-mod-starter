"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventSpawnEffect = void 0);
const Quat_1 = require("../../../Core/Utils/Math/Quat"),
	Transform_1 = require("../../../Core/Utils/Math/Transform"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	EffectSystem_1 = require("../../Effect/EffectSystem"),
	Global_1 = require("../../Global"),
	GlobalData_1 = require("../../GlobalData"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSpawnEffect extends LevelGeneralBase_1.LevelEventBase {
	ExecuteNew(e, t) {
		if (e) {
			var a = e;
			let t, o, l;
			switch (a.Pos2.Type) {
				case 2:
					o = a.Pos2.Pos;
					break;
				case 1:
					var r = a.Pos2.EntityId;
					r = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(r);
					(l = r?.Entity?.GetComponent(1)?.ActorLocationProxy),
						(t = a.Pos2.Offset);
					break;
				case 0:
					(r =
						Global_1.Global.BaseCharacter?.CharacterActorComponent
							?.ActorLocationProxy),
						r && (l = Vector_1.Vector.Create(r.X, r.Y, r.Z)),
						(t = a.Pos2.Offset);
			}
			(e = Vector_1.Vector.Create(0, 0, 0)),
				t && e.Set(t.X, t.Y, t.Z),
				(l = o ? Vector_1.Vector.Create(o.X ?? 0, o.Y ?? 0, o.Z ?? 0) : l) &&
					e.AdditionEqual(l),
				(e = Transform_1.Transform.Create(
					Quat_1.Quat.IdentityProxy,
					e,
					Vector_1.Vector.OneVectorProxy,
				)),
				EffectSystem_1.EffectSystem.SpawnUnloopedEffect(
					GlobalData_1.GlobalData.World,
					e.ToUeTransform(),
					a.Path,
					"[LevelEventSpawnEffect.ExecuteNew]",
				);
		}
	}
}
exports.LevelEventSpawnEffect = LevelEventSpawnEffect;
