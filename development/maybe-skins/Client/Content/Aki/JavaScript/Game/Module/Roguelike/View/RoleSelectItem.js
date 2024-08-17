"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleSelectItem = exports.RoleAttrItem = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
	GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class RoleAttrItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments), (this.AffixEntry = void 0);
	}
	Refresh(e, t, o) {
		this.Update(e);
	}
	Update(e) {
		(this.AffixEntry = e), this.RefreshPanel();
	}
	SetSecondColor() {
		var e = this.GetText(0);
		e.SetChangeColor(!0, e.changeColor);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UIText]];
	}
	RefreshPanel() {
		var e =
			ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueCharacterBuffConfig(
				this.AffixEntry.Id,
			);
		e &&
			(0 === ModelManager_1.ModelManager.RoguelikeModel?.GetDescModel()
				? this.GetText(0).ShowTextNew(e.AffixDescSimple)
				: LguiUtil_1.LguiUtil.SetLocalTextNew(
						this.GetText(0),
						e.AffixDesc,
						...e.AffixDescParam,
					));
	}
}
exports.RoleAttrItem = RoleAttrItem;
class RoleSelectItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments),
			(this.fao = void 0),
			(this.Pho = void 0),
			(this.xho = void 0),
			(this.vao = () => {}),
			(this.who = () => new RoleAttrItem());
	}
	Refresh(e, t, o) {
		this.Update(e);
	}
	Update(e) {
		(this.fao = e), this.RefreshPanel();
	}
	SetLevelUpItem(e) {
		this.GetItem(7).SetUIActive(e);
	}
	SetSecondColorForAttrItem(e) {
		this.xho = e;
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UITexture],
			[1, UE.UITexture],
			[2, UE.UITexture],
			[3, UE.UISprite],
			[4, UE.UIText],
			[5, UE.UIButtonComponent],
			[6, UE.UIItem],
			[7, UE.UIItem],
			[8, UE.UIItem],
			[9, UE.UINiagara],
			[10, UE.UIItem],
			[11, UE.UIItem],
			[12, UE.UIVerticalLayout],
			[13, UE.UIScrollViewWithScrollbarComponent],
		]),
			(this.BtnBindInfo = [[5, this.vao]]);
	}
	OnStart() {
		this.Pho = new GenericLayout_1.GenericLayout(
			this.GetVerticalLayout(12),
			this.who,
		);
	}
	RefreshPanel() {
		this.Vke(), this.Lao(), this.kIt();
	}
	Vke() {
		var e,
			t,
			o = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueCharacterConfig(
				this.fao.ConfigId,
			);
		o &&
			((t = Math.min(5, this.fao.AffixEntryList.length + 1)),
			(e = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(t)),
			(t =
				ConfigManager_1.ConfigManager.RoguelikeConfig?.GetRogueQualityConfigByQualityId(
					t,
				)),
			e &&
				((e = UE.Color.FromHex(e.DropColor)),
				this.GetTexture(0).SetColor(e),
				this.GetTexture(2).SetColor(e),
				this.GetSprite(3).SetColor(e)),
			t &&
				((e = new UE.LinearColor(UE.Color.FromHex(t.RoleNiagaraColor))),
				this.GetUiNiagara(9).SetNiagaraVarLinearColor("Color", e)),
			(t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(o.RoleId))) &&
			(this.GetText(4).ShowTextNew(t.Name),
			this.SetTextureByPath(t.FormationRoleCard, this.GetTexture(1)));
	}
	Lao() {
		this.Pho.RefreshByDataAsync(this.fao.AffixEntryList ?? []).then(() => {
			if (this.xho) {
				let e;
				for (const t of this.Pho.GetLayoutItemList())
					this.xho?.has(t.AffixEntry.Id) &&
						(t.SetSecondColor(), t.RefreshPanel(), (e = t));
				if (void 0 !== e) {
					const t = this.GetScrollViewWithScrollbar(13);
					let o = 0;
					t.OnLateUpdate.Bind((i) => {
						if (2 == ++o) {
							let o = 0;
							var r = e.GetRootItem().GetHeight(),
								a = t.GetViewport().GetUIItem().GetHeight(),
								n = t.ContentUIItem.GetHeight();
							(o = a < r ? n - a * Math.trunc(r / a) - (r % a) - 10 : n - a),
								(o = Math.max(o, 0)),
								t.ContentUIItem.SetAnchorOffsetY(o),
								t.OnLateUpdate.Unbind();
						}
					});
				}
			}
		});
	}
	kIt() {
		this.GetItem(8).SetUIActive((this.fao.AffixEntryList?.length ?? 0) <= 0);
	}
}
exports.RoleSelectItem = RoleSelectItem;
