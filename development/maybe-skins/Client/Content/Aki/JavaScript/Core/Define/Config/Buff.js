"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.Buff = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	IntArray_1 = require("./SubType/IntArray");
class Buff {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get GeDesc() {
		return this.gedesc();
	}
	get DurationPolicy() {
		return this.durationpolicy();
	}
	get DurationCalculationPolicy() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.durationcalculationpolicyLength(),
			(t) => this.durationcalculationpolicy(t),
		);
	}
	get DurationMagnitude() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.durationmagnitudeLength(),
			(t) => this.durationmagnitude(t),
		);
	}
	get DurationMagnitude2() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.durationmagnitude2Length(),
			(t) => this.durationmagnitude2(t),
		);
	}
	get bDurationAffectedByBulletTime() {
		return this.bdurationaffectedbybullettime();
	}
	get FormationPolicy() {
		return this.formationpolicy();
	}
	get Probability() {
		return this.probability();
	}
	get Period() {
		return this.period();
	}
	get bExecutePeriodicEffectOnApplication() {
		return this.bexecuteperiodiceffectonapplication();
	}
	get PeriodicInhibitionPolicy() {
		return this.periodicinhibitionpolicy();
	}
	get GameAttributeID() {
		return this.gameattributeid();
	}
	get CalculationPolicy() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.calculationpolicyLength(),
			(t) => this.calculationpolicy(t),
		);
	}
	get ModifierMagnitude() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.modifiermagnitudeLength(),
			(t) => this.modifiermagnitude(t),
		);
	}
	get ModifierMagnitude2() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.modifiermagnitude2Length(),
			(t) => this.modifiermagnitude2(t),
		);
	}
	get StackingType() {
		return this.stackingtype();
	}
	get DefaultStackCount() {
		return this.defaultstackcount();
	}
	get StackAppendCount() {
		return this.stackappendcount();
	}
	get StackLimitCount() {
		return this.stacklimitcount();
	}
	get StackDurationRefreshPolicy() {
		return this.stackdurationrefreshpolicy();
	}
	get StackPeriodResetPolicy() {
		return this.stackperiodresetpolicy();
	}
	get StackExpirationRemoveNumber() {
		return this.stackexpirationremovenumber();
	}
	get bDenyOverflowApplication() {
		return this.bdenyoverflowapplication();
	}
	get bClearStackOnOverflow() {
		return this.bclearstackonoverflow();
	}
	get bRequireModifierSuccessToTriggerCues() {
		return this.brequiremodifiersuccesstotriggercues();
	}
	get bSuppressStackingCues() {
		return this.bsuppressstackingcues();
	}
	get GameplayCueIds() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.gameplaycueidsLength(),
			(t) => this.gameplaycueids(t),
		);
	}
	get GrantedTags() {
		return GameUtils_1.GameUtils.ConvertToArray(this.grantedtagsLength(), (t) =>
			this.grantedtags(t),
		);
	}
	get ApplicationSourceTagRequirements() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.applicationsourcetagrequirementsLength(),
			(t) => this.applicationsourcetagrequirements(t),
		);
	}
	get ApplicationSourceTagIgnores() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.applicationsourcetagignoresLength(),
			(t) => this.applicationsourcetagignores(t),
		);
	}
	get ApplicationTagRequirements() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.applicationtagrequirementsLength(),
			(t) => this.applicationtagrequirements(t),
		);
	}
	get ApplicationTagIgnores() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.applicationtagignoresLength(),
			(t) => this.applicationtagignores(t),
		);
	}
	get OngoingTagRequirements() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.ongoingtagrequirementsLength(),
			(t) => this.ongoingtagrequirements(t),
		);
	}
	get OngoingTagIgnores() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.ongoingtagignoresLength(),
			(t) => this.ongoingtagignores(t),
		);
	}
	get RemovalTagRequirements() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.removaltagrequirementsLength(),
			(t) => this.removaltagrequirements(t),
		);
	}
	get RemovalTagIgnores() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.removaltagignoresLength(),
			(t) => this.removaltagignores(t),
		);
	}
	get RemoveBuffWithTags() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.removebuffwithtagsLength(),
			(t) => this.removebuffwithtags(t),
		);
	}
	get GrantedApplicationImmunityTags() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.grantedapplicationimmunitytagsLength(),
			(t) => this.grantedapplicationimmunitytags(t),
		);
	}
	get GrantedApplicationImmunityTagIgnores() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.grantedapplicationimmunitytagignoresLength(),
			(t) => this.grantedapplicationimmunitytagignores(t),
		);
	}
	get PrematureExpirationEffects() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.prematureexpirationeffectsLength(),
			(t) => this.prematureexpirationeffects(t),
		);
	}
	get RoutineExpirationEffects() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.routineexpirationeffectsLength(),
			(t) => this.routineexpirationeffects(t),
		);
	}
	get OverflowEffects() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.overfloweffectsLength(),
			(t) => this.overfloweffects(t),
		);
	}
	get RelatedExtraEffectBuffId() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.relatedextraeffectbuffidLength(),
			(t) => this.relatedextraeffectbuffid(t),
		);
	}
	get ExtraEffectID() {
		return this.extraeffectid();
	}
	get ExtraEffectParameters() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.extraeffectparametersLength(),
			(t) => this.extraeffectparameters(t),
		);
	}
	get ExtraEffectParametersGrow1() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.extraeffectparametersgrow1Length(),
			(t) => this.extraeffectparametersgrow1(t),
		);
	}
	get ExtraEffectParametersGrow2() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.extraeffectparametersgrow2Length(),
			(t) => this.extraeffectparametersgrow2(t),
		);
	}
	get ExtraEffectRequirements() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.extraeffectrequirementsLength(),
			(t) => this.extraeffectrequirements(t),
		);
	}
	get ExtraEffectReqPara() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.extraeffectreqparaLength(),
			(t) => this.extraeffectreqpara(t),
		);
	}
	get ExtraEffectReqSetting() {
		return this.extraeffectreqsetting();
	}
	get ExtraEffectCD() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.extraeffectcdLength(),
			(t) => this.extraeffectcd(t),
		);
	}
	get ExtraEffectRemoveStackNum() {
		return this.extraeffectremovestacknum();
	}
	get ExtraEffectProbability() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.extraeffectprobabilityLength(),
			(t) => this.extraeffectprobability(t),
		);
	}
	get BuffAction() {
		return GameUtils_1.GameUtils.ConvertToArray(this.buffactionLength(), (t) =>
			this.buffaction(t),
		);
	}
	get TagLogic() {
		return GameUtils_1.GameUtils.ConvertToArray(this.taglogicLength(), (t) =>
			this.taglogic(t),
		);
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsBuff(t, i) {
		return (i || new Buff()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt64(this.z7 + t) : BigInt("0");
	}
	gedesc(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	durationpolicy() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetDurationcalculationpolicyAt(t) {
		return this.durationcalculationpolicy(t);
	}
	durationcalculationpolicy(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	durationcalculationpolicyLength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	durationcalculationpolicyArray() {
		var t = this.J7.__offset(this.z7, 10);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetDurationmagnitudeAt(t) {
		return this.durationmagnitude(t);
	}
	durationmagnitude(t) {
		var i = this.J7.__offset(this.z7, 12);
		return i ? this.J7.readFloat32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	durationmagnitudeLength() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	durationmagnitudeArray() {
		var t = this.J7.__offset(this.z7, 12);
		return t
			? new Float32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetDurationmagnitude2At(t) {
		return this.durationmagnitude2(t);
	}
	durationmagnitude2(t) {
		var i = this.J7.__offset(this.z7, 14);
		return i ? this.J7.readFloat32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	durationmagnitude2Length() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	durationmagnitude2Array() {
		var t = this.J7.__offset(this.z7, 14);
		return t
			? new Float32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	bdurationaffectedbybullettime() {
		var t = this.J7.__offset(this.z7, 16);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	formationpolicy() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	probability() {
		var t = this.J7.__offset(this.z7, 20);
		return t ? this.J7.readInt32(this.z7 + t) : 1e4;
	}
	period() {
		var t = this.J7.__offset(this.z7, 22);
		return t ? this.J7.readFloat32(this.z7 + t) : 0;
	}
	bexecuteperiodiceffectonapplication() {
		var t = this.J7.__offset(this.z7, 24);
		return !t || !!this.J7.readInt8(this.z7 + t);
	}
	periodicinhibitionpolicy() {
		var t = this.J7.__offset(this.z7, 26);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	gameattributeid() {
		var t = this.J7.__offset(this.z7, 28);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetCalculationpolicyAt(t) {
		return this.calculationpolicy(t);
	}
	calculationpolicy(t) {
		var i = this.J7.__offset(this.z7, 30);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	calculationpolicyLength() {
		var t = this.J7.__offset(this.z7, 30);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	calculationpolicyArray() {
		var t = this.J7.__offset(this.z7, 30);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetModifiermagnitudeAt(t) {
		return this.modifiermagnitude(t);
	}
	modifiermagnitude(t) {
		var i = this.J7.__offset(this.z7, 32);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	modifiermagnitudeLength() {
		var t = this.J7.__offset(this.z7, 32);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	modifiermagnitudeArray() {
		var t = this.J7.__offset(this.z7, 32);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetModifiermagnitude2At(t) {
		return this.modifiermagnitude2(t);
	}
	modifiermagnitude2(t) {
		var i = this.J7.__offset(this.z7, 34);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	modifiermagnitude2Length() {
		var t = this.J7.__offset(this.z7, 34);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	modifiermagnitude2Array() {
		var t = this.J7.__offset(this.z7, 34);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	stackingtype() {
		var t = this.J7.__offset(this.z7, 36);
		return t ? this.J7.readInt32(this.z7 + t) : 2;
	}
	defaultstackcount() {
		var t = this.J7.__offset(this.z7, 38);
		return t ? this.J7.readInt32(this.z7 + t) : 1;
	}
	stackappendcount() {
		var t = this.J7.__offset(this.z7, 40);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	stacklimitcount() {
		var t = this.J7.__offset(this.z7, 42);
		return t ? this.J7.readInt32(this.z7 + t) : 1;
	}
	stackdurationrefreshpolicy() {
		var t = this.J7.__offset(this.z7, 44);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	stackperiodresetpolicy() {
		var t = this.J7.__offset(this.z7, 46);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	stackexpirationremovenumber() {
		var t = this.J7.__offset(this.z7, 48);
		return t ? this.J7.readInt32(this.z7 + t) : 1;
	}
	bdenyoverflowapplication() {
		var t = this.J7.__offset(this.z7, 50);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	bclearstackonoverflow() {
		var t = this.J7.__offset(this.z7, 52);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	brequiremodifiersuccesstotriggercues() {
		var t = this.J7.__offset(this.z7, 54);
		return !t || !!this.J7.readInt8(this.z7 + t);
	}
	bsuppressstackingcues() {
		var t = this.J7.__offset(this.z7, 56);
		return !t || !!this.J7.readInt8(this.z7 + t);
	}
	GetGameplaycueidsAt(t) {
		return this.gameplaycueids(t);
	}
	gameplaycueids(t) {
		var i = this.J7.__offset(this.z7, 58);
		return i
			? this.J7.readInt64(this.J7.__vector(this.z7 + i) + 8 * t)
			: BigInt(0);
	}
	gameplaycueidsLength() {
		var t = this.J7.__offset(this.z7, 58);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetGrantedtagsAt(t) {
		return this.grantedtags(t);
	}
	grantedtags(t, i) {
		var r = this.J7.__offset(this.z7, 60);
		return r
			? this.J7.__string(this.J7.__vector(this.z7 + r) + 4 * t, i)
			: null;
	}
	grantedtagsLength() {
		var t = this.J7.__offset(this.z7, 60);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetApplicationsourcetagrequirementsAt(t) {
		return this.applicationsourcetagrequirements(t);
	}
	applicationsourcetagrequirements(t, i) {
		var r = this.J7.__offset(this.z7, 62);
		return r
			? this.J7.__string(this.J7.__vector(this.z7 + r) + 4 * t, i)
			: null;
	}
	applicationsourcetagrequirementsLength() {
		var t = this.J7.__offset(this.z7, 62);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetApplicationsourcetagignoresAt(t) {
		return this.applicationsourcetagignores(t);
	}
	applicationsourcetagignores(t, i) {
		var r = this.J7.__offset(this.z7, 64);
		return r
			? this.J7.__string(this.J7.__vector(this.z7 + r) + 4 * t, i)
			: null;
	}
	applicationsourcetagignoresLength() {
		var t = this.J7.__offset(this.z7, 64);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetApplicationtagrequirementsAt(t) {
		return this.applicationtagrequirements(t);
	}
	applicationtagrequirements(t, i) {
		var r = this.J7.__offset(this.z7, 66);
		return r
			? this.J7.__string(this.J7.__vector(this.z7 + r) + 4 * t, i)
			: null;
	}
	applicationtagrequirementsLength() {
		var t = this.J7.__offset(this.z7, 66);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetApplicationtagignoresAt(t) {
		return this.applicationtagignores(t);
	}
	applicationtagignores(t, i) {
		var r = this.J7.__offset(this.z7, 68);
		return r
			? this.J7.__string(this.J7.__vector(this.z7 + r) + 4 * t, i)
			: null;
	}
	applicationtagignoresLength() {
		var t = this.J7.__offset(this.z7, 68);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetOngoingtagrequirementsAt(t) {
		return this.ongoingtagrequirements(t);
	}
	ongoingtagrequirements(t, i) {
		var r = this.J7.__offset(this.z7, 70);
		return r
			? this.J7.__string(this.J7.__vector(this.z7 + r) + 4 * t, i)
			: null;
	}
	ongoingtagrequirementsLength() {
		var t = this.J7.__offset(this.z7, 70);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetOngoingtagignoresAt(t) {
		return this.ongoingtagignores(t);
	}
	ongoingtagignores(t, i) {
		var r = this.J7.__offset(this.z7, 72);
		return r
			? this.J7.__string(this.J7.__vector(this.z7 + r) + 4 * t, i)
			: null;
	}
	ongoingtagignoresLength() {
		var t = this.J7.__offset(this.z7, 72);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetRemovaltagrequirementsAt(t) {
		return this.removaltagrequirements(t);
	}
	removaltagrequirements(t, i) {
		var r = this.J7.__offset(this.z7, 74);
		return r
			? this.J7.__string(this.J7.__vector(this.z7 + r) + 4 * t, i)
			: null;
	}
	removaltagrequirementsLength() {
		var t = this.J7.__offset(this.z7, 74);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetRemovaltagignoresAt(t) {
		return this.removaltagignores(t);
	}
	removaltagignores(t, i) {
		var r = this.J7.__offset(this.z7, 76);
		return r
			? this.J7.__string(this.J7.__vector(this.z7 + r) + 4 * t, i)
			: null;
	}
	removaltagignoresLength() {
		var t = this.J7.__offset(this.z7, 76);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetRemovebuffwithtagsAt(t) {
		return this.removebuffwithtags(t);
	}
	removebuffwithtags(t, i) {
		var r = this.J7.__offset(this.z7, 78);
		return r
			? this.J7.__string(this.J7.__vector(this.z7 + r) + 4 * t, i)
			: null;
	}
	removebuffwithtagsLength() {
		var t = this.J7.__offset(this.z7, 78);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetGrantedapplicationimmunitytagsAt(t) {
		return this.grantedapplicationimmunitytags(t);
	}
	grantedapplicationimmunitytags(t, i) {
		var r = this.J7.__offset(this.z7, 80);
		return r
			? this.J7.__string(this.J7.__vector(this.z7 + r) + 4 * t, i)
			: null;
	}
	grantedapplicationimmunitytagsLength() {
		var t = this.J7.__offset(this.z7, 80);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetGrantedapplicationimmunitytagignoresAt(t) {
		return this.grantedapplicationimmunitytagignores(t);
	}
	grantedapplicationimmunitytagignores(t, i) {
		var r = this.J7.__offset(this.z7, 82);
		return r
			? this.J7.__string(this.J7.__vector(this.z7 + r) + 4 * t, i)
			: null;
	}
	grantedapplicationimmunitytagignoresLength() {
		var t = this.J7.__offset(this.z7, 82);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetPrematureexpirationeffectsAt(t) {
		return this.prematureexpirationeffects(t);
	}
	prematureexpirationeffects(t) {
		var i = this.J7.__offset(this.z7, 84);
		return i
			? this.J7.readInt64(this.J7.__vector(this.z7 + i) + 8 * t)
			: BigInt(0);
	}
	prematureexpirationeffectsLength() {
		var t = this.J7.__offset(this.z7, 84);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetRoutineexpirationeffectsAt(t) {
		return this.routineexpirationeffects(t);
	}
	routineexpirationeffects(t) {
		var i = this.J7.__offset(this.z7, 86);
		return i
			? this.J7.readInt64(this.J7.__vector(this.z7 + i) + 8 * t)
			: BigInt(0);
	}
	routineexpirationeffectsLength() {
		var t = this.J7.__offset(this.z7, 86);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetOverfloweffectsAt(t) {
		return this.overfloweffects(t);
	}
	overfloweffects(t) {
		var i = this.J7.__offset(this.z7, 88);
		return i
			? this.J7.readInt64(this.J7.__vector(this.z7 + i) + 8 * t)
			: BigInt(0);
	}
	overfloweffectsLength() {
		var t = this.J7.__offset(this.z7, 88);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetRelatedextraeffectbuffidAt(t) {
		return this.relatedextraeffectbuffid(t);
	}
	relatedextraeffectbuffid(t) {
		var i = this.J7.__offset(this.z7, 90);
		return i
			? this.J7.readInt64(this.J7.__vector(this.z7 + i) + 8 * t)
			: BigInt(0);
	}
	relatedextraeffectbuffidLength() {
		var t = this.J7.__offset(this.z7, 90);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	extraeffectid() {
		var t = this.J7.__offset(this.z7, 92);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetExtraeffectparametersAt(t) {
		return this.extraeffectparameters(t);
	}
	extraeffectparameters(t, i) {
		var r = this.J7.__offset(this.z7, 94);
		return r
			? this.J7.__string(this.J7.__vector(this.z7 + r) + 4 * t, i)
			: null;
	}
	extraeffectparametersLength() {
		var t = this.J7.__offset(this.z7, 94);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetExtraeffectparametersgrow1At(t) {
		return this.extraeffectparametersgrow1(t);
	}
	extraeffectparametersgrow1(t) {
		var i = this.J7.__offset(this.z7, 96);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	extraeffectparametersgrow1Length() {
		var t = this.J7.__offset(this.z7, 96);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	extraeffectparametersgrow1Array() {
		var t = this.J7.__offset(this.z7, 96);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetExtraeffectparametersgrow2At(t) {
		return this.extraeffectparametersgrow2(t);
	}
	extraeffectparametersgrow2(t) {
		var i = this.J7.__offset(this.z7, 98);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	extraeffectparametersgrow2Length() {
		var t = this.J7.__offset(this.z7, 98);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	extraeffectparametersgrow2Array() {
		var t = this.J7.__offset(this.z7, 98);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetExtraeffectrequirementsAt(t) {
		return this.extraeffectrequirements(t);
	}
	extraeffectrequirements(t) {
		var i = this.J7.__offset(this.z7, 100);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	extraeffectrequirementsLength() {
		var t = this.J7.__offset(this.z7, 100);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	extraeffectrequirementsArray() {
		var t = this.J7.__offset(this.z7, 100);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetExtraeffectreqparaAt(t) {
		return this.extraeffectreqpara(t);
	}
	extraeffectreqpara(t, i) {
		var r = this.J7.__offset(this.z7, 102);
		return r
			? this.J7.__string(this.J7.__vector(this.z7 + r) + 4 * t, i)
			: null;
	}
	extraeffectreqparaLength() {
		var t = this.J7.__offset(this.z7, 102);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	extraeffectreqsetting() {
		var t = this.J7.__offset(this.z7, 104);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetExtraeffectcdAt(t) {
		return this.extraeffectcd(t);
	}
	extraeffectcd(t) {
		var i = this.J7.__offset(this.z7, 106);
		return i ? this.J7.readFloat32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	extraeffectcdLength() {
		var t = this.J7.__offset(this.z7, 106);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	extraeffectcdArray() {
		var t = this.J7.__offset(this.z7, 106);
		return t
			? new Float32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	extraeffectremovestacknum() {
		var t = this.J7.__offset(this.z7, 108);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetExtraeffectprobabilityAt(t) {
		return this.extraeffectprobability(t);
	}
	extraeffectprobability(t) {
		var i = this.J7.__offset(this.z7, 110);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	extraeffectprobabilityLength() {
		var t = this.J7.__offset(this.z7, 110);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	extraeffectprobabilityArray() {
		var t = this.J7.__offset(this.z7, 110);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetBuffactionAt(t) {
		return this.buffaction(t);
	}
	buffaction(t, i) {
		var r = this.J7.__offset(this.z7, 112);
		return r
			? this.J7.__string(this.J7.__vector(this.z7 + r) + 4 * t, i)
			: null;
	}
	buffactionLength() {
		var t = this.J7.__offset(this.z7, 112);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetTaglogicAt(t, i) {
		return this.taglogic(t);
	}
	taglogic(t, i) {
		var r = this.J7.__offset(this.z7, 114);
		return r
			? (i || new IntArray_1.IntArray()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
					this.J7,
				)
			: null;
	}
	taglogicLength() {
		var t = this.J7.__offset(this.z7, 114);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
}
exports.Buff = Buff;
//# sourceMappingURL=Buff.js.map
