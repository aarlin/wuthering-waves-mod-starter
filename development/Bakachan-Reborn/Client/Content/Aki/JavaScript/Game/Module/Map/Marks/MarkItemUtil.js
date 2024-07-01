"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MarkItemUtil = void 0);
const Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	AreaMarkItem_1 = require("./MarkItem/AreaMarkItem"),
	ConfigMarkItem_1 = require("./MarkItem/ConfigMarkItem"),
	CustomMarkItem_1 = require("./MarkItem/CustomMarkItem"),
	DynamicEntityMarkItem_1 = require("./MarkItem/DynamicEntityMarkItem"),
	EntityMarkItem_1 = require("./MarkItem/EntityMarkItem"),
	FixedSceneGamePlayMarkItem_1 = require("./MarkItem/FixedSceneGamePlayMarkItem"),
	LandscapeMark_1 = require("./MarkItem/LandscapeMark"),
	MingSuNpcMarkItem_1 = require("./MarkItem/MingSuNpcMarkItem"),
	ParkourMarkItem_1 = require("./MarkItem/ParkourMarkItem"),
	PlayerMarkItem_1 = require("./MarkItem/PlayerMarkItem"),
	SceneGameplayMarkItem_1 = require("./MarkItem/SceneGameplayMarkItem"),
	SoundBoxMarkItem_1 = require("./MarkItem/SoundBoxMarkItem"),
	TaskMarkItem_1 = require("./MarkItem/TaskMarkItem"),
	TeleportMarkItem_1 = require("./MarkItem/TeleportMarkItem"),
	TemporaryTeleportMarkItem_1 = require("./MarkItem/TemporaryTeleportMarkItem"),
	TreasureBoxDetectorMarkItem_1 = require("./MarkItem/TreasureBoxDetectorMarkItem"),
	TreasureBoxMarkItem_1 = require("./MarkItem/TreasureBoxMarkItem");
class MarkItemUtil {
	static Create(e, a, r, t) {
		if (e) {
			let M;
			switch (e.CreateType) {
				case 0:
					M = MarkItemUtil.CreateConfigMark(e.MarkId, e.MarkConfig, a, r, t);
					break;
				case 2:
					(M = new PlayerMarkItem_1.PlayerMarkItem(t, e, a, r))?.Initialize();
					break;
				case 1:
					M = MarkItemUtil.CreateDynamicMark(e, a, r, t);
			}
			return M;
		}
	}
	static GetTrackSourceTypeByMarkType(e) {
		return 10 !== e ? 1 : 4;
	}
	static CreateConfigMark(e, a, r, t, M) {
		if (a) {
			let k;
			switch (a.ObjectType) {
				case 1:
					k = new AreaMarkItem_1.AreaMarkItem(e, a, M, r, t);
					break;
				case 5:
				case 6:
					k = new TeleportMarkItem_1.TeleportMarkItem(e, a, M, r, t);
					break;
				case 8:
					k = new MingSuNpcMarkItem_1.MingSuNpcMarkItem(e, a, M, r, t);
					break;
				case 7:
					k = new EntityMarkItem_1.EntityMarkItem(
						e,
						a,
						M,
						Vector_1.Vector.Create(a.MarkVector),
						r,
						t,
					);
					break;
				case 9:
					k = void 0;
					break;
				case 10:
					k = new SceneGameplayMarkItem_1.SceneGameplayMarkItem(e, a, M, r, t);
					break;
				case 13:
					k = new ParkourMarkItem_1.ParkourMarkItem(e, a, M, r, t);
					break;
				case 19:
					k = new FixedSceneGamePlayMarkItem_1.FixedSceneGameplayMarkItem(
						e,
						a,
						M,
						r,
						t,
					);
					break;
				case 20:
					k = new LandscapeMark_1.LandscapeMarkItem(e, a, M, r, t);
					break;
				default:
					k = new ConfigMarkItem_1.ConfigMarkItem(e, a, M, r, t);
			}
			return k?.Initialize(), k;
		}
	}
	static CreateDynamicMark(e, a, r, t) {
		if (e) {
			let M;
			switch (e.MarkType) {
				case 9:
					M = new CustomMarkItem_1.CustomMarkItem(e, t, a, r);
					break;
				case 12:
					M = new TaskMarkItem_1.TaskMarkItem(e, t, a, r);
					break;
				case 7:
					M = MarkItemUtil.CreateDynamicEntityMark(
						e.MarkId,
						e.MarkConfigId,
						t,
						e.TrackTarget,
						a,
						r,
						!1,
					);
					break;
				case 15:
					M = new TemporaryTeleportMarkItem_1.TemporaryTeleportMarkItem(
						e,
						t,
						a,
						r,
					);
					break;
				case 16:
				case 21:
					M = new SoundBoxMarkItem_1.SoundBoxMarkItem(e, t, a, r);
					break;
				case 18:
					M = new TreasureBoxMarkItem_1.TreasureBoxMarkItem(e, t, a, r);
					break;
				case 17:
					M = new TreasureBoxDetectorMarkItem_1.TreasureBoxDetectorMarkItem(
						e,
						t,
						a,
						r,
					);
					break;
				default:
					return;
			}
			return M?.Initialize(), M;
		}
	}
	static CreateEntityMark(e, a, r, t, M, k) {
		if ((a = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(a)))
			return (
				(e = new EntityMarkItem_1.EntityMarkItem(
					e,
					a,
					r,
					t,
					M,
					k,
				))?.Initialize(),
				e
			);
	}
	static CreateDynamicEntityMark(e, a, r, t, M, k, n = !0) {
		if ((a = ConfigManager_1.ConfigManager.MapConfig.GetDynamicConfigMark(a)))
			return (
				(e = new DynamicEntityMarkItem_1.DynamicEntityMarkItem(
					e,
					a,
					r,
					t,
					M,
					k,
				)),
				n && e.Initialize(),
				e
			);
	}
	static IsTrackPointedMarkInCurrentDungeon(e, a = !1) {
		if (1 !== e.TrackSource) return !0;
		var r =
			ModelManager_1.ModelManager.GameModeModel.InstanceDungeon?.MapConfigId;
		if (e.Id <= 0) {
			const t = ModelManager_1.ModelManager.MapModel.GetDynamicMarkInfoById(
				e.Id,
			);
			return t && t.MapId ? 12 === t.MarkType || r === t.MapId : a;
		}
		const t = ModelManager_1.ModelManager.MapModel.GetDynamicMarkInfoById(e.Id);
		return t && t.MapId
			? 12 === t.MarkType || r === t.MapId
			: (e = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(e.Id)) &&
					e.MapId
				? r === e.MapId
				: a;
	}
	static IsHideTrackInView(e) {
		return 12 !== e.MarkType && 1 === e.TrackSource;
	}
}
exports.MarkItemUtil = MarkItemUtil;
