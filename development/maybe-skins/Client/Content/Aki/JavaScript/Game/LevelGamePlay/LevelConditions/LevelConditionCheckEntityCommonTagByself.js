"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionCheckEntityCommonTagBySelf =
		exports.ConditionExParamsCheckEntityCommonTagBySelf =
			void 0);
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
	GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
	LevelGeneralBase_1 = require("../LevelGeneralBase"),
	LevelConditionCenter_1 = require("./LevelConditionCenter");
class ConditionExParamsCheckEntityCommonTagBySelf extends LevelGeneralBase_1.LevelConditionExParams {
	constructor() {
		super(...arguments), (this.TagIds = void 0);
	}
}
exports.ConditionExParamsCheckEntityCommonTagBySelf =
	ConditionExParamsCheckEntityCommonTagBySelf;
class LevelConditionCheckEntityCommonTagBySelf extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, t) {
		let n = LevelConditionCenter_1.LevelConditionCenter.GetConditionExParams(
			e.Id,
		);
		if (!n) {
			if (!e.LimitParams) return !1;
			var o = e.LimitParams.get("EntityCommonTag");
			if (!o) return !1;
			(o = o.split("-")),
				((n = new ConditionExParamsCheckEntityCommonTagBySelf()).TagIds =
					new Array());
			for (const t of o) {
				var i = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t);
				void 0 === i
					? Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Entity",
							18,
							"不存在Tag,请检查条件配置",
							["tag", t],
							["条件Id", e.Id],
						)
					: n.TagIds.push(i);
			}
			LevelConditionCenter_1.LevelConditionCenter.SetConditionExParams(e.Id, n);
		}
		if (n.TagIds && 0 < n.TagIds.length) {
			if (
				!UE.KuroStaticLibrary.IsImplementInterface(
					t.GetClass(),
					UE.BPI_CreatureInterface_C.StaticClass(),
				)
			)
				return !1;
			if (((o = t), !(t = EntitySystem_1.EntitySystem.Get(o.GetEntityId()))))
				return !1;
			var r = t.GetComponent(177);
			if (!r) return !1;
			for (const e of n.TagIds) if (!r.HasTag(e)) return !1;
		}
		return !0;
	}
}
exports.LevelConditionCheckEntityCommonTagBySelf =
	LevelConditionCheckEntityCommonTagBySelf;
