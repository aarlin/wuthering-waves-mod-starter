"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (t, e, n, o) {
		var r,
			i = arguments.length,
			s =
				i < 3
					? e
					: null === o
						? (o = Object.getOwnPropertyDescriptor(e, n))
						: o;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			s = Reflect.decorate(t, e, n, o);
		else
			for (var h = t.length - 1; 0 <= h; h--)
				(r = t[h]) && (s = (i < 3 ? r(s) : 3 < i ? r(e, n, s) : r(e, n)) || s);
		return 3 < i && s && Object.defineProperty(e, n, s), s;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PawnSensoryComponent = void 0);
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	PawnSensoryInfoController_1 = require("../Controllers/PawnSensoryInfoController"),
	TICK_INTERVAL_TIME = 1e3;
let PawnSensoryComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this.Xhn = 0),
			(this.$hn = void 0),
			(this.Yhn = -0),
			(this.Ioe = []),
			(this.Hte = void 0),
			(this.Xrr = Vector_1.Vector.Create());
	}
	OnInit() {
		return (
			(this.Xhn = 0),
			(this.Yhn = 0),
			(this.Hte = this.Entity.GetComponent(1)),
			this.Xrr.DeepCopy(this.Hte.ActorLocationProxy),
			(this.$hn = new PawnSensoryInfoController_1.SensoryInfoController()),
			!0
		);
	}
	AddSensoryInfo(t) {
		return (
			this.Hte || (this.Hte = this.Entity.GetComponent(1)),
			(t = this.$hn.AddSensoryInfo(t)),
			this.Jhn(),
			t
		);
	}
	RemoveSensoryInfo(t) {
		this.$hn.RemoveSensoryInfo(t), this.Jhn();
	}
	Jhn() {
		var t = this.$hn.MaxSensoryRange;
		this.Xhn !== t && (this.Xhn = t);
	}
	OnTick(t) {
		this.Hte &&
			this.$hn &&
			0 !== this.$hn.SensoryInfoType &&
			(this.$hn.Tick(t),
			(this.Yhn += t),
			this.Yhn < 1e3 ||
				((this.Yhn = 0),
				this.Ioe &&
					(this.Xrr.Equals(this.Hte.ActorLocationProxy) ||
						this.Xrr.DeepCopy(this.Hte.ActorLocationProxy),
					ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRangeWithLocation(
						this.Hte.ActorLocationProxy,
						this.Xhn,
						3,
						this.Ioe,
					),
					this.$hn.HandleEntities(
						this.Ioe,
						this.Hte.ActorLocationProxy,
						this.Entity.Id,
					))));
	}
	OnClear() {
		return (this.Ioe.length = 0), this.$hn?.Clear(), !0;
	}
};
(PawnSensoryComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(105)],
	PawnSensoryComponent,
)),
	(exports.PawnSensoryComponent = PawnSensoryComponent);
