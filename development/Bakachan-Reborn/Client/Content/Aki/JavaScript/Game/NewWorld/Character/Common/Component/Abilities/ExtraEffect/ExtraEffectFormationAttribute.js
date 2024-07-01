"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FormationLockLowerBound =
		exports.FormationLockUpperBound =
		exports.ModifyFormationAttributeDecreaseRate =
		exports.ModifyFormationAttributeIncreaseRate =
		exports.SetFormationAttributeRate =
			void 0);
const Log_1 = require("../../../../../../../Core/Common/Log"),
	FormationAttributeController_1 = require("../../../../../../Module/Abilities/FormationAttributeController"),
	AbilityUtils_1 = require("../AbilityUtils"),
	CharacterAttributeTypes_1 = require("../CharacterAttributeTypes"),
	ExtraEffectBase_1 = require("./ExtraEffectBase");
class SetFormationAttributeRate extends ExtraEffectBase_1.BuffEffect {
	constructor() {
		super(...arguments),
			(this.AttributeId = void 0),
			(this.Rate = -0),
			(this.ModifierHandle = void 0);
	}
	CheckExecutable() {
		return this.OwnerBuffComponent?.HasBuffAuthority() ?? !1;
	}
	InitParameters(t) {
		void 0 === t.ExtraEffectParameters[0]
			? Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Battle",
					20,
					"SetFormationAttributeRate参数错误，没有合法的队伍属性id",
					["buffId", this.BuffId],
				)
			: ((this.AttributeId = Number(t.ExtraEffectParameters[0])),
				(this.Rate = AbilityUtils_1.AbilityUtils.GetLevelValue(
					t.ExtraEffectGrowParameters1,
					this.Level,
					0,
				)),
				(this.ModifierHandle = "buff" + this.ActiveHandleId));
	}
	OnCreated() {
		void 0 !== this.AttributeId &&
			this.CheckExecutable() &&
			FormationAttributeController_1.FormationAttributeController.AddModifier(
				this.ModifierHandle,
				this.AttributeId,
				0,
				this.Rate,
			);
	}
	OnExecute() {}
	OnRemoved(t) {
		void 0 !== this.AttributeId &&
			this.CheckExecutable() &&
			FormationAttributeController_1.FormationAttributeController.RemoveModifier(
				this.ModifierHandle,
				this.AttributeId,
			);
	}
}
exports.SetFormationAttributeRate = SetFormationAttributeRate;
class ModifyFormationAttributeIncreaseRate extends ExtraEffectBase_1.BuffEffect {
	constructor() {
		super(...arguments),
			(this.AttributeId = void 0),
			(this.Rate = -0),
			(this.ModifierHandle = void 0);
	}
	CheckExecutable() {
		return this.OwnerBuffComponent?.HasBuffAuthority() ?? !1;
	}
	InitParameters(t) {
		void 0 === t.ExtraEffectParameters[0]
			? Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Battle",
					20,
					"SetFormationAttributeRate参数错误，没有合法的队伍属性id",
					["buffId", this.BuffId],
				)
			: ((this.AttributeId = Number(t.ExtraEffectParameters[0])),
				(this.Rate = AbilityUtils_1.AbilityUtils.GetLevelValue(
					t.ExtraEffectGrowParameters1,
					this.Level,
					0,
				)),
				(this.ModifierHandle = "buff" + this.ActiveHandleId));
	}
	OnCreated() {
		void 0 !== this.AttributeId &&
			this.CheckExecutable() &&
			FormationAttributeController_1.FormationAttributeController.AddModifier(
				this.ModifierHandle,
				this.AttributeId,
				1,
				this.Rate,
			);
	}
	OnExecute() {}
	OnRemoved(t) {
		void 0 !== this.AttributeId &&
			this.CheckExecutable() &&
			FormationAttributeController_1.FormationAttributeController.RemoveModifier(
				this.ModifierHandle,
				this.AttributeId,
			);
	}
}
exports.ModifyFormationAttributeIncreaseRate =
	ModifyFormationAttributeIncreaseRate;
