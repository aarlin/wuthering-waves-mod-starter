"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MarkItemDataUtil = void 0);
const Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager");
class MarkItemDataUtil {
	static TransformMarkTypeToClient(o) {
		switch (o) {
			case Protocol_1.Aki.Protocol.qNs.ENUMS.Proto_None:
				return 0;
			case Protocol_1.Aki.Protocol.qNs.ENUMS.Proto_Custom:
				return 9;
			case Protocol_1.Aki.Protocol.qNs.ENUMS.OMs:
				return 12;
			case Protocol_1.Aki.Protocol.qNs.ENUMS.Proto_TemporaryTeleport:
				return 15;
			case Protocol_1.Aki.Protocol.qNs.ENUMS.Proto_SoundBox:
				return 16;
			case Protocol_1.Aki.Protocol.qNs.ENUMS.Proto_TreasureBoxPoint:
				return 17;
			case Protocol_1.Aki.Protocol.qNs.ENUMS.Y6n:
				return 18;
			case Protocol_1.Aki.Protocol.qNs.ENUMS.Proto_CalmingWindBell:
				return 21;
			default:
				return 0;
		}
	}
	static InverseTransformMarkTypeToClient(o) {
		switch (o) {
			case 9:
				return Protocol_1.Aki.Protocol.qNs.ENUMS.Proto_Custom;
			case 12:
				return Protocol_1.Aki.Protocol.qNs.ENUMS.OMs;
			case 15:
				return Protocol_1.Aki.Protocol.qNs.ENUMS.Proto_TemporaryTeleport;
			case 16:
				return Protocol_1.Aki.Protocol.qNs.ENUMS.Proto_SoundBox;
			case 17:
				return Protocol_1.Aki.Protocol.qNs.ENUMS.Proto_TreasureBoxPoint;
			case 18:
				return Protocol_1.Aki.Protocol.qNs.ENUMS.Y6n;
			case 21:
				return Protocol_1.Aki.Protocol.qNs.ENUMS.Proto_CalmingWindBell;
			default:
				return 0;
		}
	}
	static GetMarkIcon(o) {
		var r = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(o);
		if (r)
			switch (r.ObjectType) {
				case 10:
				case 19:
					var e = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(
						r.RelativeId,
					);
					return !e || e.IsClose ? r.LockMarkPic : r.UnlockMarkPic;
				default:
					return r.LockMarkPic;
			}
	}
}
exports.MarkItemDataUtil = MarkItemDataUtil;
