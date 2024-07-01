"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PlotHandBookChildItem = void 0);
const UE = require("ue"),
	MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiManager_1 = require("../../Ui/UiManager"),
	ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
	GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract"),
	HandBookController_1 = require("./HandBookController"),
	HandBookDefine_1 = require("./HandBookDefine"),
	ConfigCommon_1 = require("../../../Core/Config/ConfigCommon");
class PlotHandBookChildItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor(e = void 0) {
		super(),
			(this.kzt = void 0),
			(this.LZt = 0),
			(this.aei = (e) => {
				const t = this.kzt.Config;
				if (this.kzt.IsLock)
					ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
						"CurPlotHandBookLock",
					),
						this.GetTog()?.SetToggleStateForce(0, !1, !0);
				else {
					this.kzt.IsNew &&
						HandBookController_1.HandBookController.SendIllustratedReadRequest(
							7,
							t.Id,
						);
					var o = t.Type,
						n = ConfigCommon_1.ConfigCommon.ToList(
							ConfigManager_1.ConfigManager.HandBookConfig.GetPlotHandBookConfigByType(
								o,
							),
						),
						i =
							(n.sort(this.aZt),
							ConfigManager_1.ConfigManager.HandBookConfig.GetPlotTypeConfig(
								o,
							)),
						r = n.length,
						a = [],
						s = [],
						l = [],
						d = [],
						g = [],
						h = [];
					for (let e = 0; e < r; e++) {
						const t = n[e];
						var u,
							T = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(
								7,
								t.Id,
							);
						T &&
							((u =
								ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender()),
							a.push(1 === u ? t.MaleTexture : t.FemaleTexture),
							g.push(T.CreateTime),
							s.push(
								MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
									t.Descrtption,
								),
							),
							l.push(
								MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Name),
							),
							d.push(
								MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
									i.TypeDescription,
								),
							),
							h.push(t.Id));
					}
					((o = new HandBookDefine_1.HandBookPhotoData()).DescrtptionText = s),
						(o.TypeText = d),
						(o.NameText = l),
						(o.HandBookType = 7),
						(o.Index = this.LZt),
						(o.TextureList = a),
						(o.DateText = g),
						(o.ConfigId = h),
						UiManager_1.UiManager.OpenView("HandBookPhotoView", o);
				}
			}),
			(this.OnHandBookRead = (e, t) => {
				7 === e &&
					t === this.kzt?.Config?.Id &&
					this.GetItem(2)?.SetUIActive(!1);
			}),
			(this.aZt = (e, t) => e.Id - t.Id),
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
			(this.BtnBindInfo = [[4, this.aei]]),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnHandBookRead,
				this.OnHandBookRead,
			);
	}
	Refresh(e, t, o) {
		(this.kzt = e), (this.LZt = o);
		o = this.kzt.Config;
		var n = e.IsNew,
			i =
				((e = e.IsLock),
				ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender());
		this.SetTextureByPath(
			1 === i ? o.MaleTexture : o.FemaleTexture,
			this.GetTexture(0),
		),
			this.GetText(1).ShowTextNew(o.Name),
			this.GetItem(2).SetUIActive(n),
			this.GetItem(3).SetUIActive(e),
			this.GetTexture(0).SetUIActive(!e),
			this.GetTog()?.SetEnable(!e);
	}
	OnBeforeDestroy() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnHandBookRead,
			this.OnHandBookRead,
		),
			(this.kzt = void 0),
			(this.LZt = 0);
	}
	GetTog() {
		return this.GetExtendToggle(4);
	}
	GetData() {
		return this.kzt;
	}
	GetIsUnlock() {
		return !!this.kzt && !this.kzt.IsLock;
	}
}
exports.PlotHandBookChildItem = PlotHandBookChildItem;
