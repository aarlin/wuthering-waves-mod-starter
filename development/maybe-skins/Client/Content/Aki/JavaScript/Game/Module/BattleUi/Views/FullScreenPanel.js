"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FullScreenPanel = void 0);
const puerts_1 = require("puerts"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ScreenEffectSystem_1 = require("../../../Render/Effect/ScreenEffectSystem/ScreenEffectSystem"),
	BattleChildViewPanel_1 = require("./BattleChildViewPanel/BattleChildViewPanel"),
	FullScreenNiagaraItem_1 = require("./FullScreenNiagaraItem");
class FullScreenPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
	constructor() {
		super(...arguments),
			(this.dat = new Map()),
			(this.Cat = new Set()),
			(this.gat = void 0),
			(this.fat = (e) => {
				var t = e.UniqueId,
					a = e.NiagaraPath;
				this.pat(t, a).then(
					(t) => {
						if (t)
							for (var [a, n] of e.GetFloatParameterMap())
								t.SetNiagaraFloatValue(a, n);
					},
					() => {},
				);
			}),
			(this.vat = (e) => {
				(e = e.UniqueId), this.Sat(e), this.Eat(e);
			}),
			(this.yat = () => {
				this.Iat();
			}),
			(this.Tat = (e, t, a) => {
				(e = this.Lat(e)) && e.SetNiagaraFloatValue(t, a);
			});
	}
	InitializeTemp() {
		this.Dat();
	}
	Reset() {
		this.Iat(), this.Rat(), super.Reset();
	}
	AddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnAddFullScreenEffect,
			this.fat,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnRemoveFullScreenEffect,
				this.vat,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnClearFullScreenEffect,
				this.yat,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnChangeFullScreenNiagaraFloatParameter,
				this.Tat,
			);
	}
	RemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnAddFullScreenEffect,
			this.fat,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnRemoveFullScreenEffect,
				this.vat,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnClearFullScreenEffect,
				this.yat,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnChangeFullScreenNiagaraFloatParameter,
				this.Tat,
			);
	}
	Uat(e) {
		this.Cat.add(e);
	}
	Sat(e) {
		this.Cat.delete(e);
	}
	Aat(e) {
		return this.Cat.has(e);
	}
	async pat(e, t) {
		let a = this.Lat(e);
		a || (this.Uat(e), (a = await this.Pat(e)));
		var n = this.Aat(e);
		if ((this.Sat(e), n)) {
			if ((this.dat.set(e, a), await a.LoadNiagara(t), a.GetRootItem()))
				return a.SetVisible(!0), a;
		} else a.Destroy();
	}
	Eat(e) {
		var t = this.Lat(e);
		return !!t && (t.Destroy(), this.dat.delete(e), !0);
	}
	async Pat(e) {
		return await this.NewDynamicChildViewByResourceId(
			this.RootItem,
			"UiItem_FullScreenNiagara",
			FullScreenNiagaraItem_1.FullScreenNiagaraItem,
			!0,
		);
	}
	Lat(e) {
		return this.dat.get(e);
	}
	Iat() {
		if (!(this.dat.size <= 0)) {
			for (const e of this.dat.values()) e.Reset();
			this.dat.clear(), this.Cat.clear();
		}
	}
	Dat() {
		var e = (0, puerts_1.$ref)(void 0),
			t = ScreenEffectSystem_1.ScreenEffectSystem.GetInstance();
		t?.IsValid() &&
			(t.GetScreenEffectFightRoot(e),
			(this.gat = (0, puerts_1.$unref)(e)),
			this.gat?.K2_AttachRootComponentTo(this.RootItem));
	}
	Rat() {
		this.gat?.IsValid() && this.gat.K2_DetachFromActor(), (this.gat = void 0);
	}
}
exports.FullScreenPanel = FullScreenPanel;
