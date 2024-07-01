"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, n, o, t) {
		var r,
			a = arguments.length,
			i =
				a < 3
					? n
					: null === t
						? (t = Object.getOwnPropertyDescriptor(n, o))
						: t;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			i = Reflect.decorate(e, n, o, t);
		else
			for (var s = e.length - 1; 0 <= s; s--)
				(r = e[s]) && (i = (a < 3 ? r(i) : 3 < a ? r(n, o, i) : r(n, o)) || i);
		return 3 < a && i && Object.defineProperty(n, o, i), i;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MonsterFrozenComponent = void 0);
const GameplayCueById_1 = require("../../../../../../Core/Define/ConfigQuery/GameplayCueById"),
	RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
	BaseFrozenComponent_1 = require("../../../Common/Component/Abilities/BaseFrozenComponent"),
	frozenCueId = 1003n,
	cancelFrozenCueId = 100302n;
let MonsterFrozenComponent = class extends BaseFrozenComponent_1.BaseFrozenComponent {
	constructor() {
		super(...arguments),
			(this.FrozenHandle = void 0),
			(this.FrozenCueHandle = void 0),
			(this.IsFrozenInternal = !1);
	}
	IsFrozen() {
		return this.IsFrozenInternal;
	}
	SetFrozen(e) {
		var n, o, t;
		this.IsFrozenInternal !== e &&
			((this.IsFrozenInternal = e),
			(n = this.Entity.GetComponent(107)),
			(o = this.Entity.GetComponent(19)),
			(t = this.Entity.GetComponent(185)?.TagContainer),
			e
				? ((this.FrozenHandle =
						this.FrozenHandle ?? n?.SetTimeScale(1 / 0, 0, void 0, 1 / 0, 6)),
					(this.FrozenCueHandle =
						this.FrozenCueHandle ??
						o?.CreateGameplayCue(
							GameplayCueById_1.configGameplayCueById.GetConfig(frozenCueId),
						)),
					t && (t.AddExactTag(6, -752177221), t.AddExactTag(6, 1447214865)))
				: (void 0 !== this.FrozenHandle &&
						(n?.RemoveTimeScale(this.FrozenHandle),
						(this.FrozenHandle = void 0)),
					this.FrozenCueHandle?.Destroy(),
					(this.FrozenCueHandle = o?.CreateGameplayCue(
						GameplayCueById_1.configGameplayCueById.GetConfig(
							cancelFrozenCueId,
						),
						{
							EndCallback: () => {
								this.FrozenCueHandle?.Destroy(),
									(this.FrozenCueHandle = void 0);
							},
						},
					)),
					t && (t.RemoveTag(6, -752177221), t.RemoveTag(6, 1447214865))));
	}
};
(MonsterFrozenComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(166)],
	MonsterFrozenComponent,
)),
	(exports.MonsterFrozenComponent = MonsterFrozenComponent);
