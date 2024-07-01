"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoguelikeShopDetail = exports.RoguelikeShopAttrItem = void 0);
const UE = require("ue"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	AsyncTask_1 = require("../../../World/Task/AsyncTask"),
	TaskSystem_1 = require("../../../World/Task/TaskSystem"),
	GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	RoguelikeController_1 = require("../RoguelikeController"),
	CommonSelectItem_1 = require("./CommonSelectItem");
class RoguelikeShopAttrItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super();
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIItem],
		];
	}
	Update(e) {
		var t = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueAffixConfig(
			e.Id,
		);
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.AffixDesc),
			this.GetItem(1).SetUIActive(e.IsUnlock);
	}
}
exports.RoguelikeShopAttrItem = RoguelikeShopAttrItem;
class RoguelikeShopDetail extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.Lho = []),
			(this.E_i = void 0),
			(this.Wso = () => new CommonSelectItem_1.CommonElementItem()),
			(this.nho = () => {
				RoguelikeController_1.RoguelikeController.RogueChooseDataResultRequest(
					6,
				);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UIText],
			[3, UE.UIText],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UIItem],
			[7, UE.UIButtonComponent],
			[8, UE.UITexture],
			[9, UE.UIText],
			[10, UE.UIText],
			[11, UE.UIHorizontalLayout],
		]),
			(this.BtnBindInfo = [[7, this.nho]]);
	}
	OnStart() {
		this.E_i = new GenericLayout_1.GenericLayout(
			this.GetHorizontalLayout(11),
			this.Wso,
		);
	}
	Refresh(e) {
		var t = new AsyncTask_1.AsyncTask(
			"RoguelikeShopDetail.Refresh",
			async () => {
				if (e.RoguelikeGainDataType === Protocol_1.Aki.Protocol.u3s.qDs) {
					var t =
						ConfigManager_1.ConfigManager.RoguelikeConfig.GetRoguePhantomConfig(
							e.ConfigId,
						);
					if (
						!(o =
							(LguiUtil_1.LguiUtil.SetLocalTextNew(
								this.GetText(0),
								t.PokemonName,
							),
							ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemById(
								t.PhantomItem,
							)))
					)
						return !0;
					if (
						!(i =
							ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillBySkillId(
								o.SkillId,
							))
					)
						return !0;
					(o =
						ConfigManager_1.ConfigManager.PhantomBattleConfig?.GetPhantomSkillDescExByPhantomSkillIdAndQuality(
							o.SkillId,
							t.Quality,
						)),
						LguiUtil_1.LguiUtil.SetLocalTextNew(
							this.GetText(3),
							i.DescriptionEx,
							...o,
						),
						this.GetItem(4).SetUIActive(!0);
					const n = [];
					e.AffixEntryList.forEach((e, t) => {
						this.Lho[t] ||
							((this.Lho[t] = new RoguelikeShopAttrItem()),
							n.push(
								this.Lho[t].CreateThenShowByActorAsync(
									LguiUtil_1.LguiUtil.CopyItem(
										this.GetItem(5),
										this.GetItem(4),
									).GetOwner(),
								),
							));
					}),
						await Promise.all(n),
						e.AffixEntryList.forEach((e, t) => {
							this.Lho[t].Update(e);
						});
				} else
					(t = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueBuffConfig(
						e.ConfigId,
					)),
						LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.BuffName),
						LguiUtil_1.LguiUtil.SetLocalTextNew(
							this.GetText(3),
							t.BuffDesc,
							...t.BuffDescParam,
						),
						this.GetItem(4).SetUIActive(!1);
				LguiUtil_1.LguiUtil.SetLocalTextNew(
					this.GetText(2),
					"RoguelikeShopItemType" + e.RoguelikeGainDataType.toString(),
				);
				var i = e.IsDiscounted() ? e.CurrentPrice : e.OriginalPrice,
					o =
						ConfigManager_1.ConfigManager.RoguelikeConfig?.GetRogueCurrencyConfig(
							e.ShopItemCoinId,
						);
				t = ModelManager_1.ModelManager.RoguelikeModel.GetRoguelikeCurrency(
					e.ShopItemCoinId,
				);
				return (
					0 <
						(t =
							(e.IsDiscounted()
								? LguiUtil_1.LguiUtil.SetLocalTextNew(
										this.GetText(10),
										"RogueShopOriginPriceDiscount",
										e.OriginalPrice.toString(),
									)
								: this.GetText(10).SetText(""),
							this.GetText(9).SetText(i.toString()),
							(this.GetText(9).useChangeColor = t < i),
							this.SetTextureByPath(o?.IconSmall ?? "", this.GetTexture(8)),
							this.GetItem(6).SetUIActive(!e.IsSell),
							this.GetButton(7).RootUIComp.SetUIActive(!e.IsSell),
							e.GetSortElementInfoArrayByCount())).length &&
						((i = t[0]),
						(o = new Array(i.Count).fill(i.ElementId)),
						await this.E_i?.RefreshByDataAsync(o)),
					!0
				);
			},
		);
		TaskSystem_1.TaskSystem.AddTask(t), TaskSystem_1.TaskSystem.Run();
	}
}
exports.RoguelikeShopDetail = RoguelikeShopDetail;
