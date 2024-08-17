"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MapUtil = void 0);
const ue_1 = require("ue"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	Vector2D_1 = require("../../../Core/Utils/Math/Vector2D"),
	IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	GeneralLogicTreeController_1 = require("../GeneralLogicTree/GeneralLogicTreeController"),
	MapDefine_1 = require("./MapDefine");
class MapUtil {
	static WorldPosition2UiPosition(e, t) {
		return (
			(t = t ?? Vector_1.Vector.Create()),
			e.Multiply(MapDefine_1.world2UiUnit, t),
			t
		);
	}
	static WorldPosition2UiPosition2D(e, t) {
		return (
			(t = t ?? Vector2D_1.Vector2D.Create()),
			e.Multiply(MapDefine_1.worldToScreenScale, t)
		);
	}
	static UiPosition2WorldPosition(e, t) {
		return (
			(t = t ?? Vector_1.Vector.Create()),
			e.Division(MapDefine_1.world2UiUnit, t)
		);
	}
	static GetTilePosition(e, t = 0) {
		return {
			X:
				((e = Vector2D_1.Vector2D.Create(e)).DivisionEqual(
					100 * MapDefine_1.DETAIL_TILE_REALSIZE,
				),
				Math.ceil(e.X + t)),
			Y: Math.ceil(-e.Y + t),
		};
	}
	static GetTrackPositionByTrackTarget(e, t, o, r = !0) {
		if (!e) return Vector_1.Vector.ZeroVectorProxy;
		var n;
		o = o ?? Vector_1.Vector.Create();
		if (e instanceof Vector_1.Vector) o.DeepCopy(e);
		else if (e instanceof Vector2D_1.Vector2D) o.Set(e.X, e.Y, 0);
		else if (e instanceof ue_1.Actor)
			e.IsValid() && o.FromUeVector(e.K2_GetActorLocation());
		else {
			let i = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e);
			if (
				!(i =
					i || ModelManager_1.ModelManager.CreatureModel.GetEntityById(e)) ||
				!i?.IsInit
			)
				return (
					(n = r
						? ModelManager_1.ModelManager.GameModeModel.MapId
						: MapDefine_1.BIG_WORLD_MAP_ID),
					GeneralLogicTreeController_1.GeneralLogicTreeController.RequestEntityPosition(
						n,
						e,
						o,
					),
					o?.Equality(Vector_1.Vector.ZeroVectorProxy) && this.qLi(e, o, r),
					o ?? Vector_1.Vector.ZeroVectorProxy
				);
			GeneralLogicTreeController_1.GeneralLogicTreeController.GetEntityPos(
				i,
				t,
				o,
			);
		}
		return o;
	}
	static qLi(e, t, o = !0) {
		(o = o
			? ModelManager_1.ModelManager.GameModeModel?.MapId
			: MapDefine_1.BIG_WORLD_MAP_ID),
			(e = ModelManager_1.ModelManager.WorldMapModel.GetEntityPosition(e, o)) &&
				t.FromUeVector(e),
			t.Division(100, t);
	}
	static IsInBigWorld(e) {
		return e === MapDefine_1.BIG_WORLD_MAP_ID;
	}
	static CrossingTest(e, t) {
		let o = !1;
		var r;
		let n = !1;
		var i;
		let a = e[e.length - 1],
			l = e[0],
			c = ((o = a.Y >= t.Y), (n = !1), 0);
		var s = e.length;
		for (let M = 0; M < s; M++)
			o !== (r = l.Y >= t.Y) &&
				((i = a.X >= t.X) == l.X >= t.X
					? i && (n = !n)
					: l.X - ((l.Y - t.Y) * (a.X - l.X)) / (a.Y - l.Y) >= t.X && (n = !n),
				(o = r)),
				(a = l),
				(c += 1),
				(l = e[c]);
		return n;
	}
	static IsTemporaryTeleportEntity(e) {
		return (
			(e = e.ComponentsData),
			void 0 !== (0, IComponent_1.getComponent)(e, "DynamicTeleportComponent")
		);
	}
	static IsTreasureBox(e) {
		return (
			(e = e.ComponentsData),
			void 0 !== (0, IComponent_1.getComponent)(e, "TreasureBoxComponent")
		);
	}
	static IsSoundBox(e) {
		return (
			(e = e.ComponentsData),
			8 ===
				(0, IComponent_1.getComponent)(e, "BaseInfoComponent").Category
					.ExploratoryDegree
		);
	}
}
exports.MapUtil = MapUtil;
