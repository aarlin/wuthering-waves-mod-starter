"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PhantomInfoPanel =
		exports.PhantomEntryItem =
		exports.PhantomElementItem =
			void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
	GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	RoguelikeDefine_1 = require("../Define/RoguelikeDefine"),
	RogueSelectResult_1 = require("../Define/RogueSelectResult"),
	ElementItem_1 = require("./ElementItem");
class PhantomElementItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments), (this.jso = void 0), (this.uao = void 0);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIText],
			[2, UE.UISprite],
		];
	}
	async OnBeforeStartAsync() {
		(this.uao = new ElementItem_1.ElementItem()),
			await this.uao.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
	}
	Refresh(e, t, i) {
		this.Update(e);
	}
	Update(e) {
		(this.jso = e), this.uao.Update(this.jso), this.RefreshPanel();
	}
	RefreshPanel(e = void 0) {
		var [e, t, i, o, n] = this.cao(e);
		let a;
		return (
			this.GetSprite(2).SetUIActive(e),
			this.GetText(1).SetUIActive(!e),
			this.GetItem(0).SetUIActive(!e),
			(a = e
				? RoguelikeDefine_1.ROGUELIKEVIEW_FINIST_TEXT
				: t
					? RoguelikeDefine_1.ROGUELIKEVIEW_PREVIEW_TEXT
					: RoguelikeDefine_1.ROGUELIKEVIEW_NOTFINIST_TEXT),
			LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), a, i, o, n),
			e
		);
	}
	cao(e = void 0) {
		var t = ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.ElementDict,
			i = this.jso.Count,
			o = t.get(this.jso.ElementId) ?? 0;
		o += t.get(7) ?? 0;
		let n = 0,
			a = !1;
		return (
			e &&
				((n = (e.get(this.jso.ElementId) ?? 0) + (e.get(7) ?? 0)),
				9 === this.jso.ElementId &&
					e.forEach((e) => {
						n += e;
					}),
				0 < n) &&
				(a = !0),
			[o + n >= i, a, o, i, n]
		);
	}
}
exports.PhantomElementItem = PhantomElementItem;
class PhantomEntryItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments),
			(this.mao = void 0),
			(this.dao = void 0),
			(this.EPe = void 0),
			(this.Cao = !1),
			(this.jhi = () => new PhantomElementItem());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIVerticalLayout],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIText],
			[4, UE.UIText],
		];
	}
	OnStart() {
		(this.dao = new GenericLayout_1.GenericLayout(
			this.GetVerticalLayout(0),
			this.jhi,
		)),
			(this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(
				this.GetRootItem(),
			));
	}
	Refresh(e, t, i) {
		this.mao = e;
		var o;
		e = this.mao.GetSortElementInfoArrayByCount();
		for (const t of e)
			9 === t.ElementId
				? (t.Name = RoguelikeDefine_1.ROGUELIKEVIEW_16_TEXT)
				: (o = ConfigManager_1.ConfigManager.CommonConfig.GetElementConfig(
						t.ElementId,
					)) && (t.Name = o.Name);
		LguiUtil_1.LguiUtil.SetLocalTextNew(
			this.GetText(4),
			"Rogue_Phantom_Info_Index",
			i + 1,
		),
			this.dao.RefreshByData(e);
	}
	RefreshPreview(e = void 0) {
		let t = !0;
		for (const i of this.dao.GetLayoutItemList()) i.RefreshPanel(e) || (t = !1);
		var i = !this.mao.IsUnlock && t,
			o =
				(i
					? (this.gao(),
						(this.Cao = !0),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.RogueTermUnlock,
						))
					: this.Cao &&
						(this.EPe.PlayLevelSequenceByName("Disappear"), (this.Cao = !1)),
				this.GetItem(2).SetUIActive(i),
				this.GetText(3));
		LguiUtil_1.LguiUtil.SetLocalTextNew(o, this.mao.GetAffixDesc()),
			o.SetChangeColor(i, o?.changeColor);
	}
	gao() {
		this.EPe.PlayLevelSequenceByName(RoguelikeDefine_1.COMPLETE);
	}
}
exports.PhantomEntryItem = PhantomEntryItem;
class PhantomInfoPanel extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.fao = void 0),
			(this.pao = void 0),
			(this.vao = () => {
				UiManager_1.UiManager.OpenView(
					"RoguePhantomSelectResultView",
					new RogueSelectResult_1.RogueSelectResult(this.fao, void 0, void 0),
				);
			}),
			(this.CreatePhantomEntryItem = () => new PhantomEntryItem());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UITexture],
			[1, UE.UITexture],
			[2, UE.UIText],
			[3, UE.UIVerticalLayout],
			[4, UE.UIItem],
			[5, UE.UIButtonComponent],
			[6, UE.UITexture],
		]),
			(this.BtnBindInfo = [[5, this.vao]]);
	}
	OnStart() {
		this.pao = new GenericLayout_1.GenericLayout(
			this.GetVerticalLayout(3),
			this.CreatePhantomEntryItem,
		);
	}
	Update(e) {
		this.fao = e;
	}
	Refresh() {
		this.V9i(), this.Mao();
	}
	GetAttributeItem(e) {
		return this.pao?.GetItemByIndex(e);
	}
	V9i() {
		var e = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRoguePhantomConfig(
			this.fao.ConfigId,
		);
		e &&
			(this.GetText(2).ShowTextNew(e.PokemonName),
			this.SetTextureByPath(e.PokemonIcon, this.GetTexture(1)),
			(e =
				ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueQualityConfigByQualityId(
					e.Quality,
				))) &&
			(this.SetTextureByPath(e.PhantomBgC, this.GetTexture(0)),
			this.SetTextureByPath(e.PhantomBgB, this.GetTexture(6)));
	}
	Mao() {
		this.pao.RefreshByData(this.fao.AffixEntryList ?? []);
	}
	RefreshPhantomEntryItemRefreshPreview(e = void 0) {
		for (const t of this.pao.GetLayoutItemList()) t.RefreshPreview(e);
	}
}
exports.PhantomInfoPanel = PhantomInfoPanel;
