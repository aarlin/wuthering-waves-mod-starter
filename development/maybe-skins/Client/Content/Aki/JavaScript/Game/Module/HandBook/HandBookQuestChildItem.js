"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.HandBookQuestChildItem = void 0);
const UE = require("ue"),
	ConfigCommon_1 = require("../../../Core/Config/ConfigCommon"),
	MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiManager_1 = require("../../Ui/UiManager"),
	GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract"),
	LguiUtil_1 = require("../Util/LguiUtil"),
	HandBookController_1 = require("./HandBookController"),
	HandBookDefine_1 = require("./HandBookDefine");
class HandBookQuestChildItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments),
			(this.kzt = void 0),
			(this.LZt = 0),
			(this.mZt = () => {
				var e = this.kzt?.Config;
				e.QuestId ? this.tPn(e.Type) : this.qAn(e.Type);
			}),
			(this.aZt = (e, t) => e.Id - t.Id);
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UITexture],
			[1, UE.UIText],
			[2, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UIText],
			[6, UE.UISprite],
			[7, UE.UITexture],
			[3, UE.UIExtendToggle],
		]),
			(this.BtnBindInfo = [[3, this.mZt]]);
	}
	Refresh(e, t, o) {
		this.SetUiActive(!1), (this.kzt = e), (this.LZt = o);
		o = this.kzt.Config;
		var i = e.IsNew,
			n =
				((e = e.IsLock),
				ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender());
		this.SetTextureByPath(
			1 === n ? o.MaleTexture : o.FemaleTexture,
			this.GetTexture(0),
			void 0,
			() => {
				this.SetUiActive(!0);
			},
		),
			this.GetText(1).ShowTextNew(o.Name),
			this.GetItem(2).SetUIActive(i),
			this.GetTexture(0).SetUIActive(!e),
			this.GetTog()?.SetEnable(!e),
			o.AreaIcon || o.AreaNumber
				? (this.GetItem(4)?.SetUIActive(!0),
					this.SetSpriteByPath(o.AreaIcon, this.GetSprite(6), !1),
					this.SetTextureByPath(o.AreaNumber, this.GetTexture(7)))
				: this.GetItem(4)?.SetUIActive(!1),
			o.RoleName
				? (this.GetText(5)?.SetUIActive(!0),
					LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), o.RoleName))
				: this.GetText(5)?.SetUIActive(!1);
	}
	GetData() {
		return this.kzt;
	}
	SetNewState(e) {
		this.GetItem(2).SetUIActive(e);
	}
	SetToggleState(e) {
		this.GetExtendToggle(3).SetToggleStateForce(e, !1, !0),
			1 === e && this.dZt();
	}
	dZt() {
		var e, t;
		this.kzt.IsNew &&
			((t = (e = this.kzt.Config).Type),
			(t =
				ConfigManager_1.ConfigManager.HandBookConfig?.GetPlotTypeConfig(
					t,
				)?.Type),
			HandBookController_1.HandBookController.SendIllustratedReadRequest(
				t,
				e.Id,
			));
	}
	OnBeforeDestroy() {
		this.kzt = void 0;
	}
	GetTog() {
		return this.GetExtendToggle(3);
	}
	GetIsUnlock() {
		return !!this.kzt && !this.kzt.IsLock;
	}
	qAn(e) {
		this.dZt();
		var t = ConfigCommon_1.ConfigCommon.ToList(
				ConfigManager_1.ConfigManager.HandBookConfig.GetPlotHandBookConfigByType(
					e,
				),
			),
			o =
				(t.sort(this.aZt),
				ConfigManager_1.ConfigManager.HandBookConfig.GetPlotTypeConfig(e)),
			i = t.length,
			n = [],
			a = [],
			r = [],
			s = [],
			g = [],
			d = [];
		for (let e = 0; e < i; e++) {
			var l,
				h = t[e],
				u = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(7, h.Id);
			u &&
				((l = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender()),
				n.push(1 === l ? h.MaleTexture : h.FemaleTexture),
				g.push(u.CreateTime),
				a.push(
					MultiTextLang_1.configMultiTextLang.GetLocalTextNew(h.Descrtption),
				),
				r.push(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(h.Name)),
				s.push(
					MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
						o.TypeDescription,
					),
				),
				d.push(h.Id));
		}
		((e = new HandBookDefine_1.HandBookPhotoData()).DescrtptionText = a),
			(e.TypeText = s),
			(e.NameText = r),
			(e.HandBookType = 7),
			(e.Index = this.LZt),
			(e.TextureList = n),
			(e.DateText = g),
			(e.ConfigId = d),
			UiManager_1.UiManager.OpenView("HandBookPhotoView", e);
	}
	tPn(e) {
		this.dZt();
		var t = this.kzt?.Config.QuestId,
			o = ConfigCommon_1.ConfigCommon.ToList(
				ConfigManager_1.ConfigManager.HandBookConfig.GetPlotHandBookConfigByType(
					e,
				),
			),
			i =
				(o?.sort((e, t) => e.Id - t.Id),
				ConfigManager_1.ConfigManager.HandBookConfig.GetPlotTypeConfig(e)),
			n = o.length,
			a = [],
			r = new HandBookDefine_1.HandBookQuestViewOpenParam();
		for (let e = 0; e < n; e++) {
			var s = o[e];
			ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(i.Type, s.Id) &&
				(a.push(s.Id), t === s.QuestId) &&
				(r.Index = a.indexOf(s.Id));
		}
		(r.ConfigIdList = a),
			UiManager_1.UiManager.OpenView("HandBookQuestPlotView", r);
	}
}
exports.HandBookQuestChildItem = HandBookQuestChildItem;
