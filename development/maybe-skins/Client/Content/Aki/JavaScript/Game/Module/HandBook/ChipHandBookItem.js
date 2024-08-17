"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ChipHandBookItem = void 0);
const UE = require("ue"),
	MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	SmallItemGrid_1 = require("../Common/SmallItemGrid/SmallItemGrid"),
	GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract"),
	GenericLayoutNew_1 = require("../Util/Layout/GenericLayoutNew"),
	ChipHandBookChildItem_1 = require("./ChipHandBookChildItem");
class ChipHandBookItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments),
			(this.kzt = void 0),
			(this.Gzt = void 0),
			(this.Fzt = void 0),
			(this.Vzt = void 0),
			(this.Hzt = []),
			(this.jzt = []),
			(this.Xgt = void 0),
			(this.Wzt = (t, e, i) => (
				(e = new ChipHandBookChildItem_1.ChipHandBookChildItem(e)).Refresh(
					t,
					!1,
					0,
				),
				e.BindToggleCallback(this.Kzt),
				this.jzt.push(e),
				{ Key: i, Value: e }
			)),
			(this.Kzt = (t) => {
				this.Fzt && this.Fzt(t);
			}),
			(this.Ozt = (t) => {
				t = 1 === t;
				var e = this.CheckIsCanShowChildList();
				this.GetItem(1).SetUIActive(e && t),
					this.GetItem(2).SetUIActive(!t && e),
					this.GetItem(6).SetUIActive(t && e),
					this.GetItem(8).SetUIActive(!e),
					this.Gzt && t && this.Gzt(this);
			});
	}
	Initialize(t) {
		t && this.SetRootActor(t.GetOwner(), !0);
	}
	OnRegisterComponent() {
		(this.ComponentsRegisterInfo = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIText],
			[4, UE.UIVerticalLayout],
			[5, UE.UIExtendToggle],
			[6, UE.UIItem],
			[7, UE.UIItem],
			[8, UE.UIItem],
		]),
			(this.BtnBindInfo = [[5, this.Ozt]]);
	}
	OnStart() {
		(this.Xgt = new SmallItemGrid_1.SmallItemGrid()),
			this.Xgt.Initialize(this.GetItem(0).GetOwner());
	}
	Refresh(t, e, i) {
		var o = (this.kzt = t).Config.Id;
		(o =
			ConfigManager_1.ConfigManager.HandBookConfig.GetChipHandBookConfigList(
				o,
			)),
			(this.Hzt = o),
			(o = { Type: 4, Data: t, IconPath: t.Icon, QualityId: t.QualityId }),
			this.Xgt.Apply(o),
			this.Xgt.BindOnCanExecuteChange(() => !1),
			(this.jzt = []),
			(this.Vzt = new GenericLayoutNew_1.GenericLayoutNew(
				this.GetVerticalLayout(4),
				this.Wzt,
			)),
			this.Vzt.RebuildLayoutByDataNew(this.Hzt),
			(t = this.CheckIsCanShowChildList());
		this.GetText(3).SetText(
			t
				? this.kzt.Title
				: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
						"Text_Unknown_Text",
					),
		),
			this.GetItem(6).SetUIActive(!1),
			this.RefreshNewState(),
			this.GetItem(8).SetUIActive(!t),
			this.GetItem(1).SetUIActive(!1),
			this.GetItem(2).SetUIActive(t);
	}
	RefreshNewState() {
		var t = this.Hzt.length;
		let e = !1;
		for (let o = 0; o < t; o++) {
			var i = this.Hzt[o];
			if (
				void 0 !==
					(i = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(
						6,
						i.Id,
					)) &&
				!i.IsRead
			) {
				e = !0;
				break;
			}
		}
		this.GetItem(7).SetUIActive(e);
	}
	BindChildToggleCallback(t) {
		this.Fzt = t;
	}
	BindToggleCallback(t) {
		this.Gzt = t;
	}
	SelectFirstChildItem() {
		0 !== this.jzt.length &&
			(this.CheckIsCanShowChildList() &&
				(this.GetItem(1).SetUIActive(!0),
				this.GetItem(2).SetUIActive(!1),
				this.GetItem(6).SetUIActive(!0),
				this.GetExtendToggle(5).SetToggleState(1)),
			this.ResetChildToggleState(),
			this.jzt[0].SetToggleStateForce(1));
	}
	CheckIsCanShowChildList() {
		var t = this.jzt.length;
		let e = !1;
		for (let o = 0; o < t; o++) {
			var i = this.jzt[o].GetData();
			if (ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(6, i.Id)) {
				e = !0;
				break;
			}
		}
		return e;
	}
	ResetChildToggleState() {
		var t = this.jzt.length;
		for (let e = 0; e < t; e++) this.jzt[e].SetToggleStateForce(0);
	}
	SetToggleStateForce(t, e = 0) {
		this.GetExtendToggle(5).SetToggleState(t), this.Ozt(t);
	}
	GetChildItemList() {
		return this.jzt;
	}
	OnClearComponentsData() {
		(this.kzt = void 0),
			(this.Gzt = void 0),
			(this.Fzt = void 0),
			this.Vzt && (this.Vzt.ClearChildren(), (this.Vzt = void 0)),
			(this.Hzt = []),
			(this.jzt = []),
			this.Xgt.ClearComponentsData(),
			(this.Xgt = void 0);
	}
}
exports.ChipHandBookItem = ChipHandBookItem;
