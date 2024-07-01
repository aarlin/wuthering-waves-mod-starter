"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventEnableHostility = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventEnableHostility extends LevelGeneralBase_1.LevelEventBase {
	constructor() {
		super(...arguments), (this.fLe = void 0), (this.vq = !1);
	}
	ExecuteNew(e, t) {
		if (e) {
			(this.vq = e.IsEnable), (this.fLe = e.EntityIds);
			for (const e of this.fLe) {
				var o =
					ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e);
				o?.Valid
					? this.vq
						? (o.Entity.GetComponent(38)?.SetAiHateConfig(""),
							o.Entity.GetComponent(38)?.SetAiTickLock(!1))
						: (o.Entity.GetComponent(38)?.SetAiTickLock(!0),
							o.Entity.GetComponent(38)?.SetAiHateConfig("10"))
					: Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("LevelEvent", 34, "实体不存在 可能已被销毁", [
							"entityId",
							e,
						]);
			}
			this.FinishExecute(!0);
		} else
			Log_1.Log.CheckError() && Log_1.Log.Error("LevelEvent", 34, "参数不合法"),
				this.FinishExecute(!1);
	}
}
exports.LevelEventEnableHostility = LevelEventEnableHostility;
