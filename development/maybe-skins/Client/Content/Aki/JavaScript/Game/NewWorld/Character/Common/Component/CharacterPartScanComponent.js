"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (t, e, n, r) {
		var o,
			a = arguments.length,
			c =
				a < 3
					? e
					: null === r
						? (r = Object.getOwnPropertyDescriptor(e, n))
						: r;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			c = Reflect.decorate(t, e, n, r);
		else
			for (var f = t.length - 1; 0 <= f; f--)
				(o = t[f]) && (c = (a < 3 ? o(c) : 3 < a ? o(e, n, c) : o(e, n)) || c);
		return 3 < a && c && Object.defineProperty(e, n, c), c;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharacterPartScanComponent = void 0);
const UE = require("ue"),
	EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
	EffectContext_1 = require("../../../../Effect/EffectContext/EffectContext"),
	EffectSystem_1 = require("../../../../Effect/EffectSystem"),
	GlobalData_1 = require("../../../../GlobalData"),
	RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
let CharacterPartScanComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this.Ajr = void 0),
			(this.nXt = void 0),
			(this.Ujr = void 0);
	}
	OnInit() {
		return (
			(this.Ajr = this.Entity.GetComponent(58)),
			(this.nXt = this.Entity.GetComponent(3)),
			(this.Ujr = this.nXt.Actor.CharRenderingComponent),
			!0
		);
	}
	ShowScanEffect() {
		if (this.Ajr.IsMultiPart)
			for (const e of this.Ajr.Parts) {
				var t;
				e?.ScanEffect &&
					"None" !== e?.ScanEffect &&
					((t = EffectSystem_1.EffectSystem.SpawnEffect(
						GlobalData_1.GlobalData.GameInstance,
						new UE.Transform(),
						e.ScanEffect,
						"[CharacterPartScanComponent.ShowScanEffect]",
						new EffectContext_1.EffectContext(this.Entity.Id),
					)),
					EffectSystem_1.EffectSystem.IsValid(t)) &&
					(t = EffectSystem_1.EffectSystem.GetEffectActor(t))?.IsValid() &&
					t.K2_AttachToComponent(
						this.nXt.Actor.Mesh,
						e.ScanEffectSocketName,
						0,
						0,
						0,
						!1,
					),
					e.ScanMaterialEffect &&
						this.Ujr &&
						this.Ujr.CheckInit() &&
						this.Ujr.AddMaterialControllerData(e.ScanMaterialEffect);
			}
	}
};
(CharacterPartScanComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(59)],
	CharacterPartScanComponent,
)),
	(exports.CharacterPartScanComponent = CharacterPartScanComponent);
