"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiTaunt = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	TAUNT_VALUE = 1e9;
class AiTaunt {
	constructor(e) {
		(this.Bte = e),
			(this.Lre = void 0),
			(this.Dre = void 0),
			(this.Rre = void 0),
			(this.Ure = (e, t, i) => {
				e
					? (-1 !== this.Dre && this.Lre.RemoveHateListForTaunt(this.Dre),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"AI",
								58,
								"[AiTaunt]设置新的嘲讽对象：",
								["被嘲讽者", this.Bte.CharAiDesignComp.Entity.Id],
								["嘲讽者", t],
							),
						this.Lre.AddNewHateListForTaunt(t, 1e9),
						(this.Dre = t),
						(this.Rre = i))
					: i === this.Rre &&
						(this.Are(), Log_1.Log.CheckInfo()) &&
						Log_1.Log.Info(
							"AI",
							58,
							"[AiTaunt]嘲讽时效结束：",
							["被嘲讽者", this.Bte.CharAiDesignComp.Entity.Id],
							["嘲讽者", t],
						);
			}),
			(this.xre = (e, t) => {
				-1 !== this.Dre &&
					e !== this.Dre &&
					(this.ClearCurrentTauntAndGe(), Log_1.Log.CheckInfo()) &&
					Log_1.Log.Info(
						"AI",
						58,
						"[AiTaunt]更高机制使之仇恨目标更改，嘲讽结束：",
						["被嘲讽者", this.Bte.CharAiDesignComp.Entity.Id],
					);
			});
	}
	Init(e) {
		(this.Lre = e), (this.Dre = -1), (this.Rre = void 0), this.BindEvent();
	}
	Tick() {
		if (this.Dre && -1 !== this.Dre) {
			let i = !0;
			var e,
				t = EntitySystem_1.EntitySystem.Get(this.Dre);
			(i =
				!(
					!t?.Active ||
					((e = t.GetComponent(158))?.Valid && !e.IsInGame && (i = !1),
					(e = t.GetComponent(185))?.Valid || (i = !1),
					e.HasTag(1008164187))
				) && i) ||
				(Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"AI",
						58,
						"[AiTaunt]嘲讽施加者目前失效或者死亡，导致嘲讽结束：",
						["被嘲讽者", this.Bte.CharAiDesignComp.Entity.Id],
						["嘲讽者", this.Dre],
					),
				this.ClearCurrentTauntAndGe());
		}
	}
	Clear() {
		this.ClearCurrentTauntAndGe(),
			(this.Lre = void 0),
			(this.Dre = void 0),
			(this.Rre = void 0),
			this.UnBindEvent();
	}
	Are() {
		this.Dre && this.Lre && this.Lre.RemoveHateListForTaunt(this.Dre),
			(this.Dre = -1),
			(this.Rre = void 0);
	}
	Reset(e) {
		this.Clear(), this.Init(e);
	}
	ClearCurrentTauntAndGe() {
		this.Bte.CharAiDesignComp.Entity.GetComponent(157)?.RemoveBuffByHandle(
			this.Rre,
		),
			this.Are();
	}
	BindEvent() {
		this.Bte.CharAiDesignComp.Valid &&
			(EventSystem_1.EventSystem.AddWithTarget(
				this.Bte.CharAiDesignComp.Entity,
				EventDefine_1.EEventName.AiTauntAddOrRemove,
				this.Ure,
			),
			EventSystem_1.EventSystem.AddWithTarget(
				this.Bte.CharAiDesignComp.Entity,
				EventDefine_1.EEventName.AiHateTargetChanged,
				this.xre,
			));
	}
	UnBindEvent() {
		var e = this.Bte.CharAiDesignComp?.Entity;
		e &&
			(EventSystem_1.EventSystem.HasWithTarget(
				e,
				EventDefine_1.EEventName.AiTauntAddOrRemove,
				this.Ure,
			) &&
				EventSystem_1.EventSystem.RemoveWithTarget(
					e,
					EventDefine_1.EEventName.AiTauntAddOrRemove,
					this.Ure,
				),
			EventSystem_1.EventSystem.HasWithTarget(
				e,
				EventDefine_1.EEventName.AiHateTargetChanged,
				this.xre,
			)) &&
			EventSystem_1.EventSystem.RemoveWithTarget(
				e,
				EventDefine_1.EEventName.AiHateTargetChanged,
				this.xre,
			);
	}
}
exports.AiTaunt = AiTaunt;
