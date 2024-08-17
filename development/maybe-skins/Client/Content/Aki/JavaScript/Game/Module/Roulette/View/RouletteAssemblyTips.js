"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RouletteTipsItemPanel = exports.RouletteAssemblyTips = void 0);
const UE = require("ue"),
	MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid"),
	ItemTipsGetWay_1 = require("../../Common/ItemTips/SubComponents/ItemTipsGetWay"),
	HelpController_1 = require("../../Help/HelpController"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
	GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class RouletteAssemblyTips extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.Pe = void 0),
			(this.LPt = void 0),
			(this.u0o = void 0),
			(this.c0o = void 0),
			(this.XOe = () => {
				var e = this.Pe.HelpId;
				0 !== e && HelpController_1.HelpController.OpenHelpById(e);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UITexture],
			[1, UE.UISprite],
			[2, UE.UITexture],
			[3, UE.UIText],
			[4, UE.UIButtonComponent],
			[5, UE.UIText],
			[6, UE.UIItem],
			[7, UE.UIText],
			[8, UE.UIItem],
			[9, UE.UIItem],
			[10, UE.UIItem],
			[11, UE.UIItem],
			[12, UE.UIItem],
			[13, UE.UIText],
		]),
			(this.BtnBindInfo = [[4, this.XOe]]);
	}
	async OnBeforeStartAsync() {
		var e = this.GetItem(10);
		(this.u0o = new RouletteTipsItemPanel()),
			await this.u0o.CreateByActorAsync(e.GetOwner()),
			(e = this.GetItem(11));
		(this.c0o = new RouletteTipsItemPanel()),
			await this.c0o.CreateByActorAsync(e.GetOwner());
	}
	OnStart() {
		var e = this.GetItem(9);
		this.LPt = new ItemTipsGetWay_1.TipsGetWayPanel(e);
	}
	OnBeforeDestroy() {
		this.LPt && (this.LPt.Destroy(), (this.LPt = void 0)),
			this.u0o && (this.u0o.Destroy(), (this.u0o = void 0)),
			this.c0o && (this.c0o.Destroy(), (this.c0o = void 0));
	}
	Refresh(e) {
		(this.Pe = e),
			this.mGe(),
			this.m0o(),
			this.WNe(),
			this.d0o(),
			this.Kbe(),
			this.C0o(),
			this.g0o(),
			this.f0o(),
			this.p0o();
	}
	mGe() {
		this.GetText(3).ShowTextNew(this.Pe.Title);
	}
	m0o() {
		var e = this.Pe.HelpId;
		this.GetButton(4).RootUIComp.SetUIActive(0 !== e);
	}
	WNe() {
		var e = this.GetTexture(0),
			t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemQualityConfig(
				this.Pe.BgQuality,
			);
		this.SetTextureByPath(t.RouletteTipsQualityTexPath, e);
	}
	d0o() {
		var e = "" !== this.Pe.TextMain && void 0 !== this.Pe.TextMain;
		this.GetText(5).SetUIActive(e),
			e && this.GetText(5).ShowTextNew(this.Pe.TextMain),
			(e = "" !== this.Pe.TextSub && void 0 !== this.Pe.TextSub);
		this.GetItem(6).SetUIActive(e),
			e && this.GetText(7).ShowTextNew(this.Pe.TextSub);
	}
	Kbe() {
		const e = this.GetTexture(2),
			t = (e.SetUIActive(!1), this.GetSprite(1));
		t.SetUIActive(!1),
			2 === this.Pe.GridType
				? this.SetItemIcon(e, this.Pe.GridId, void 0, () => {
						e.SetUIActive(!0);
					})
				: "" !== this.Pe.IconPath &&
					(this.Pe.IsIconTexture
						? this.SetTextureByPath(this.Pe.IconPath, e, void 0, () => {
								e.SetUIActive(!0);
							})
						: this.SetSpriteByPath(this.Pe.IconPath, t, !1, void 0, () => {
								t.SetUIActive(!0);
							}));
	}
	C0o() {
		var e = this.Pe.GetWayData;
		this.LPt.SetActive(0 < e.length), e && this.LPt.Refresh(e);
	}
	g0o() {
		var [e, t] = this.Pe.CanSetItemNum;
		this.GetItem(12).SetUIActive(0 !== t),
			0 !== t &&
				((e = StringUtils_1.StringUtils.Format(
					MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
						"Text_CollectProgress_Text",
					),
					e.toString(),
					t.toString(),
				)),
				LguiUtil_1.LguiUtil.SetLocalTextNew(
					this.GetText(13),
					"Explore_Count",
					e,
				));
	}
	f0o() {
		var e = this.Pe.NeedItemMap;
		if ((this.u0o.SetActive(0 !== e.size), 0 !== e.size)) {
			const t = [];
			e.forEach((e, i) => {
				var o =
					ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(i);
				i = {
					ItemId: i,
					NeedLock: !1,
					Text: StringUtils_1.StringUtils.Format(
						MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
							"Text_CollectProgress_Text",
						),
						o.toString(),
						e.toString(),
					),
				};
				t.push(i);
			}),
				this.u0o.RefreshItemPanel(t);
		}
	}
	p0o() {
		var e = this.Pe.Authorization;
		if ((this.c0o.SetActive(0 < e.length), 0 !== e.length)) {
			var t = [];
			for (const o of e) {
				var i = {
					ItemId: o,
					NeedLock:
						(i =
							ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
								o,
							)) <= 0,
				};
				t.push(i);
			}
			this.c0o.RefreshItemPanel(t);
		}
	}
}
exports.RouletteAssemblyTips = RouletteAssemblyTips;
class RouletteTipsItemPanel extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.jFe = void 0),
			(this.Rke = () => new CommonItemSmallItemGridWrap());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIGridLayout],
			[1, UE.UIItem],
			[2, UE.UIText],
		];
	}
	OnStart() {
		this.jFe = new GenericLayout_1.GenericLayout(
			this.GetGridLayout(0),
			this.Rke,
		);
	}
	RefreshTitle(e) {
		this.GetText(2).ShowTextNew(e);
	}
	RefreshItemPanel(e) {
		this.jFe.RefreshByData(e);
	}
}
exports.RouletteTipsItemPanel = RouletteTipsItemPanel;
class CommonItemSmallItemGridWrap extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments), (this.GridItem = void 0);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UIItem]];
	}
	Refresh(e, t, i) {
		this.GridItem.RefreshByConfigId(e.ItemId),
			this.GridItem.SetLockVisible(e.NeedLock);
		var o = void 0 !== e.Text;
		this.GridItem.SetBottomTextVisible(o),
			o && this.GridItem.SetBottomText(e.Text);
	}
	OnStart() {
		this.GridItem = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
		var e = this.GetItem(0);
		this.GridItem.Initialize(e.GetOwner());
	}
	OnBeforeDestroy() {
		this.GridItem.Destroy();
	}
}
