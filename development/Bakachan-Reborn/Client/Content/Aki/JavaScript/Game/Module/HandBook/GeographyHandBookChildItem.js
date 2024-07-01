"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GeographyHandBookChildItem = void 0);
const UE = require("ue"),
	MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiManager_1 = require("../../Ui/UiManager"),
	ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
	GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract"),
	HandBookController_1 = require("./HandBookController"),
	HandBookDefine_1 = require("./HandBookDefine"),
	ConfigCommon_1 = require("../../../Core/Config/ConfigCommon");
class GeographyHandBookChildItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor(e = void 0) {
		super(),
			(this.kzt = void 0),
			(this.mZt = (e) => {
				var t = this.kzt.Config;
				if (this.kzt.IsLock)
					ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
						"CurGeographyHandBookLock",
					),
						this.SetToggleState(0);
				else {
					this.dZt();
					var o = ConfigCommon_1.ConfigCommon.ToList(
							ConfigManager_1.ConfigManager.HandBookConfig.GetAllGeographyHandBookConfig(),
						),
						i = (o.sort(this.aZt), o.length),
						r = [],
						n = [],
						a = [],
						s = [],
						g = [],
						l = [];
					let e = 0;
					for (let T = 0; T < i; T++) {
						var d = o[T],
							h = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(
								2,
								d.Id,
							);
						h &&
							(r.push(d.Texture),
							g.push(h.CreateTime),
							n.push(
								MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
									d.Descrtption,
								),
							),
							a.push(
								MultiTextLang_1.configMultiTextLang.GetLocalTextNew(d.Name),
							),
							(h =
								ConfigManager_1.ConfigManager.HandBookConfig.GetGeographyTypeConfig(
									d.Type,
								)),
							s.push(
								MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
									h.TypeDescription,
								),
							),
							l.push(d.Id),
							d.Id === t.Id) &&
							(e = r.length - 1);
					}
					var T = new HandBookDefine_1.HandBookPhotoData();
					(T.DescrtptionText = n),
						(T.TypeText = s),
						(T.NameText = a),
						(T.HandBookType = 2),
						(T.Index = e),
						(T.TextureList = r),
						(T.DateText = g),
						(T.ConfigId = l),
						UiManager_1.UiManager.OpenView("HandBookPhotoView", T);
				}
			}),
			(this.aZt = (e, t) =>
				e.Type === t.Type ? e.Id - t.Id : e.Type - t.Type),
			e && this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UITexture],
			[1, UE.UIText],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIExtendToggle],
		]),
			(this.BtnBindInfo = [[4, this.mZt]]);
	}
	Refresh(e, t, o) {
		this.kzt = e;
		var i = this.kzt.Config,
			r = e.IsNew;
		e = e.IsLock;
		this.SetTextureByPath(i.Texture, this.GetTexture(0)),
			this.GetText(1).ShowTextNew(i.Name),
			this.GetItem(2).SetUIActive(r),
			this.GetTexture(0).SetUIActive(!e),
			this.GetItem(3).SetUIActive(e),
			this.GetTog()?.SetEnable(!e);
	}
	GetData() {
		return this.kzt;
	}
	SetNewState(e) {
		this.GetItem(2).SetUIActive(e);
	}
	SetToggleState(e) {
		this.GetExtendToggle(4).SetToggleStateForce(e, !1, !0),
			1 === e && this.dZt();
	}
	dZt() {
		var e;
		this.kzt.IsNew &&
			((e = this.kzt.Config),
			HandBookController_1.HandBookController.SendIllustratedReadRequest(
				2,
				e.Id,
			));
	}
	OnBeforeDestroy() {
		this.kzt = void 0;
	}
	GetTog() {
		return this.GetExtendToggle(4);
	}
	GetIsUnlock() {
		return !!this.kzt && !this.kzt.IsLock;
	}
}
exports.GeographyHandBookChildItem = GeographyHandBookChildItem;
