"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ControlScreenModel = void 0);
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
	ControlScreenDefine_1 = require("./ControlScreenDefine");
class ControlScreenModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.Ibt = ControlScreenDefine_1.DEFAULT_COMMON_ROTATION_RATE),
			(this.Tbt = ControlScreenDefine_1.DEFAULT_ARM_ROTATION_RATE),
			(this.Lbt = ControlScreenDefine_1.DEFAULT_COMMON_ROTATION_RATE),
			(this.MinTouchMoveDifference = 0),
			(this.MaxTouchMoveDifference = 0),
			(this.MaxTouchMoveValue = 0),
			(this.MinTouchMoveValue = 0),
			(this.Dbt = 0),
			(this.Rbt = 0),
			(this.Ubt = -0),
			(this.Abt = new Map()),
			(this.Pbt = void 0),
			(this.xbt = void 0);
	}
	OnInit() {
		return (
			(this.MinTouchMoveDifference =
				CommonParamById_1.configCommonParamById.GetIntConfig(
					"MinTouchMoveDifference",
				)),
			(this.MaxTouchMoveDifference =
				CommonParamById_1.configCommonParamById.GetIntConfig(
					"MaxTouchMoveDifference",
				)),
			(this.MaxTouchMoveValue =
				CommonParamById_1.configCommonParamById.GetFloatConfig(
					"MaxTouchMoveValue",
				)),
			(this.MinTouchMoveValue =
				CommonParamById_1.configCommonParamById.GetFloatConfig(
					"MinTouchMoveValue",
				)),
			(this.Ibt =
				CommonParamById_1.configCommonParamById.GetFloatConfig(
					"CommonRotationRate",
				)),
			(this.Tbt =
				CommonParamById_1.configCommonParamById.GetFloatConfig(
					"ArmRotationRate",
				)),
			(this.Ubt =
				CommonParamById_1.configCommonParamById.GetIntConfig(
					"DoubleTouchTime",
				)),
			!0
		);
	}
	SetCurrentTouchTimeStamp(e) {
		this.Dbt = e;
	}
	SetCurrentTouchId(e) {
		this.Rbt = e;
	}
	SetCurrentEnterComponent(e) {
		this.Pbt = e;
	}
	SetCurrentPressComponent(e) {
		this.xbt = e;
	}
	IsDoubleTouch(e) {
		return (
			1 === this.GetTouchEmptyFingerDataCount() &&
			e === this.Rbt &&
			TimeUtil_1.TimeUtil.GetServerTimeStamp() - this.Dbt <= this.Ubt
		);
	}
	IsDoubleTouchResetCameraComponent(e, t) {
		return (
			!(
				!this.Pbt?.IsValid() ||
				!this.xbt?.IsValid() ||
				(!this.Pbt.ComponentHasTag(t) && !this.xbt.ComponentHasTag(t))
			) && e.IsTouchComponentContainTag(t)
		);
	}
	AddTouchEmptyFingerData(e) {
		var t = e.GetFingerIndex();
		this.Abt.set(t, e);
	}
	RemoveTouchEmptyFingerData(e) {
		(e = e.GetFingerIndex()), this.Abt.delete(e);
	}
	GetTouchEmptyFingerDataCount() {
		return this.Abt.size;
	}
	IsTouchEmpty(e) {
		return this.Abt.has(e);
	}
	GetTouchEmptyFingerDataByCount(e) {
		var t = [];
		for (const o of this.Abt.values()) {
			if (e <= t.length) break;
			t.push(o);
		}
		return t;
	}
	SetCommonRotationScreenRate(e) {
		this.Ibt = e;
	}
	SetArmRotationScreenRate(e) {
		this.Tbt = e;
	}
	RefreshRotationScreenRate() {
		var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
		e &&
		e.Entity.GetComponent(158).DirectionState ===
			CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection
			? (this.Lbt = this.Tbt)
			: (this.Lbt = this.Ibt);
	}
	GetRotationScreenRate() {
		return this.Lbt;
	}
}
exports.ControlScreenModel = ControlScreenModel;
