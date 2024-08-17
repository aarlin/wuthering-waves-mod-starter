"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WeaponResonanceView = void 0);
const UE = require("ue"),
	CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
	MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	ButtonItem_1 = require("../../Common/Button/ButtonItem"),
	ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
	ItemDefines_1 = require("../../Item/Data/ItemDefines"),
	ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
	UiSceneManager_1 = require("../../UiComponent/UiSceneManager"),
	UiModelUtil_1 = require("../../UiModel/UiModelUtil"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	WeaponController_1 = require("../WeaponController"),
	SingleItemSelect_1 = require("./SingleItemSelect");
class WeaponResonanceView extends UiTabViewBase_1.UiTabViewBase {
	constructor() {
		super(...arguments),
			(this.Nlo = !1),
			(this.p8t = void 0),
			(this.tOo = void 0),
			(this.ANo = 0),
			(this.Nki = void 0),
			(this.Oki = void 0),
			(this.iOo = (e, t) => {
				var o;
				e === this.ANo &&
					((this.Nki = UiSceneManager_1.UiSceneManager.GetWeaponObserver()),
					(this.Oki =
						UiSceneManager_1.UiSceneManager.GetWeaponScabbardObserver()),
					WeaponController_1.WeaponController.PlayWeaponRenderingMaterial(
						"WeaponResonanceUpMaterialController",
						this.Nki,
						this.Oki,
					),
					(o = this.Nki.Model),
					UiModelUtil_1.UiModelUtil.PlayEffectOnRoot(
						o,
						"WeaponResonanceUpEffect",
					),
					this.tOo.ClearSelectData(),
					this.sct(),
					(o = { WeaponIncId: e, LastLevel: t }),
					UiManager_1.UiManager.OpenView("WeaponResonanceSuccessView", o));
			}),
			(this.TGt = () =>
				ModelManager_1.ModelManager.WeaponModel.GetResonanceMaterialList(
					this.ANo,
				)),
			(this.QNo = () => {
				this.sct();
			}),
			(this.oOo = () => {
				const e = this.tOo.GetCurrentSelectedData();
				if (e)
					if (this.Nlo) {
						var t =
							ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
								this.ANo,
							);
						let i = 21;
						var o =
								(0 < (a = e.IncId) &&
									((o =
										ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
											a,
										)),
									(n =
										ModelManager_1.ModelManager.WeaponModel.IsWeaponHighLevel(
											o,
										)),
									(o =
										ModelManager_1.ModelManager.WeaponModel.HasWeaponResonance(
											o,
										)),
									n && o ? (i = 27) : o ? (i = 25) : n && (i = 26)),
								ConfigManager_1.ConfigManager.WeaponConfig),
							n =
								0 < a
									? o.GetWeaponName(
											o.GetWeaponConfigByItemId(e.ItemId).WeaponName,
										)
									: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
											ConfigManager_1.ConfigManager.ItemConfig.GetConfig(
												e.ItemId,
											).Name,
										),
							a = o.GetWeaponName(t.GetWeaponConfig().WeaponName);
						o = this.rOo();
						const r = t.GetIncId();
						(t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(i)).SetTextArgs(
							n,
							a,
							o.toString(),
						),
							t.FunctionMap.set(2, () => {
								var t = [],
									o = { Ykn: e.IncId, I5n: 1, G3n: e.ItemId };
								t.push(o),
									WeaponController_1.WeaponController.SendPbResonUpRequest(
										r,
										t,
									);
							}),
							ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
								t,
							);
					} else
						ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
							"WeaponResonanceNoEnoughMoneyText",
						);
				else
					ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
						"WeaponSelectMaterialTipsText",
					);
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UIText],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UIItem],
			[7, UE.UITexture],
			[8, UE.UIText],
			[9, UE.UIItem],
			[10, UE.UIItem],
			[11, UE.UIItem],
			[12, UE.UIText],
			[13, UE.UIText],
		];
	}
	OnStart() {
		(this.ANo = this.ExtraParams),
			(this.p8t = new ButtonItem_1.ButtonItem(this.GetItem(6))),
			this.p8t.SetFunction(this.oOo),
			this.nOo(),
			this.sOo();
	}
	AddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.WeaponResonanceSuccess,
			this.iOo,
		);
	}
	RemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.WeaponResonanceSuccess,
			this.iOo,
		);
	}
	nOo() {
		(this.tOo = new SingleItemSelect_1.SingleItemSelect()),
			this.tOo.Init(this.GetItem(5)),
			this.tOo.SetUseWayId(28),
			this.tOo.SetInitSortToggleState(!0),
			this.tOo.SetGetItemListFunction(this.TGt),
			this.tOo.SetItemSelectChangeCallBack(this.QNo);
	}
	sOo() {
		this.SetItemIcon(this.GetTexture(7), ItemDefines_1.EItemId.Gold);
	}
	aOo(e, t) {
		let o = 0;
		this.tOo.GetCurrentSelectedData() &&
			((n = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
				this.ANo,
			).GetWeaponConfig()),
			(o = ModelManager_1.ModelManager.WeaponModel.GetResonanceNeedMoney(
				n.ResonId,
				e,
				t,
			)));
		var n = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
			ItemDefines_1.EItemId.Gold,
		);
		this.GetText(8).SetText(o.toString()),
			(this.Nlo = n >= o),
			(this.GetText(8).useChangeColor = !this.Nlo);
	}
	sct() {
		var e = (t = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
				this.ANo,
			)).GetWeaponConfig(),
			t = t.GetResonanceLevel(),
			o = this.rOo(),
			n = t === e.ResonLevelLimit,
			a =
				(this.GetItem(3).SetUIActive(!n),
				this.GetText(1).SetUIActive(!n),
				this.GetItem(10).SetUIActive(!n),
				this.GetItem(4).SetUIActive(!n),
				this.p8t.GetRootItem().SetUIActive(!n),
				this.GetItem(9).SetUIActive(n),
				LguiUtil_1.LguiUtil.SetLocalText(
					this.GetText(0),
					"WeaponResonanceLevelText",
					t,
				),
				ModelManager_1.ModelManager.WeaponModel.GetWeaponConfigDescParams(
					e,
					t,
				));
		let i;
		if (!n) {
			LguiUtil_1.LguiUtil.SetLocalText(
				this.GetText(1),
				"WeaponResonanceLevelText",
				o,
			),
				this.aOo(t, o);
			var r = ModelManager_1.ModelManager.WeaponModel.GetWeaponConfigDescParams(
					e,
					o,
				),
				l =
					((i = []),
					CommonParamById_1.configCommonParamById.GetStringConfig(
						"HighlightColor",
					));
			for (let e = 0; e < a.length; e++) {
				var s = a[e],
					g = r[e];
				let t;
				(t =
					s === g
						? s.toString()
						: StringUtils_1.StringUtils.Format(
								"{0}-><color=#{1}>{2}</color>",
								s,
								l,
								g,
							)),
					i.push(t);
			}
		}
		(i = i ?? a),
			LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.Desc, ...i);
	}
	OnBeforeShow() {
		ModelManager_1.ModelManager.WeaponModel.SetCurSelectViewName(3),
			this.Refresh();
	}
	Refresh() {
		this.RefreshName(), this.sct();
	}
	RefreshName() {
		var e = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
				this.ANo,
			),
			t = e.GetWeaponConfig(),
			o = t.WeaponName,
			n = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(
				t.QualityId,
			);
		(n = UE.Color.FromHex(n.DropColor)),
			this.GetText(12).SetColor(n),
			this.GetText(12).ShowTextNew(o),
			(n = e.GetResonanceLevel());
		(o = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponResonanceConfig(
			t.ResonId,
			n,
		)) &&
			this.GetText(13).SetText(
				ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponResonanceDesc(
					o.Name,
				),
			);
	}
	rOo() {
		var e = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
				this.ANo,
			),
			t = e.GetResonanceLevel(),
			o = this.tOo.GetCurrentSelectedData();
		return o && 0 !== o.IncId
			? ((o =
					ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
						o.IncId,
					).GetResonanceLevel() + e.GetResonanceLevel()),
				(e = e.GetWeaponConfig().ResonLevelLimit) < o ? e : o)
			: t + 1;
	}
}
exports.WeaponResonanceView = WeaponResonanceView;
