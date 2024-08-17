"use strict";
var UeComponentTickManageComponent_1,
	__decorate =
		(this && this.__decorate) ||
		function (e, t, n, o) {
			var i,
				s = arguments.length,
				r =
					s < 3
						? t
						: null === o
							? (o = Object.getOwnPropertyDescriptor(t, n))
							: o;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
				r = Reflect.decorate(e, t, n, o);
			else
				for (var a = e.length - 1; 0 <= a; a--)
					(i = e[a]) &&
						(r = (s < 3 ? i(r) : 3 < s ? i(t, n, r) : i(t, n)) || r);
			return 3 < s && r && Object.defineProperty(t, n, r), r;
		};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UeComponentTickManageComponent = void 0);
const UE = require("ue"),
	EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
let UeComponentTickManageComponent =
	(UeComponentTickManageComponent_1 = class extends (
		EntityComponent_1.EntityComponent
	) {
		constructor() {
			super(...arguments), (this.Nsn = new Array()), (this.QFr = new Array());
		}
		static get Dependencies() {
			return [1];
		}
		OnInitData(e) {
			for (const t of e.GetParam(UeComponentTickManageComponent_1))
				t instanceof UE.Class && this.Nsn.push(t);
			return !0;
		}
		OnActivate() {
			const e = this.Entity.GetComponent(1);
			if (0 < this.Nsn.length)
				for (const o of this.Nsn) {
					var t = e.Owner.K2_GetComponentsByClass(o),
						n = t.Num();
					for (let e = 0; e < n; ++e) {
						const n = t.Get(e);
						n instanceof UE.SkeletalMeshComponent ||
							!n.IsComponentTickEnabled() ||
							(this.QFr.push(n), n.SetComponentTickEnabled(!1));
					}
				}
			else {
				var o = e.Owner.K2_GetComponentsByClass(
						UE.ActorComponent.StaticClass(),
					),
					i = o.Num();
				for (let e = 0; e < i; ++e) {
					const t = o.Get(e);
					t instanceof UE.SkeletalMeshComponent ||
						!t.IsComponentTickEnabled() ||
						(this.QFr.push(t), t.SetComponentTickEnabled(!1));
				}
			}
		}
		OnTick(e) {
			var t = this.Entity.GetComponent(2).Actor.CustomTimeDilation,
				n = e * MathUtils_1.MathUtils.MillisecondToSecond * t;
			for (const e of this.QFr) e.KuroTickComponentOutside(n);
		}
	});
(UeComponentTickManageComponent = UeComponentTickManageComponent_1 =
	__decorate(
		[(0, RegisterComponent_1.RegisterComponent)(97)],
		UeComponentTickManageComponent,
	)),
	(exports.UeComponentTickManageComponent = UeComponentTickManageComponent);
