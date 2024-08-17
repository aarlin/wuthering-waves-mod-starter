"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.VoxelUtils = void 0);
const UE = require("ue"),
	Vector_1 = require("../../Core/Utils/Math/Vector"),
	VOXEL_SIZE = 1600,
	VOXEL_MIN_LIMIT = 0.1;
class VoxelUtils {
	static GetVoxelInfo(e, t) {
		this.cz.DeepCopy(t);
		var o = t.X % 1600 > 0.1 ? t.X : t.X + 0.1;
		t = t.Y % 1600 > 0.1 ? t.Y : t.Y + 0.1;
		return (
			(this.cz.X = o),
			(this.cz.Y = t),
			UE.KuroVoxelSystem.GetVoxelInfoAtPos(e, this.cz.ToUeVector())
		);
	}
}
(exports.VoxelUtils = VoxelUtils).cz = Vector_1.Vector.Create();
