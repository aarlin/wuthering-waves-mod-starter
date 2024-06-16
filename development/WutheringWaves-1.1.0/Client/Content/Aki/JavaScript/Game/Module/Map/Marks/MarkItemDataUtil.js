"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MarkItemDataUtil = void 0);
const Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager");
class MarkItemDataUtil {
	static TransformMarkTypeToClient(r) {
		switch (r) {
			case Protocol_1.Aki.Protocol.PbMapMarkType.ENUMS.None:
				return 0;
			case Protocol_1.Aki.Protocol.PbMapMarkType.ENUMS.Custom:
				return 9;
			case Protocol_1.Aki.Protocol.PbMapMarkType.ENUMS.Quest:
				return 12;
			case Protocol_1.Aki.Protocol.PbMapMarkType.ENUMS.TemporaryTeleport:
				return 15;
			case Protocol_1.Aki.Protocol.PbMapMarkType.ENUMS.SoundBox:
				return 16;
			case Protocol_1.Aki.Protocol.PbMapMarkType.ENUMS.TreasureBoxPoint:
				return 17;
			case Protocol_1.Aki.Protocol.PbMapMarkType.ENUMS.TreasureBox:
				return 18;
			default:
				return 0;
		}
	}
	static InverseTransformMarkTypeToClient(r) {
		switch (r) {
			case 9:
				return Protocol_1.Aki.Protocol.PbMapMarkType.ENUMS.Custom;
			case 12:
				return Protocol_1.Aki.Protocol.PbMapMarkType.ENUMS.Quest;
			case 15:
				return Protocol_1.Aki.Protocol.PbMapMarkType.ENUMS.TemporaryTeleport;
			case 16:
				return Protocol_1.Aki.Protocol.PbMapMarkType.ENUMS.SoundBox;
			case 17:
				return Protocol_1.Aki.Protocol.PbMapMarkType.ENUMS.TreasureBoxPoint;
			case 18:
				return Protocol_1.Aki.Protocol.PbMapMarkType.ENUMS.TreasureBox;
			default:
				return 0;
		}
	}
	static GetMarkIcon(r) {
		var e = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(r);
		if (e)
			switch (e.ObjectType) {
				case 10:
				case 19:
					var o = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(
						e.RelativeId,
					);
					return !o || o.IsClose ? e.LockMarkPic : e.UnlockMarkPic;
				default:
					return e.LockMarkPic;
			}
	}
}
exports.MarkItemDataUtil = MarkItemDataUtil;
//# sourceMappingURL=MarkItemDataUtil.js.map
