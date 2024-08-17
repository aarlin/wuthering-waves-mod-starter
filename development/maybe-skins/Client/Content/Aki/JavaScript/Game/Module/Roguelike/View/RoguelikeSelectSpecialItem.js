"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoguelikeSelectSpecialItem = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
	GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	RoguelikeDefine_1 = require("../Define/RoguelikeDefine"),
	RoguelikeSelectSpecialStarItem_1 = require("./RoguelikeSelectSpecialStarItem");
class RoguelikeSelectSpecialItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor(e) {
		super(),
			(this.fao = void 0),
			(this._ho = void 0),
			(this.$be = void 0),
			(this.zbe = () =>
				new RoguelikeSelectSpecialStarItem_1.RoguelikeSelectSpecialStarItem()),
			(this.uho = (e) => {
				this._ho && this._ho(this, this.fao);
			}),
			(this._ho = e);
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UITexture],
			[1, UE.UITexture],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIHorizontalLayout],
			[5, UE.UIText],
			[6, UE.UIText],
			[7, UE.UIText],
			[8, UE.UIItem],
			[9, UE.UIExtendToggle],
			[10, UE.UINiagara],
			[11, UE.UINiagara],
		]),
			(this.BtnBindInfo = [[9, this.uho]]);
	}
	OnBeforeShow() {
		this.$be = new GenericLayout_1.GenericLayout(
			this.GetHorizontalLayout(4),
			this.zbe,
		);
	}
	Refresh(e, t, i) {
		this.fao = e;
		var o =
			ConfigManager_1.ConfigManager.RoguelikeConfig?.GetRoguelikeSpecialConfig(
				e.ConfigId,
			);
		if (void 0 !== o) {
			const t = this.GetTexture(1);
			t.SetUIActive(!1),
				this.SetTextureByPath(o.Icon, t, void 0, () => {
					t.SetUIActive(!0);
				});
			var r =
				0 === ModelManager_1.ModelManager.RoguelikeModel?.GetDescModel()
					? o.BriefDescribe
					: o.Describe;
			(r =
				(LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), r),
				LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), o.Name),
				this.GetText(7))),
				(r =
					(LguiUtil_1.LguiUtil.SetLocalTextNew(
						r,
						"RogueSpecialRemainTime",
						e.RestCount,
					),
					r.SetUIActive(0 !== e.RestCount),
					0 < o.Level
						? (this.GetItem(2).SetUIActive(!0),
							this.GetItem(3).SetUIActive(!1),
							this.Zbe(o.Level, o.MaxLevel))
						: (this.GetItem(2).SetUIActive(!1),
							this.GetItem(3).SetUIActive(!0)),
					e.IsValid
						? (this.GetItem(8).SetUIActive(!1),
							this.GetTexture(0).SetAlpha(
								RoguelikeDefine_1.ROGUELIKE_SPECIAL_ITEM_UNLOCK_ALPHA,
							))
						: (this.GetItem(8).SetUIActive(!0),
							this.GetTexture(0).SetAlpha(
								RoguelikeDefine_1.ROGUELIKE_SPECIAL_ITEM_LOCK_ALPHA,
							)),
					1 === o.Category ? "FFFFFF" : "FFC3CC")),
				(e = 1 === o.Category ? "FFFFFF" : "FFEEF4");
			this.GetUiNiagara(10).SetColor(UE.Color.FromHex(r)),
				this.GetUiNiagara(11).SetColor(UE.Color.FromHex(e));
		}
	}
	Zbe(e, t) {
		var i = [];
		for (let r = 0; r < t; r++) {
			var o = e > r;
			i.push(o);
		}
		this.$be.RefreshByData(i);
	}
	SetSelect(e) {
		(e = e ? 1 : 0), this.GetExtendToggle(9).SetToggleState(e);
	}
}
exports.RoguelikeSelectSpecialItem = RoguelikeSelectSpecialItem;
