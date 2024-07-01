"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LoadingShowData = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager");
class LoadingShowData {
	constructor() {
		(this._pi = []),
			(this.upi = 0),
			(this.cpi = 0),
			(this.mpi = []),
			(this.oTt = 0);
	}
	Initialize() {
		this.Cpi(),
			(this.mpi = [...this._pi]),
			(this.cpi = this.mpi.reduce((e, i) => e + i.Weight, 0));
	}
	gpi(e) {
		var i = new Set();
		for (const t of e) i.add(t.ImageId);
		e = Array.from(i.values());
		var t = Math.random();
		return e[Math.round(t * (e.length - 1))];
	}
	Cpi() {
		var e = [];
		for (const i of this.fpi())
			e.push(
				...ConfigManager_1.ConfigManager.LoadingConfig.GetLoadingTipsTextList(
					i,
				),
			);
		(this.upi = this.gpi(e)), (this._pi = []);
		for (const i of e) i.ImageId === this.upi && this._pi.push(i);
	}
	fpi() {
		const e = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerLevel();
		var i = ConfigManager_1.ConfigManager.LoadingConfig.GetLevelArea();
		const t = ModelManager_1.ModelManager.GameModeModel.MapId;
		let r = ModelManager_1.ModelManager.AreaModel.GetCurrentAreaId();
		ModelManager_1.ModelManager.LoadingModel.TargetTeleportId &&
			(a =
				ConfigManager_1.ConfigManager.WorldMapConfig.GetTeleportEntityConfigId(
					ModelManager_1.ModelManager.LoadingModel.TargetTeleportId,
				)) &&
			void 0 !==
				(a = ModelManager_1.ModelManager.CreatureModel?.GetEntityData(a)) &&
			(r = a.AreaId);
		var a = i.filter((i) => {
				var a, o, n;
				return (
					1 !== i.Id &&
					((a = e >= i.LevelRange[0] && e <= i.LevelRange[1]),
					(o = i.AreaId.includes(r)),
					(n = i.MapId.includes(t)),
					(i =
						0 === i.ConditionGroup ||
						ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(
							i.ConditionGroup.toString(),
							void 0,
						)),
					a) &&
					(o || n) &&
					i
				);
			}),
			o = a.filter((e) => e.IsLimitShow);
		a = a.filter((e) => !e.IsLimitShow);
		return 0 < o.length &&
			0 <
				o.filter(
					(e) => (
						(e = ModelManager_1.ModelManager.ActivityModel?.GetActivityById(
							e.ActivityId,
						)),
						void 0 !== e && e.CheckIfInOpenTime()
					),
				).length
			? o.map((e) => e.Id)
			: 0 === a.length
				? [i[0].Id]
				: a.map((e) => e.Id);
	}
	ppi() {
		let e = this.cpi * Math.random();
		for (let t = 0; t < this.mpi.length; ++t) {
			var i = this.mpi[t];
			if (!(e > i.Weight)) return t;
			e -= i.Weight;
		}
		return 0;
	}
	GetNextTip() {
		if (0 !== this._pi.length) {
			if (1 === this._pi.length) return this._pi[0];
			let e = -1;
			for (; (e = this.ppi()) === this.oTt; );
			return (this.oTt = e), this._pi[this.oTt];
		}
	}
	GetImageId() {
		return this.upi;
	}
}
exports.LoadingShowData = LoadingShowData;
