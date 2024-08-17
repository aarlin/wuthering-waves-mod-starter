"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PlayerMarkCreateInfo =
		exports.TemporaryTeleportMarkCreateInfo =
		exports.QuestMarkCreateInfo =
		exports.DynamicMarkCreateInfo =
		exports.ConfigMarkCreateInfo =
		exports.MarkCreateInfo =
		exports.WORLD_MAP_MAX_SCALE =
		exports.DEFAULT_MAP_BORDER_ID =
		exports.DETAIL_TILE_SPACE =
		exports.BIG_WORLD_MAP_ID =
		exports.MARK_HASH_XY_PANDING =
		exports.MARK_SCOPE =
		exports.UNIT =
		exports.MINI_MAP_UPDATE_GAP =
		exports.MINI_MAP_RADIUS =
		exports.DETAIL_TILE_REALSIZE =
		exports.worldToScreenScale =
		exports.world2UiUnit =
		exports.FLOAT_0_01 =
		exports.CALMING_WIND_BELL_MARKID =
			void 0);
const Vector_1 = require("../../../Core/Utils/Math/Vector"),
	Vector2D_1 = require("../../../Core/Utils/Math/Vector2D");
(exports.CALMING_WIND_BELL_MARKID = 2),
	(exports.FLOAT_0_01 = 0.01),
	(exports.world2UiUnit = Vector_1.Vector.Create(
		exports.FLOAT_0_01,
		-exports.FLOAT_0_01,
		exports.FLOAT_0_01,
	)),
	(exports.worldToScreenScale = Vector2D_1.Vector2D.Create(
		exports.FLOAT_0_01,
		-exports.FLOAT_0_01,
	)),
	(exports.DETAIL_TILE_REALSIZE = 850),
	(exports.MINI_MAP_RADIUS = 200),
	(exports.MINI_MAP_UPDATE_GAP = 20),
	(exports.UNIT = 100),
	(exports.MARK_SCOPE = 50),
	(exports.MARK_HASH_XY_PANDING = 1e5),
	(exports.BIG_WORLD_MAP_ID = 8),
	(exports.DETAIL_TILE_SPACE = Math.round(exports.DETAIL_TILE_REALSIZE)),
	(exports.DEFAULT_MAP_BORDER_ID = 1),
	(exports.WORLD_MAP_MAX_SCALE = 2.5);
class MarkCreateInfo {
	constructor(e) {
		this.CreateType = e;
	}
}
class ConfigMarkCreateInfo extends (exports.MarkCreateInfo = MarkCreateInfo) {
	constructor(e, r) {
		super(0),
			(this.MarkConfig = e),
			void (this.MarkId = 0) === r && (this.MarkId = e.MarkId);
	}
}
exports.ConfigMarkCreateInfo = ConfigMarkCreateInfo;
class DynamicMarkCreateInfo extends MarkCreateInfo {
	constructor(e, r, t, o = void 0, s, a = !1, I, _) {
		super(1),
			(this.TrackTarget = e),
			(this.MarkConfigId = r),
			(this.MarkType = t),
			(this.MarkId = o),
			(this.TrackSource = s),
			(this.DestroyOnUnTrack = a),
			(this.TeleportId = I),
			(this.EntityConfigId = _),
			(this.MapId = 0),
			(this.MapId = exports.BIG_WORLD_MAP_ID);
	}
}
class QuestMarkCreateInfo extends (exports.DynamicMarkCreateInfo =
	DynamicMarkCreateInfo) {
	constructor(e, r, t, o, s, a, I = void 0, _) {
		super(o, s, a, I, _),
			(this.DungeonId = e),
			(this.TreeId = r),
			(this.NodeId = t),
			(this.TrackTarget = o),
			(this.MarkConfigId = s),
			(this.MarkType = a),
			(this.MarkId = I),
			(this.TrackSource = _),
			(this.MapId = e);
	}
}
exports.QuestMarkCreateInfo = QuestMarkCreateInfo;
class TemporaryTeleportMarkCreateInfo extends DynamicMarkCreateInfo {
	constructor(e, r, t, o = void 0, s) {
		super(e, r, t, o, s);
	}
}
exports.TemporaryTeleportMarkCreateInfo = TemporaryTeleportMarkCreateInfo;
class PlayerMarkCreateInfo extends MarkCreateInfo {
	constructor(e, r, t) {
		super(2), (this.PlayerId = e), (this.PlayerIndex = r), (this.Position = t);
	}
}
exports.PlayerMarkCreateInfo = PlayerMarkCreateInfo;
