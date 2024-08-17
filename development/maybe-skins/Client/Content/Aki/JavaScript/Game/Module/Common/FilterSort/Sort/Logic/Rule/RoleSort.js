"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleSort = void 0);
const ModelManager_1 = require("../../../../../../Manager/ModelManager"),
	RoleDefine_1 = require("../../../../../RoleUi/RoleDefine"),
	CommonSort_1 = require("./CommonSort");
class RoleSort extends CommonSort_1.CommonSort {
	constructor() {
		super(...arguments),
			(this.ZLt = (e, t, r) => (
				(e = e.GetLevelData()),
				(t = t.GetLevelData()),
				e.GetLevel() !== t.GetLevel()
					? (t.GetLevel() - e.GetLevel()) * (r ? -1 : 1)
					: e.GetBreachLevel() !== t.GetBreachLevel()
						? (t.GetBreachLevel() - e.GetBreachLevel()) * (r ? -1 : 1)
						: void 0
			)),
			(this.VLt = (e, t, r) => {
				if (
					(e = e.GetRoleConfig().QualityId) !==
					(t = t.GetRoleConfig().QualityId)
				)
					return (t - e) * (r ? -1 : 1);
			}),
			(this.jDt = (e, t, r) => {
				var o = e,
					a = t;
				let i = -1,
					s = -1;
				var n = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems();
				for (let e = 0; e < n.length; e++) {
					var l = n[e];
					o.GetDataId() === l.GetConfigId && (i = e),
						a.GetDataId() === l.GetConfigId && (s = e);
				}
				if (((e = void 0 !== n[i]), (t = void 0 !== n[s]), e || t))
					return e != t ? (t ? 1 : 0) - (e ? 1 : 0) : i - s;
			}),
			(this.WDt = (e, t, r) => {
				if (e.GetRoleConfig().Priority !== t.GetRoleConfig().Priority)
					return (
						(t.GetRoleConfig().Priority - e.GetRoleConfig().Priority) *
						(r ? -1 : 1)
					);
			}),
			(this.KDt = (e, t, r) => {
				if (
					((e = e.GetResonanceData()),
					(t = t.GetResonanceData()),
					(e = e.GetResonantChainGroupIndex()) !==
						(t = t.GetResonantChainGroupIndex()))
				)
					return (t - e) * (r ? -1 : 1);
			}),
			(this.QDt = (e, t, r) => {
				if (
					((e = e.GetResonanceData()),
					(t = t.GetResonanceData()),
					(e = e.GetResonanceIncreaseLevel()) !==
						(t = t.GetResonanceIncreaseLevel()))
				)
					return (t - e) * (r ? -1 : 1);
			}),
			(this.XDt = (e, t, r) => {}),
			(this.$Dt = (e, t, r) => {
				(e = e.GetFavorData()), (t = t.GetFavorData());
				var o = e.GetFavorLevel(),
					a = t.GetFavorLevel();
				if (e && t)
					return o !== a
						? (a - o) * (r ? -1 : 1)
						: (a = e.GetFavorExp()) !== (o = t.GetFavorExp())
							? (o - a) * (r ? -1 : 1)
							: void 0;
			}),
			(this.YDt = (e, t, r) => {
				if ((e = e.GetRoleCreateTime()) !== (t = t.GetRoleCreateTime()))
					return (t - e) * (r ? -1 : 1);
			}),
			(this.JDt = (e, t, r) => {
				if (
					((e = e.GetAttributeData()),
					(t = t.GetAttributeData()),
					(e = e.GetAttrValueById(RoleDefine_1.HP_ATTR_ID)) !==
						(t = t.GetAttrValueById(RoleDefine_1.HP_ATTR_ID)))
				)
					return (t - e) * (r ? -1 : 1);
			}),
			(this.zDt = (e, t, r) => {
				if (
					((e = e.GetAttributeData()),
					(t = t.GetAttributeData()),
					(e = e.GetAttrValueById(RoleDefine_1.ATTACK_ATTR_ID)) !==
						(t = t.GetAttrValueById(RoleDefine_1.ATTACK_ATTR_ID)))
				)
					return (t - e) * (r ? -1 : 1);
			}),
			(this.ZDt = (e, t, r) => {
				if (
					((e = e.GetAttributeData()),
					(t = t.GetAttributeData()),
					(e = e.GetAttrValueById(RoleDefine_1.DEF_ATTR_ID)) !==
						(t = t.GetAttrValueById(RoleDefine_1.DEF_ATTR_ID)))
				)
					return (t - e) * (r ? -1 : 1);
			}),
			(this.eRt = (e, t, r) => {
				var o = ModelManager_1.ModelManager.RoleSelectModel;
				(e = e.GetDataId()),
					(t = t.GetDataId()),
					(e = o.GetRoleIndex(e)),
					(o = o.GetRoleIndex(t));
				return e <= 0 || o <= 0
					? (o ? 1 : 0) - (e ? 1 : 0)
					: e !== o
						? e - o
						: void 0;
			}),
			(this.tRt = (e, t, r) => {
				if ((e = e.IsTrialRole()) !== (t = t.IsTrialRole()))
					return ((t ? 1 : 0) - (e ? 1 : 0)) * (r ? -1 : 1);
			}),
			(this.iRt = (e, t, r) => {
				var o =
					ModelManager_1.ModelManager.TowerModel.CurrentSelectDifficulties;
				return (
					(ModelManager_1.ModelManager.TowerModel.GetRoleRemainCost(
						e.GetRoleId(),
						o,
					) -
						ModelManager_1.ModelManager.TowerModel.GetRoleRemainCost(
							t.GetRoleId(),
							o,
						)) *
					(r ? -1 : 1)
				);
			});
	}
	OnInitSortMap() {
		this.SortMap.set(1, this.ZLt),
			this.SortMap.set(2, this.VLt),
			this.SortMap.set(3, this.jDt),
			this.SortMap.set(4, this.WDt),
			this.SortMap.set(5, this.KDt),
			this.SortMap.set(6, this.QDt),
			this.SortMap.set(7, this.XDt),
			this.SortMap.set(8, this.$Dt),
			this.SortMap.set(9, this.YDt),
			this.SortMap.set(10, this.JDt),
			this.SortMap.set(11, this.zDt),
			this.SortMap.set(12, this.ZDt),
			this.SortMap.set(13, this.eRt),
			this.SortMap.set(14, this.eRt),
			this.SortMap.set(15, this.tRt),
			this.SortMap.set(16, this.iRt);
	}
}
exports.RoleSort = RoleSort;
