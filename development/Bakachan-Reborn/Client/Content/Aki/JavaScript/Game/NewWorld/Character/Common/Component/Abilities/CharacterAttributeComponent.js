"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (t, e, r, n) {
		var i,
			a = arguments.length,
			o =
				a < 3
					? e
					: null === n
						? (n = Object.getOwnPropertyDescriptor(e, r))
						: n;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			o = Reflect.decorate(t, e, r, n);
		else
			for (var s = t.length - 1; 0 <= s; s--)
				(i = t[s]) && (o = (a < 3 ? i(o) : 3 < a ? i(e, r, o) : i(e, r)) || o);
		return 3 < a && o && Object.defineProperty(e, r, o), o;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharacterAttributeComponent = void 0);
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
	MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../../../Manager/ModelManager"),
	FormationAttributeController_1 = require("../../../../../Module/Abilities/FormationAttributeController"),
	CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage"),
	BaseAttributeComponent_1 = require("./BaseAttributeComponent"),
	CharacterAttributeTypes_1 = require("./CharacterAttributeTypes"),
	energyAttrIds = [
		CharacterAttributeTypes_1.EAttributeId.Proto_Energy,
		CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy1,
		CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy2,
		CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy3,
		CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy4,
	];
let CharacterAttributeComponent = class extends BaseAttributeComponent_1.BaseAttributeComponent {
	constructor() {
		super(...arguments),
			(this.elt = void 0),
			(this.sqr = (t, e, r) => {
				(CharacterAttributeTypes_1.stateAttributeIds.has(t) ||
					[...CharacterAttributeTypes_1.attributeIdsWithMax.values()].some(
						(e) => e === t,
					)) &&
					this.aqr?.InternalApplyModToAttribute(t, 3, r);
			}),
			(this.aqr = void 0),
			(this.hqr = (t, e, r) => {
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.CharOnHealthChanged,
					this.Entity.Id,
					e,
					r,
				);
			}),
			(this.lqr = (t, e, r) => {
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.CharOnHealthMaxChanged,
					this.Entity.Id,
					e,
					r,
				);
			}),
			(this._qr = (t, e, r) => {
				EventSystem_1.EventSystem.EmitWithTarget(
					this.Entity,
					EventDefine_1.EEventName.CharOnEnergyChanged,
					t,
					e,
					r,
				);
			});
	}
	OnInitData() {
		return (
			this.H9s(),
			this.AddListener(
				CharacterAttributeTypes_1.EAttributeId.Proto_Life,
				this.hqr,
			),
			this.AddListener(CharacterAttributeTypes_1.EAttributeId.Tkn, this.lqr),
			this.AddListeners(energyAttrIds, this._qr),
			this.AddGeneralListener(this.sqr),
			!0
		);
	}
	OnActivate() {
		this.H9s();
	}
	H9s() {
		var t =
			this.Entity.CheckGetComponent(0)?.ComponentDataMap.get("qvs")?.qvs?.e$s;
		if (void 0 !== t) {
			var e = new Map(),
				r = [],
				n = this.Init();
			for (const s of t) {
				var i = s.Ugs,
					a = s.z7s,
					o = s.Z7s ?? 0;
				0 !== o ? e.set(i, o) : r.push(i),
					(this.BaseValues[i] = a),
					n || (this.CurrentValues[i] = a + o);
			}
			if (n) for (const t of r) this.UpdateCurrentValue(t);
			this.elt?.Init() && this.elt.UpdateSysGrowBuff(e);
		}
	}
	static AttributeChangedNotify(t, e) {
		var r = MathUtils_1.MathUtils.LongToNumber(e.Ekn),
			n =
				((r = ModelManager_1.ModelManager.CreatureModel.GetEntity(r)),
				r?.Entity?.GetComponent(156));
		if (r && n) {
			for (const t of e.dfs)
				CharacterAttributeTypes_1.stateAttributeIds.has(t.Ugs) &&
					(t.NFn = t.Pgs),
					t.Ugs && n.SyncValueFromServer(t.Ugs, t.Pgs, t.NFn);
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnServerAttributeChange,
				r.Id,
				e,
			);
		}
	}
	static RecoverPropChangedNotify(t, e) {
		var r = MathUtils_1.MathUtils.LongToNumber(e.Ekn),
			n =
				ModelManager_1.ModelManager.CreatureModel.GetEntity(
					r,
				)?.Entity?.GetComponent(156);
		if (n) {
			var i =
				FormationAttributeController_1.FormationAttributeController.GetPredictedServerStopTime() -
				Number(MathUtils_1.MathUtils.LongToBigInt(e.GFn));
			for (const t of e.dfs)
				n.SyncRecoverPropFromServer(t.OFn, t.NFn, t.kFn, t.VFn, Number(i));
		}
	}
	OnInit() {
		return (this.elt = this.Entity.CheckGetComponent(157)), !0;
	}
	OnStart() {
		this.H9s();
		var t = this.Entity.CheckGetComponent(3);
		this.aqr = t?.Actor.AbilitySystemComponent;
		for (const t of CharacterAttributeTypes_1.stateAttributeIds.values())
			this.aqr?.InternalApplyModToAttribute(t, 3, this.GetCurrentValue(t));
		for (const t of CharacterAttributeTypes_1.attributeIdsWithMax.values())
			this.aqr?.InternalApplyModToAttribute(t, 3, this.GetCurrentValue(t));
		return !0;
	}
	OnEnd() {
		return (
			this.RemoveListener(
				CharacterAttributeTypes_1.EAttributeId.Proto_Life,
				this.hqr,
			),
			this.RemoveListener(CharacterAttributeTypes_1.EAttributeId.Tkn, this.lqr),
			this.RemoveListeners(energyAttrIds, this._qr),
			this.RemoveGeneralListener(this.sqr),
			!0
		);
	}
	OnClear() {
		return !0;
	}
};
__decorate(
	[CombatMessage_1.CombatNet.SyncHandle("e2n")],
	CharacterAttributeComponent,
	"AttributeChangedNotify",
	null,
),
	__decorate(
		[CombatMessage_1.CombatNet.SyncHandle("b2n")],
		CharacterAttributeComponent,
		"RecoverPropChangedNotify",
		null,
	),
	(CharacterAttributeComponent = __decorate(
		[(0, RegisterComponent_1.RegisterComponent)(156)],
		CharacterAttributeComponent,
	)),
	(exports.CharacterAttributeComponent = CharacterAttributeComponent);
