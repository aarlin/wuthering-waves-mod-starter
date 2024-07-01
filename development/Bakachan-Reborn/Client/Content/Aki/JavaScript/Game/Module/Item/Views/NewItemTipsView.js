"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NewItemTipsView = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class NewItemTipsView extends UiTickViewBase_1.UiTickViewBase {
	constructor() {
		super(...arguments), (this.EPe = void 0), (this.rCi = !1);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UITexture],
			[1, UE.UIText],
			[2, UE.UITexture],
			[3, UE.UIText],
			[4, UE.UITexture],
			[5, UE.UINiagara],
		];
	}
	OnStart() {
		var e = ModelManager_1.ModelManager.ItemModel.ShiftWaitItemList();
		if (void 0 === e)
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("Item", 9, "新物品提示错误, 没有物品id!"),
				this.CloseMe();
		else {
			var t =
				ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e);
			if (void 0 === t)
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("Item", 9, "新物品提示错误, 没有物品配置!", [
						"itemId",
						e,
					]),
					this.CloseMe();
			else {
				var i = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(
					t.QualityId,
				);
				const o = UE.Color.FromHex(i.TextColor);
				this.GetText(1).SetColor(o), (this.rCi = 5 === i?.Id);
				var r = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
					this.rCi ? "NS_Fx_LGUI_Item_Golden" : "NS_Fx_LGUI_Item_Other",
				);
				r =
					(ResourceSystem_1.ResourceSystem.LoadAsync(
						r,
						UE.NiagaraSystem,
						(e) => {
							var t;
							e &&
								UiManager_1.UiManager.IsViewOpen("NewItemTipsView") &&
								this.RootItem &&
								((t = this.GetUiNiagara(5)).SetNiagaraSystem(e),
								this.rCi ||
									(t.ColorParameter.Get("Color").Constant =
										UE.LinearColor.FromSRGBColor(o)));
						},
					),
					LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.Name),
					LguiUtil_1.LguiUtil.SetLocalTextNew(
						this.GetText(3),
						t.ObtainedShowDescription,
					),
					this.SetItemIcon(this.GetTexture(2), e),
					this.SetTextureByPath(
						i.AcquireNewItemQualityTexPath,
						this.GetTexture(4),
					),
					(this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(
						this.RootItem,
					)),
					this.EPe.BindSequenceCloseEvent((e) => {
						("Golden" !== e && "Start01" !== e) || this.CloseMe();
					}),
					ConfigManager_1.ConfigManager.ItemConfig.GetMainTypeConfig(
						t.MainTypeId,
					));
				r?.IconFirstAchieve &&
					this.SetTextureByPath(r.IconFirstAchieve, this.GetTexture(0));
			}
		}
	}
	OnAfterShow() {
		this.EPe?.PlayLevelSequenceByName(this.rCi ? "Golden" : "Start01");
	}
	OnBeforeDestroy() {
		ModelManager_1.ModelManager.ItemModel.LastCloseTimeStamp =
			TimeUtil_1.TimeUtil.GetServerTimeStamp();
	}
}
exports.NewItemTipsView = NewItemTipsView;