class ModifyFormationAttributeDecreaseRate extends ExtraEffectBase_1.BuffEffect {
	constructor() {
		super(...arguments),
			(this.AttributeId = void 0),
			(this.Rate = -0),
			(this.ModifierHandle = void 0);
	}
	CheckExecutable() {
		return this.OwnerBuffComponent?.HasBuffAuthority() ?? !1;
	}
	InitParameters(t) {
		void 0 === t.ExtraEffectParameters[0]
			? Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Battle",
					20,
					"SetFormationAttributeRate参数错误，没有合法的队伍属性id",
					["buffId", this.BuffId],
				)
			: ((this.AttributeId = Number(t.ExtraEffectParameters[0])),
				(this.Rate = AbilityUtils_1.AbilityUtils.GetLevelValue(
					t.ExtraEffectGrowParameters1,
					this.Level,
					0,
				)),
				(this.ModifierHandle = "buff" + this.ActiveHandleId));
	}
	OnCreated() {
		void 0 !== this.AttributeId &&
			this.CheckExecutable() &&
			FormationAttributeController_1.FormationAttributeController.AddModifier(
				this.ModifierHandle,
				this.AttributeId,
				2,
				this.Rate,
			);
	}
	OnExecute() {}
	OnRemoved(t) {
		void 0 !== this.AttributeId &&
			this.CheckExecutable() &&
			FormationAttributeController_1.FormationAttributeController.RemoveModifier(
				this.ModifierHandle,
				this.AttributeId,
			);
	}
}
exports.ModifyFormationAttributeDecreaseRate =
	ModifyFormationAttributeDecreaseRate;
class FormationLockUpperBound extends ExtraEffectBase_1.BuffEffect {
	constructor() {
		super(...arguments),
			(this.AttributeId = -1),
			(this.Offset = 0),
			(this.Percent = -0);
	}
	InitParameters(t) {
		(this.AttributeId = Number(t.ExtraEffectParameters[0])),
			(this.Percent = AbilityUtils_1.AbilityUtils.GetLevelValue(
				t.ExtraEffectGrowParameters1,
				this.Level,
				0,
			)),
			(this.Offset = AbilityUtils_1.AbilityUtils.GetLevelValue(
				t.ExtraEffectGrowParameters2,
				this.Level,
				0,
			)),
			2 < t.ExtraEffectParameters.length &&
				(this.Percent = Number(t.ExtraEffectParameters[2]));
	}
	OnCreated() {
		-1 !== this.AttributeId &&
			this.OwnerBuffComponent?.HasBuffAuthority() &&
			FormationAttributeController_1.FormationAttributeController.AddBoundsLocker(
				this.AttributeId,
				{
					LockUpperBounds: !0,
					LockLowerBounds: !1,
					UpperPercent:
						this.Percent * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND,
					UpperOffset: this.Offset,
					LowerPercent: 0,
					LowerOffset: 0,
				},
				this.ActiveHandleId,
			);
	}
	OnExecute() {}
	OnRemoved() {
		-1 !== this.AttributeId &&
			this.OwnerBuffComponent?.HasBuffAuthority() &&
			FormationAttributeController_1.FormationAttributeController.RemoveBoundsLocker(
				this.AttributeId,
				this.ActiveHandleId,
			);
	}
}
exports.FormationLockUpperBound = FormationLockUpperBound;
class FormationLockLowerBound extends ExtraEffectBase_1.BuffEffect {
	constructor() {
		super(...arguments),
			(this.AttributeId = -1),
			(this.Offset = 0),
			(this.Percent = -0);
	}
	InitParameters(t) {
		(this.AttributeId = Number(t.ExtraEffectParameters[0])),
			(this.Percent = AbilityUtils_1.AbilityUtils.GetLevelValue(
				t.ExtraEffectGrowParameters1,
				this.Level,
				0,
			)),
			(this.Offset = AbilityUtils_1.AbilityUtils.GetLevelValue(
				t.ExtraEffectGrowParameters2,
				this.Level,
				0,
			)),
			2 < t.ExtraEffectParameters.length &&
				(this.Percent = Number(t.ExtraEffectParameters[2]));
	}
	OnCreated() {
		-1 !== this.AttributeId &&
			this.OwnerBuffComponent?.HasBuffAuthority() &&
			FormationAttributeController_1.FormationAttributeController.AddBoundsLocker(
				this.AttributeId,
				{
					LockUpperBounds: !1,
					LockLowerBounds: !0,
					UpperPercent: 0,
					UpperOffset: 0,
					LowerPercent:
						this.Percent * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND,
					LowerOffset: this.Offset,
				},
				this.ActiveHandleId,
			);
	}
	OnExecute() {}
	OnRemoved() {
		-1 !== this.AttributeId &&
			this.OwnerBuffComponent?.HasBuffAuthority() &&
			FormationAttributeController_1.FormationAttributeController.RemoveBoundsLocker(
				this.AttributeId,
				this.ActiveHandleId,
			);
	}
}
exports.FormationLockLowerBound = FormationLockLowerBound;
