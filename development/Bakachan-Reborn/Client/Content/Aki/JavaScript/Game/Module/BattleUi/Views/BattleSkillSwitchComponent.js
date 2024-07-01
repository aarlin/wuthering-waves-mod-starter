"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ItemUseComponent = exports.BattleSkillSwitchComponent = void 0);
const UE = require("ue"),
	Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
	GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
	rotatorAngles = [90, 45, 0, -45, -90, -135, -180];
class BattleSkillSwitchComponent extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.lit = -1),
			(this._it = Rotator_1.Rotator.Create()),
			(this.uit = void 0),
			(this.nit = new Map()),
			(this.cit = () => new ItemUseComponent());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UISprite],
			[2, UE.UIItem],
			[3, UE.UIText],
			[4, UE.UIHorizontalLayout],
		];
	}
	OnStart() {
		this.uit = new GenericLayout_1.GenericLayout(
			this.GetHorizontalLayout(4),
			this.cit,
		);
		for (const t of this.nit.values()) t();
	}
	OnBeforeDestroy() {
		this.nit.clear();
	}
	SetComponentActive(t) {
		var e = () => {
			this.SetActive(t);
		};
		this.InAsyncLoading() ? this.nit.set("SetActive", e) : e();
	}
	RefreshSwitch() {
		var t = () => {
			var t = ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId,
				e =
					ModelManager_1.ModelManager.RouletteModel.ExploreSkillIdList.indexOf(
						t,
					);
			0 <= e
				? this.UpdateSwitch(e)
				: (3002 !== t && 3001 !== t) || this.UpdateItemGridSwitch();
		};
		this.InAsyncLoading() ? this.nit.set("RefreshComponent", t) : t();
	}
	UpdateSwitch(t) {
		var e;
		this.lit === t ||
			t < 0 ||
			t >= rotatorAngles.length ||
			((e = () => {
				this.GetSprite(1).SetUIActive(!1);
				var e = this.GetSprite(0),
					i =
						(e.SetUIActive(!0),
						(this._it.Yaw = rotatorAngles[t]),
						this._it.ToUeRotator());
				e.SetUIRelativeRotation(i), (this.lit = t);
			}),
			this.InAsyncLoading() ? this.nit.set("UpdateSwitch", e) : e());
	}
	UpdateItemGridSwitch() {
		var t = () => {
			this.GetSprite(0).SetUIActive(!1),
				this.GetSprite(1).SetUIActive(!0),
				(this.lit = -1);
		};
		this.InAsyncLoading() ? this.nit.set("UpdateSwitchByAngle", t) : t();
	}
	UpdateNumPanel(t, e) {
		var i = () => {
			this.GetItem(2).SetUIActive(t),
				t && void 0 !== e && this.GetText(3).SetText(e.toString());
		};
		this.InAsyncLoading() ? this.nit.set("UpdateNumPanel", i) : i();
	}
	UpdatePointPanel(t, e, i) {
		var o = () => {
			var o, n;
			this.GetHorizontalLayout(4).RootUIComp.SetUIActive(t),
				!t ||
					void 0 === e ||
					void 0 === i ||
					e < i ||
					((n = new Array(e - i).fill(!0)),
					(o = new Array(i).fill(!1)),
					(n = n.concat(o)),
					this.uit.RefreshByData(n));
		};
		this.InAsyncLoading() ? this.nit.set("UpdatePointPanel", o) : o();
	}
}
exports.BattleSkillSwitchComponent = BattleSkillSwitchComponent;
class ItemUseComponent extends GridProxyAbstract_1.GridProxyAbstract {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UISprite]];
	}
	Refresh(t, e, i) {
		this.SetSpriteVisible(t);
	}
	SetSpriteVisible(t) {
		this.GetSprite(0).SetUIActive(t);
	}
}
exports.ItemUseComponent = ItemUseComponent;
