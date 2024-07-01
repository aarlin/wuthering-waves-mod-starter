"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.battleStat =
		exports.BATTLESTAT_GROUP =
		exports.BATTLESTAT_ENABLED =
			void 0);
const Stats_1 = require("../../Core/Common/Stats");
(exports.BATTLESTAT_ENABLED = !0),
	(exports.BATTLESTAT_GROUP = "STATGROUP_KuroBattle"),
	(exports.battleStat = (function () {
		var t = {
				BattleTotal: ["JS Total (ms)", 3],
				BulletTick: ["Bullet Tick"],
				BulletAfterTick: ["Bullet AfterTick"],
				MonsterTick: ["Monster Tick"],
				FightCameraTick: ["FightCamera Tick"],
				BulletCreate: ["Bullet Create"],
				BulletDestroy: ["Bullet Destroy"],
			},
			e = {};
		for (const r in t) {
			var T = t[r];
			e[r] = Stats_1.Stat.CreateStatOfType(
				T[1] ?? 1,
				T[0],
				"",
				exports.BATTLESTAT_GROUP,
			);
		}
		return e;
	})());
