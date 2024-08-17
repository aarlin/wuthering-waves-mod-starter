"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PanelQteResultHandler = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Global_1 = require("../../Global"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	SceneTeamController_1 = require("../SceneTeam/SceneTeamController");
class PanelQteResultHandler {
	Handle(e) {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug(
				"PanelQte",
				18,
				"通用界面QTE结算",
				["qteId", e.QteId],
				["success", e.Success],
			);
		var t = e.Success ? e.Config.SuccessActions : e.Config.FailActions,
			a = t.Num();
		for (let o = 0; o < a; o++) {
			var r = t.Get(o);
			this.kUe(r, e);
		}
	}
	kUe(e, t) {
		let a;
		if ((a = 0 === e.Target ? t.GetSourceEntity() : this.TNi())) {
			let v, G;
			var r = e.AddTags,
				o = r.Num();
			for (let e = 0; e < o; e++) {
				var n = r.Get(e);
				(v = v ?? a.GetComponent(185)).AddTag(n.TagId);
			}
			var l = e.RemoveTags,
				s = l.Num();
			for (let e = 0; e < s; e++) {
				var i = l.Get(e);
				(v = v ?? a.GetComponent(185)).RemoveTag(i.TagId);
			}
			var d = e.AddBuffs,
				u = d.Num();
			if (0 < u) {
				var c = t.GetSourceEntity()?.GetComponent(0).GetCreatureDataId(),
					g = t.PreMessageId;
				if (c)
					for (let e = 0; e < u; e++) {
						var m = d.Get(e);
						(G = G ?? a.GetComponent(157)).AddBuff(m, {
							InstigatorId: c,
							Reason: "界面QTE结算时添加",
							PreMessageId: g,
						});
					}
			}
			var f = e.CustomActions,
				C = f.Num();
			for (let e = 0; e < C; e++) {
				var T = f.Get(e);
				this.LNi(T, t, a);
			}
		}
	}
	LNi(e, t, a) {
		switch (e) {
			case 0:
				var r = a.GetComponent(157);
				r && r.RemoveBuffByEffectType(36, "界面QTE解除冰冻buff");
				break;
			case 1:
				this.DNi();
		}
	}
	DNi() {
		var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem;
		if (0 === e?.CanGoDown(!0)) {
			var t = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(),
				a = t.length,
				r = t.indexOf(e);
			for (let e = 1; e < a; e++) {
				let n = r + e;
				n >= a && (n -= a);
				var o = t[n];
				if (0 === o?.CanGoBattle())
					return void SceneTeamController_1.SceneTeamController.TryChangeRoleOrQte(
						o.GetCreatureDataId(),
					);
			}
		}
	}
	TNi() {
		var e = Global_1.Global.BaseCharacter;
		if (e?.IsValid()) return e.CharacterActorComponent?.Entity;
	}
}
exports.PanelQteResultHandler = PanelQteResultHandler;
