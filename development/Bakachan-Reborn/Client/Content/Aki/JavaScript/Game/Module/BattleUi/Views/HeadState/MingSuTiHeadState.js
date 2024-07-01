"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MingSuTiHeadState = void 0);
const UE = require("ue"),
	HeadStateViewBase_1 = require("./HeadStateViewBase");
class MingSuTiHeadState extends HeadStateViewBase_1.HeadStateViewBase {
	constructor() {
		super(...arguments), (this.g1t = void 0), (this.f1t = 0);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UISprite],
			[2, UE.UISprite],
			[3, UE.UISprite],
			[4, UE.UISprite],
			[5, UE.UISprite],
			[6, UE.UISprite],
			[7, UE.UISprite],
			[8, UE.UISprite],
			[9, UE.UISprite],
			[10, UE.UISprite],
			[11, UE.UISprite],
			[12, UE.UISprite],
			[13, UE.UISprite],
			[14, UE.UISprite],
			[15, UE.UISprite],
			[16, UE.UISprite],
			[17, UE.UISprite],
			[18, UE.UISprite],
			[19, UE.UISprite],
			[20, UE.UISprite],
		];
	}
	GetResourceId() {
		return "UiItem_MingsutiState_Prefab";
	}
	OnStart() {
		this.g1t = [
			this.GetSprite(1),
			this.GetSprite(2),
			this.GetSprite(3),
			this.GetSprite(4),
			this.GetSprite(5),
			this.GetSprite(6),
			this.GetSprite(7),
			this.GetSprite(8),
			this.GetSprite(9),
			this.GetSprite(10),
			this.GetSprite(11),
			this.GetSprite(12),
			this.GetSprite(13),
			this.GetSprite(14),
			this.GetSprite(15),
			this.GetSprite(16),
			this.GetSprite(17),
			this.GetSprite(18),
			this.GetSprite(19),
			this.GetSprite(20),
		];
	}
	ActiveBattleHeadState(t) {
		super.ActiveBattleHeadState(t), this.Cnt(), this.Aht(), this.p1t();
	}
	OnHealthChanged(t) {
		this.HeadStateData.GetEntityId() === t && this.Cnt();
	}
	v1t(t) {
		return this.g1t[t];
	}
	Cnt() {
		var [t, e] = this.GetHpAndMaxHp();
		if (this.f1t !== t) {
			this.f1t = t;
			for (let r = 0; r < Math.floor(e); r++) {
				var i = this.v1t(r);
				i && r < t !== i.bIsUIActive && i.SetUIActive(r < t);
			}
		}
	}
	p1t() {
		for (let e = this.GetMaxHp(); e < this.g1t.length; e++) {
			var t = this.v1t(e);
			t && t.GetParentAsUIItem().SetUIActive(!1);
		}
	}
	Aht() {
		var t = this.GetHpColor();
		if (t) {
			var e = UE.Color.FromHex(t);
			for (const t of this.g1t) t.SetColor(e);
		}
	}
}
exports.MingSuTiHeadState = MingSuTiHeadState;
