"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, n, o) {
		var a,
			r = arguments.length,
			i =
				r < 3
					? t
					: null === o
						? (o = Object.getOwnPropertyDescriptor(t, n))
						: o;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			i = Reflect.decorate(e, t, n, o);
		else
			for (var s = e.length - 1; 0 <= s; s--)
				(a = e[s]) && (i = (r < 3 ? a(i) : 3 < r ? a(t, n, i) : a(t, n)) || i);
		return 3 < r && i && Object.defineProperty(t, n, i), i;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleTagComponent = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	FormationDataController_1 = require("../../../../Module/Abilities/FormationDataController"),
	BaseTagComponent_1 = require("../../../Common/Component/BaseTagComponent");
let RoleTagComponent = class extends BaseTagComponent_1.BaseTagComponent {
	constructor() {
		super(...arguments),
			(this.OnFormationLoaded = () => {
				var e = this.Entity.GetComponent(0),
					t = e.GetPlayerId(),
					n =
						ModelManager_1.ModelManager.SceneTeamModel.GetTeamItemsByPlayer(t);
				t =
					FormationDataController_1.FormationDataController.GetPlayerEntity(
						t,
					)?.GetComponent(185);
				if (t) {
					n = n.some((e) => e.EntityHandle?.Entity === this.Entity) && t;
					var o,
						a,
						r = new Map();
					if (n) {
						var i = this.TagContainer,
							s = t.TagContainer;
						for (const e of this.TagContainer.GetAllExactTags())
							r.set(e, s.GetExactTagCount(e) - i.GetExactTagCount(e));
						for (const e of t.TagContainer.GetAllExactTags())
							r.has(e) ||
								r.set(e, s.GetExactTagCount(e) - i.GetExactTagCount(e));
					} else
						for (const e of this.TagContainer.GetAllExactTags())
							r.set(e, -this.TagContainer.GetExactTagCount(e));
					for ([o, a] of r.entries()) this.TagContainer.UpdateExactTag(5, o, a);
				} else
					Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"Battle",
							20,
							"RoleTagComponent初始化时找不到对应的PlayerTag组件",
							["PlayerId", e?.GetPlayerId()],
							["Entity", this.Entity.Id],
						);
			});
	}
	OnCreate() {
		return (
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnUpdateSceneTeam,
				this.OnFormationLoaded,
			),
			!0
		);
	}
	OnClear() {
		return (
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnUpdateSceneTeam,
				this.OnFormationLoaded,
			),
			!0
		);
	}
	OnAnyTagChanged(e, t, n) {
		void 0 !== e &&
			n !== t &&
			(super.OnAnyTagChanged(e, t, n),
			(t = this.Entity.GetComponent(0)?.GetPlayerId())) &&
			FormationDataController_1.FormationDataController.GetPlayerEntity(t)
				?.GetComponent(180)
				?.OnTagChanged(e);
	}
};
(RoleTagComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(174)],
	RoleTagComponent,
)),
	(exports.RoleTagComponent = RoleTagComponent);
