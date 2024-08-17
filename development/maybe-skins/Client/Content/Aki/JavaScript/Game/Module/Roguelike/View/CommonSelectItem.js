"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CommonSelectItem = exports.CommonElementItem = void 0);
const UE = require("ue"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
	GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class CommonElementItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments), (this.Vyt = 0);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UITexture],
		];
	}
	Refresh(e, t, o) {
		this.Update(e), this.RefreshPanel();
	}
	Update(e) {
		this.Vyt = e;
	}
	RefreshPanel() {
		var e,
			t = ConfigManager_1.ConfigManager.CommonConfig.GetElementConfig(this.Vyt);
		t &&
			((e = UE.Color.FromHex(t.ElementColor)),
			this.GetSprite(0).SetColor(e),
			this.SetTextureByPath(t.Icon5, this.GetTexture(1)));
	}
}
exports.CommonElementItem = CommonElementItem;
class CommonSelectItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments),
			(this.RogueGainEntry = void 0),
			(this.jso = void 0),
			(this.E_i = void 0),
			(this.ClickCallBack = void 0),
			(this.Wso = () => new CommonElementItem()),
			(this.Kso = (e) => {
				this.ClickCallBack?.(1 === e ? this : void 0);
			});
	}
	SetClickCallBack(e) {
		this.ClickCallBack = e;
	}
	OnStart() {
		this.E_i = new GenericLayout_1.GenericLayout(
			this.GetHorizontalLayout(3),
			this.Wso,
		);
	}
	Refresh(e, t, o) {
		this.Update(e);
	}
	Update(e) {
		e.RoguelikeGainDataType === Protocol_1.Aki.Protocol.u3s.Proto_CommonBuff &&
			((this.RogueGainEntry = e), this.Fq());
	}
	Fq() {
		var e = this.RogueGainEntry.GetSortElementInfoArrayByCount();
		e.length <= 0 ||
			((this.jso = e[0]),
			(e = new Array(this.jso.Count).fill(this.jso.ElementId)),
			this.E_i?.RefreshByDataAsync(e).then(() => {
				this.RefreshPanel();
			}));
	}
	SetToggleUnDetermined() {
		this.GetExtendToggle(5).SetToggleState(2);
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UITexture],
			[1, UE.UITexture],
			[2, UE.UIText],
			[3, UE.UIHorizontalLayout],
			[4, UE.UIText],
			[5, UE.UIExtendToggle],
			[6, UE.UIItem],
			[7, UE.UISprite],
			[8, UE.UIItem],
			[9, UE.UIItem],
		]),
			(this.BtnBindInfo = [[5, this.Kso]]);
	}
	IsSelect() {
		return 1 === this.GetExtendToggle(5).GetToggleState();
	}
	RefreshPanel() {
		this.RogueGainEntry && (this.eOt(), this.Qso());
	}
	eOt() {
		this.GetItem(6).SetUIActive(this.RogueGainEntry.IsNew);
		var e,
			t = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueBuffConfig(
				this.RogueGainEntry.ConfigId,
			);
		t &&
			(this.GetText(2).ShowTextNew(t.BuffName),
			0 === ModelManager_1.ModelManager.RoguelikeModel?.GetDescModel()
				? this.GetText(4).ShowTextNew(t.BuffDescSimple)
				: LguiUtil_1.LguiUtil.SetLocalTextNew(
						this.GetText(4),
						t.BuffDesc,
						...t.BuffDescParam,
					),
			this.SetTextureByPath(t.BuffIcon, this.GetTexture(1)),
			(e =
				ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueQualityConfigByQualityId(
					t.Quality,
				)) && this.SetTextureByPath(e.TokenBg, this.GetTexture(0)),
			this.GetSprite(7).SetColor(UE.Color.FromHex(e.TokenColor)),
			this.GetItem(9).SetUIActive(5 === t.Quality),
			this.GetItem(8).SetUIActive(6 === t.Quality));
	}
	Qso() {
		var e = new Array(this.jso.Count).fill(this.jso.ElementId);
		this.E_i?.RefreshByDataAsync(e);
	}
}
exports.CommonSelectItem = CommonSelectItem;
