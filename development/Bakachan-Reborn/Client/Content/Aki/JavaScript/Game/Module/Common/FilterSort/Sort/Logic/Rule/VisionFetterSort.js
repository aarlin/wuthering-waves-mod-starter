"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.VisionFetterSort = void 0);
const ModelManager_1 = require("../../../../../../Manager/ModelManager"),
	CommonSort_1 = require("./CommonSort");
class VisionFetterSort extends CommonSort_1.CommonSort {
	constructor() {
		super(...arguments),
			(this.oRt = (t, e, o) => {
				var r = t,
					a = e;
				t = ModelManager_1.ModelManager.RoleModel?.GetCurSelectMainRoleId();
				if (t && 0 < t)
					for (const e of ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(
						t,
					).GetIncrIdList()) {
						var n = (n =
							ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
								e,
							))
							? n.GetMonsterId()
							: 0;
						let t =
							ModelManager_1.ModelManager.PhantomBattleModel.GetFetterGroupMonsterIdArray(
								r.Id,
							);
						var M = t.includes(n) ? 1 : -1;
						if (
							M !=
							(n = (t =
								ModelManager_1.ModelManager.PhantomBattleModel.GetFetterGroupMonsterIdArray(
									a.Id,
								)).includes(n)
								? 1
								: -1)
						)
							return n < M ? (o ? 1 : -1) : o ? -1 : 1;
					}
				return 0;
			}),
			(this.rRt = (t, e, o) => 0),
			(this.zLt = (t, e, o) =>
				t.Id !== e.Id ? (t.Id - e.Id) * (o ? -1 : 1) : 0);
	}
	OnInitSortMap() {
		this.SortMap.set(1, this.oRt),
			this.SortMap.set(2, this.rRt),
			this.SortMap.set(3, this.zLt);
	}
}
exports.VisionFetterSort = VisionFetterSort;
