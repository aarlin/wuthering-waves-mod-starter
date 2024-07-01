"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TsEntityDebugInfoManager = void 0);
const UE = require("ue"),
	EntityDebugUtils_1 = require("../../NewWorld/Character/Common/Blueprint/Utils/EntityDebugUtils");
class TsEntityDebugInfoManager extends UE.Object {
	static GetInstance() {
		return (
			(this.Instance && this.Instance.IsValid()) ||
				(this.Instance = UE.NewObject(
					UE.TsEntityDebugInfoManager_C.StaticClass(),
				)),
			this.Instance
		);
	}
	GetDebugEntityNameList() {
		return EntityDebugUtils_1.EntityDebugUtils.GetDebugEntityNameList();
	}
	GetSelectedEntityId(t) {
		return EntityDebugUtils_1.EntityDebugUtils.GetSelectedEntityId(t);
	}
	GetEntityPbDataId(t) {
		return EntityDebugUtils_1.EntityDebugUtils.GetEntityPbDataId(t);
	}
	GetInteractionDebugInfos(t) {
		return EntityDebugUtils_1.EntityDebugUtils.GetInteractionDebugInfos(t);
	}
	GetEntityCommonTagDebugString(t) {
		return EntityDebugUtils_1.EntityDebugUtils.GetEntityCommonTagDebugString(t);
	}
	GetDebugEntityActor(t) {
		return EntityDebugUtils_1.EntityDebugUtils.GetDebugEntityActor(t);
	}
	GetDebugBaseInfo(t) {
		return EntityDebugUtils_1.EntityDebugUtils.GetDebugBaseInfo(t);
	}
	GetDebugEntityName(t) {
		return EntityDebugUtils_1.EntityDebugUtils.GetDebugEntityName(t);
	}
}
(exports.TsEntityDebugInfoManager = TsEntityDebugInfoManager),
	(exports.default = TsEntityDebugInfoManager);
