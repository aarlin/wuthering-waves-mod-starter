"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, i, n) {
		var o,
			m = arguments.length,
			a =
				m < 3
					? t
					: null === n
						? (n = Object.getOwnPropertyDescriptor(t, i))
						: n;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			a = Reflect.decorate(e, t, i, n);
		else
			for (var c = e.length - 1; 0 <= c; c--)
				(o = e[c]) && (a = (m < 3 ? o(a) : 3 < m ? o(t, i, a) : o(t, i)) || a);
		return 3 < m && a && Object.defineProperty(t, i, a), a;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneItemTimeScaleComponent = void 0);
const Time_1 = require("../../../Core/Common/Time"),
	RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
	PawnTimeScaleComponent_1 = require("../Pawn/Component/PawnTimeScaleComponent");
let SceneItemTimeScaleComponent = class extends PawnTimeScaleComponent_1.PawnTimeScaleComponent {
	constructor() {
		super(...arguments), (this.Rne = void 0);
	}
	OnStart() {
		return (
			!!super.OnStart() &&
			((this.TimeScaleList && !this.TimeScaleList.Empty) ||
				this.gSn(!1, "[PawnTimeScaleComponent] OnStart, 初始关闭时间缩放"),
			!0)
		);
	}
	gSn(e, t) {
		e && void 0 !== this.Rne
			? this.Enable(
					this.Rne,
					"SceneItemTimeScaleComponent.SetTimeScaleTicking",
				) && (this.Rne = void 0)
			: e ||
				void 0 !== this.Rne ||
				(this.Rne = this.Disable(t ?? "[PawnTimeScaleComponent] 关闭Tick"));
	}
	OnTick(e) {
		var t = Time_1.Time.WorldTimeSeconds;
		let i = 1;
		for (; !this.TimeScaleList.Empty; ) {
			var n = this.TimeScaleList.Top;
			if (!n) break;
			if (n.EndTime > t && !n.MarkDelete) {
				i = n.CalculateTimeScale();
				break;
			}
			this.TimeScaleMap.delete(n.Id), this.TimeScaleList.Pop();
		}
		i !== this.TimeScaleInternal &&
			((this.TimeScaleInternal = i),
			this.Entity.SetTimeDilation(this.TimeDilation)),
			this.TimeScaleList.Empty &&
				this.gSn(!1, "[PawnTimeScaleComponent] 时间缩放结束");
	}
	SetTimeScale(e, t, i, n, o) {
		return 0 <= (e = super.SetTimeScale(e, t, i, n, o)) && this.gSn(!0), e;
	}
};
(SceneItemTimeScaleComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(184)],
	SceneItemTimeScaleComponent,
)),
	(exports.SceneItemTimeScaleComponent = SceneItemTimeScaleComponent);
