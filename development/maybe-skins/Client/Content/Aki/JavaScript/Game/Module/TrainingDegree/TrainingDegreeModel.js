"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TrainingDegreeModel = exports.TrainingData = void 0);
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	QualityInfoAll_1 = require("../../../Core/Define/ConfigQuery/QualityInfoAll"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	MAX_ROLE_SIZE = 3,
	MIN_PROCESS = 0.2;
class TrainingData {
	constructor() {
		(this.NameId = ""),
			(this.FillAmount = -0),
			(this.TipsId = ""),
			(this.Icon = ""),
			(this.BgColor = "");
	}
}
exports.TrainingData = TrainingData;
class TrainingDegreeModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.LDo = -0),
			(this.DDo = void 0),
			(this.RDo = new Map());
	}
	OnInit() {
		(this.LDo = CommonParamById_1.configCommonParamById.GetFloatConfig(
			"RoleTrainingDegreeNormal",
		)),
			(this.DDo = CommonParamById_1.configCommonParamById.GetIntArrayConfig(
				"TrainingDegreeSkillTypes",
			));
		for (const e of QualityInfoAll_1.configQualityInfoAll.GetConfigList())
			this.RDo.set(e.Id, e.TrainingWeight);
		return !0;
	}
	OnClear() {
		return (this.DDo = void 0), this.RDo.clear(), !0;
	}
	GetTrainingDataList() {
		if (!ModelManager_1.ModelManager.GameModeModel.IsMulti) {
			var e = this.UDo();
			if (
				(e =
					ConfigManager_1.ConfigManager.RoleConfig.GetRoleTrainingDegreeConfig(
						e,
					))
			) {
				let c = !0;
				var o = new Array();
				for (const e of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems()) {
					var n = e.GetConfigId;
					(n = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(n)) &&
						(o.push(n), n.IsTrialRole() || (c = !1));
				}
				if (!c) {
					var a = [],
						r = [],
						i = [],
						t = [],
						l = this.DDo.length;
					for (const e of o) {
						var g = this.RDo.get(e.GetRoleConfig().QualityId) ?? 1;
						a.push(e.GetLevelData().GetLevel() * g);
						let o = 0;
						var d,
							s = e.GetSkillData();
						for (const e of s.GetSkillList())
							this.DDo.includes(e.SkillType) && (o += s.GetSkillLevel(e.Id));
						r.push(o / l);
						let n = 0;
						(g =
							ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByRoleDataId(
								e.GetDataId(),
							)) &&
							((d = this.RDo.get(g.GetWeaponConfig().QualityId) ?? 1),
							(n = g.GetLevel() * d)),
							i.push(n),
							(g =
								ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(
									e.GetRoleId(),
								)),
							t.push(g.GetAverageEquipLevel());
					}
					var M,
						f,
						I,
						C,
						D = e.RoleLevel,
						m = e.SkillLevel,
						u = e.WeaponLevel,
						v = ((e = e.EquipLevel), new Array());
					for ([M, f, I, C] of [
						["ReviveTrainingItemRoleLevel", a, D, "SP_IconDeathLevel"],
						["ReviveTrainingItemWeaponLevel", i, u, "SP_IconDeathWeapon"],
						["ReviveTrainingItemEquipLevel", t, e, "SP_IconDeathVision"],
						["ReviveTrainingItemSkillLevel", r, m, "SP_IconDeathTree"],
					])
						if (!(I <= 0)) {
							(h = f.length) > 3 &&
								(f.sort((e, o) => o - e), f.splice(3, h - 3));
							let e = 0;
							for (const o of f) e += o;
							e /= 3;
							var h,
								_ =
									(((h = new TrainingData()).Icon = C),
									(h.NameId =
										ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
											M,
										)),
									e / I);
							(h.FillAmount = _), v.push(h);
						}
					if (!(v.length <= 0)) {
						let e = v[0];
						for (const o of v) o.FillAmount < e.FillAmount && (e = o);
						e.FillAmount < this.LDo &&
							((e.TipsId =
								ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
									"ReviveTrainingItemBad",
								)),
							(e.BgColor = "6a2e2b"));
						for (const e of v)
							e.FillAmount = MathUtils_1.MathUtils.Clamp(e.FillAmount, 0.2, 1);
					}
					return v;
				}
			}
		}
	}
	UDo() {
		var e,
			o = ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
			n = ConfigManager_1.ConfigManager.WorldLevelConfig.GetWorldLevelConfig(o);
		return n
			? ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()
				? (e = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon)
					? 0 <
						(e =
							ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(
								e.Id,
								o,
							))
						? e
						: n.TrainingLevel
					: 1
				: n.TrainingLevel
			: 1;
	}
}
exports.TrainingDegreeModel = TrainingDegreeModel;
